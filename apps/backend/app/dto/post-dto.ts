import { PostModel } from '../model/post-model';

export class PostReadDTO {
  constructor(
    readonly id: PostModel['id'],
    readonly title: PostModel['title'],
    readonly content: PostModel['content'],
    readonly authorId: PostModel['authorId'],
    readonly createdAt: string, // from PostModel['createdAt']
  ) {}

  static from(model: PostModel) {
    return new PostReadDTO(
      model.id,
      model.title,
      model.content,
      model.authorId,
      model.createdAt.toISOString(),
    );
  }
}

export class PostCreateDTO {
  constructor(
    readonly title: PostModel['title'],
    readonly content: PostModel['content'],
  ) {}
}

export class PostUpdateDTO {
  constructor(
    readonly title: PostModel['title'],
    readonly content: PostModel['content'],
  ) {}
}
