import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { APP_COOKIE_SECRET, APP_JWT_SECRET, APP_LOGGING_PRETTY } from '../env';

import { sequelizePlugin } from './plugin/sequelize-plugin';
import { userController } from './controller/user-controller';
import { postController } from './controller/post-controller';
import fastifyCookie from '@fastify/cookie';

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

  // Set up JWT
  if (!APP_JWT_SECRET) {
    throw new Error('JWT secret is not provided!');
  }
  await fastify.register(fastifyJwt, {
    secret: APP_JWT_SECRET,
  });

  // Set up cookies
  if (!APP_COOKIE_SECRET) {
    throw new Error('Cookie signing secret is not provided!');
  }
  await fastify.register(fastifyCookie, {
    secret: APP_COOKIE_SECRET,
  });

  // Init plugins
  await fastify.register(sequelizePlugin);

  // Init controllers
  await fastify.register(userController, { prefix: '/users' });
  await fastify.register(postController, { prefix: '/posts' });

  return fastify;
}
