import { PostModel } from '../model/post-model';

export class PostReadDTO {
  private constructor(
    readonly id: PostModel['id'],
    readonly title: PostModel['title'],
    readonly content: PostModel['content'],
    readonly authorId: PostModel['authorId'],
  ) {}

  static from(model: PostModel) {
    return new PostReadDTO(model.id, model.title, model.content, model.authorId);
  }
}

export class PostCreateDTO {
  private constructor(
    readonly title: PostModel['title'],
    readonly content: PostModel['content'],
  ) {}
}
