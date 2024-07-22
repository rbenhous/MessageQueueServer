import express from "express";
import messageQueueController from "../controllers/message-queue.controller.js";

const router = express.Router();

router.get('/:queue_name', async (req, res) => {
  const result = await messageQueueController.getQueueMessagesWithTimeout(req, res);
  return res.status(result.status).send(result.getData());
});

router.post('/:queue_name', async (req, res) => {
  const result = await messageQueueController.addMessageToQueue(req, res);
  return res.status(result.status).send(result.getData());
});

export default router;