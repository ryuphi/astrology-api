const request = require('supertest');
const fs = require('fs');
const app = require('./../../app');

const ephemeris20200223011713 = JSON.parse(
  fs.readFileSync(`${__dirname}/../fixtures/20200223011713.json`)
);

describe('get the planets positions (ephemeris) from time', () => {
  it('the response should to have the astros sections', async () => {
    const response = await request(app)
      .post('/ephemeris')
      .send({
        time: '2020-02-23T01:17:13Z'
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('astros');
  });

  it('the response astros section should to have the astro position', async () => {
    const response = await request(app)
      .post('/ephemeris')
      .send({
        time: '2020-02-23T01:17:13Z'
      });

    expect(response.status).toBe(200);

    Object.keys(ephemeris20200223011713.astros).forEach((astroName) => {
      expect(response.body.data.astros).toHaveProperty(astroName);
      expect(response.body.data.astros[astroName].position.longitude).toBe(
        ephemeris20200223011713.astros[astroName].position.longitude
      );
      expect(response.body.data.astros[astroName].position.dms.degrees).toBe(
        ephemeris20200223011713.astros[astroName].position.dms.degrees
      );
      expect(response.body.data.astros[astroName].position.dms.sign).toBe(
        ephemeris20200223011713.astros[astroName].position.dms.sign
      );
      expect(response.body.data.astros[astroName].position.dms.minutes).toBe(
        ephemeris20200223011713.astros[astroName].position.dms.minutes
      );
      expect(response.body.data.astros[astroName].position.dms.seconds).toBe(
        ephemeris20200223011713.astros[astroName].position.dms.seconds
      );
    });
  });
});
