const { PLANETS, position, planetsByType } = require("./astros");
const { houses } = require("./houses");
const { aspect, aspects } = require("./aspects");

const planets = (date) => {
  const astros = Object.keys(PLANETS)
    .reduce(
      (accumulator, name) => {
        const planetPosition = position(name, date);
        accumulator[name] = {
          name,
          ...planetPosition,
          type: planetsByType[name]
        };
        return accumulator;
      },
      {}
    );
  return astros;
};

module.exports = {
  houses,
  position,
  PLANETS,
  planets,
  aspect,
  aspects,
};
