import { FastifyInstance } from 'fastify';

import { APP_JWT_ACCESS_COOKIE_NAME, APP_JWT_REFRESH_COOKIE_NAME } from '../../env';
import { UserCreateDTO } from '../dto/user-dto';
import { AuthTokenReadDto } from '../dto/auth-token-dto';
import { UserService } from '../service/user-service';
import { AuthTokenModel } from '../model/auth-token';

export async function authController(fastify: FastifyInstance) {
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
    if (!APP_JWT_ACCESS_COOKIE_NAME || !APP_JWT_REFRESH_COOKIE_NAME) {
      return reply.code(500).send({ msg: 'Internal server error' });
    }

    const { email, password } = req.body;

    const user = await UserService.Admin__getByEmail(email);

    if (user && user.password === password) {
      const currentDate = new Date();

      const accessTokenExpDate = new Date(currentDate.valueOf());
      accessTokenExpDate.setMinutes(accessTokenExpDate.getMinutes() + 30); // expire in 30 minutes
      const accessToken = fastify.jwt.sign(
        {
          id: user.id,
        },
        { expiresIn: accessTokenExpDate.toUTCString() },
      );

      const refreshTokenExpDate = new Date(currentDate.valueOf());
      refreshTokenExpDate.setDate(refreshTokenExpDate.getDate() + 7); // expire in 7 days
      const refreshToken = fastify.jwt.sign(
        {
          id: user.id,
        },
        { expiresIn: refreshTokenExpDate.toUTCString() },
      );

      // Put refresh token into the DB
      await AuthTokenModel.create({
        userId: user.id,
        token: refreshToken,
        validUntil: refreshTokenExpDate,
      });

      return reply
        .setCookie(APP_JWT_ACCESS_COOKIE_NAME, accessToken, {
          httpOnly: true,
          signed: true,
        })
        .setCookie(APP_JWT_REFRESH_COOKIE_NAME, refreshToken, {
          httpOnly: true,
          signed: true,
        })
        .code(200)
        .send({ msg: 'Authenticated successfully' });
    }

    return reply.code(401).send({ msg: 'Incorrect email or password' });
  });

  fastify.get('/token-validate', async (_req, reply) => {
    // TODO

    reply.code(501).send({ msg: 'Not implemented' });
  });

  fastify.post('/token-refresh', async (_req, reply) => {
    // TODO

    reply.code(501).send({ msg: 'Not implemented' });
  });

  fastify.get('/logout', async (_req, reply) => {
    // TODO

    reply.code(501).send({ msg: 'Not implemented' });
  });
}
