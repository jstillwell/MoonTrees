using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MoonTrees.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonTrees.Data {
    public class MoonTrees {
        private static readonly string MoonTreeStorageString = Environment.GetEnvironmentVariable("MoonTreeStorage");

        CloudTable table;

        public MoonTrees() {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(MoonTreeStorageString);

            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            table = tableClient.GetTableReference("Trees");
            table.CreateIfNotExists();
        }
        public IEnumerable<Tree> Search(string filter, string searchValue) {
            var trees = new List<Tree>();

            TableQuery<Tree> rangeQuery = new TableQuery<Tree>().Where(TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, MoonTreeStorageString),
                TableOperators.And,
                TableQuery.GenerateFilterCondition(filter, QueryComparisons.Equal, searchValue)));

            return table.ExecuteQuery(rangeQuery);

        }
        public async Task<IEnumerable<Tree>> Get() {
            TableQuery<Tree> query = new TableQuery<Tree>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, Tree.Pkey));

            return table.ExecuteQuery(query);
        }
        public async Task<Tree> Get(string key) {
            var tree = new Tree();
            TableOperation retrieveOperation = TableOperation.Retrieve<Tree>(Tree.Pkey, key);

            TableResult retrievedResult = await table.ExecuteAsync(retrieveOperation);

            if (retrievedResult.Result == null) {
                throw new ArgumentException($"The record, {key}, could not be found");
            } else {
                tree = retrievedResult.Result as Tree;
            }

            return tree;
        }
        public async Task Insert(Tree tree) {
            TableOperation insertOperation = TableOperation.Insert(tree);

            // Execute the insert operation.
            await table.ExecuteAsync(insertOperation);
        }
        public void BulkInsert(IEnumerable<Tree> trees) {
            TableBatchOperation batchOperation = new TableBatchOperation();
            foreach (var tree in trees) {
                batchOperation.Insert(tree);
            }
            table.ExecuteBatch(batchOperation);
        }
    }
}
