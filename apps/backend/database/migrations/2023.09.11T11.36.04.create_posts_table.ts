import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.createTable('posts', {
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
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
};

export const down: Migration = async ({ context }) => {
  await context.dropTable('posts');
};
