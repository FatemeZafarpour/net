const winston = require('winston')

class LoggerService {
  constructor() {
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: './combined.log'
        })
      ],
      format: winston.format.json(),
   });
   this.logger = logger
}

async info(message) {
  this.logger.log('info', message);
}
async info(message, obj) {
  this.logger.log('info', message, {
    obj
  })
}
async debug(message) {
  this.logger.log('debug', message);
}
async debug(message, obj) {
  this.logger.log('debug', message, {
    obj
  })
}
async error(message) {
  this.logger.log('error', message);
}
async error(message, obj) {
  this.logger.log('error', message, {
    obj
  })
}
}
module.exports = LoggerService