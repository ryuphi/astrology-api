const request = require('supertest')
const app = require('./../../app')

describe('Get placidus houses system cuspids for 1991-07-06T16:50:00-04:00', () => {
  let response;

  beforeEach(async () => {
    response = await request(app)
      .get('/horoscope')
      .query({
        time: '1991-07-06T16:50:00-04:00',
        latitude: "-33.41167",
        longitude: "-70.66647"
      })
      .send();
  })

  const expectCuspids = (cuspid, expectedSign, expectedDegrees, expectedMinutes, expectedSeconds) => {
    expect(cuspid.position.degrees).toBe(expectedDegrees)
    expect(cuspid.position.minutes).toBe(expectedMinutes)
    expect(cuspid.position.seconds).toBe(expectedSeconds)
    expect(cuspid.sign).toBe(expectedSign)
  }

  it('/horoscope return the ASC axis (cuspid of the house I)', () => {
    expectCuspids(
      response.body.data.axes.asc,
      10,
      2,
      32,
      30
    )
  });

  it('/horoscope return the DC axis (cuspid of the house VII)', async () => {
    expectCuspids(
      response.body.data.axes.dc,
      4,
      2,
      32,
      30
    )
  });

  it('/horoscope return the MC axis (cuspid of the house X)', async () => {
    expectCuspids(
      response.body.data.axes.mc,
      6,
      14,
      58,
      47
    )
  });

  it('/horoscope return the IC axis (cuspid of the house IV)', async () => {
    expectCuspids(
      response.body.data.axes.ic,
      12,
      14,
      58,
      47
    )
  });
})
