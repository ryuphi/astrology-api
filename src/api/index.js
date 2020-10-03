const Router = require("express-promise-router");
const astrologer = require("../astrologer");

const router = new Router();

router.get("/", async (req, res) => res.status(200).json({ message: "Welcome to Astrology api!" }));

router.get("/horoscope", async (req, res) => {
  const date = new Date(req.query.time);
  const { latitude, longitude } = req.query;

  const planets = Object.keys(astrologer.PLANETS).reduce(
    (accumulator, name) => {
      const position = astrologer.position(name, date);
      accumulator[name] = {
        name,
        ...position,
      };
      return accumulator;
    },
    {}
  );

  const houses = astrologer.houses(date, {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  });

  res.status(200).json({
    data: {
      astros: {
        ...planets,
      },
      ...houses,
    },
  });
});

module.exports = router;
