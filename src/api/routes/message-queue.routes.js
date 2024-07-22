import express from "express";
import messageQueueController from "../controllers/message-queue.controller.js";

const router = express.Router();

router.get('/:queue_name', messageQueueController.getQueueMessagesWithTimeout);

router.post('/:queue_name', messageQueueController.addMessageToQueue);

export default router;