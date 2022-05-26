import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../../infrastructure/database/entities/user.entity';
import { LocalAuthService } from './local.auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: LocalAuthService) {
    super();
  }

  async validate(email: string, _password?: string): Promise<User> {
    const user = await this.authService.getUser({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
