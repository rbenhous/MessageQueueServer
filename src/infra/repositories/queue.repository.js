import {Semaphore} from "async-mutex";
import semaphore_lock from "../../common/utils/semaphore-wrapper.util.js";

class Queue {
  constructor(queue_name, max_queue_size = null) {
    this.queue_name = queue_name;
    this.queue = [];
    this.MAX_QUEUE_SIZE = max_queue_size || parseInt(process.env.MAX_QUEUE_SIZE) || 10;
    this.semaphore = new Semaphore(1);
  }

  async enqueue(message) {
    return await semaphore_lock(this.semaphore, async () => this.queue.push(message));
  }

  async dequeue() {
    return await semaphore_lock(this.semaphore, async () => this.queue.shift());
  }

  async hasUnderflow() {
    return await semaphore_lock(this.semaphore, async () => this.queue.length === 0);
  }

  async hasOverflow() {
    return await semaphore_lock(this.semaphore, async () => this.queue.length === this.MAX_QUEUE_SIZE);
  }
}

export default Queue;