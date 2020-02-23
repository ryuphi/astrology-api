const request = require('supertest');
const app = require('./../../app');

describe('get the planets positions from time', () => {
  
  const moment = new Date('2020-02-23T01:17:13Z');
  
  it('get the sun position', async () => {

    const response = await request(app)
      .post('/natal')
      .send({
        time: '2020-02-23T01:17:13Z'
      });

    expect(response.status).toBe(200);

    expect(response.body.data.planets.sun.position.dms.degrees).toBe(3);
    expect(response.body.data.planets.sun.position.dms.sign).toBe(11);
    expect(response.body.data.planets.sun.position.dms.minutes).toBe(52);
    expect(response.body.data.planets.sun.position.dms.seconds).toBe(45);
  })
});