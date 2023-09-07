import dotenv from 'dotenv';

dotenv.config();

export const APP_HOST = process.env['APP_HOST'] ?? 'localhost';
export const APP_PORT = process.env['APP_PORT'] ? Number(process.env['PORT']) : 8080;

export const DB_HOST = process.env['DB_HOST'] ?? 'localhost';
export const DB_PORT = process.env['DB_PORT'] ? Number(process.env['DB_PORT']) : 5432;
export const DB_NAME = process.env['DB_NAME'] ?? '';
export const DB_USER = process.env['DB_USER'] ?? '';
export const DB_PASSWORD = process.env['DB_PASSWORD'] ?? '';
