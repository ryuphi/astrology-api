import sweph from 'sweph'
import path from 'path'

sweph.set_ephe_path(path.join(__dirname, '/../../eph'))

const utcToJulianUt = (utcDate: Date) => {
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

const utcToJulianEt = (utcDate: Date) => {
  const julianUt = utcToJulianUt(utcDate)
  const delta = (sweph as any).deltat(julianUt)
  return julianUt + delta
}

const degreesToDms = (value: number) => {
  const position = sweph.split_deg(value, (sweph as any).constants.SE_SPLIT_DEG_ZODIACAL)
  const { degree: degrees, minute: minutes, second: seconds } = position
  return {
    degrees,
    minutes,
    seconds,
    longitude: value
  }
}

const zodiacSign = (degrees: number) => (Math.floor(degrees / 30) % 12) + 1

const normalizeDegrees = (degrees: number) => {
  if (degrees < -180) {
    return degrees + 360
  }
  if (degrees > 180) {
    return degrees - 360
  }

  return degrees
}

export { utcToJulianUt, degreesToDms, zodiacSign, normalizeDegrees, utcToJulianEt }
