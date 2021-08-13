import logger from "../utils/logger";
import { Sequelize } from "sequelize";
import config from "../config/config";
import { User } from "./User";
import { Gateway } from "./Gateway";
import { Message } from "./Message";

const sequelize = new Sequelize(
  config.sql_db,
  config.sql_user,
  config.sql_pass,
  {
    host: config.sql_host,
    port: config.sql_port,
    dialect: "postgres",
  }
);

const ModelArray = [User, Gateway, Message];

ModelArray.forEach((model) => model.initialize(sequelize));

const sqlModels = {
  User,
  Gateway,
  Message,
};

sequelize
  .sync({ force: true })
  .then(() => {
    logger.info("sequelize:Database Sync Success");
  })
  .catch((err) => {
    logger.error("sequelize:Database Sync Failed");
    logger.error(err);
  });

export { sequelize as sqlDatabase, sqlModels };
