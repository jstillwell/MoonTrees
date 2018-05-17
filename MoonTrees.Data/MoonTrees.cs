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
        private static readonly SharedAccessTablePolicy TableAccessPolicy = new SharedAccessTablePolicy();
        private static readonly string PolicyName = @"webapi";
        CloudTable table;

        public MoonTrees() {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(MoonTreeStorageString);

            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            table = tableClient.GetTableReference("trees");
            var policy = table.GetSharedAccessSignature(TableAccessPolicy, PolicyName);
                        
            table.CreateIfNotExists();
        }
        public async Task<IEnumerable<TreeEntity>> Search(string filter, string searchValue) {
            var trees = await Get();
            var filteredTrees = new List<TreeEntity>();
            foreach (var tree in trees) {
                switch (filter) {
                    case "Location":
                        if (tree.Location.IndexOf(searchValue, StringComparison.InvariantCultureIgnoreCase) != -1) {
                            filteredTrees.Add(tree);
                        }
                        break;
                    case "Species":
                        if (Enum.GetName(typeof(Species), tree.Species) == searchValue) {
                            filteredTrees.Add(tree);
                        }
                        break;
                    case "IsLiving":
                        var criteria = bool.Parse(searchValue);
                        if (tree.IsLiving == criteria) {
                            filteredTrees.Add(tree);
                        }
                        break;
                }
            }

            return filteredTrees;
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
        private void BulkInsert(IEnumerable<TreeEntity> trees) {
            TableBatchOperation batchOperation = new TableBatchOperation();
            foreach (var tree in trees) {
                batchOperation.Insert(tree);
            }
            table.ExecuteBatch(batchOperation);
        }
    }
}
