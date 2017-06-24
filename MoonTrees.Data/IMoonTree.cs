using MoonTrees.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonTrees.Data {
    public interface IMoonTree {
        Task<IEnumerable<TreeEntity>> Search(string filter, string searchValue);
        Task<IEnumerable<TreeEntity>> Get();
        Task<TreeEntity> Get(string key);
        Task<string> Insert(TreeEntity tree);
        void BulkInsert(IEnumerable<TreeEntity> trees);
    }
}
