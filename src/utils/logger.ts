import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
    new transports.File({ filename: 'combined.log' }) // Log everything else to combined.log
  ]
})

// If not in production mode, log to console with following format
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if(process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }))
}

export default logger;