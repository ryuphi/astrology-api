# astrology-api

 ![Node.js CI](https://github.com/ryuphi/astrology-api/workflows/Node.js%20CI/badge.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/ryuphi/astrology-api/badge.svg)](https://coveralls.io/github/ryuphi/astrology-api) ![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/ryuphi/astrology-api?label=version)

## Getting started

### Prerequisites

* Nodejs >= 14 (also you can use docker)
* python (python is used for node-gyp to compile c++ swiss ephemeris library)

### Setup

0. You need to install dependencies of [node-gyp](https://github.com/nodejs/node-gyp) depending on your OS. Follow the instructions to install it depending on your OS [https://github.com/nodejs/node-gyp#installation](https://github.com/nodejs/node-gyp#installation)


1. Clone the repo

    ```bash
    git clone git@github.com:ryuphi/astrology-api.git
    ```

2. Install dependencies

    ##### without Docker

    ```bash
    npm install
    ```

    ```bash
    npm start
    ```

    *Also you can use `npm run dev`, this option run with nodemon to watch changes.*

### Usage

Example: Get the horoscope for date `1993-08-06`, time `16:50:00` with timezone `-04:00` at Santiago, Chile (latitude `-33.41167` and longitude `-70.66647`) using Placidus houses system.

Fist, you need to transform the date & time to ISO8601, for this example `1993-08-06T16:50:00-04:00`.

Second, __you must escape the date and time when you make the request__.
This is because if the time zone is with a positive sign, for example +05:00,
when sending it through the request, the url will take the + sign as a space and not as the + sign.
For this example it would be `1993-08-06T16%3A50%3A00-04%3A00`. See issue [#10](https://github.com/ryuphi/astrology-api/issues/10)

If you don't want to escape the date and time, you can always send it to UTC 🙂

In UTC: `1993-08-06T20:50:00Z`

Then, you need to select the house system from the houses system table.. in this case for the placidus system you need to send the `P` value in the `houseSystem` query param.

For SideReal Year System You have to send `S`  for Tropical `T` in the `yearSystem` query param.
 
 also Send Ayanamsha value as per given below table suppose `"Lahiri"  SE_SIDM_LAHIRI` ayanamsha 
 you want to used the add `1` as `ayanamsa` query param.

Now you can send this...

##### Using cURL

```bash
# escaped
curl --request GET \
  --url 'http://localhost:3000/horoscope?time=1993-08-06T16%3A50%3A00-04%3A00&latitude=-33.41167&longitude=-70.66647&houseSystem=P&yearSystem=S&ayanamsa=1'
```

```bash
# in utc
curl --request GET \
  --url 'http://localhost:3000/horoscope?time=1993-08-06T20:50:00Z&latitude=-33.41167&longitude=-70.66647&houseSystem=P&yearSystem=S&ayanamsa=1'
```


### House system table

The values from each house system is extracted from sweph source code

| Code value | House system |
|--- | ---
| A | equal | 
| B | Alcabitius |
| C | Campanus |
| D | equal (MC) |
| E | equal |
| F | Carter poli-equ. |
| G | Gauquelin sectors |
| H | horizon/azimut |
| I | Sunshine |
| i | Sunshine/alt. |
| K | Koch |
| L | Pullen SD |
| M | Morinus |
| N | equal/1=Aries |
| O | Porphyry |
| Q | Pullen SR |
| R | Regiomontanus |
| S | Sripati |
| T | Polich/Page |
| U | Krusinski-Pisa-Goelzer |
| V | equal/Vehlow |
| W | equal/ whole sign |
| X | axial rotation system/Meridian houses |
| Y | APC houses |


### Ayanamsha Value table

The values from each Ayanamsha is extracted from sweph source code

| Ayanamsha Name       | Ayanamsha value    | Ayanamsha constant     |
|--------------------- | -----------------  |--------------------
|"Fagan/Bradley”,      |                 0  | SE_SIDM_FAGAN_BRADLEY  |
|"Lahiri”,             |                 1  | SE_SIDM_LAHIRI         |
|"De Luce”,            |                 2  | SE_SIDM_DELUCE         |
|"Raman”,              |                 3  | SE_SIDM_RAMAN          |
|"Usha/Shashi”,        |                 4  | SE_SIDM_USHASHASHI     |
|"Krishnamurti”,       |                 5  | SE_SIDM_KRISHNAMURTI
|"Djwhal Khul”,        |                 6  | SE_SIDM_DJWHAL_KHUL
|"Yukteshwar”,         |                 7   | SE_SIDM_YUKTESHWAR
"J.N. Bhasin”,         |                 8   | SE_SIDM_JN_BHASIN
"Babylonian/Kugler 1”,  |                9   | SE_SIDM_BABYL_KUGLER1
"Babylonian/Kugler 2”,  |                10  | SE_SIDM_BABYL_KUGLER2
"Babylonian/Kugler 3”,   |               11  | SE_SIDM_BABYL_KUGLER3
"Babylonian/Huber”,       |              12  | SE_SIDM_BABYL_HUBER
"Babylonian/Eta Piscium”,   |            13  | SE_SIDM_BABYL_ETPSC
"Babylonian/Aldebaran = 15 Tau”,  |      14  | SE_SIDM_ALDEBARAN_15TAU
"Hipparchos”,                 |          15  | SE_SIDM_HIPPARCHOS
"Sassanian”,                  |          16  | SE_SIDM_SASSANIAN
"Galact. Center = 0 Sag”,     |          17  | SE_SIDM_GALCENT_0SAG
"J2000”,                      |          18  | SE_SIDM_J2000
"J1900”,                      |          19  | SE_SIDM_J1900
"B1950”,                      |          20  | SE_SIDM_B1950
"Suryasiddhanta”,             |          21  | SE_SIDM_SURYASIDDHANTA
"Suryasiddhanta, mean Sun”,   |          22  | SE_SIDM_SURYASIDDHANTA_MSUN
"Aryabhata”,                  |          23  | SE_SIDM_ARYABHATA
"Aryabhata, mean Sun”,        |          24  | SE_SIDM_ARYABHATA_MSUN
"SS Revati”,                  |          25  | SE_SIDM_SS_REVATI
"SS Citra”,                   |          26  | SE_SIDM_SS_CITRA
"True Citra”,                 |          27  | SE_SIDM_TRUE_CITRA
"True Revati”,                |          28  | SE_SIDM_TRUE_REVATI
"True Pushya (PVRN Rao) ”,    |          29  | SE_SIDM_TRUE_PUSHYA
"Galactic Center (Gil Brand) ”, |        30  | SE_SIDM_GALCENT_RGBRAND
"Galactic Equator (IAU1958) ”,  |        31  | SE_SIDM_GALEQU_IAU1958
"Galactic Equator”,             |       32   | SE_SIDM_GALEQU_TRUE
"Galactic Equator mid-Mula”,    |        33  | SE_SIDM_GALEQU_MULA
"Skydram (Mardyks) ”,           |        34  | SE_SIDM_GALALIGN_MARDYKS
"True Mula (Chandra Hari) ”,    |        35  | SE_SIDM_TRUE_MULA
"Dhruva/Gal.Center/Mula (Wilhelm) ”, |   36  | SE_SIDM_GALCENT_MULA_WILHELM
"Aryabhata 522”,                     |   37  | SE_SIDM_ARYABHATA_522
"Babylonian/Britton”,                |   38  | SE_SIDM_BABYL_BRITTON
"\"Vedic\"/Sheoran                   |   39  | SE_SIDM_TRUE_SHEORAN
"Cochrane (Gal.Center = 0 Cap)"      |   40  | SE_SIDM_GALCENT_COCHRANE
"Galactic Equator (Fiorenza)",       |   41  | SE_SIDM_GALEQU_FIORENZA
"Vettius Valens",                    |   42  | SE_SIDM_VALENS_MOON
"Lahiri 1940",                       |   43  | SE_SIDM_LAHIRI_1940
"Lahiri VP285",                      |   44  | SE_SIDM_LAHIRI_VP285
"Krishnamurti-Senthilathiban",       |   45  | SE_SIDM_KRISHNAMURTI_VP291
"Lahiri ICRC",                       |   46  | SE_SIDM_LAHIRI_ICRC