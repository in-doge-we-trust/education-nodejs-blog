import fastify from 'fastify';

import { APP_HOST, APP_PORT } from '@env';

async function run() {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname',
        },
      },
    },
  });

  app.get('/', (_, reply) => {
    reply.code(200).send({ msg: 'Hello, traveler!' });
  });

  app.listen(
    {
      host: APP_HOST,
      port: APP_PORT,
    },
    (err) => {
      if (err) {
        app.log.fatal(err);
        process.exit(1);
      }
    },
  );

  return app;
}

run().then((app) => {
  app.log.info('App is up and running');
});
