import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '../../database/sequelize';
import { PostModel } from './post-model';

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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      unique: true,
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
