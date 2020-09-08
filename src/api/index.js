const astrologer = require('astrologer');
const Router = require('express-promise-router');
const router = new Router();

router.get('/', async (req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }));

router.get('/horoscope', async (req, res) => {
  const date = new Date(req.query.time);
  const planets = {};
  
  for (const item of Object.keys(astrologer.PLANETS)) {
    const position = await astrologer.position(item, date);
    planets[item] = {
      name: item,
      ...position
    };
  }

  const houses = await astrologer.houses(date, {
    latitude: parseFloat(req.query.latitude),
    longitude: parseFloat(req.query.longitude),
  });

  res.status(200).json({
    data: {
      astros: {
        ...planets
      },
      ...houses
    }
  });
});

module.exports = router;
