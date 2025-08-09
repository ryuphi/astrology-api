import { normalizeDegrees } from './utils'

// Supported angular distances between planets and their corresponding names
const ASPECTS: Record<AspectAngle, string> = {
  0: 'conjunction',
  30: 'semisextile',
  60: 'sextile',
  90: 'quadrature',
  120: 'trigone',
  150: 'quincunx',
  180: 'opposition'
}

// Classification of planets used by the aspect calculator
export type PlanetType =
  | 'luminary'
  | 'personal'
  | 'social'
  | 'transpersonal'
  | 'other'

export interface Position {
  longitude: number
}

export interface Planet {
  name: string
  type: PlanetType
  position: Position
}

export type AspectAngle = 0 | 30 | 60 | 90 | 120 | 150 | 180

// Default orb values for each planet type and aspect angle
export type Orbs = Record<PlanetType, Record<AspectAngle, number>>

const DEFAULT_ORBS: Orbs = {
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
}

const calculateAspect = (
  first: Planet,
  second: Planet,
  orbs: Record<AspectAngle, number>
): AspectAngle[] => {
  const firstLongitude = normalizeDegrees(first.position.longitude)
  const secondLongitude = normalizeDegrees(second.position.longitude)
  const diff = Math.abs(firstLongitude - secondLongitude)

  return (Object.keys(ASPECTS) as unknown as AspectAngle[]).filter((angle) => {
    const totalOrbsForAspect = orbs[angle]
    const from = angle - totalOrbsForAspect / 2
    const to = angle + totalOrbsForAspect / 2
    return diff >= from && diff <= to
  })
}

export type Direction = 'bidirectional' | 'unidirectional'

export interface AspectResult {
  name: string
  direction: Direction
  first: { name: string; exist: boolean }
  second: { name: string; exist: boolean }
}

const aspect = (
  first: Planet,
  second: Planet,
  orbs: Orbs = DEFAULT_ORBS
): AspectResult | undefined => {
  const aspectsFirst = calculateAspect(first, second, orbs[first.type])
  const aspectsSecond = calculateAspect(first, second, orbs[second.type])

  if (aspectsFirst.length === 0 && aspectsSecond.length === 0) {
    return undefined
  }

  const angle = aspectsFirst[0] ?? aspectsSecond[0]
  const direction: Direction =
    aspectsFirst.length === 1 && aspectsSecond.length === 1
      ? 'bidirectional'
      : 'unidirectional'

  return {
    name: ASPECTS[angle],
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

export interface AspectsMap {
  [planet: string]: AspectResult[]
}

const aspects = (planets: Record<string, Planet>, orbs: Orbs = DEFAULT_ORBS): AspectsMap => {
  return Object.keys(planets).reduce<AspectsMap>((acc, planetKey) => {
    acc[planetKey] = []

    Object.values(planets)
      .filter((p) => p.name !== planetKey)
      .forEach((p) => {
        if (!acc[p.name]) {
          const aspectsFound = aspect(planets[planetKey], p, orbs)
          if (aspectsFound) {
            acc[planetKey].push(aspectsFound)
          }
        }
      })

    return acc
  }, {})
}

export { aspect, aspects }

