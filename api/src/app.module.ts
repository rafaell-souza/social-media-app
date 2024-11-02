import { Module } from '@nestjs/common';
import { AuthModule } from './jobs/auth/auth.module';
import { UserModule } from './jobs/user/user.module';
import { ProfileModule } from './jobs/profile/profile.module';

@Module({
  imports: [AuthModule, UserModule, ProfileModule]
})
export class AppModule { }
