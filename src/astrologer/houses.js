const swisseph = require('swisseph');

swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);

const { utcToJulianUt, degreesToDms, zodiacSign } = require('./utils');

const houses = (date, position) => {
  const julianDayUT = utcToJulianUt(date);
  const { house, ...rawAxes } = swisseph.swe_houses(julianDayUT, position.latitude, position.longitude, 'P');

  const axes = {
    asc: {
      position: degreesToDms(rawAxes.ascendant),
      sign: zodiacSign(rawAxes.ascendant)
    },
    dc: {
      position: degreesToDms(rawAxes.ascendant + 180),
      sign: zodiacSign(rawAxes.ascendant + 180)
    },
    mc: {
      position: degreesToDms(rawAxes.mc),
      sign: zodiacSign(rawAxes.mc)
    },
    ic: {
      position: degreesToDms(rawAxes.mc + 180), // this should to be equal to mc but with opposite sign
      sign: zodiacSign((rawAxes.mc + 180))
    },
  };

  return {
    axes,
    houses: Array.from(house).map((cuspid) => ({
      position: degreesToDms(cuspid),
      sign: zodiacSign(cuspid)
    }))
  };
};

module.exports = {
  houses,
};
