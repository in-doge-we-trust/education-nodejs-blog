import { FastifyInstance } from 'fastify';

import { PostCreateDTO, PostReadDTO } from '../dto/post-dto';
import { PostService } from '../service/post-service';

export async function postController(fastify: FastifyInstance) {
  fastify.get<{ Reply: PostReadDTO[] }>('/', async (_req, reply) => {
    const posts = await PostService.getAll();

    reply.code(200).send(posts);
  });

  interface GetOneParams {
    postId: number;
  }
  fastify.get<{ Params: GetOneParams; Reply: PostReadDTO | { msg: string } }>(
    '/:postId',
    async (req, reply) => {
      const { postId } = req.params;
      const post = await PostService.getById(postId);

      if (!post) {
        return reply.code(404).send({ msg: `Post with id=${postId} was not found!` });
      }

      reply.code(200).send(post);
    },
  );

  fastify.post<{ Body: PostCreateDTO; Reply: PostReadDTO }>('/', async (req, reply) => {
    const post = await PostService.create(req.body);

    reply.code(201).send(post);
  });
}
