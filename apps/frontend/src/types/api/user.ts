interface UserReadDTO {
  id: number;
  nickname: string;
  email: string;
}
export interface UsersReadResponse extends Array<UserReadDTO> {}
export interface UserReadResponse extends UserReadDTO {}
