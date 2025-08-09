import sweph from 'sweph'
import path from 'path'
import { utcToJulianUt, degreesToDms, zodiacSign } from './utils'

sweph.set_ephe_path(path.join(__dirname, '/../../eph'))

const houses = (date: Date, position: any, houseSystem = 'P') => {
  const julianDayUT = utcToJulianUt(date)

  const withoutGeoposition = !(position?.latitude && position?.longitude)

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

  const { houses: housesPositions } = sweph.houses(
    julianDayUT,
    position.latitude,
    position.longitude,
    houseSystem // placidus system...
  ).data as any

  const houseCollection = housesPositions.map((cuspid: number) => ({ position: degreesToDms(cuspid), sign: zodiacSign(cuspid) }))

  const axes = {
    asc: houseCollection[0],
    dc: houseCollection[6],
    mc: houseCollection[9],
    ic: houseCollection[3]
  }

  return {
    axes,
    houses: houseCollection
  }
}

export { houses }
