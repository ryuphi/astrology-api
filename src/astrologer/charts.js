const { houses } = require('./houses')
const { aspects } = require('./aspects')
const { planets } = require('./astros')

const natalChart = (date, latitude, longitude, houseSystem = 'P') => {
  const astrosList = planets(date)
  const aspectsList = aspects(astrosList)
  const housesList = houses(
    date,
    {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    },
    houseSystem
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
