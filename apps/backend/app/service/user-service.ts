import {
  Admin__UserReadDTO,
  UserCreateDTO,
  UserReadDTO,
  UserUpdateDTO,
} from '../dto/user-dto';
import { UserModel } from '../model/user-model';

export class UserService {
  static async getAll(): Promise<UserReadDTO[]> {
    const users = await UserModel.findAll();

    return users.map(UserReadDTO.from);
  }

  static async getById(id: UserModel['id']): Promise<UserReadDTO | null> {
    const user = await UserModel.findByPk(id);

    return user ? UserReadDTO.from(user) : null;
  }

  static async Admin__getByEmail(
    email: UserModel['email'],
  ): Promise<Admin__UserReadDTO | null> {
    const user = await UserModel.findOne({ where: { email } });

    return user ? Admin__UserReadDTO.from(user) : null;
  }

  static async create(data: UserCreateDTO): Promise<UserReadDTO> {
    const user = await UserModel.create(data);

    return UserReadDTO.from(user);
  }

  static async update(
    id: UserModel['id'],
    data: UserUpdateDTO,
  ): Promise<UserReadDTO | null> {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return null;
    }

    const updated = await user.update(data);
    return UserReadDTO.from(updated);
  }

  static async delete(id: UserModel['id']): Promise<boolean> {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return false;
    }

    await user.destroy();
    return true;
  }
}
