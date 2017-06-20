using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MoonTrees.Data.Models;
using Microsoft.AspNetCore.Cors;

namespace MoonTrees.Api.Controllers {
    /// <summary>
    /// Home Controller
    /// </summary>
    public class HomeController : Controller {
        /// <summary>
        /// Default route handler. Redirects to swagger so that is the default as this is a Web API.
        /// </summary>
        /// <returns></returns>
        public IActionResult Index() {
            return Redirect("swagger");
        }
        
    }
}
