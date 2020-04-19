const router = require('express-promise-router')();

const astrologer = require('astrologer');

router.get('/', async (req, res) => res.status(200).json({ message: 'Welcome to Astrology api!' }));

router.get('/horoscope', async (req, res) => {
  const date =  new Date(req.query.time);

  const planets = {};
  for (const item of Object.keys(astrologer.PLANETS)) {
    const position = await astrologer.position(item, new Date(req.query.time))
    planets[item] = {
      name: item,
      position: {
        degrees: position.position.dms.degrees,
        minutes: position.position.dms.minutes,
        seconds: position.position.dms.seconds
      },
      sign: position.position.dms.sign + 1 // this because function return 0 to ARIES, 1 to TAURUS, etc...
    };
  }

  res.status(200).json({
    data: {
      astros: {
        ...planets
      }
    }
  });
});

module.exports = router;
