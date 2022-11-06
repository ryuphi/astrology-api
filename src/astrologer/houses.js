const sweph = require('sweph')
const path = require('path')
const { SE_SIDM_LAHIRI } = require('./swephConstants')

sweph.set_ephe_path(path.join(__dirname, '/../../eph'))


const { utcToJulianUt, degreesToDms, zodiacSign } = require('./utils')

// Condition For SideReal Chart Positions 
// setting ayanamsha and sidereal flag
const houses = (date, position, houseSystem = 'P', yearSystem = 'S', ayanamsha = SE_SIDM_LAHIRI ) => {
  const julianDayUT = utcToJulianUt(date)

  const withoutGeoposition = !(position?.latitude && position?.longitude)
  var FLAG = SEFLG_SPEED | SEFLG_SWIEPH

  if (withoutGeoposition) {
    return {
      axes: {
        asc: undefined,
        dc: undefined,
        mc: undefined,
        ic: undefined
      },
      houses: []
    }
  }
   // Condition For SideReal Chart Positions 
  // setting ayanamsha and sidereal flag
   if (yearSystem == 'S') {
    sweph.set_sid_mode(Number(ayanamsha), 0, 0)
    FLAG = SEFLG_SIDEREAL
  }

  const { houses, points } = sweph.houses_ex(
    julianDayUT,
    FLAG,
    position.latitude,
    position.longitude,
    houseSystem // placidus system...
  ).data
   
  const houseCollection = houses.map((cuspid) => ({ position: degreesToDms(cuspid), sign: zodiacSign(cuspid) }))
  let i = 0
  const axes = {
                asc: axesPosition(points[i++]), // Ascendant
                mc: axesPosition(points[i++]),  // Midheaven
                armc: axesPosition(points[i++]),  // Right Ascension of the midheaven
                vertex: axesPosition(points[i++]),  // Vertex
                equasc: axesPosition(points[i++]),  // Equatorial Ascendant
                coasc1: axesPosition(points[i++]),  // Co-Ascendant (Walter Koch)
                coasc2: axesPosition(points[i++]),  // Co-Ascendant (Michael Munkasey)
                polasc: axesPosition(points[i++]),  // Polar Ascendant (Michael Munkasey)
                }
  

  return {
    axes,
    houses: houseCollection
  }
}

var axesPosition = (cuspid) => {
  return { position: degreesToDms(cuspid), sign: zodiacSign(cuspid) }
}

module.exports = {
  houses
}
