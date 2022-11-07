const sweph = require('sweph')
const path = require('path')
const getNakshatras = require('./nakshatra')

sweph.set_ephe_path(path.join(__dirname, '/../../eph'))

const utcToJulianUt = (utcDate) => {
  const milliSecondsInSeconds = utcDate.getUTCMilliseconds() / 1000
  const secondsInMinutes = (utcDate.getUTCSeconds() + milliSecondsInSeconds) / 60
  const minutesInHours = (utcDate.getUTCMinutes() + secondsInMinutes) / 60

  const hours = utcDate.getUTCHours() + minutesInHours

  return sweph.julday(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
    hours,
    sweph.constants.SE_GREG_CAL
  )
}

const utcToJulianEt = (utcDate) => {
  const julianUt = utcToJulianUt(utcDate)
  const delta = sweph.deltat(julianUt)
  return julianUt + delta
}

const degreesToDms = (value) => {
  const position = sweph.split_deg(value, sweph.constants.SE_SPLIT_DEG_ZODIACAL)
  const { degree: degrees, minute: minutes, second: seconds } = position
  return {
    degrees,
    minutes,
    seconds,
    longitude: value
  }
}

const zodiacSign = (degrees) => (Math.floor(degrees / 30) % 12) + 1

const nakshatra = (degrees) => getNakshatras(degrees)

const normalizeDegrees = (degrees) => {
  if (degrees < -180) {
    return degrees + 360
  }
  if (degrees > 180) {
    return degrees - 360
  }

  return degrees
}

module.exports = {
  utcToJulianUt,
  degreesToDms,
  zodiacSign,
  normalizeDegrees,
  utcToJulianEt,
  nakshatra
}
