const Router = require('express-promise-router')
const astrologer = require('../astrologer')

const router = new Router()

router.get('/', async (req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }))

router.get('/horoscope', async (req, res) => {
  const date = new Date(req.query.time)
  const { latitude, longitude } = req.query

  const chart = astrologer.natalChart(date, latitude, longitude)

  res.status(200).json({
    data: chart
  })
})

module.exports = router
