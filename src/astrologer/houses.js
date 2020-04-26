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
      position: {...degreesToDms(rawAxes.ascendant), longitude: rawAxes.ascendant},
      sign: zodiacSign(rawAxes.ascendant)
    },
    dc: {
      position: {...degreesToDms(rawAxes.ascendant + 180), longitude: rawAxes.ascendant + 180}, // this should to be equal to ascendant but with opposite sign
      sign: zodiacSign(rawAxes.ascendant + 180)
    },
    mc: {
      position: {...degreesToDms(rawAxes.mc), longitude: rawAxes.mc},
      sign: zodiacSign(rawAxes.mc)
    },
    ic: {
      position: {...degreesToDms(rawAxes.mc + 180), longitude: rawAxes.mc + 180}, // this should to be equal to mc but with opposite sign
      sign: zodiacSign((rawAxes.mc + 180))
    },
  }

  const houses = Array.from(house).map(cuspid => {
    return {
      position: {...degreesToDms(cuspid), longitude: cuspid},
      sign: zodiacSign(cuspid)
    }
  })

  return {axes, houses};
}

module.exports = {
  houses,
};
