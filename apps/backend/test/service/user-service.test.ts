import { UserService } from '../../app/service/user-service';
import { UserCreateDTO, UserReadDTO, UserUpdateDTO } from '../../app/dto/user-dto';
import { UserModel } from '../../app/model/user-model';

describe('UserService', () => {
  describe('getAll', () => {
    test('should return all existing users', async () => {
      await UserModel.bulkCreate([
        { nickname: 'test1', email: 'test1@gmail.com' },
        { nickname: 'test2', email: 'test2@gmail.com' },
      ]);
      const result = await UserService.getAll();

      expect(result).toEqual([
        expect.objectContaining<UserReadDTO>({
          id: expect.anything(),
          nickname: 'test1',
          email: 'test1@gmail.com',
        }),
        expect.objectContaining<UserReadDTO>({
          id: expect.anything(),
          nickname: 'test2',
          email: 'test2@gmail.com',
        }),
      ]);
    });
  });

  describe('getById', () => {
    test('should return the user with specified id', async () => {
      const user = await UserModel.create({
        nickname: 'test1',
        email: 'test1@gmail.com',
      });
      const result = await UserService.getById(user.id);

      expect(result).toEqual(UserReadDTO.from(user));
    });
  });

  describe('create', () => {
    test('should create user and return it', async () => {
      const user = await UserService.create(
        new UserCreateDTO('test1', 'test1@gmail.com'),
      );

      const userFromDB = await UserModel.findByPk(user.id);
      expect(userFromDB).toEqual(
        expect.objectContaining({
          nickname: 'test1',
          email: 'test1@gmail.com',
        }),
      );
    });

    test('when user with such nickname exists, should throw an error', async () => {
      await UserService.create(new UserCreateDTO('test1', 'test1@gmail.com'));

      await expect(() =>
        UserService.create(new UserCreateDTO('test1', 'not_test@gmail.com')),
      ).rejects.toThrow();
    });

    test('when user with such email exists, should throw an error', async () => {
      await UserService.create(new UserCreateDTO('test1', 'test1@gmail.com'));

      await expect(() =>
        UserService.create(new UserCreateDTO('not_test', 'test1@gmail.com')),
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    test('should update user entry and return it', async () => {
      const user = await UserModel.create(new UserCreateDTO('test1', 'test1@gmail.com'));
      const updatedUser = await UserService.update(user.id, new UserUpdateDTO('test2'));

      expect(updatedUser).toEqual(
        new UserReadDTO(updatedUser!.id, 'test2', 'test1@gmail.com'),
      );
    });

    test('when user is not found, should fail and return null', async () => {
      const updatedUser = await UserService.update(1, new UserUpdateDTO('test2'));

      expect(updatedUser).toBeNull();
    });

    test('when user with such nickname already exists, should throw an error', async () => {
      await UserModel.create({ nickname: 'test1', email: 'test1@gmail.com' });
      const user = await UserModel.create({
        nickname: 'test2',
        email: 'test2@gmail.com',
      });

      await expect(() =>
        UserService.update(user.id, new UserUpdateDTO('test1')),
      ).rejects.toThrow();
    });
  });
});
