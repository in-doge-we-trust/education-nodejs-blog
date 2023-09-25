import { PostModel } from '../../app/model/post-model';
import { UserModel } from '../../app/model/user-model';
import { PostService } from '../../app/service/post-service';
import { PostReadDTO } from '../../app/dto/post-dto';

describe('PostService', () => {
  let user: UserModel;

  beforeEach(async () => {
    user = await UserModel.create({
      nickname: 'test',
      email: 'test@test.test',
      password: '12345678',
    });
  });

  describe('getAll', () => {
    test('should return all available posts', async () => {
      await PostModel.bulkCreate([
        {
          title: 'Post 1',
          content: 'Post 1 content',
          authorId: user.id,
        },
        {
          title: 'Post 2',
          content: 'Post 2 content',
          authorId: user.id,
        },
      ]);

      const posts = await PostService.getAll();

      expect(posts).toEqual([
        new PostReadDTO(
          expect.anything(),
          'Post 1',
          'Post 1 content',
          user.id,
          expect.anything(),
        ),
        new PostReadDTO(
          expect.anything(),
          'Post 2',
          'Post 2 content',
          user.id,
          expect.anything(),
        ),
      ]);
    });
  });

  describe('getById', () => {
    test('should return found post', async () => {
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

      const foundPost = await PostService.getById(post1.id);

      expect(foundPost).toEqual(
        new PostReadDTO(post1.id, 'Post 1', 'Post 1 content', user.id, expect.anything()),
      );
    });
  });

  describe('create', () => {
    // TODO: finish when authorId is no longer hardcoded
    test.todo('should create and return created post info');
  });

  describe('update', () => {
    test('should update and return updated post info', async () => {
      const post = await PostModel.create({
        title: 'Post 1',
        content: 'Post 1 content',
        authorId: user.id,
      });
      const result = await PostService.update(post.id, {
        title: 'Post 2',
        content: 'Post 2 content',
      });

      expect(result).toEqual<PostReadDTO>({
        id: post.id,
        title: 'Post 2',
        content: 'Post 2 content',
        authorId: user.id,
        createdAt: expect.anything(),
      });
    });

    test('when post is not found, should return `null`', async () => {
      const result = await PostService.update(1, {
        title: 'Post 2',
        content: 'Post 2 content',
      });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    test('should delete the post and return success indicator - `true`', async () => {
      const post = await PostModel.create({
        title: 'Post 1',
        content: 'Post 1 content',
        authorId: user.id,
      });

      const success = await PostService.delete(post.id);
      expect(success).toBe(true);
    });

    test('when post is not found, should fail to delete the post and return success indicator - `false`', async () => {
      const success = await PostService.delete(1);
      expect(success).toBe(false);
    });
  });
});
