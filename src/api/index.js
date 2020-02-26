const router = require('express-promise-router')();

const astrologer = require('astrologer');

router.post('/ephemeris', async (req, res, next) => {
  const planets = {};

  await Object.keys(astrologer.PLANETS).forEach(async item => {
    let pos = await astrologer.position(item, new Date(req.body.time));
    planets[item]  = {
      name: item,
      ...pos
    };
  });

  res.status(200).json({
    data: {
      astros: planets
    }
  });
})

module.exports = router;
