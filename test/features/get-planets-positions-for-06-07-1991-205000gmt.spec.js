const request = require('supertest');
const app = require('./../../app');

describe('Get the planets position for 1991-07-06T16:50:00-04:00', () => {
  let response;

  beforeEach(async () => {
    response = await request(app)
      .get('/horoscope')
      .query({
        time: '1991-07-06T16:50:00-04:00',
        longitude: "33º24'42\"",
        latitude: "70º'39\"59"
      })
      .send();
  })

  const expectAstro = (astroName, sign, position) => {
    expect(response.body.data.astros[astroName]).not.toBeUndefined();
    expect(response.body.data.astros[astroName].position.degrees).toBe(position.degrees);
    expect(response.body.data.astros[astroName].position.minutes).toBe(position.minutes);
    expect(response.body.data.astros[astroName].position.seconds).toBe(position.seconds);
    expect(response.body.data.astros[astroName].sign).toBe(sign);
  }

  test('get the sun position', async () => {
    expectAstro('sun', 4, { degrees: 14, minutes: 16, seconds: 58 })
  });

  test('get the moon position', async () => {
    expectAstro('moon', 2, { degrees: 6, minutes: 18, seconds: 54 })
  });

  test('get the mercury position', async () => {
    expectAstro('mercury', 5, { degrees: 4, minutes: 28, seconds: 24 })
  });

  test('get the venus position', async () => {
    expectAstro('venus', 5, { degrees: 27, minutes: 7, seconds: 59 })
  });

  test('get the mars position', async () => {
    expectAstro('mars', 5, { degrees: 24, minutes: 42, seconds: 10 })
  });

  test('get the jupiter position', async () => {
    expectAstro('jupiter', 5, { degrees: 15, minutes: 32, seconds: 20 })
  });

  test('get the saturn position', async () => {
    expectAstro('saturn', 11, { degrees: 4, minutes: 57, seconds: 18 })
  });

  test('get the uranus position', async () => {
    expectAstro('uranus', 10, { degrees: 11, minutes: 43, seconds: 29 })
  });

  test('get the neptune position', async () => {
    expectAstro('neptune', 10, { degrees: 15, minutes: 24, seconds: 41 })
  });

  test('get the pluto position', async () => {
    expectAstro('pluto', 8, { degrees: 17, minutes: 41, seconds: 50 })
  });

  test('get the chiron position', async () => {
    expectAstro('chiron', 4, { degrees: 28, minutes: 18, seconds: 1 })
  });

  test('get the lilith position', async () => {
    expectAstro('lilith', 10, { degrees: 7, minutes: 58, seconds: 51 })
  });

  test('get the ceres position', async () => {
    expectAstro('ceres', 7, { degrees: 23, minutes: 37, seconds: 23 })
  });

  test('get the pallas position', async () => {
    expectAstro('pallas', 6, { degrees: 22, minutes: 0, seconds: 23 })
  });

  test('get the juno position', async () => {
    expectAstro('juno', 10, { degrees: 26, minutes: 16, seconds: 4 })
  });

  test('get the vesta position', async () => {
    expectAstro('vesta', 4, { degrees: 15, minutes: 47, seconds: 45 })
  });
});
