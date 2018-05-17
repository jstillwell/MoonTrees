using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoonTrees.Data.Models {
    public class TreeEntity : TableEntity {
        public static readonly string FirstGenKey = "2e101809-0143-466d-982d-360e70c51336";
        public static readonly string SecondGenKey = "";    //TODO:
        //TODO: set up row key as a unique GUID and add second gen trees.

        public TreeEntity() {

        }
        public TreeEntity(string treeType, int generation) {
            this.PartitionKey = FirstGenKey;

            this.RowKey = treeType;
        }
        public string BetterLocation { get; set; }
        public string RealLocation { get; set; }
        public string Link { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string CityAndState { get; set; }
        public DateTime PlantingDate { get; set; }
        public string Location { get; set; }
        public bool IsLiving { get; set; }
        public Species Species { get; set; }

        public static Tree ToObject(TreeEntity entity) {
            var tree = new Tree {
                CityAndState = entity.CityAndState,
                PlantingDate = entity.PlantingDate,
                Location = entity.Location,
                IsLiving = entity.IsLiving,
                Species = entity.Species
            };

            return tree;
        }
    }

    public class Tree {
        public string Id { get; set; }
        public string GenerationId { get; set; }
        public string BetterLocation { get; set; }
        public string RealLocation { get; set; }
        public string Link { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string CityAndState { get; set; }
        public DateTime PlantingDate { get; set; }
        public string Location { get; set; }
        public bool IsLiving { get; set; }
        public Species Species { get; set; }

        public static bool IsValid(TreeEntity value) {
            if (string.IsNullOrWhiteSpace(value.Location)) {
                return false;
            } else if (value.PlantingDate != null) {
                return false;
            }

            return true;
        }
    }
}
