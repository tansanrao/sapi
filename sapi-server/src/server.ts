import express from "express";
import morgan from "morgan";
import config from "./config/config";
import logger from "./utils/logger";
import { IndexRoutes } from "./routes/index";

class App {
  public app: express.Application;
  private indexRouter = new IndexRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.indexRouter.route(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }
}

const app = new App().app;

app.listen(config.port, () => {
  logger.info("server is listening on port " + config.port);
});
