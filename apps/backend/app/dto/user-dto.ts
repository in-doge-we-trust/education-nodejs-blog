export interface UserReadDto {
  id: number;
  nickname: string;
  email: string;
}

export interface UserCreateDto {
  nickname: string;
  email: string;
}

export interface UserUpdateDto {
  nickname: string;
}
