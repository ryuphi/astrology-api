const swisseph = require('swisseph');

swisseph.swe_set_ephe_path(__dirname + '/../../eph');

let PLANETS = {
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

const zodiacSign = (degrees) => Math.floor(degrees / 30);

/**
 * @param {string} astrologyObject 
 * @param {Date} moment 
 */
const position = async (astrologyObject, moment) => {
  const {julianDayUT} = swisseph.swe_utc_to_jd(
    moment.getUTCFullYear(),
    (moment.getUTCMonth() +1),
    moment.getUTCDate(),
    moment.getUTCHours(), 
    moment.getUTCMinutes(),
    moment.getUTCSeconds(),
    swisseph.SE_GREG_CAL
  )

  const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

  const planet = swisseph.swe_calc_ut(julianDayUT, PLANETS[astrologyObject], flag);

  const degrees = Math.floor(planet.longitude);

  const decimalOfLongitude = planet.longitude - degrees;

  const minutes = Math.floor(decimalOfLongitude * 60);
  
  const seconds = Math.floor(((decimalOfLongitude * 60) - minutes) * 60);

  const sign = zodiacSign(degrees);

  const object = {
    position: {
      longitude: planet.longitude,
      dms: {
        degrees: degrees % 30,
        sign,
        minutes,
        seconds
      }
    }
  };

  return object;
}

module.exports = {
  position,
  PLANETS
}
