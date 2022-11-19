const request = require('supertest')
const app = require('../../app')

describe('Get the planets position for 1989-03-25T14:15:00+05:30', () => {
  let response

  beforeEach(async () => {
    response = await request(app)
      .get('/horoscope')
      .query({
        time: '1989-03-25T14:15:00+05:30',
        latitude: '18.5529',
        longitude: '73.8797',
        yearSystem: 'S',
      })
      .send()
  })

  const expectAstro = (astroName, sign, position) => {
    expect(response.body.data.astros[astroName]).not.toBeUndefined()
    expect(response.body.data.astros[astroName].position.degrees).toBe(
      position.degrees
    )
    expect(response.body.data.astros[astroName].position.minutes).toBe(
      position.minutes
    )
    expect(response.body.data.astros[astroName].position.seconds).toBe(
      position.seconds
    )
    expect(response.body.data.astros[astroName].sign).toBe(sign)
  }

  test('get the sun position', async () => {
    expectAstro('sun', 12, { degrees: 10, minutes: 58, seconds: 18 })
  })

  test('get the moon position', async () => {
    expectAstro('moon', 7, { degrees: 13, minutes: 2, seconds: 43 })
  })

  test('get the mercury position', async () => {
    expectAstro('mercury', 12, { degrees: 1, minutes: 4, seconds: 51 })
  })

  test('get the venus position', async () => {
    expectAstro('venus', 12, { degrees: 8, minutes: 16, seconds: 17 })
  })

  test('get the mars position', async () => {
    expectAstro('mars', 2, { degrees: 14, minutes: 50, seconds: 15 })
  })

  test('get the jupiter position', async () => {
    expectAstro('jupiter', 2, { degrees: 8, minutes: 34, seconds: 0 })
  })

  test('get the saturn position', async () => {
    expectAstro('saturn', 9, { degrees: 19, minutes: 33, seconds: 12 })
  })

  test('get the uranus position', async () => {
    expectAstro('uranus', 9, { degrees: 11, minutes: 31, seconds: 40 })
  })

  test('get the neptune position', async () => {
    expectAstro('neptune', 9, { degrees: 18, minutes: 34, seconds: 8 })
  })

  test('get the pluto position', async () => {
    expectAstro('pluto', 7, { degrees: 21, minutes: 5, seconds: 53 })
  })

  test('get the chiron position', async () => {
    expectAstro('chiron', 3, { degrees: 7, minutes: 50, seconds: 6 })
  })

  test('get the lilith position', async () => {
    expectAstro('lilith', 6, { degrees: 11, minutes: 16, seconds: 0 })
  })

  test('get the ceres position', async () => {
    expectAstro('ceres', 1, { degrees: 0, minutes: 37, seconds: 50 })
  })

  test('get the pallas position', async () => {
    expectAstro('pallas', 11, { degrees: 22, minutes: 40, seconds: 19 })
  })

  test('get the juno position', async () => {
    expectAstro('juno', 5, { degrees: 2, minutes: 21, seconds: 34 })
  })

  test('get the vesta position', async () => {
    expectAstro('vesta', 9, { degrees: 8, minutes: 23, seconds: 16 })
  })
})
