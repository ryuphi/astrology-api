const { normalizeDegrees } = require("./utils");

const ASPECTS = {
  0: "conjunction",
  30: "semisextile",
  60: "sextile",
  90: "quadrature",
  120: "trigone",
  150: "quincunx",
  180: "opposition",
};

const DEFAULT_ORBS = {
  luminary: {
    0: 10,
    30: 3,
    60: 5,
    90: 6,
    120: 8,
    150: 5,
    180: 10
  },
  personal: {
    0: 7,
    30: 2,
    60: 4,
    90: 5,
    120: 6,
    150: 2,
    180: 7
  },
  social: {
    0: 6,
    30: 1.5,
    60: 3,
    90: 4,
    120: 5,
    150: 3,
    180: 6
  },
  transpersonal: {
    0: 5,
    30: 1,
    60: 2,
    90: 3,
    120: 4,
    150: 2,
    180: 5
  },
  others: {
    0: 5,
    30: 1,
    60: 2,
    90: 3,
    120: 4,
    150: 2,
    180: 5
  }
};

const aspect = (planetOne, planetTwo, orbs) => {
  if (orbs === undefined) {
    orbs = { ...DEFAULT_ORBS };
  }

  const aspects = Object.keys({ ...ASPECTS }).filter(
    (a) => {
      const totalOrbsForAspect = orbs[planetOne.type][a];
      const from = parseFloat(a) - (totalOrbsForAspect / 2);
      const to = parseFloat(a) + (totalOrbsForAspect / 2);

      const firstLongitude = normalizeDegrees(planetOne.position.longitude);
      const secondLongitude = normalizeDegrees(planetTwo.position.longitude);

      const diff = Math.abs(firstLongitude - secondLongitude);
      return diff >= from && diff <= to;
    }
  );

  if (aspects.length === 0) {
    return undefined;
  }

  return {
    name: ASPECTS[aspects[0]],
    planetOne: planetOne.name,
    planetTwo: planetTwo.name,
  };
};

module.exports = {
  aspect
};
