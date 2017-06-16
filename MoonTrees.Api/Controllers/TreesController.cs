using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MoonTrees.Data.Models;
using Microsoft.AspNetCore.Cors;

namespace MoonTrees.Api.Controllers {
    /// <summary>
    /// Endpoint for Moon Trees.
    /// Provides access to get and search the Moon Tree database.
    /// </summary>
    [Route("api/trees")]
    [EnableCors("AllowSpecificOrigins")]
    public class TreesController : Controller {
        Data.MoonTrees db = new Data.MoonTrees();

        /// <summary>
        /// Gets all trees
        /// </summary>
        /// <returns>List of trees</returns>
        [HttpGet]
        public async Task<IEnumerable<Tree>> Get() {
            var trees = await db.Get();

            return trees;
        }
        /// <summary>
        /// returns a specific tree
        /// </summary>
        /// <param name="id">trees id</param>
        /// <returns>a tree</returns>
        [HttpGet("{id}")]
        public IActionResult Get([FromQuery]string id) {
            var tree = db.Get(id);
            return Ok(tree);
        }
        /// <summary>
        /// Performs a search on the given field using the specified value
        /// </summary>
        /// <param name="filter">the field to search</param>
        /// <param name="searchValue">what to search for</param>
        /// <returns>List of trees containing the search term</returns>
        [HttpGet("{filter}/{searchValue}")]
        public IActionResult Search([FromQuery]string filter, [FromQuery]string searchValue) {
            var trees = db.Search(filter, searchValue);
            return Ok(trees);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Tree value) {
            var tree = new Tree();

            if (Tree.IsValid(value)) {
                tree = value;
            }
            
            return Created($"{tree.Location}", tree);
        }
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value) {
        //}
        //[HttpDelete("{id}")]
        //public void Delete([FromQuery]int id) {
        //}
    }
}
