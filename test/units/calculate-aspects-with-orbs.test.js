const astrologer = require('../../src/astrologer')

describe('Calculate aspects between two planets applying orbs...', () => {
  const first = {
    position: {
      longitude: 30
    }
  }

  const second = {
    position: {
      longitude: 34
    }
  }

  const orbs = {
    luminary: {
      0: 10,
      30: 3,
      60: 5,
      90: 6,
      120: 8,
      150: 5,
      180: 10
    },
    personal: {
      0: 7,
      30: 2,
      60: 4,
      90: 5,
      120: 6,
      150: 2,
      180: 7
    },
    social: {
      0: 6,
      30: 1.5,
      60: 3,
      90: 4,
      120: 5,
      150: 3,
      180: 6
    },
    transpersonal: {
      0: 5,
      30: 1,
      60: 2,
      90: 3,
      120: 4,
      150: 2,
      180: 5
    },
    others: {
      0: 5,
      30: 1,
      60: 2,
      90: 3,
      120: 4,
      150: 2,
      180: 5
    }
  }

  it('using orb you can get a conjunction', () => {
    first.type = 'luminary'
    second.type = 'luminary'

    const aspect = astrologer.aspect(
      first,
      second,
      orbs
    )

    expect(aspect.name).toBe('conjunction')
  })

  it('using defaults orbs', () => {
    first.type = 'luminary'
    second.type = 'luminary'

    const aspect = astrologer.aspect(
      first,
      second
    )

    expect(aspect.name).toBe('conjunction')
  })

  it("When by orbs, the second planet haven't aspect... then aspect is one direction...", () => {
    first.type = 'luminary'
    second.type = 'transpersonal'

    first.position.longitude = 30
    second.position.longitude = 34

    const aspect = astrologer.aspect(first, second, orbs)

    expect(aspect.direction).toBe('unidirectional')
    expect(aspect.second.exist).toBe(false)
  })
})
