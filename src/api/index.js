const router = require('express-promise-router')();

const astrologer = require('astrologer');

router.get('/', async (req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }));

router.post('/ephemeris', async (req, res) => {
  const planets = {};

  await Object.keys(astrologer.PLANETS).forEach(async (item) => {
    const pos = await astrologer.position(item, new Date(req.body.time));
    planets[item] = {
      name: item,
      ...pos
    };
  });

  res.status(200).json({
    data: {
      astros: planets
    }
  });
});

module.exports = router;
