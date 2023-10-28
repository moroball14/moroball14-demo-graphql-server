import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/models/user.model';
import { PostService } from 'src/post.service';
import { UserService } from 'src/user.service';

const pubsub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Mutation((returns) => User)
  async createUser(@Args('email') email: string, @Args('name') name: string) {
    pubsub.publish('userAdded', { userAdded: { email, name } });
    return this.userService.createUser({
      email,
      name,
    });
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postService.findAllByAuthorId({ authorId: id });
  }

  @Subscription((returns) => User)
  userAdded() {
    return pubsub.asyncIterator('userAdded');
  }
}
