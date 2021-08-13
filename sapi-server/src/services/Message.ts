import { sqlModels } from "../models";
import { Transaction, UpdateOptions } from "sequelize";
import logger from "../utils/logger";
import { IMessage } from "../models/Message";

/**
 * Response includes 1 additional field, resCode.
 *
 * resCode 0 if error, count of records if success
 */

export default class MessageService {
  /**
   *
   *
   */
  public static async getAll() {
    try {
      const result = await sqlModels.Message.findAll({});
      if (!result.length) {
        return { resCode: 0, result };
      } else {
        return { resCode: result.length, result };
      }
    } catch (e) {
      logger.error(e);
    }
  }

  /**
   *
   * @param id string
   */
  public static async getOne(id: IMessage["id"]) {
    try {
      const result = await sqlModels.Message.findByPk(id, {});

      if (!result) {
        return {
          resCode: 0,
          result,
        };
      } else {
        return { resCode: 1, result };
      }
    } catch (e) {
      logger.error(e);
    }
  }

  /**
   *
   * @param data Request
   * @param txn Transaction Sequelize
   */
  public static async create(data: IMessage, txn?: Transaction) {
    try {
      let config = {};
      if (txn) {
        config = { transaction: txn };
      }
      const result = await sqlModels.Message.create(data, config);

      if (!result) {
        return { resCode: 0, result };
      } else {
        return { resCode: 1, result };
      }
    } catch (e) {
      logger.error(e);
    }
  }

  /**
   *
   * @param id string
   * @param data IMessage Interface
   * @param txn Transaction Sequelize
   */
  public static async update(
    id: IMessage["id"],
    data: IMessage,
    txn?: Transaction
  ) {
    try {
      let config: UpdateOptions = {
        where: {
          id: id,
        },
      };
      if (txn) {
        config["transaction"] = txn;
      }
      const result = await sqlModels.Message.update(data, config);

      if (!result[0]) {
        return { resCode: 0, result: result[0] };
      } else {
        return { resCode: 1, result: result[0] };
      }
    } catch (e) {
      logger.error(e);
    }
  }

  /**
   *
   * @param id string
   * @param txn Transaction Sequelize
   */
  public static async delete(id: IMessage["id"], txn?: Transaction) {
    try {
      let config: UpdateOptions = {
        where: {
          id: id,
        },
      };
      if (txn) {
        config["transaction"] = txn;
      }
      const result = await sqlModels.Message.destroy(config);

      if (!result) {
        return { resCode: 0, result };
      } else {
        return { resCode: 1, result };
      }
    } catch (e) {
      logger.error(e);
    }
  }
}
