class MessageQueueController {
  async getQueueMessagesWithTimeout(req, res) {
    const { queue_name } = req.params; // todo: add request validation
    const { timeout } = req.query; // todo: add request validation
    console.log(`MessageQueueController >> Getting messages from queue [${queue_name}] with timeout [${timeout}]`); // todo: change to logger
    
    res.sendStatus(200);
  }
  
  async addMessageToQueue(req, res) {
    const { queue_name } = req.params; // todo: add request validation
    console.log(`MessageQueueController >> Adding message to queue [${queue_name}]`); //todo: change to logger
    
    res.sendStatus(201);
  }
}

const messageQueueController = new MessageQueueController();
export default messageQueueController;