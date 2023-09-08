export const migrationTemplate = `import { DataTypes } from 'sequelize';

import type { Migration } from '../migrator';

export const up: Migration = async ({ context }) => {
  // Do your stuff
};

export const down: Migration = async ({ context }) => {
  // Do your stuff
};
`;
