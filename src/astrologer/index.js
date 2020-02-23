const swisseph = require('swisseph');

swisseph.swe_set_ephe_path(__dirname + '/../../eph');

const PLANETS = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mercury: swisseph.SE_MERCURY,
  uranus: swisseph.SE_URANUS,
}

const zodiacSign = (degrees) => Math.floor(degrees / 30)

/**
 * @param {string} astrologyObject 
 * @param {Date} moment 
 */
const position = async (astrologyObject, moment) => {
  const {julianDayET, julianDayUT} = swisseph.swe_utc_to_jd(
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
      dd: planet.longitude,
      dms: {
        degrees: degrees % 30,
        sign,
        minutes, 
        seconds
      }
    }
  }

  return object;
}

module.exports = {
  position
}