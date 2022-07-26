/* eslint-disable no-console */
const http = require('http')
const app = require('./app')

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const numericPort = parseInt(val, 10)

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(numericPort)) {
    // named pipe
    return val
  }

  if (numericPort >= 0) {
    // port number
    return numericPort
  }

  return false
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
