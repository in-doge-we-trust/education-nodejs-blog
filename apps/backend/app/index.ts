import fastify from 'fastify';

import { sequelize } from '../database/sequelize';

import { sequelizePlugin } from './plugin/sequelize-plugin';
import { userController } from './controller/user-controller';
import { postController } from './controller/post-controller';

const app = fastify({ logger: true });

async function run() {
  // Init plugins
  await app.register(sequelizePlugin);

  // Init controllers
  await app.register(userController, { prefix: '/users' });
  await app.register(postController, { prefix: '/posts' });

  // Test db connection
  await sequelize.authenticate();

  app.get('/', (_request, reply) => {
    reply.code(200).send({ msg: 'Hello!' });
  });

  await app.listen({ host: 'localhost', port: 8080 });
}

run().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
