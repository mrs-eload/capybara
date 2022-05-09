import { Injectable } from '@nestjs/common';
import { InsertUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../infrastructure/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async insert(user: InsertUserDTO): Promise<User> {
    const userEntity: User = User.create(user);
    await User.save(userEntity);
    return userEntity;
  }

  async getByEmail(user: any): Promise<User> {
    return await User.findOne({
      where: [{ email: user.email }],
    });
  }

  getById(id: number) {
    return User.findOne(id);
  }
}
