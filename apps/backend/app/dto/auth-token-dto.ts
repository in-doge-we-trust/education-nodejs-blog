import { AuthTokenModel } from '../model/auth-token';

export class AuthTokenReadDto {
  constructor(
    readonly id: AuthTokenModel['id'],
    readonly token: AuthTokenModel['token'],
    readonly validUntil: string, // from AuthTokenModel['validUntil']
  ) {}

  static from(model: AuthTokenModel): AuthTokenReadDto {
    return new AuthTokenReadDto(model.id, model.token, model.validUntil.toISOString());
  }
}
