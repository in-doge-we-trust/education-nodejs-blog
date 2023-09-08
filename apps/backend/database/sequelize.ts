import { Sequelize } from 'sequelize';
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../env';

// TODO: properly handle the absence of DB info
export const sequelize = new Sequelize(DB_NAME ?? '', DB_USER ?? '', DB_PASSWORD, {
  dialect: 'postgres',
  port: DB_PORT,
});
