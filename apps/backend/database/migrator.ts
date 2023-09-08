import path from 'node:path';
import { SequelizeStorage, Umzug } from 'umzug';

import { sequelize } from './sequelize';
import { migrationTemplate } from './migration-template';

export const migrator = new Umzug({
  context: sequelize.getQueryInterface(),
  logger: console,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migrator_meta',
  }),
  create: {
    folder: path.join(__dirname, 'migrations'),
    template: (filepath) => [[filepath, migrationTemplate]],
  },
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
});

export type Migration = typeof migrator._types.migration;

if (require.main === module) {
  migrator.runAsCLI();
}
