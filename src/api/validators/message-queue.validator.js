import Result from "../../domain/models/result.model.js";
import ValidatorResult from "./validator-result.model.js";

/**
 * Validates the input request.
 * Can be improved in the future by using a validator library like Joi or Ajv to define and verify request schema.
 */

const add_message_to_queue_validator = (queue_name, message) => {
  if (!message) {
    return ValidatorResult.NotValid(Result.createInvalidRequest("Message is required"));
  }
  if (!queue_name) {
    return ValidatorResult.NotValid(Result.createInvalidRequest("queue_name is required"));
  }
  return ValidatorResult.Valid();
}

const get_messages_from_queue_validator = (queue_name, timeout) => {
  if (!queue_name) {
    return ValidatorResult.NotValid(Result.createInvalidRequest("queue_name is required"));
  }
  return ValidatorResult.Valid();
}

export { add_message_to_queue_validator, get_messages_from_queue_validator };