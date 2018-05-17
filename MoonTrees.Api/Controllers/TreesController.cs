using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MoonTrees.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        [ProducesResponseType(typeof(OkResult), 200)]
        public async Task<IEnumerable<TreeEntity>> Get() {
            var trees = await db.Get();

            return trees;
        }
        /// <summary>
        /// returns a specific tree
        /// </summary>
        /// <param name="id">trees id</param>
        /// <returns>a tree</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OkResult), 200)]
        public IActionResult Get(string id) {
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
        public async Task<IActionResult> Search(string filter, string searchValue) {
            var trees = await db.Search(filter, searchValue);
            return Ok(trees);
        }

        [HttpPost]
        [ProducesResponseType(typeof(CreatedAtRouteResult), 201)]
        public IActionResult Post([FromBody]TreeEntity value) {
            var tree = new TreeEntity();

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
