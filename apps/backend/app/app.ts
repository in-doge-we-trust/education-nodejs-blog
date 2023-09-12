import Fastify from 'fastify';

import { sequelizePlugin } from './plugin/sequelize-plugin';
import { userController } from './controller/user-controller';
import { postController } from './controller/post-controller';
import { APP_LOGGING_PRETTY } from '../env';

export async function createApp() {
  const fastify = Fastify({
    logger: APP_LOGGING_PRETTY
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              ignore: 'pid,hostname',
            },
          },
        }
      : true,
  });

  // Init plugins
  await fastify.register(sequelizePlugin);

  // Init controllers
  await fastify.register(userController, { prefix: '/users' });
  await fastify.register(postController, { prefix: '/posts' });

  return fastify;
}
