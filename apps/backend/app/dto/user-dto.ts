import { UserModel } from '../model/user-model';

export class UserReadDTO {
  private constructor(
    readonly id: UserModel['id'],
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
  ) {}

  static from(model: UserModel) {
    return new UserReadDTO(model.id, model.nickname, model.email);
  }
}

export class UserCreateDTO {
  private constructor(
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
  ) {}

  static from() {
    // TODO: implement this
    throw new Error('Not implemented!');
  }
}

export class UserUpdateDTO {
  private constructor(readonly nickname: UserModel['nickname']) {}

  static from() {
    // TODO: implement this
    throw new Error('Not implemented!');
  }
}
