import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

const logger = new Logger('UserService');

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<string> {
    const userRepo = await this.userRepository.save(user);
    return userRepo.id.toString();
  }
}
