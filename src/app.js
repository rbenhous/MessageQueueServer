import express from "express";
import bodyParser from "body-parser";
import basicRoutes from "./api/routes/basic.routes.js";
import messageQueueRoutes from "./api/routes/message-queue.routes.js";
import requestLoggerMiddleware from "./api/middlewares/requestLogger.middleware.js";
import errorMiddleware from "./api/middlewares/error.middleware.js";
import MessageQueuesRepository from "./infra/repositories/message-queues.repository.js";

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.init_middlewares();
    this.init_routes();
    this.init_repositories();
  }

  init_middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true })); //todo: check if this is needed
    this.app.use(requestLoggerMiddleware);
    this.app.use(errorMiddleware);
  }

  init_routes() {
    this.app.use('', basicRoutes)
    this.app.use('/api', messageQueueRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  init_repositories() {
    this.message_queues_repository = new MessageQueuesRepository();
  }
}

const app = new App();
app.listen();
export default app;