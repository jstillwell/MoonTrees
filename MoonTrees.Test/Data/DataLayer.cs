using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MoonTrees.Data.Models;
using System.Collections.Generic;

namespace MoonTrees.Test.Data {
    [TestClass]
    public class DataLayer {
        private static MoonTrees.Data.MoonTrees db = new MoonTrees.Data.MoonTrees();
        [TestMethod]
        [TestCategory("data_layer")]
        public async void GetTrees_Success() {
            //arrange

            //act
            var results = await db.Get();

            //assert
            Assert.IsNotNull(results);
            Assert.IsInstanceOfType(results, typeof(IEnumerable<Tree>));
        }
        [TestMethod]
        [TestCategory("data_layer")]
        public async void GetTree_Success() {
            //arrange

            //act
            var results = await db.Get("Rio Grande do Sul, Brazil");

            //assert
            Assert.IsNotNull(results);
            Assert.IsInstanceOfType(results, typeof(IEnumerable<Tree>));
        }
    }
}
