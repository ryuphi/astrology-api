const { PLANETS, position } = require("./astros");
const { houses } = require("./houses");
const { aspect } = require("./aspects");

const planets = (date) => {
  const astros = Object.keys(PLANETS)
    .reduce(
      (accumulator, name) => {
        const planetPosition = position(name, date);
        accumulator[name] = {
          name,
          ...planetPosition,
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
  aspect
};
