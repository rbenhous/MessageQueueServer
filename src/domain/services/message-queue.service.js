import Result from "../models/result.model.js";
import MessageQueuesRepository from "../../infra/repositories/message-queues.repository.js";
import logger from "../../common/logger/console-logger.js";
import waitTimeout from "../../common/utils/wait-timeout.util.js";

const DEFAULT_TIMEOUT =  parseInt(process.env.DEFAULT_TIMEOUT) || 10;

class MessageQueueService {
  constructor() {
    this.message_queues_repository = MessageQueuesRepository.GetInstance();
  }

  async addMessage(queue_name, message) {
    try {
      await this.message_queues_repository.createQueueIfNotExists(queue_name);
      const queue = await this.message_queues_repository.getQueue(queue_name);
      
      if (!queue) {
        logger.error(`MessageQueueService >> queue not found [${queue_name}]`);
        return Result.createQueueNotFoundError(queue_name);
      }

      if (await queue.hasOverflow()) {
        logger.warning(`MessageQueueService >> queue overflow >> queue is full`);
        return Result.createOverflowError(queue_name);
      }

      await queue.enqueue(message);
      
      logger.info(`MessageQueueService >> Message added to queue [${queue_name}]`);
      return Result.createSuccess();
    } catch (error) {
      logger.error(`MessageQueueService >> error: ${error.message}`);
      return Result.createError(error);
    }
  }

  async getMessage(queue_name, timeout) {
    try {
      await waitTimeout(timeout || DEFAULT_TIMEOUT);
      const queue = await this.message_queues_repository.getQueue(queue_name);
      
      if (!queue) {
        logger.error(`MessageQueueService >> queue not found [${queue_name}]`);
        return Result.createQueueNotFoundError(queue_name);
      }

      if (await queue.hasUnderflow()) {
        logger.info(`MessageQueueService >> queue underflow >> queue is empty`);
        return Result.createUnderflowSuccess(queue_name);
      }

      const message = await queue.dequeue(timeout);
      
      logger.info(`MessageQueueService >> Message dequeued from queue [${queue_name}]`);
      return Result.createSuccess(message);
    } catch (error) {
      logger.error(`MessageQueueService >> error: ${error.message}`);
      return Result.createError(error);
    }
  }
}

export default MessageQueueService;