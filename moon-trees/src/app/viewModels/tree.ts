class Tree {
    public Id: string;
    public GenerationId: string;
    public CityAndState: string;
    public PlantingDate: string;
    public Location: string;
    public IsLiving: boolean;
    public Species: Species;
    public Latitude: number;
    public Longitude: number;
    public RealLocation: string;
    public BetterLocation: string;
    public Link: string;
}

enum Species {
  DouglasFir,
  Redwood,
  Sycamore,
  SweetGum,
  LoblollyPine,
  Pine
}
