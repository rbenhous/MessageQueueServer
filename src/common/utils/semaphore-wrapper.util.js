const semaphore_lock = async (semaphore, callback) => {
  /**
   * This wrapper function is used to lock the semaphore before executing the callback function.
   * and after it is done, it releases the semaphore.
   */
  await semaphore.acquire();
  try {
    return callback();
  } finally {
    await semaphore.release();
  }
}

export default semaphore_lock;