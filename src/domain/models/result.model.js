import HttpStatusCodes from "../../api/consts/http-statuses.js";

class Result {
    constructor() {
        this.success = false;
        this.data = null;
        this.status = null;
        this.error = null;
        this.message = null;
    }
    
  getData = () => this.success ? this.getSuccessData() : this.getErrorMessage();

  getSuccessData = () => this.data || this.message;

  getErrorMessage = () => this.error.message || this.message || this.error;
    
    static createSuccess(data = null, status = null) {
        const result = new Result();
        result.success = true;
        result.status = status || HttpStatusCodes.SUCCESS;
        result.data = data;
        return result;
    }
    
    static createUnderflowSuccess(queue_name) {
        const result = new Result();
        result.success = true;
        result.status = HttpStatusCodes.NO_CONTENT;
        result.message = `Queue [${queue_name}] underflow >> queue is empty`;
        return result;
    }

    static createOverflowError(queue_name) {
      const result = new Result();
      result.success = false;
      result.status = HttpStatusCodes.CONFLICT;
      result.error = `Queue [${queue_name}] overflow >> queue is full`;
      return result;
    }
    
    static createQueueNotFoundError(queue_name) {
        const result = new Result();
        result.success = false;
        result.status = HttpStatusCodes.NOT_FOUND;
        result.error = `Queue [${queue_name}] doesn't exist`;
        return result;
    }

  static createError(error, status = null) {
    const result = new Result();
    result.success = false;
    result.status = status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    result.error = error;
    return result;
  }

  static createInvalidRequest(error_message) {
    const result = new Result();
    result.success = false;
    result.status = HttpStatusCodes.BAD_REQUEST;
    result.error = error_message;
    return result;
  }
}

export default Result;