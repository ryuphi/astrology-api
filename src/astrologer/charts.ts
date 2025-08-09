import { houses } from './houses'
import { aspects } from './aspects'
import { planets } from './astros'

const natalChart = (
  date: Date,
  latitude: string,
  longitude: string,
  houseSystem = 'P'
) => {
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

export { natalChart }
