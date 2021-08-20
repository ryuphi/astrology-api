const swisseph = require("swisseph");

swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);

const { utcToJulianEt, zodiacSign, degreesToDms } = require("./utils");

const PLANETS = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mercury: swisseph.SE_MERCURY,
  venus: swisseph.SE_VENUS,
  mars: swisseph.SE_MARS,
  jupiter: swisseph.SE_JUPITER,
  saturn: swisseph.SE_SATURN,
  uranus: swisseph.SE_URANUS,
  neptune: swisseph.SE_NEPTUNE,
  pluto: swisseph.SE_PLUTO,
  chiron: swisseph.SE_CHIRON,
  lilith: swisseph.SE_MEAN_APOG,
  ceres: swisseph.SE_CERES,
  vesta: swisseph.SE_VESTA,
  pallas: swisseph.SE_PALLAS,
  juno: swisseph.SE_JUNO,
};

const planetsByType = {
  sun: "luminary",
  moon: "luminary",
  mercury: "personal",
  venus: "personal",
  mars: "personal",
  jupiter: "social",
  saturn: "social",
  uranus: "transpersonal",
  neptune: "transpersonal",
  pluto: "transpersonal",
  chiron: "other",
  lilith: "other",
  ceres: "other",
  vesta: "other",
  pallas: "other",
  juno: "other",
};

const FLAG = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

const getPositionOfAstro = (astro, julianDay) => swisseph.swe_calc(julianDay, PLANETS[astro], FLAG);

const isRetrograde = (speed) => speed < 0;

const position = (astrologyObject, moment) => {
  const julianDay = utcToJulianEt(moment);
  const { longitude, longitudeSpeed: speed } = getPositionOfAstro(astrologyObject, julianDay);
  const dms = degreesToDms(longitude);
  const retrograde = isRetrograde(speed);

  return {
    position: {
      longitude,
      ...dms,
    },
    speed,
    retrograde,
    sign: zodiacSign(longitude),
  };
};

const planets = (date) => {
  return Object.keys(PLANETS)
    .reduce(
      (accumulator, name) => {
        const planetPosition = position(name, date);
        accumulator[name] = {
          name,
          ...planetPosition,
          type: planetsByType[name]
        };
        return accumulator;
      },
      {}
    );
};

module.exports = {
  PLANETS,
  position,
  planetsByType,
  planets,
};
