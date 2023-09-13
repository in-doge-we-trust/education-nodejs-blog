import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '../../database/sequelize';

export class PostModel extends Model<
  InferAttributes<PostModel>,
  InferCreationAttributes<PostModel>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare authorId: number;
  declare createdAt: CreationOptional<Date>;
}

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'posts' },
);
