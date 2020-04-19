const router = require('express-promise-router')();

const astrologer = require('astrologer');

router.get('/', async (req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }));

router.post('/ephemeris', async (req, res) => {
  // resolve all promise..
  const astros = await Promise.all(Object.keys(astrologer.PLANETS).map(async item => {
    return {
      name: item,
      ...await astrologer.position(item, new Date(req.body.time))
    };
  }));

  res.status(200).json({
    data: {
      astros,
    }
  });
});

module.exports = router;
