using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MoonTrees.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonTrees.Data {
    public class MoonTrees : IMoonTree {
        private static readonly string MoonTreeStorageString = Environment.GetEnvironmentVariable("MoonTreeStorage");

        CloudTable table;

        public MoonTrees() {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(MoonTreeStorageString);

            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            table = tableClient.GetTableReference("Trees");
            table.CreateIfNotExists();
        }
        public IEnumerable<TreeEntity> Search(string filter, string searchValue) {
            var trees = new List<TreeEntity>();

            TableQuery<TreeEntity> rangeQuery = new TableQuery<TreeEntity>().Where(TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, MoonTreeStorageString),
                TableOperators.And,
                TableQuery.GenerateFilterCondition(filter, QueryComparisons.Equal, searchValue)));

            return table.ExecuteQuery(rangeQuery);

        }
        public async Task<IEnumerable<TreeEntity>> Get() {
            TableQuery<TreeEntity> query = new TableQuery<TreeEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, TreeEntity.FirstGenKey));

            return table.ExecuteQuery(query);
        }
        public async Task<TreeEntity> Get(string key) {
            var tree = new TreeEntity();
            TableOperation retrieveOperation = TableOperation.Retrieve<TreeEntity>(TreeEntity.FirstGenKey, key);

            TableResult retrievedResult = await table.ExecuteAsync(retrieveOperation);

            if (retrievedResult.Result == null) {
                throw new ArgumentException($"The record, {key}, could not be found");
            } else {
                tree = retrievedResult.Result as TreeEntity;
            }

            return tree;
        }
        public async Task<string> Insert(TreeEntity tree) {
            TableOperation insertOperation = TableOperation.Insert(tree);
            tree.RowKey = new Guid().ToString();
            // TODO: create a new ID for this and return it
            await table.ExecuteAsync(insertOperation);

            return tree.RowKey;
        }
        public void BulkInsert(IEnumerable<TreeEntity> trees) {
            TableBatchOperation batchOperation = new TableBatchOperation();
            foreach (var tree in trees) {
                batchOperation.Insert(tree);
            }
            table.ExecuteBatch(batchOperation);
        }
    }
}
