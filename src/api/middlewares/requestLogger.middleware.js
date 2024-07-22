import logger from "../../common/logger/console-logger.js";

const requestLoggerMiddleware = (req, res, next) => {
  const { method, url, headers, body } = req;
  logger.info(`${method} request for url: [${url}]`);
  next();
}

export default requestLoggerMiddleware;