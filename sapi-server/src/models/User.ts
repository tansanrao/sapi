import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserCreation extends Optional<IUser, "id"> {}

export interface IUserInstance extends Model<IUser, IUserCreation>, IUser {}

export class User extends Model<IUser, IUserCreation> {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public phone?: string;
  public status!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize: sequelize,
        name: {
          singular: "User",
          plural: "Users",
        },
        indexes: [
          {
            fields: ["username"],
          },
          {
            fields: ["email"],
          },
        ],
      }
    );
  }
}
