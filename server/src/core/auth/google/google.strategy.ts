import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../../infrastructure/database/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(email: string, _password?: string): Promise<User> {
    const user = await User.getByEmail({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
