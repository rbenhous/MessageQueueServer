import MessageQueueService from "../../domain/services/message-queue.service.js";
import logger from "../../common/logger/console-logger.js";
import {
  add_message_to_queue_validator,
  get_messages_from_queue_validator
} from "../validators/message-queue.validator.js";

class MessageQueueController {
  async addMessageToQueue(req, res) {
    const {queue_name} = req?.params; 
    const message = req?.body || "";
    
    const validationResult = add_message_to_queue_validator(queue_name, message);
    if (!validationResult.isValid) {
      logger.error(`MessageQueueController >> Invalid request`);
      return validationResult.result;
    }

    logger.info(`MessageQueueController >> Adding message to queue [${queue_name}]`);
    const messageQueueService = new MessageQueueService();
    const result = await messageQueueService.addMessage(queue_name, message);

    if (result.success) {
      logger.info(`MessageQueueController >> success with msg [${result.message}]`);
    } else {
      logger.error(`MessageQueueController >> error with msg [${result.message}]`);
    }

    return result;
  }
  
  async getQueueMessagesWithTimeout(req) {
    const {queue_name} = req?.params; 
    const {timeout} = req?.query; 
    
    const validationResult = get_messages_from_queue_validator(queue_name, timeout);
    if (!validationResult.isValid) {
      logger.error(`MessageQueueController >> Invalid request`);
      return validationResult.result;
    }

    logger.info(`MessageQueueController >> Getting messages from queue [${queue_name}] with timeout [${timeout}]`);
    const messageQueueService = new MessageQueueService();
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