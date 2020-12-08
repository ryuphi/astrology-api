const astrologer = require("./../../src/astrologer");

describe("Calculate aspects between two planets", () => {
  it("2 planets may have no aspects", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: 10,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: 30,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect).toBe(undefined);
  });

  it("If two planets longitude difference is equal to 30 then exist conjunction", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: 30,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: 30,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect.name).toBe("conjunction");
  });

  it("If two planets longitude difference is equal to 60 then exist sextile", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: 30,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: 90,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect.name).toBe("sextile");
  });

  it("If two planets longitude difference is equal to 90 then exist quadrature", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: 0,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: 90,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect.name).toBe("quadrature");
  });

  it("If two planets longitude difference is equal to 120 then exist trigone", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: 355,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: 115,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect.name).toBe("trigone");
  });

  it("If two planets longitude difference is equal to 180 then exist opposition", async () => {
    const planetOne = {
      name: "sun",
      position: {
        longitude: -270,
      },
    };

    const planetTwo = {
      name: "pluto",
      position: {
        longitude: -90,
      },
    };

    const aspect = astrologer.aspect(planetOne, planetTwo);
    expect(aspect.name).toBe("opposition");
  });
});
