import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

const logger = new Logger('UserController');

@Controller()
export class UserController {
  @MessagePattern('user_by_token')
  accumulate(data: string): Object {
    logger.log(data);
    return {
      user: 1 + data.length
    }
  }
}