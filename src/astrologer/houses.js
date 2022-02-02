const swisseph = require("swisseph");

swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);

const { utcToJulianUt, degreesToDms, zodiacSign } = require("./utils");

const houses = (date, position) => {
  const julianDayUT = utcToJulianUt(date);

  const withoutGeoposition = !position?.latitude || !position?.longitude;

  if (withoutGeoposition) {
    return {
      axes: {
        asc: undefined,
        dc: undefined,
        mc: undefined,
        ic: undefined
      },
      houses: []
    };
  }

  const { house: housesPositions } = swisseph.swe_houses(
    julianDayUT,
    position.latitude,
    position.longitude,
    "P" // placidus system...
  );

  const houseCollection = housesPositions.map((cuspid) => ({ position: degreesToDms(cuspid), sign: zodiacSign(cuspid) }));

  const axes = {
    asc: houseCollection[0], dc: houseCollection[6], mc: houseCollection[9], ic: houseCollection[3]
  };

  return {
    axes,
    houses: houseCollection,
  };
};

module.exports = {
  houses,
};
