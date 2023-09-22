import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';
import { sequelize } from '../sequelize';

export const up: Migration = async ({ context }) => {
  await context.addColumn('auth_tokens', 'createdAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
  await context.addColumn('auth_tokens', 'updatedAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeColumn('auth_tokens', 'createdAt');
  await context.removeColumn('auth_tokens', 'updatedAt');
};
