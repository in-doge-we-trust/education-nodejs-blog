import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';
import { sequelize } from '../sequelize';

export const up: Migration = async ({ context }) => {
  await context.addColumn('users', 'createdAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
  await context.addColumn('users', 'updatedAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeColumn('users', 'createdAt');
  await context.removeColumn('users', 'updatedAt');
};
