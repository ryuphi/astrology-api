# astrology-api

 ![Node.js CI](https://github.com/ryuphi/astrology-api/workflows/Node.js%20CI/badge.svg?branch=master) [![Build Status](https://travis-ci.com/ryuphi/astrology-api.svg?branch=master)](https://travis-ci.com/ryuphi/astrology-api) [![Coverage Status](https://coveralls.io/repos/github/ryuphi/astrology-api/badge.svg)](https://coveralls.io/github/ryuphi/astrology-api) ![GitHub package.json version](https://img.shields.io/github/package-json/v/ryuphi/astrology-api?style=plastic)

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

### Usage

Example: Get the horoscope for `1993-08-06 16:50:00 -04:00` and latitude `-33.41167` and longitude `-70.66647`.

##### cURL

```bash
curl --request GET \
  --url 'http://localhost:3000/horoscope?time=1993-08-06T16%3A50%3A00-04%3A00&latitude=-33.41167&longitude=-70.66647'
```