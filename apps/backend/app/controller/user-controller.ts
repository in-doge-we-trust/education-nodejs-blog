import { FastifyInstance } from 'fastify';

import { UserModel } from '../model/user-model';
import { UserReadDTO } from '../dto/user-dto';
import type { UserCreateDTO, UserUpdateDTO } from '../dto/user-dto';

export async function userController(fastify: FastifyInstance) {
  fastify.get<{ Reply: UserReadDTO[] }>('/', async (_req, reply) => {
    const users = await UserModel.findAll();

    reply.code(200).send(users.map(UserReadDTO.from));
  });

  fastify.post<{ Body: UserCreateDTO; Reply: UserReadDTO }>('/', async (req, reply) => {
    const newUser = await UserModel.create(req.body);

    reply.code(201).send(UserReadDTO.from(newUser));
  });

  interface PatchParams {
    userId: UserModel['id'];
  }
  fastify.patch<{ Params: PatchParams; Body: UserUpdateDTO }>(
    '/:userId',
    async (request, reply) => {
      const { userId } = request.params;
      const { nickname } = request.body;

      const userToUpdate = await UserModel.findByPk(userId);

      if (!userToUpdate) {
        return reply.code(404).send({ msg: `User with id=${userId} is not found!` });
      }

      const updated = await userToUpdate.update({
        nickname,
      });

      reply.code(200).send(UserReadDTO.from(updated));
    },
  );

  interface DeleteParams {
    userId: UserModel['id'];
  }
  fastify.delete<{ Params: DeleteParams }>('/:userId', async (req, reply) => {
    const { userId } = req.params;

    const userToDelete = await UserModel.findByPk(userId);

    if (!userToDelete) {
      return reply.code(404).send({ msg: `User with id=${userId} is not found!` });
    }

    await userToDelete.destroy();
    reply.code(200).send({ msg: 'User was deleted successfully!' });
  });
}
