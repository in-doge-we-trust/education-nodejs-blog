import { PostModel } from '../model/post-model';
import { PostCreateDTO, PostReadDTO, PostUpdateDTO } from '../dto/post-dto';

export class PostService {
  static async getAll(): Promise<PostReadDTO[]> {
    const posts = await PostModel.findAll();

    return posts.map(PostReadDTO.from);
  }

  static async getById(id: PostModel['id']): Promise<PostReadDTO | null> {
    const post = await PostModel.findByPk(id);

    if (!post) {
      return null;
    }

    return PostReadDTO.from(post);
  }

  static async create(data: PostCreateDTO): Promise<PostReadDTO> {
    // TODO: get rid of hard-coded `authorId`
    const post = await PostModel.create({ ...data, authorId: 8 });

    return PostReadDTO.from(post);
  }

  static async update(
    id: PostModel['id'],
    data: PostUpdateDTO,
  ): Promise<PostReadDTO | null> {
    const post = await PostModel.findByPk(id);
    if (!post) {
      return null;
    }

    const updatedPost = await post.update(data);

    return PostReadDTO.from(updatedPost);
  }

  static async delete(id: PostModel['id']): Promise<boolean> {
    const post = await PostModel.findByPk(id);

    if (!post) {
      return false;
    }

    await post.destroy();
    return true;
  }
}
