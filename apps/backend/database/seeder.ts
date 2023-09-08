import path from 'node:path';
import { SequelizeStorage, Umzug } from 'umzug';

import { sequelize } from './sequelize';
import { seedTemplate } from './seed-template';

export const seeder = new Umzug({
  context: sequelize,
  logger: console,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  create: {
    folder: path.join(__dirname, 'seeds'),
    template: (filepath) => [[filepath, seedTemplate]],
  },
  migrations: {
    glob: ['seeds/*.ts', { cwd: __dirname }],
  },
});

export type Seed = typeof seeder._types.migration;

if (require.main === module) {
  seeder.runAsCLI();
}
