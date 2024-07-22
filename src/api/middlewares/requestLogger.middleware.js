const requestLoggerMiddleware = (req, res, next) => {
  const { method, url, headers, body } = req;
  console.log(`${method} request for url: [${url}]`); // todo: change to logger
  next();
}

export default requestLoggerMiddleware;