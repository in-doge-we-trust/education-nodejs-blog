interface PostReadDTO {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}
export interface PostsReadResponse extends Array<PostReadDTO> {}
export interface PostReadResponse extends PostReadDTO {}

interface PostCreateDTO {
  title: string;
  content: string;
}
export interface PostCreateRequest extends PostCreateDTO {}
export interface PostCreateResponse extends PostReadResponse {}
