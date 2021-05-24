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

// HUBER ORBS... but mars and jupiter modified...
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
  other: {
    0: 5,
    30: 1,
    60: 2,
    90: 3,
    120: 4,
    150: 2,
    180: 5
  }
};

const calculateAspect = (first, second, orbs) => {
  return Object.keys({ ...ASPECTS }).filter(
    (a) => {
      const totalOrbsForAspect = orbs[a];
      const from = parseFloat(a) - (totalOrbsForAspect / 2);
      const to = parseFloat(a) + (totalOrbsForAspect / 2);

      const firstLongitude = normalizeDegrees(first.position.longitude);
      const secondLongitude = normalizeDegrees(second.position.longitude);

      const diff = Math.abs(firstLongitude - secondLongitude);
      return diff >= from && diff <= to;
    }
  );
};

const aspect = (first, second, orbs) => {
  if (orbs === undefined) {
    orbs = { ...DEFAULT_ORBS };
  }

  const aspectsFirst = calculateAspect(first, second, orbs[first.type]);
  const aspectsSecond = calculateAspect(first, second, orbs[second.type]);

  if (aspectsFirst.length === 0 && aspectsSecond.length === 0) {
    return undefined;
  }

  const direction = aspectsFirst.length === 1 && aspectsSecond.length === 1 ? "bidirectional" : "unidirectional";

  return {
    name: ASPECTS[aspectsFirst[0]],
    direction,
    first: {
      name: first.name,
      exist: aspectsFirst.length === 1
    },
    second: {
      name: second.name,
      exist: aspectsSecond.length === 1
    },
  };
};

const aspects = (planets) => {
  return Object.keys(planets).reduce((acc, planetKey) => {
    acc[planetKey] = [];

    Object.values(planets).filter((p) => p.name !== planetKey).forEach((p) => {
      if (!acc[p.name]) {
        const aspectsFounds = aspect(planets[planetKey], p);
        if (aspectsFounds) {
          acc[planetKey].push(aspectsFounds);
        }
      }
    });

    return acc;
  }, {});
};

module.exports = {
  aspect,
  aspects
};
