const request = require('supertest')
const app = require('./../../app')

describe('Get houses empty and axes as undefined when geolocation is not send', () => {
  let response

  beforeEach(async () => {
    response = await request(app)
      .get('/horoscope')
      .query({
        time: '1991-07-06T16:50:00-04:00',
      })
      .send()
  })

  it('/horoscope return the AC axis (cuspid of the house I) equal to undefined', () => {
    expect(response.body.data.axes.asc).toBeUndefined()
  })

  it('/horoscope return the DC axis (cuspid of the house VII) equal to undefined', () => {
    expect(response.body.data.axes.dc).toBeUndefined()
  })

  it('/horoscope return the IC axis (cuspid of the house IV) equal to undefined', () => {
    expect(response.body.data.axes.ic).toBeUndefined()
  })

  it('/horoscope return the MC axis (cuspid of the house X) equal to undefined', () => {
    expect(response.body.data.axes.mc).toBeUndefined()
  })

  it('/horoscope return the MC axis (cuspid of the house X) equal to undefined', () => {
    expect(response.body.data.axes.mc).toBeUndefined()
  })

  it('/horoscope return the houses elements empty', () => {
    expect(response.body.data.houses.length).toBe(0)
  })
}) 
