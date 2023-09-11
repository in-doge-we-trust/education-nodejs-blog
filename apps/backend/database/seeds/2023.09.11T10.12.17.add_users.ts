import type { Seed } from '../seeder';

export const up: Seed = async ({ context }) => {
  await context.getQueryInterface().bulkInsert('users', [
    { nickname: 'bulat_m', email: 'bulat_m@gmail.com' },
    { nickname: 'alina_a', email: 'alina_a@gmail.com' },
    { nickname: 'eldar_m', email: 'eldar_m@gmail.com' },
  ]);
};

export const down: Seed = async ({ context }) => {
  await context.getQueryInterface().bulkDelete('users', {});
};
