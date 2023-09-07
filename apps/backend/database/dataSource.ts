import { Sequelize } from 'sequelize';

import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '@env';

export class DataSource {
  private static instance: Sequelize;

  static init() {
    if (!this.instance) {
      this.instance = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
      });
    }

    this.initModels();
  }

  static destroy() {
    return this.instance.close();
  }

  static initModels() {
    // Initialize models there
  }

  static getInstance(): Sequelize {
    if (!this.instance) {
      throw new Error('Data source instance is not initialized!');
    }

    return this.instance;
  }
}
