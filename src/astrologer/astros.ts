import sweph from 'sweph'
import { utcToJulianEt, zodiacSign, degreesToDms } from './utils'
import path from 'path'

sweph.set_ephe_path(path.join(__dirname, '/../../eph'))

const {
  SE_SUN,
  SE_MOON,
  SE_MEAN_APOG,
  SE_MERCURY,
  SE_VENUS,
  SE_MARS,
  SE_JUPITER,
  SE_SATURN,
  SE_URANUS,
  SE_NEPTUNE,
  SE_PLUTO,
  SE_VESTA,
  SE_JUNO,
  SE_CHIRON,
  SE_CERES,
  SE_PALLAS,
  SEFLG_SWIEPH,
  SEFLG_SPEED
} = sweph.constants

const PLANETS = {
  sun: SE_SUN,
  moon: SE_MOON,
  mercury: SE_MERCURY,
  venus: SE_VENUS,
  mars: SE_MARS,
  jupiter: SE_JUPITER,
  saturn: SE_SATURN,
  uranus: SE_URANUS,
  neptune: SE_NEPTUNE,
  pluto: SE_PLUTO,
  chiron: SE_CHIRON,
  lilith: SE_MEAN_APOG,
  ceres: SE_CERES,
  vesta: SE_VESTA,
  pallas: SE_PALLAS,
  juno: SE_JUNO
}

const planetsByType = {
  sun: 'luminary',
  moon: 'luminary',
  mercury: 'personal',
  venus: 'personal',
  mars: 'personal',
  jupiter: 'social',
  saturn: 'social',
  uranus: 'transpersonal',
  neptune: 'transpersonal',
  pluto: 'transpersonal',
  chiron: 'other',
  lilith: 'other',
  ceres: 'other',
  vesta: 'other',
  pallas: 'other',
  juno: 'other'
}

const FLAG = SEFLG_SPEED | SEFLG_SWIEPH

const getPositionOfAstro = (astro: string, julianDay: number) => sweph.calc(julianDay, PLANETS[astro], FLAG)

const isRetrograde = (speed: number) => speed < 0

const position = (astrologyObject: string, moment: Date) => {
  const julianDay = utcToJulianEt(moment)
  const { data } = getPositionOfAstro(astrologyObject, julianDay) as any
  const longitude = data[0]
  const speed = data[3]
  const dms = degreesToDms(longitude)
  const retrograde = isRetrograde(speed)

  return {
    position: {
      longitude,
      ...dms
    },
    speed,
    retrograde,
    sign: zodiacSign(longitude)
  }
}

const planets = (date: Date) => {
  return Object.keys(PLANETS).reduce((accumulator: any, name) => {
    const planetPosition = position(name, date)
    accumulator[name] = {
      name,
      ...planetPosition,
      type: (planetsByType as any)[name]
    }
    return accumulator
  }, {})
}

export { PLANETS, position, planetsByType, planets }
