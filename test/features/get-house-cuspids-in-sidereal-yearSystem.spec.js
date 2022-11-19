const request = require('supertest')
const app = require('./../../app')

describe('Get SideReal Year system cuspids for 1989-03-25T14:15:00+0:30', () => {
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
    expectCuspids(response.body.data.axes.asc, 4, 8, 48, 7)
  })

  it('/horoscope return the DC axis (cuspid of the house VII)', () => {
    expectCuspids(response.body.data.axes.dc, 10, 8, 48, 7)
  })

  it('/horoscope return the MC axis (cuspid of the house X)', () => {
    expectCuspids(response.body.data.axes.mc, 1, 6, 18, 14)
  })

  it('/horoscope return the IC axis (cuspid of the house IV)', () => {
    expectCuspids(response.body.data.axes.ic, 7, 6, 18, 14)
  })

  it('/horoscope response has cuspid of house I', () => {
    expectCuspids(response.body.data.houses[0], 4, 8, 48, 7)
  })

  it('/horoscope response has cuspid of house II', () => {
    expectCuspids(response.body.data.houses[1], 5, 4, 47, 8)
  })

  it('/horoscope response has cuspid of house III', () => {
    expectCuspids(response.body.data.houses[2], 6, 4, 7, 52)
  })

  it('/horoscope response has cuspid of house IV', () => {
    expectCuspids(response.body.data.houses[3], 7, 6, 18, 14)
  })

  it('/horoscope response has cuspid of house V', () => {
    expectCuspids(response.body.data.houses[4], 8, 8, 42, 35)
  })

  it('/horoscope response has cuspid of house VI', () => {
    expectCuspids(response.body.data.houses[5], 9, 9, 29, 39)
  })

  it('/horoscope response has cuspid of house VII', () => {
    expectCuspids(response.body.data.houses[6], 10, 8, 48, 7)
  })

  it('/horoscope response has cuspid of house VIII', () => {
    expectCuspids(response.body.data.houses[7], 11, 4, 47, 8)
  })

  it('/horoscope response has cuspid of house IX', () => {
    expectCuspids(response.body.data.houses[8], 12, 4, 7, 52)
  })

  it('/horoscope response has cuspid of house X', () => {
    expectCuspids(response.body.data.houses[9], 1, 6, 18, 14)
  })

  it('/horoscope response has cuspid of house XI', () => {
    expectCuspids(response.body.data.houses[10], 2, 8, 42, 35)
  })

  it('/horoscope response has cuspid of house XII', () => {
    expectCuspids(response.body.data.houses[11], 3, 9, 29, 39)
  })
})
