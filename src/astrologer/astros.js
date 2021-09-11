const sweph = require("sweph");

sweph.set_ephe_path(`${__dirname}/../../eph`);

const {
  SE_SUN,
  SE_MOON,
  SE_MEAN_APOG,
  SE_MERCURY,
  SE_VENUS,
  SE_MARS,
  SE_JUPITER,
  SE_SATURN,
  SE_URANUS,
  SE_NEPTUNE,
  SE_PLUTO,
  SE_VESTA,
  SE_JUNO,
  SE_CHIRON,
  SE_CERES,
  SE_PALLAS,
  SEFLG_SWIEPH,
  SEFLG_SPEED,
} = sweph.constants;

const { utcToJulianEt, zodiacSign, degreesToDms } = require("./utils");

const PLANETS = {
  sun: SE_SUN,
  moon: SE_MOON,
  mercury: SE_MERCURY,
  venus: SE_VENUS,
  mars: SE_MARS,
  jupiter: SE_JUPITER,
  saturn: SE_SATURN,
  uranus: SE_URANUS,
  neptune: SE_NEPTUNE,
  pluto: SE_PLUTO,
  chiron: SE_CHIRON,
  lilith: SE_MEAN_APOG,
  ceres: SE_CERES,
  vesta: SE_VESTA,
  pallas: SE_PALLAS,
  juno: SE_JUNO,
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

const FLAG = SEFLG_SPEED | SEFLG_SWIEPH;

const getPositionOfAstro = (astro, julianDay) => sweph.calc(julianDay, PLANETS[astro], FLAG);

const isRetrograde = (speed) => speed < 0;

const position = (astrologyObject, moment) => {
  const julianDay = utcToJulianEt(moment);
  const { data } = getPositionOfAstro(astrologyObject, julianDay);
  const longitude = data[0];
  const speed = data[3];
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
