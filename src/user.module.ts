import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { userProviders } from './providers/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
