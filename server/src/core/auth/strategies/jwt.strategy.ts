import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../infrastructure/database/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.get(
        `auth.strategies.jwt.ignoreExpiration`,
        false,
      ),
      secretOrKey: config.get(`auth.strategies.jwt.secret`),
    });
  }

  async validate(payload: any) {
    if (!payload.email) throw new UnauthorizedException();
    if (payload.sub === 'registration') return payload;
    const user = await User.getByEmail({
      email: payload.email,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
