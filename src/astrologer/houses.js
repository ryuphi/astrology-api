const swisseph = require('swisseph');

swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);

const { utcToJulianUt, degreesToDms, zodiacSign } = require('astrologer/utils')

/**
 * Position type
 * @typedef {Object} Position
 * @property {Number} latitude
 * @property {Number} longitude
 */

/**
 * Dms type (Degrees, Minutes, Seconds angle(?))
 * @typedef {Object<Number>} Dms
 * @property {Number} degrees
 * @property {Number} minutes
 * @property {Number} seconds
 */

/**
 * House type
 * @typedef {Object} House
 * @property {Dms} position
 * @property {Number} sign
 */

/**
 * @param {Date} date
 * @param {Position} position
 * @return {{axes: Object, houses: House[]}}
 */
const houses = async (date, position) => {
  const julianDayUT = utcToJulianUt(date);
  const {house, ...rawAxes} = swisseph.swe_houses(julianDayUT, position.latitude, position.longitude, 'P')

  const axes = {
    asc: {
      position: degreesToDms(rawAxes.ascendant),
      sign: zodiacSign(rawAxes.ascendant) + 1
    },
    dc: {
      position: degreesToDms(rawAxes.ascendant + 180), // this should to be equal to ascendant but with opposite sign
      sign: zodiacSign(rawAxes.ascendant + 180) + 1
    },
    mc: {
      position: degreesToDms((rawAxes.mc)),
      sign: zodiacSign(rawAxes.mc) + 1
    },
    ic: {
      position: degreesToDms((rawAxes.mc + 180)), // this should to be equal to mc but with opposite sign
      sign: zodiacSign((rawAxes.mc + 180)) + 1
    },
  }

  const houses = Array.from(house).map(cuspid => {
    return {
      position: degreesToDms(cuspid),
      sign: zodiacSign(cuspid) + 1
    }
  })

  return {axes, houses};
}

module.exports = {
  houses,
};
