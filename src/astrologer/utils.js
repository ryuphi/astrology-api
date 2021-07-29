const swisseph = require("swisseph");

const utcToJulianUt = (utcDate) => {
  const milliSecondsInSeconds = utcDate.getUTCMilliseconds() / 1000;
  const secondsInMinutes = (utcDate.getUTCSeconds() + milliSecondsInSeconds) / 60;
  const minutesInHours = (utcDate.getUTCMinutes() + secondsInMinutes) / 60;

  const hours = utcDate.getUTCHours() + minutesInHours;

  return swisseph.swe_julday(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
    hours,
    swisseph.SE_GREG_CAL
  );
};

const degreesToDms = (value) => {
  const position = swisseph.swe_split_deg(value, swisseph.SE_SPLIT_DEG_ZODIACAL);
  const { degree: degrees, min: minutes, second: seconds } = position;

  return {
    degrees,
    minutes,
    seconds,
    longitude: value
  };
};

const zodiacSign = (degrees) => (Math.floor(degrees / 30) % 12) + 1;

const normalizeDegrees = (degress) => {
  if (degress < -180) {
    return degress + 360;
  }
  if (degress > 180) {
    return degress - 360;
  }

  return degress;
};

module.exports = {
  utcToJulianUt,
  degreesToDms,
  zodiacSign,
  normalizeDegrees
};
