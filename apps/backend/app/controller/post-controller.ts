import { FastifyInstance } from 'fastify';
import { PostModel } from '../model/post-model';
import { PostCreateDTO, PostReadDTO } from '../dto/post-dto';

export async function postController(fastify: FastifyInstance) {
  fastify.get('/', async (_req, reply) => {
    const posts = await PostModel.findAll();

    reply.code(200).send(posts.map(PostReadDTO.from));
  });

  interface PostGetOneParams {
    postId: number;
  }
  fastify.get<{ Params: PostGetOneParams }>('/:postId', async (req, reply) => {
    const { postId } = req.params;
    const post = await PostModel.findByPk(postId);

    if (!post) {
      return reply.code(404).send({ msg: `Post with id=${postId} was not found!` });
    }

    reply.code(200).send(PostReadDTO.from(post));
  });

  fastify.post<{ Body: PostCreateDTO; Reply: PostReadDTO }>('/', async (req, reply) => {
    const newPost = await PostModel.create({ ...req.body, authorId: 8 });

    reply.code(201).send(PostReadDTO.from(newPost));
  });
}
