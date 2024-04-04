const winston = require('winston');

// logger config
const loggerWinston = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs.log' })
  ]
});

// Middleware
const requestLogger = (req, res, next) => {
  loggerWinston.info(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  loggerWinston,
  requestLogger
};
