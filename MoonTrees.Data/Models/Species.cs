using System.ComponentModel;

namespace MoonTrees.Data.Models {
    public enum Species {
        [Description("Douglas Fir")]
        DouglasFir,
        [Description("Redwood")]
        Redwood,
        [Description("Sycamore")]
        Sycamore,
        [Description("Sweet Gum")]
        SweetGum,
        [Description("Loblolly Pine")]
        LoblollyPine,
        [Description("Pine")]
        Pine
    }
}
