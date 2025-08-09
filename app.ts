import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import api from './src/api'

const app = express()

app.set('trust proxy', 'loopback')

// cors
app.use(cors())

if (process.env.ENVIRONMENT !== 'test') {
  // logger
  app.use(
    morgan(
      '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
    )
  )
}

// helmet configurations
app.use(helmet())

app.use(helmet.referrerPolicy())

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  })
)

app.use(
  helmet.featurePolicy({
    features: {
      fullscreen: ["'self'"],
      vibrate: ["'none'"],
      syncXhr: ["'none'"]
    }
  })
)

app.use(express.json())

app.use(api)

export default app
// support CommonJS default import
module.exports = app
