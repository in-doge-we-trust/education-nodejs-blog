import { FastifyInstance } from 'fastify';

import { createApp } from '../../app/app';
import { UserModel } from '../../app/model/user-model';
import { UserCreateDTO, UserReadDTO } from '../../app/dto/user-dto';

const ROUTE_PATH_BASE = '/users';

describe('UserController', () => {
  let app: FastifyInstance;
  beforeEach(async () => {
    app = await createApp();
  });

  describe('GET /', () => {
    test('should reply with 200 code and send found users list', async () => {
      const users = await UserModel.bulkCreate([
        { nickname: 'test1', email: 'test1@gmail.com' },
        { nickname: 'test2', email: 'test2@gmail.com' },
      ]);
      const readResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}`,
        method: 'GET',
      });

      expect(readResponse.statusCode).toBe(200);
      expect(readResponse.json()).toEqual(users.map(UserReadDTO.from));
    });
  });

  describe('POST /', () => {
    test('should reply with 201 code and send create user', async () => {
      const createResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}`,
        method: 'POST',
        body: new UserCreateDTO('test1', 'test1@gmail.com'),
      });

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.json()).toEqual(
        new UserReadDTO(expect.anything(), 'test1', 'test1@gmail.com'),
      );
    });
  });

  describe('PATCH /:userId', () => {
    test('should reply with code 200 and send updated user info', async () => {
      const user = await UserModel.create({
        nickname: 'test1',
        email: 'test1@gmail.com',
      });
      const updateResponse = await app.inject({
        method: 'PATCH',
        path: `${ROUTE_PATH_BASE}/${user.id}`,
        body: {
          nickname: 'test2',
        },
      });

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.json()).toEqual(
        expect.objectContaining({
          nickname: 'test2',
          email: 'test1@gmail.com',
        }),
      );
    });

    test('when user is not found, should reply with code 404 and send an error message', async () => {
      const updateResponse = await app.inject({
        method: 'PATCH',
        path: `${ROUTE_PATH_BASE}/1`,
        body: {
          nickname: 'test2',
        },
      });

      expect(updateResponse.statusCode).toBe(404);
      // TODO: there should be a single error response format
      expect(updateResponse.json().msg).toBeTruthy();
    });
  });

  describe('DELETE :/userId', () => {
    test('should delete user from the database and reply with 200 code', async () => {
      const user = await UserModel.create({
        nickname: 'test1',
        email: 'test1@gmail.com',
      });
      const deleteResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}/${user.id}`,
        method: 'DELETE',
      });

      expect(deleteResponse.statusCode).toBe(200);
    });

    test('when users is not found, should reply with 404 code', async () => {
      const deleteResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}/1`,
        method: 'DELETE',
      });

      expect(deleteResponse.statusCode).toBe(404);
      expect(deleteResponse.json().msg).toBeTruthy();
    });
  });
});
