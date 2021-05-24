# astrology-api

 ![Node.js CI](https://github.com/ryuphi/astrology-api/workflows/Node.js%20CI/badge.svg?branch=master) [![Build Status](https://travis-ci.com/ryuphi/astrology-api.svg?branch=master)](https://travis-ci.com/ryuphi/astrology-api) [![Coverage Status](https://coveralls.io/repos/github/ryuphi/astrology-api/badge.svg)](https://coveralls.io/github/ryuphi/astrology-api) ![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/ryuphi/astrology-api?label=version)

<!-- Una api rest astrologica 🤷‍♂️ utilizando [swisseph](https://github.com/mivion/swisseph), un package que hace un binding entre nodejs y [Swiss ephemeris](https://www.astro.com/swisseph/swephinfo_e.htm). -->

## Getting started

### Prerequisites

* Nodejs or docker

### Setup

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

    ##### with Docker (only install)

    ```bash
    docker-compose run api npm install
    ```

    ##### with Docker (install & running)

    ```bash
    docker-compose up -d
    ```
   Running with docker use traefik as a proxy then you may use `http://api.localhost` instead of `http://localhost:3000`

### Usage

Example: Get the horoscope for date `1993-08-06`, time `16:50:00` and timezone `-04:00` at Santiago, Chile (latitude `-33.41167` and longitude `-70.66647`).

Fist, you need to transform the date & time to ISO8601, for this example `1993-08-06T16:50:00-04:00`.

Second, __you must escape the date and time when you make the request__.
This is because if the time zone is with a positive sign, for example +05:00,
when sending it through the request, the url will take the + sign as a space and not as the + sign.
For this example it would be `1993-08-06T16%3A50%3A00-04%3A00`. See issue [#10](https://github.com/ryuphi/astrology-api/issues/10)

If you don't want to escape the date and time, you can always send it to UTC 🙂

In UTC: `1993-08-06T20:50:00Z`

Now you can send this...

##### Using cURL

```bash
# escaped
curl --request GET \
  --url 'http://localhost:3000/horoscope?time=1993-08-06T16%3A50%3A00-04%3A00&latitude=-33.41167&longitude=-70.66647'
```

```bash
# in utc
curl --request GET \
  --url 'http://localhost:3000/horoscope?time=1993-08-06T20:50:00Z&latitude=-33.41167&longitude=-70.66647'
```
