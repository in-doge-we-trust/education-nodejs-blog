import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '../../database/sequelize';

export class AuthTokenModel extends Model<
  InferAttributes<AuthTokenModel>,
  InferCreationAttributes<AuthTokenModel>
> {
  declare id: CreationOptional<number>;
  declare token: string;
  declare validUntil: CreationOptional<Date>;
  declare userId: number;
}

AuthTokenModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'auth_tokens' },
);
