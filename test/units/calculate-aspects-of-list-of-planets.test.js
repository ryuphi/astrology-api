const astrologer = require('./../../src/astrologer')

describe('calculate aspects of planets list', () => {
  const planetList = {
    sun: {
      name: 'sun',
      type: 'luminary',
      position: {
        longitude: 30
      }
    },
    pluto: {
      name: 'pluto',
      type: 'transpersonal',
      position: {
        longitude: 30
      }
    }
  }

  test('calculate aspects using astrologer.aspects', () => {
    const aspects = astrologer.aspects(planetList)
    expect(aspects.sun.length).toBe(1)
    expect(aspects.sun[0].name).toBe('conjunction')
  })
})
