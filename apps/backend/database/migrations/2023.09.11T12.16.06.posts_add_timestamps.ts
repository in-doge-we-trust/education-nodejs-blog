import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';
import { sequelize } from '../sequelize';

export const up: Migration = async ({ context }) => {
  await context.addColumn('posts', 'createdAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
  await context.addColumn('posts', 'updatedAt', {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  });
};

export const down: Migration = async ({ context }) => {
  await context.removeColumn('posts', 'createdAt');
  await context.removeColumn('posts', 'updatedAt');
};
