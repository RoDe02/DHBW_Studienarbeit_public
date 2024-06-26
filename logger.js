// Import necessary modules from Winston for logging and path for file paths.
import { createLogger, format, transports } from 'winston';
import { join } from 'path';
import config from './config.js';

/**
 * Custom log format function.
 * Formats log messages to include timestamp, log level, message, and answer.
 * 
 * @param {Object} logInfo - Destructured log information including level, message, answer, and timestamp.
 * @returns {string} - Formatted log string.
 */
const customFormat = format.printf(({ level, message, answer, timestamp }) => {
  // Return the formatted string with provided log details.
  return `${timestamp} [${level}]: message: ${message}, answer: ${answer}`;
});

// Configure the logger instance with desired options.
const logger = createLogger({
  level: 'info', // Default log level.
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss' // Custom timestamp format.
    }),
    customFormat, // Apply the custom format defined above.
    format.json() // Include JSON formatting in the log output.
  ),
  transports: [   
    new transports.File({ filename: join('logs', 'ai_communication' + '.log') })
  ]
});

export default logger;