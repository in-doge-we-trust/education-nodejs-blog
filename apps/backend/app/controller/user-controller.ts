import { FastifyInstance } from 'fastify';

import { UserModel } from '../model/user-model';
import type { UserReadDTO, UserCreateDTO, UserUpdateDTO } from '../dto/user-dto';
import { UserService } from '../service/user-service';

export async function userController(fastify: FastifyInstance) {
  fastify.get<{ Reply: UserReadDTO[] }>('/', async (_req, reply) => {
    const users = await UserService.getAll();

    reply.code(200).send(users);
  });

  interface GetOneParams {
    userId: number;
  }
  fastify.get<{ Params: GetOneParams }>('/:userId', async (req, reply) => {
    const { userId } = req.params;
    const user = await UserService.getById(userId);

    if (user) {
      return reply.code(200).send(user);
    }

    return reply.code(404).send({ msg: `User with id=${userId} was not found!` });
  });

  fastify.post<{ Body: UserCreateDTO; Reply: UserReadDTO }>('/', async (req, reply) => {
    const newUser = await UserService.create(req.body);

    reply.code(201).send(newUser);
  });

  interface PatchParams {
    userId: UserModel['id'];
  }
  fastify.patch<{ Params: PatchParams; Body: UserUpdateDTO }>(
    '/:userId',
    async (request, reply) => {
      const { userId } = request.params;

      const updatedUser = await UserService.update(userId, request.body);
      if (updatedUser) {
        return reply.code(200).send(updatedUser);
      }

      return reply.code(404).send({ msg: `User with id=${userId} was not found!` });
    },
  );

  interface DeleteParams {
    userId: UserModel['id'];
  }
  fastify.delete<{ Params: DeleteParams }>('/:userId', async (req, reply) => {
    const { userId } = req.params;

    const success = await UserService.delete(userId);

    if (success) {
      return reply.code(200).send({ msg: 'User was deleted successfully!' });
    }

    return reply.code(404).send({ msg: `User with id=${userId} was not found!` });
  });
}
