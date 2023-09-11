import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../../database/sequelize';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare nickname: string;
  declare email: string;
}

UserModel.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING(250),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(250),
      unique: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);