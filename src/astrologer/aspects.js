const { normalizeDegrees } = require("./utils");

const ASPECTS = {
  0: "conjunction",
  60: "sextile",
  90: "quadrature",
  120: "trigone",
  180: "opposition",
};

const aspect = (planetOne, planetTwo) => {
  const firstLongitude = normalizeDegrees(planetOne.position.longitude);
  const secondLongitude = normalizeDegrees(planetTwo.position.longitude);
  const diff = Math.abs(firstLongitude - secondLongitude);

  if (ASPECTS[diff] === undefined) {
    return undefined;
  }

  return {
    name: ASPECTS[diff],
    planetOne: planetOne.name,
    planetTwo: planetTwo.name,
  };
};

module.exports = {
  aspect
};
