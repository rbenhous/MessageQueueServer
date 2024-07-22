import logger from "../../common/logger/console-logger.js";
import Queue from "./queue.repository.js";
import semaphore_lock from "../../common/utils/semaphore-wrapper.util.js";
import {Semaphore} from "async-mutex";

class MessageQueuesRepository {
  constructor() {
    if (MessageQueuesRepository.instance) {
      throw new Error("MessageQueuesRepository is a singleton. Use MessageQueuesRepository.GetInstance() to get the instance.");
    }
    
    MessageQueuesRepository.instance = this;
    this.messageQueues = new Map();
    this.semaphore = new Semaphore(1);
  }
  
  static GetInstance() {
    return MessageQueuesRepository.instance;
  }

  async createQueueIfNotExists(queue_name) {
    await semaphore.acquire_message_queues();
    try {
      if (this.messageQueues.has(queue_name)) {
        return;
      }

      logger.info(`MessageQueuesRepository >> Adding queue [${queue_name}]`);
      this.messageQueues.set(queue_name, new Queue(queue_name));
    } finally {
      await semaphore.release_message_queues();
    }
  }

  async getQueue(queue_name) {
    await semaphore.acquire_message_queues();
    try {
      if (!this.messageQueues.has(queue_name)) {
        const error_msg = `Queue [${queue_name}] not found`;
        logger.error(`MessageQueuesRepository >> ${error_msg}`);
        return undefined;
      }

      logger.info(`MessageQueuesRepository >> Getting queue [${queue_name}]`);
      return this.messageQueues.get(queue_name);
    } finally {
      await semaphore.release_message_queues();
    }
  }
}

export default MessageQueuesRepository;