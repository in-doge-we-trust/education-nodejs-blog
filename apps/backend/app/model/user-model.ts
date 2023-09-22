import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../../database/sequelize';
import { PostModel } from './post-model';
import { AuthTokenModel } from './auth-token';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare nickname: string;
  declare email: string;
  declare password: string;
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);

UserModel.hasMany(PostModel, { foreignKey: 'authorId' });
PostModel.belongsTo(UserModel, { foreignKey: 'authorId' });

UserModel.hasOne(AuthTokenModel, { foreignKey: 'userId' });
AuthTokenModel.belongsTo(UserModel, { foreignKey: 'userId' });
