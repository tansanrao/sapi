import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface IMessage {
  id: number;
  userId: number;
  gatewayId?: number;
  from: string;
  body: string;
  to: string;
  numSegments: number;
  direction: string;
  statusCode?: number;
  statusMessage?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  sentAt?: Date;
}

interface IMessageCreation extends Optional<IMessage, "id"> {}

export interface IMessageInstance
  extends Model<IMessage, IMessageCreation>,
    IMessage {}

export class Message extends Model<IMessage, IMessageCreation> {
  public id!: number;
  public userId!: number;
  public gatewayId?: number;
  public from!: string;
  public body!: string;
  public to!: string;
  public numSegments!: number;
  public direction!: string;
  public statusCode?: number;
  public statusMessage?: string;
  public status!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        gatewayId: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        from: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        body: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        to: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        numSegments: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        direction: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        statusCode: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        statusMessage: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sentAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize: sequelize,
        name: {
          singular: "Message",
          plural: "Messages",
        },
        indexes: [
          {
            fields: ["userId", "gatewayId", "from", "to", "status"],
          },
        ],
      }
    );
  }
}
