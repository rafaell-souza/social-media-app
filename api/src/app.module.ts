import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Authmiddleware } from './middlewares/auth-middleware';
import { HelperModule } from './helpers/helper.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { AuthModule } from './jobs/auth/auth.module';
import { UserModule } from './jobs/user/user.module';
import { ProfileModule } from './jobs/profile/profile.module';
import { PostModule } from './jobs/post/post.module';
import { FollowerModule } from './jobs/follower/follower.module';
import { CommentModule } from './jobs/comment/comment.module';

@Module({
  imports: [
    HelperModule, PrismaModule,
    RepositoriesModule, AuthModule, UserModule,
    ProfileModule, PostModule, FollowerModule,
    CommentModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authmiddleware)
      .exclude(
        { path: "auth/local/signup", method: RequestMethod.POST },
        { path: "auth/local/signin", method: RequestMethod.POST },
        { path: "auth/google", method: RequestMethod.GET },
        { path: "auth/google/callback", method: RequestMethod.GET },
        { path: "auth/refresh", method: RequestMethod.POST },
        { path: "auth/verification/:template", method: RequestMethod.GET },
        { path: "auth/verify", method: RequestMethod.PUT },
        { path: "auth/password-reset", method: RequestMethod.PUT },

        { path: "post/all", method: RequestMethod.GET },
        { path: "post/:id?", method: RequestMethod.GET },

        { path: "profile/:id?", method: RequestMethod.GET },
      )
      .forRoutes("*")
  }
}