import express from "express";
import bodyParser from "body-parser";
import basicRoutes from "./api/routes/basic.routes.js";
import messageQueueRoutes from "./api/routes/message-queue.routes.js";

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.init_middlewares();
    this.init_routes();
  }

  init_middlewares() {
    this.app.use(bodyParser.json());
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
}

const app = new App();
app.listen();
export default app;