const { normalizeDegrees } = require('./utils')

const ASPECTS = {
  0: 'conjunction',
  30: 'semisextile',
  45: 'octile',
  60: 'sextile',
  72: 'quintile',
  90: 'quadrature',
  120: 'trigone',
  135: 'trioctile',
  144: 'biquintile',
  150: 'quincunx',
  180: 'opposition'
}

// Orbs values used by Liz Greene
const DEFAULT_ORBS = {
  luminary: {
    0: 10,
    30: 3,
    45: 3,
    60: 6,
    72: 2,
    90: 10,
    120: 10,
    135: 3,
    144: 2,
    150: 3,
    180: 10
  },
  personal: {
    0: 10,
    30: 3,
    45: 3,
    60: 6,
    72: 2,
    90: 10,
    120: 10,
    135: 3,
    144: 2,
    150: 3,
    180: 10
  },
  social: {
    0: 10,
    30: 3,
    45: 3,
    60: 6,
    72: 2,
    90: 10,
    120: 10,
    135: 3,
    144: 2,
    150: 3,
    180: 10
  },
  transpersonal: {
    0: 10,
    30: 3,
    45: 3,
    60: 6,
    72: 2,
    90: 10,
    120: 10,
    135: 3,
    144: 2,
    150: 3,
    180: 10
  },
  other: {
    0: 0,
    30: 0,
    45: 0,
    60: 0,
    72: 0,
    90: 0,
    120: 0,
    135: 0,
    144: 0,
    150: 0,
    180: 0
  }
}

const calculateAspect = (first, second, orbs) => {
  return Object.keys({ ...ASPECTS }).filter(
    (a) => {
      const totalOrbsForAspect = orbs[a]
      const from = parseFloat(a) - totalOrbsForAspect
      const to = parseFloat(a) + totalOrbsForAspect

      const firstLongitude = normalizeDegrees(first.position.longitude)
      const secondLongitude = normalizeDegrees(second.position.longitude)

      const diff = Math.abs(firstLongitude - secondLongitude)
      return diff >= from && diff <= to
    }
  )
}

const aspect = (first, second, orbs) => {
  if (orbs === undefined) {
    orbs = { ...DEFAULT_ORBS }
  }

  const aspectsFirst = calculateAspect(first, second, orbs[first.type])
  const aspectsSecond = calculateAspect(first, second, orbs[second.type])

  if (aspectsFirst.length === 0 && aspectsSecond.length === 0) {
    return undefined
  }

  const direction = aspectsFirst.length === 1 && aspectsSecond.length === 1 ? 'bidirectional' : 'unidirectional'

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
    }
  }
}

const aspects = (planets) => {
  return Object.keys(planets).reduce((acc, planetKey) => {
    acc[planetKey] = []

    Object.values(planets).filter((p) => p.name !== planetKey).forEach((p) => {
      if (!acc[p.name]) {
        const aspectsFounds = aspect(planets[planetKey], p)
        if (aspectsFounds) {
          acc[planetKey].push(aspectsFounds)
        }
      }
    })

    return acc
  }, {})
}

module.exports = {
  aspect,
  aspects
}
