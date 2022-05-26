import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../infrastructure/database/entities/user.entity';
import { Repository } from 'typeorm';

/**
 * AuthService.
 */
@Injectable()
export class LocalAuthService {
  private readonly logger = new ConsoleLogger(LocalAuthService.name);

  /**
   * Constructor.
   *
   * @param config
   * @param userRepository
   * @param profileRepository
   * @param jwtService
   */
  constructor(
    protected readonly config: ConfigService,
    protected readonly jwtService: JwtService,
    protected readonly userRepository: Repository<User>,
  ) {}

  /**
   * Get user with email.
   *
   * @param user
   */
  async getUser(user: Partial<User>): Promise<User> {
    if (!user.email) throw new UnauthorizedException();
    return await User.getByEmail(user);
  }

  /**
   * Create a JWT token.
   *
   * @param user
   * @param options
   */
  createJWT(user: any, options?: JwtSignOptions) {
    const { ...payload } = user;
    return this.jwtService.sign(payload, options);
  }

  async login(user: User) {
    const access_token = this.createJWT(user);
    return {
      access_token,
    };
  }
}
