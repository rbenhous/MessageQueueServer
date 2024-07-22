const LoggerInterface = require("./logger.interface.js");
const Logger = require("js-logger");

Logger.useDefaults();

class LoggerConsole extends LoggerInterface {
  info(message) {
    Logger.info(message);
  }

  warning(message) {
    Logger.warn(message);
  }

  error(message) {
    Logger.error(message);
  }
}

const logger = new LoggerConsole();
module.exports = logger;
