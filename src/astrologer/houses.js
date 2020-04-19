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
 * @param {Date} date
 * @param {Position} position
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
    // mc: houses.mc
  }

  return {axes};
}

module.exports = {
  houses
};
