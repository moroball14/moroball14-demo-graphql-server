import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma.module';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { UsersResolver } from './users/users.resolver';
import { PostsResolver } from './posts/posts.resolver';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
  ],
  controllers: [],
  providers: [PostService, UserService, UsersResolver, PostsResolver],
})
export class AppModule {}
