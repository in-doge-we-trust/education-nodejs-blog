import { FastifyInstance } from 'fastify';

import { createApp } from '../../app/app';
import { PostModel } from '../../app/model/post-model';
import { PostReadDTO } from '../../app/dto/post-dto';
import { UserModel } from '../../app/model/user-model';

const ROUTE_PATH_BASE = '/posts';

describe('PostController', () => {
  let app: FastifyInstance;
  let user: UserModel;

  beforeEach(async () => {
    app = await createApp();
    user = await UserModel.create({
      email: 'test@test.test',
      nickname: 'test',
    });
  });

  describe('GET /', () => {
    test('should reply with code 200 and send found posts', async () => {
      const posts = await PostModel.bulkCreate([
        { title: 'Post 1', content: 'Post 1 content', authorId: user.id },
        { title: 'Post 2', content: 'Post 2 content', authorId: user.id },
      ]);
      const readResponse = await app.inject({
        path: ROUTE_PATH_BASE,
        method: 'GET',
      });

      expect(readResponse.statusCode).toBe(200);
      expect(readResponse.json()).toEqual(posts.map(PostReadDTO.from));
    });
  });

  describe('GET /:postId', () => {
    test('should reply with code 200 and send found post', async () => {
      const post1 = await PostModel.create({
        title: 'Post 1',
        content: 'Post 1 content',
        authorId: user.id,
      });
      await PostModel.create({
        title: 'Post 2',
        content: 'Post 2 content',
        authorId: user.id,
      });

      const readResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}/${post1.id}`,
        method: 'GET',
      });

      expect(readResponse.statusCode).toBe(200);
      expect(readResponse.json()).toEqual(PostReadDTO.from(post1));
    });

    test('when post is not found, should reply with 404 code and send error msg', async () => {
      const readResponse = await app.inject({
        path: `${ROUTE_PATH_BASE}/1`,
        method: 'GET',
      });

      expect(readResponse.statusCode).toBe(404);
      expect(readResponse.json().msg).toBeTruthy();
    });
  });

  describe('POST /', () => {
    // TODO: finish this when authorId is no longer hardcoded
    test.todo('should create the post, reply with 201 code and send created post info');
  });
});
