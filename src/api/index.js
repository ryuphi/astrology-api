const router = require('express-promise-router')();

const astrologer = require('astrologer');

router.post('/natal', async (req, res, next) => {

  res.status(200).json({
    data: {
      planets: {
        sun: await astrologer.position('sun', new Date(req.body.time))
      }     
    }
  });
})

module.exports = router;