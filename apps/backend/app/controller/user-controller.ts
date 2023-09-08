import { FastifyInstance } from 'fastify';

import { UserModel } from '../model/user-model';
import type { UserReadDto, UserCreateDto, UserUpdateDto } from '../dto/user-dto';

export async function userController(fastify: FastifyInstance) {
  fastify.get<{ Reply: UserReadDto[] }>('/', async (_req, reply) => {
    const users = await UserModel.findAll();

    reply.code(200).send(
      users.map((userInstance) => ({
        id: userInstance.getDataValue('id'),
        nickname: userInstance.getDataValue('nickname'),
        email: userInstance.getDataValue('email'),
      })),
    );
  });

  fastify.post<{ Body: UserCreateDto; Reply: UserReadDto }>('/', async (req, reply) => {
    const newUser = await UserModel.create(req.body);

    reply.code(201).send({
      id: newUser.getDataValue('id'),
      nickname: newUser.getDataValue('nickname'),
      email: newUser.getDataValue('email'),
    });
  });

  fastify.patch<{ Params: { userId: string }; Body: UserUpdateDto }>(
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

      reply.code(200).send(updated);
    },
  );

  fastify.delete<{ Params: { userId: number } }>('/:userId', async (req, reply) => {
    const { userId } = req.params;

    const userToDelete = await UserModel.findByPk(userId);

    if (!userToDelete) {
      return reply.code(404).send({ msg: `User with id=${userId} is not found!` });
    }

    await userToDelete.destroy();
    reply.code(200).send({ msg: 'User was deleted successfully!' });
  });
}
