using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoonTrees.Data.Models {
    public class Tree : TableEntity {
        public static readonly string FirstGenKey = "2e101809-0143-466d-982d-360e70c51336";    //static partition key for searching. this is for first generation trees only.
        public static readonly string SecondGenKey = "";    //TODO:
        //TODO: set up row key as a unique GUID and add second gen trees.

        public Tree() {

        }
        public Tree(string treeType) {
            this.PartitionKey = FirstGenKey;
            this.RowKey = treeType;
        }
        public string CityAndState { get; set; }
        public string PlantingDate { get; set; }
        public string Location { get; set; }
        public bool IsLiving {
            get {
                if (TypeOfTree.Contains('*')) {
                    return false;
                } else { return true; }
            }
        }
        public string TypeOfTree {
            get {
                return this.RowKey;
            }
        }

        public static bool IsValid(Tree value) {
            if (string.IsNullOrWhiteSpace(value.Location)) {
                return false;
            } else if (string.IsNullOrWhiteSpace(value.PlantingDate)) {
                return false;
            }

            return true;
        }
    }
}
