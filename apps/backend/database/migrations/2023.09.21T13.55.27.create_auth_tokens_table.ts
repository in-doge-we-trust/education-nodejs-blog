import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.createTable('auth_tokens', {
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
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
};

export const down: Migration = async ({ context }) => {
  await context.dropTable('auth_tokens');
};
