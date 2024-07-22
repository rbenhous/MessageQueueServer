import Logger from "js-logger";
import LoggerInterface from "./logger.interface.js";


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
export default logger;