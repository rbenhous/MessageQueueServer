import MessageQueueService from "../../domain/services/message-queue.service.js";
import logger from "../../common/logger/console-logger.js";

class MessageQueueController {
  async addMessageToQueue(req, res) {
    const {queue_name} = req?.params; // todo: add request validation
    const message = req?.body || "";

    logger.info(`MessageQueueController >> Adding message to queue [${queue_name}]`);
    const messageQueueService = new MessageQueueService();
    await messageQueueService.init();
    const result = await messageQueueService.addMessage(queue_name, message);

    if (result.success) {
      logger.info(`MessageQueueController >> success with msg [${result.message}]`);
    } else {
      logger.error(`MessageQueueController >> error with msg [${result.message}]`);
    }

    return result;
  }
  
  async getQueueMessagesWithTimeout(req) {
    const {queue_name} = req?.params; // todo: add request validation
    const {timeout} = req?.query; // todo: add request validation

    logger.info(`MessageQueueController >> Getting messages from queue [${queue_name}] with timeout [${timeout}]`);
    const messageQueueService = new MessageQueueService();
    await messageQueueService.init();
    const result = await messageQueueService.getMessage(queue_name, timeout)

    if (result.success) {
      logger.info(`MessageQueueController >> success with msg [${result.message}]`);
    } else {
      logger.error(`MessageQueueController >> error with msg [${result.error}]`);
    }
    
    return result;
  }
}

const messageQueueController = new MessageQueueController();
export default messageQueueController;