import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { sequelize } from '../../database/sequelize';

declare module 'fastify' {
  interface FastifyInstance {
    sequelize: typeof sequelize;
  }
}

export const sequelizePlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.decorate('sequelize', sequelize);

  fastify.addHook('onClose', async (app) => {
    await app.sequelize.close();
  });
});
