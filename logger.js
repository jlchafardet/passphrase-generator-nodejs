// logger.js
// Import the winston logging library
const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  // Set the logging level to info
  level: 'info',
  // Set the logging format to combine timestamp and JSON
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  // Set the logging transport to a file
  transports: [
    new winston.transports.File({ filename: 'logs.log', maxsize: 1000000, maxFiles: 10 }),
  ],
});

// Export the logger instance
module.exports = logger;