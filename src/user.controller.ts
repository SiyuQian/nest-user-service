import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './models/user.entity';
import { UserService } from './user.service';

const logger = new Logger('UserController');

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_by_token')
  accumulate(data: string): Record<string, unknown> {
    logger.log(data);
    return {
      user: 1 + data.length,
    };
  }

  @MessagePattern('create_user')
  createUser(user: User): any {
    try {
      const documentID = this.userService.create(user);
      return documentID;
    } catch (error) {
      logger.error(error.message);
      return error;
    }
  }
}
