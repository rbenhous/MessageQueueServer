import {Semaphore} from "async-mutex";

class Queue {
  constructor(queue_name, max_queue_size = null) {
    this.queue_name = queue_name;
    this.queue = [];
    this.MAX_QUEUE_SIZE = max_queue_size || process.env.MAX_QUEUE_SIZE || 10;
    this.semaphore = new Semaphore(1);
  }

  async enqueue(message) {
    await this.semaphore.acquire();
    try {
      this.queue.push(message);
    } finally {
      await this.semaphore.release();
    }
  }

  async dequeue() {
    await this.semaphore.acquire();
    try {
      return this.queue.shift();
    } finally {
      await this.semaphore.release();
    }
  }

  async hasUnderflow() {
    await this.semaphore.acquire();
    try {
      return this.queue.length === 0;
    } finally {
      await this.semaphore.release();
    }
  }

  async hasOverflow() {
    await this.semaphore.acquire();
    try {
      return this.queue.length === this.MAX_QUEUE_SIZE;
    } finally {
      await this.semaphore.release();
    }
  }
}

export default Queue;