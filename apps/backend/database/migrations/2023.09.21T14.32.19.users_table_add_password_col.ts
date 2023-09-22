import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  await context.addColumn('users', 'password', {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeColumn('users', 'password');
};
