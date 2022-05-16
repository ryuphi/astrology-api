const { PLANETS, position, planets } = require('./astros')
const { houses } = require('./houses')
const { aspect, aspects } = require('./aspects')
const charts = require('./charts')

module.exports = {
  houses,
  position,
  PLANETS,
  planets,
  aspect,
  aspects,
  ...charts
}
