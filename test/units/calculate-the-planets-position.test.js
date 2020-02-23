const astrologer = require('astrologer');

describe('Calculate the planets position in a moment', () => {
  const moment = new Date('2020-02-23T01:17:13Z');
  it('get the sun position at 2020-02-23T01:17:13Z', async () => {
    const sun = await astrologer.position('sun', moment);

    expect(sun.position.dms.degrees).toBe(3);
    expect(sun.position.dms.sign).toBe(11);
    expect(sun.position.dms.minutes).toBe(52);
    expect(sun.position.dms.seconds).toBe(45);
  });

  it('get the uranus position at 2020-02-23T01:17:13Z', async () => {
    const uranus = await astrologer.position('uranus', moment);
    expect(uranus.position.dms.degrees).toBe(3);
    expect(uranus.position.dms.sign).toBe(1);
    expect(uranus.position.dms.minutes).toBe(25);
    expect(uranus.position.dms.seconds).toBe(50);
  });

  it('get the moon position at 2020-02-23T01:17:13Z', async () => {
    const moon = await astrologer.position('moon', moment);
    expect(moon.position.dms.degrees).toBe(27);
    expect(moon.position.dms.sign).toBe(10);
    expect(moon.position.dms.minutes).toBe(18);
    expect(moon.position.dms.seconds).toBe(51);
  });

  it('get the mercury position at 2020-02-23T01:17:13Z', async () => {
    const mercury = await astrologer.position('mercury', moment);
    expect(mercury.position.dms.degrees).toBe(9);
    expect(mercury.position.dms.sign).toBe(11);
    expect(mercury.position.dms.minutes).toBe(57);
    expect(mercury.position.dms.seconds).toBe(42);
  });
});