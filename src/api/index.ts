import Router from 'express-promise-router'
import astrologer from '../astrologer'

const router = new Router()

router.get('/', async (_req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }))

router.get('/horoscope', async (req, res) => {
  const date = new Date(req.query.time as string)
  const { latitude, longitude, houseSystem } = req.query as Record<string, string>

  const chart = astrologer.natalChart(date, latitude, longitude, houseSystem)

  res.status(200).json({
    data: chart
  })
})

export default router
