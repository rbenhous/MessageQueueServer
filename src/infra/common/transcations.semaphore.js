import {Semaphore} from "async-mutex";

class TransactionsSemaphore {
  /**
   * This class is a singleton that provides a semaphore to control
   * atomic transactions in the repositories,
   * so we avoid race conditions and corrupted data.
   */
  constructor() {
    this.message_queues_semaphore = new Semaphore(1);
  }

  async acquire_message_queues() {
    return this.message_queues_semaphore.acquire();
  }

  async release_message_queues() {
    return this.message_queues_semaphore.release();
  }
}

const transactionsSemaphore = new TransactionsSemaphore();
export default transactionsSemaphore;