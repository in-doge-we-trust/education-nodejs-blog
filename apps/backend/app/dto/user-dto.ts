import { UserModel } from '../model/user-model';

export class UserReadDTO {
  constructor(
    readonly id: UserModel['id'],
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
  ) {}
}

export class UserCreateDTO {
  constructor(
    readonly nickname: UserModel['nickname'],
    readonly email: UserModel['email'],
  ) {}
}

export class UserUpdateDTO {
  constructor(readonly nickname: UserModel['nickname']) {}
}
