import { FastifyInstance } from 'fastify';

import { APP_JWT_ACCESS_COOKIE_NAME, APP_JWT_REFRESH_COOKIE_NAME } from '../../env';
import { UserCreateDTO } from '../dto/user-dto';
import { AuthTokenReadDto } from '../dto/auth-token-dto';
import { UserService } from '../service/user-service';
import { AuthTokenModel } from '../model/auth-token';

export async function authController(fastify: FastifyInstance) {
  fastify.addHook('onRequest', (_req, reply, done) => {
    const mandatoryEnvVariables = [
      APP_JWT_ACCESS_COOKIE_NAME,
      APP_JWT_REFRESH_COOKIE_NAME,
    ];

    if (mandatoryEnvVariables.some((envVar) => !envVar)) {
      reply
        .code(500)
        .send({ msg: 'Internal server error. Reason: invalid environment.' });
    } else {
      done();
    }
  });

  fastify.post<{
    Body: UserCreateDTO & { acceptTermsAndConditions: boolean };
    Reply: { success: true } | { msg: string };
  }>('/sign-up', async (_req, reply) => {
    // TODO

    reply.code(501).send({ msg: 'Not implemented' });
  });

  fastify.post<{
    Body: {
      email: string;
      password: string;
    };
    Reply: AuthTokenReadDto | { msg: string };
  }>('/sign-in', async (req, reply) => {
    const { email, password } = req.body;

    const user = await UserService.Admin__getByEmail(email);

    if (user && user.password === password) {
      const refreshTokenExpDate = new Date();
      refreshTokenExpDate.setDate(refreshTokenExpDate.getDate() + 7); // expire in 7 days
      const refreshToken = fastify.jwt.sign(
        {
          id: user.id,
        },
        { expiresIn: refreshTokenExpDate.toUTCString() },
      );

      try {
        // Put refresh token into the DB
        await AuthTokenModel.create({
          userId: user.id,
          token: refreshToken,
          validUntil: refreshTokenExpDate,
        });
      } catch (e) {
        console.error(e);
        return reply.code(500).send({ msg: 'Internal server error' });
      }

      const accessTokenExpDate = new Date();
      accessTokenExpDate.setMinutes(accessTokenExpDate.getMinutes() + 30); // expire in 30 minutes
      const accessToken = fastify.jwt.sign(
        {
          id: user.id,
        },
        { expiresIn: accessTokenExpDate.toUTCString() },
      );

      return reply
        .setCookie(APP_JWT_REFRESH_COOKIE_NAME!, refreshToken, {
          httpOnly: true,
          signed: true,
          expires: refreshTokenExpDate,
        })
        .setCookie(APP_JWT_ACCESS_COOKIE_NAME!, accessToken, {
          httpOnly: true,
          signed: true,
          expires: accessTokenExpDate,
        })
        .code(200)
        .send({ msg: 'Authenticated successfully' });
    }

    return reply.code(401).send({ msg: 'Incorrect email or password' });
  });

  fastify.post('/token-refresh', async (_req, reply) => {
    // TODO

    reply.code(501).send({ msg: 'Not implemented' });
  });

  fastify.get('/logout', async (req, reply) => {
    const accessToken = req.cookies[APP_JWT_ACCESS_COOKIE_NAME!];

    if (!accessToken) {
      return reply.code(401).send({ msg: 'Unauthorized. Reason: not logged in.' });
    }

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    return reply
      .setCookie(APP_JWT_ACCESS_COOKIE_NAME!, '', {
        httpOnly: true,
        signed: true,
        expires: pastDate,
      })
      .setCookie(APP_JWT_REFRESH_COOKIE_NAME!, '', {
        httpOnly: true,
        signed: true,
        expires: pastDate,
      })
      .code(200)
      .send({ msg: 'Logged out successfully' });
  });
}
