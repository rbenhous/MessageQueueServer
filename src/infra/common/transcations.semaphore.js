import {Semaphore} from "async-mutex";

class TransactionsSemaphore {
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