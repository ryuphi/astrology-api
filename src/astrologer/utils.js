const swisseph = require('swisseph');

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

const degreesToDms = (longitude) => {
  const degrees = Math.floor(longitude);

  const decimals = longitude - degrees;

  const minutes = Math.floor(decimals * 60);

  const seconds = Math.round((decimals * 60 - minutes) * 60);

  return {
    degrees: degrees % 30,
    minutes,
    seconds,
    longitude
  };
};

const zodiacSign = (degrees) => (Math.floor(degrees / 30) % 12) + 1;

module.exports = {
  utcToJulianUt,
  degreesToDms,
  zodiacSign,
};
