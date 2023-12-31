import dotenv from 'dotenv';
import * as process from 'process';

const nodeEnv = process.env['NODE_ENV'];

if (nodeEnv === 'development') {
  dotenv.config({ path: '.env' });
} else if (nodeEnv === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  // Do nothing
}

export const APP_HOST = process.env['APP_HOST'] ?? 'localhost';
export const APP_LOGGING_PRETTY = nodeEnv !== 'production';

export const APP_JWT_SECRET = process.env['APP_JWT_SECRET'];
export const APP_JWT_ACCESS_COOKIE_NAME = process.env['APP_JWT_ACCESS_COOKIE_NAME'];
export const APP_JWT_REFRESH_COOKIE_NAME = process.env['APP_JWT_REFRESH_COOKIE_NAME'];

export const APP_COOKIE_SECRET = process.env['APP_COOKIE_SECRET'];

export const DB_NAME = process.env['DB_NAME'];
export const DB_PORT = parseInt(process.env['DB_PORT'] ?? '5432', 10);
export const DB_USER = process.env['DB_USER'];
export const DB_PASSWORD = process.env['DB_PASSWORD'];
