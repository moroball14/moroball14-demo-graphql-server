import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/post.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postService: PostService) {}

  @Mutation((returns) => Post)
  async createDraft(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('authorId') authorId: number,
  ) {
    return this.postService.createPost({
      title,
      content,
      published: false,
      author: {
        connect: { id: authorId },
      },
    });
  }
}
