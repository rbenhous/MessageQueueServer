import logger from "../../common/logger/console-logger.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  logger.error(`Stack trace: ${err.stack}`);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.sendStatus(status).json({
    error: {
      message,
      status,
    },
  });
};

export default errorMiddleware;