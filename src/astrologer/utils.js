const swisseph = require("swisseph");

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

const degreesToDms = (value) => {
  const { degree: degrees, min: minutes, second: seconds } = swisseph.swe_split_deg(value, swisseph.SE_SPLIT_DEG_ZODIACAL);

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
