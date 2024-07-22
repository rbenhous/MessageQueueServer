class LoggerInterface {
  info(message) {
    throw new Error('Method "info()" must be implemented.');
  }

  warning(message) {
    throw new Error('Method "warning()" must be implemented.');
  }

  error(message) {
    throw new Error('Method "error()" must be implemented.');
  }
}

export default LoggerInterface;