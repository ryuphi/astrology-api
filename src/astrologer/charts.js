const { houses } = require('./houses')
const { aspects } = require('./aspects')
const { planets } = require('./astros')
const { SE_SIDM_LAHIRI } = require('./swephConstants')

// Default value for yearSystem is =  SideReal 'S' 
// Default value for ayanamsha is Lahiri = SE_SIDM_LAHIRI

const natalChart = (date, latitude, longitude, houseSystem = 'P', yearSystem = 'T', ayanamsha = SE_SIDM_LAHIRI) => {
  const astrosList = planets(date, yearSystem, ayanamsha)
  const aspectsList = aspects(astrosList)
  const housesList = houses(
    date,
    {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    },
    houseSystem,
    yearSystem,
    ayanamsha,
  )

  return {
    astros: {
      ...astrosList
    },
    ...housesList,
    aspects: aspectsList
  }
}

module.exports = {
  natalChart
}
