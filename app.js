const express = require('express');
const helmet = require('helmet');
const api = require('api');

const app = express();

app.use(helmet());

app.use(helmet.referrerPolicy())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));

app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    syncXhr: ["'none'"]
  }
}));

app.use(express.json());

app.use(api);

module.exports = app;
