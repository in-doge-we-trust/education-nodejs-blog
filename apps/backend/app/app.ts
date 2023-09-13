import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

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

  /**
   * Fastify supports parsing both text/plain and application/json
   * request payloads natively. We want only application/json.
   */
  fastify.removeContentTypeParser('text/plain');

  // Set up CORS
  await fastify.register(fastifyCors, {
    origin: /^http:\/\/localhost/,
  });

  // Init plugins
  await fastify.register(sequelizePlugin);

  // Init controllers
  await fastify.register(userController, { prefix: '/users' });
  await fastify.register(postController, { prefix: '/posts' });

  return fastify;
}
