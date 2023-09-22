import { UserModel } from '../model/user-model';

export class UserReadDTO {
  constructor(
    readonly id: UserModel['id'],
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
  ) {}

  static from(model: UserModel) {
    return new UserReadDTO(model.id, model.nickname, model.email);
  }
}

export class Admin__UserReadDTO {
  constructor(
    readonly id: UserModel['id'],
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
    readonly password: UserModel['password'],
  ) {}

  static from(model: UserModel) {
    return new Admin__UserReadDTO(model.id, model.nickname, model.email, model.password);
  }
}

export class UserCreateDTO {
  constructor(
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
    readonly password: UserModel['password'],
  ) {}

  static from(model: UserModel) {
    return new UserCreateDTO(model.nickname, model.email, model.password);
  }
}

export class UserUpdateDTO {
  constructor(readonly nickname: UserModel['nickname']) {}

  static from() {
    // TODO: implement this
    throw new Error('Not implemented!');
  }
}
