const { degreesToDms } = require('./../../src/astrologer/utils')

describe('Transform longitude degrees to dms', () => {
  it("transform 270 to 270º0'0\"", () => {
    const result = degreesToDms(270)
    expect(result.degrees).toBe(0)
    expect(result.longitude).toBe(270)
    expect(result.minutes).toBe(0)
    expect(result.seconds).toBe(0)
  })
})
