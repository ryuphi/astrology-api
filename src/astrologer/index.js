const swisseph = require('swisseph');
const { houses } = require('astrologer/houses');
const { utcToJulianUt, zodiacSign, degreesToDms } = require('astrologer/utils');

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
  juno: swisseph.SE_JUNO
};

const FLAG = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

/**
 * @param {String} astro
 * @param {Number} julianDayUT
 */
const getPositionOfAstro = (astro, julianDayUT) => swisseph.swe_calc_ut(julianDayUT, PLANETS[astro], FLAG);

/**
 * @param {string} astrologyObject
 * @param {Date} moment
 */
const position = async (astrologyObject, moment) => {
  swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);
  const julianDayUT = utcToJulianUt(moment);
  const astro = getPositionOfAstro(astrologyObject, julianDayUT);

  const dms = degreesToDms(astro.longitude);
  return {
    position: {
      longitude: astro.longitude,
      ...dms
    },
    sign: zodiacSign(astro.longitude)
  };
};

module.exports = {
  houses,
  position,
  PLANETS
};
