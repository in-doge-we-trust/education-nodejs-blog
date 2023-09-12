import { sequelize } from '../database/sequelize';

import { createApp } from './app';

async function run() {
  const app = await createApp();

  // Test db connection
  await sequelize.authenticate();

  app.get('/', (_request, reply) => {
    reply.code(200).send({ msg: 'Hello!' });
  });

  await app.listen({ host: 'localhost', port: 8080 });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
