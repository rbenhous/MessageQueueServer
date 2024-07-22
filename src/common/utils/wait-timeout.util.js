const waitTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default waitTimeout;