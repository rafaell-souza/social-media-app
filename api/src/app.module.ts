import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './jobs/auth/auth.module';
import { UserModule } from './jobs/user/user.module';
import { ProfileModule } from './jobs/profile/profile.module';
import { PostModule } from './jobs/post/post.module';
import { AccessMiddleware } from './middlewares/accessMiddleware';
import { UserRepository } from './repositories/UserRepository';
import { TokenRepository } from './repositories/TokenRepository';
import { HelperModule } from './helpers/helper.module';
import { CommentModule } from './jobs/comment/comment.module';
import { InteractionModule } from './jobs/interaction/interaction.module';

@Module({
  imports: [
    AuthModule, UserModule,
    ProfileModule, PostModule,
    HelperModule, CommentModule,
    InteractionModule
  ],
  providers: [UserRepository, TokenRepository]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessMiddleware)
      .exclude(
        { path: "auth/register", method: RequestMethod.POST },
        { path: "auth/authentication", method: RequestMethod.POST },
        { path: "auth/google", method: RequestMethod.GET },
        { path: "auth/google/callback", method: RequestMethod.GET },
        { path: "auth/send_confirmation/:email/:template", method: RequestMethod.GET },
        { path: "post/all", method: RequestMethod.GET },
        { path: "profile/:id?", method: RequestMethod.GET },
      )
      .forRoutes("*")
  }
}