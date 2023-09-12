import Fastify from 'fastify';

import { sequelizePlugin } from './plugin/sequelize-plugin';
import { userController } from './controller/user-controller';
import { postController } from './controller/post-controller';

export async function createApp() {
  const fastify = Fastify({ logger: true });

  // Init plugins
  await fastify.register(sequelizePlugin);

  // Init controllers
  await fastify.register(userController, { prefix: '/users' });
  await fastify.register(postController, { prefix: '/posts' });

  return fastify;
}
