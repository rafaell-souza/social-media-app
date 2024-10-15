import { Module } from '@nestjs/common';
import { AuthModule } from './jobs/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
