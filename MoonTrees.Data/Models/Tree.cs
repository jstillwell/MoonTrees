using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoonTrees.Data.Models {
    public class Tree : TableEntity {
        public static readonly string Pkey = "2e101809-0143-466d-982d-360e70c51336";

        public Tree() {

        }
        public Tree(string treeType) {
            this.PartitionKey = Pkey;
            this.RowKey = treeType;
        }
        public string CityAndState { get; set; }
        public string PlantingDate { get; set; }
        public string Location { get; set; }
        public bool IsLiving { get; set; }
        public string TreeType {
            get {
                return this.RowKey;
            }
        }
    }
}
