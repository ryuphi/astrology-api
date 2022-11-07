const request = require('supertest')
const app = require('./../../app')

describe('Get Koch houses system cuspids for 1991-07-06T16:50:00-04:00', () => {
  let response

  beforeEach(async () => {
    response = await request(app)
      .get('/horoscope')
      .query({
        time: '1991-07-06T16:50:00-04:00',
        latitude: '-33.41167',
        longitude: '-70.66647',
        houseSystem: 'K', // Koch system... 
        
      })
      .send()
  })

  const expectCuspids = (
    cuspid,
    expectedSign,
    expectedDegrees,
    expectedMinutes,
    expectedSeconds
  ) => {
    expect(cuspid.position.degrees).toBe(expectedDegrees)
    expect(cuspid.position.minutes).toBe(expectedMinutes)
    expect(cuspid.position.seconds).toBe(expectedSeconds)
    expect(cuspid.position.longitude).not.toBeNull()
    expect(cuspid.position.longitude).not.toBeUndefined()
    expect(cuspid.sign).toBe(expectedSign)
  }

  it('/horoscope return the ASC axis (cuspid of the house I)', () => {
    expectCuspids(response.body.data.axes.asc, 10, 2, 32, 26)
  })

  it('/horoscope return the DC axis (cuspid of the house VII)', () => {
    expectCuspids(response.body.data.axes.dc, 4, 2, 32, 26)
  })

  it('/horoscope return the MC axis (cuspid of the house X)', () => {
    expectCuspids(response.body.data.axes.mc, 6, 14, 58, 42)
  })

  it('/horoscope return the IC axis (cuspid of the house IV)', () => {
    expectCuspids(response.body.data.axes.ic, 12, 14, 58, 42)
  })

  it('/horoscope response has cuspid of house I', () => {
    expectCuspids(response.body.data.houses[0], 10, 2, 32, 26)
  })

  it('/horoscope response has cuspid of house II', () => {
    expectCuspids(response.body.data.houses[1], 10, 27, 14, 48)
  })

  it('/horoscope response has cuspid of house III', () => {
    expectCuspids(response.body.data.houses[2], 11, 20, 59, 20)
  })

  it('/horoscope response has cuspid of house IV', () => {
    expectCuspids(response.body.data.houses[3], 12, 14, 58, 42)
  })

  it('/horoscope response has cuspid of house V', () => {
    expectCuspids(response.body.data.houses[4], 1, 27, 58, 29)
  })

  it('/horoscope response has cuspid of house VI', () => {
    expectCuspids(response.body.data.houses[5], 3, 4, 6, 36)
  })

  it('/horoscope response has cuspid of house VII', () => {
    expectCuspids(response.body.data.houses[6], 4, 2, 32, 26)
  })

  it('/horoscope response has cuspid of house VIII', () => {
    expectCuspids(response.body.data.houses[7], 4, 27, 14, 48)
  })

  it('/horoscope response has cuspid of house IX', () => {
    expectCuspids(response.body.data.houses[8], 5, 20, 59, 20)
  })

  it('/horoscope response has cuspid of house X', () => {
    expectCuspids(response.body.data.houses[9], 6, 14, 58, 42)
  })

  it('/horoscope response has cuspid of house XI', () => {
    expectCuspids(response.body.data.houses[10], 7, 27, 58, 29)
  })

  it('/horoscope response has cuspid of house XII', () => {
    expectCuspids(response.body.data.houses[11], 9, 4, 6, 36)
  })
})
