import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.createTable('users', {
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
  });
};

export const down: Migration = async ({ context }) => {
  await context.dropTable('users');
};
