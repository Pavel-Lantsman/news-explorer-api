const winston = require('winston');
const expressWinston = require('express-winston');
const config = require('../common/config');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: config.logs.requestFilename }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: config.logs.errorFilename }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
