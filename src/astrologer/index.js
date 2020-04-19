const swisseph = require('swisseph');
const { houses } = require('astrologer/houses');

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
 * @param {Date} utcDate
 */
const utcToJulianUt = (utcDate) => {
  const { julianDayUT } = swisseph.swe_utc_to_jd(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    swisseph.SE_GREG_CAL
  );

  return julianDayUT;
};

/**
 * @param {Number} degrees
 */
const zodiacSign = (degrees) => Math.floor(degrees / 30);

/**
 * @param {Number} longitude
 */
const transformLongitudeToDMSPosition = (longitude) => {
  const degrees = Math.floor(longitude);

  const decimals = longitude - degrees;

  const minutes = Math.floor(decimals * 60);

  const seconds = Math.round((decimals * 60 - minutes) * 60);

  const sign = zodiacSign(degrees);

  return {
    degrees: degrees % 30,
    sign,
    minutes,
    seconds
  };
};

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

  const dms = transformLongitudeToDMSPosition(astro.longitude);
  const object = {
    position: {
      longitude: astro.longitude,
      dms
    }
  };

  return object;
};

module.exports = {
  houses,
  position,
  PLANETS
};
