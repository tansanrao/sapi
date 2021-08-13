import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface IGateway {
  id: number;
  deviceId: string;
  phoneNumber: string;
  userId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IGatewayCreation extends Optional<IGateway, "id"> {}

export interface IGatewayInstance
  extends Model<IGateway, IGatewayCreation>,
    IGateway {}

export class Gateway extends Model<IGateway, IGatewayCreation> {
  public id!: number;
  public deviceId!: string;
  public phoneNumber!: string;
  public userId!: number;
  public status!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        deviceId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelize,
        name: {
          singular: "Gateway",
          plural: "Gateways",
        },
        indexes: [
          {
            fields: ["deviceId"],
            unique: true,
          },
          {
            fields: ["phoneNumber"],
            unique: true,
          },
        ],
      }
    );
  }
}
