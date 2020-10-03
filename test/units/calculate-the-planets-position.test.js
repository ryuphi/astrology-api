const astrologer = require("./../../src/astrologer");

describe("Calculate the planets position in a moment", () => {
  const moment = new Date("2020-02-23T01:17:13-03:00");
  it("get the sun position at 2020-02-23T01:17:13Z", async () => {
    const sun = await astrologer.position("sun", moment);

    expect(sun.position.degrees).toBe(4);
    expect(sun.sign).toBe(12);
    expect(sun.position.minutes).toBe(0);
    expect(sun.position.seconds).toBe(19);
  });

  it("get the uranus position at 2020-02-23T01:17:13-03:00", async () => {
    const uranus = await astrologer.position("uranus", moment);
    expect(uranus.position.degrees).toBe(3);
    expect(uranus.sign).toBe(2);
    expect(uranus.position.minutes).toBe(26);
    expect(uranus.position.seconds).toBe(6);
  });

  it("get the moon position at 2020-02-23T01:17:13-03:00", async () => {
    const moon = await astrologer.position("moon", moment);
    expect(moon.position.degrees).toBe(28);
    expect(moon.sign).toBe(11);
    expect(moon.position.minutes).toBe(49);
    expect(moon.position.seconds).toBe(32);
  });

  it("get the mercury position at 2020-02-23T01:17:13-03:00", async () => {
    const mercury = await astrologer.position("mercury", moment);
    expect(mercury.position.degrees).toBe(9);
    expect(mercury.sign).toBe(12);
    expect(mercury.position.minutes).toBe(50);
    expect(mercury.position.seconds).toBe(56);
  });
});
