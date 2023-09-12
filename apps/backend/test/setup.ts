import { sequelize } from '../database/sequelize';

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});
