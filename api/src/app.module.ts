import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserRepository } from './repositories/user';
import { TokenRepository } from './repositories/token';
import { Authmiddleware } from './middlewares/auth-middleware';
import { HelperModule } from './helpers/helper.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    HelperModule, PrismaModule,
    RepositoriesModule
  ],
  providers: [UserRepository, TokenRepository]
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