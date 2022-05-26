import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from './access_token.interface';
import { ActiveDirectoryUser } from './active_directory_user';
import { User } from '../../../infrastructure/database/entities/user.entity';
/**
 * Base Authentication Service.
 */
export class BaseAuthService {
  protected readonly web_redirect: string = null;
  protected readonly allow_sign_up = true;
  /**
   * Must receive an AuthService for user authentication.
   *
   * @param config
   * @param organizationRegistration
   * @param userRepository
   * @param profileRepository
   * @param jwtService
   */
  constructor(
    protected config: ConfigService,
    protected jwtService: JwtService,
  ) {
    this.web_redirect = this.config.get('auth.web_redirect_url');
    if (this.web_redirect == null) {
      throw new Error('auth.web_redirect_url is not defined');
    }
    this.allow_sign_up = this.config.get('auth.allow_signup', true);
    this.web_redirect = this.web_redirect.replace(/\/?$/, '/');
  }

  /**
   * Validate the user email with AuthService
   * @param user
   */
  async validateUser(user: any) {
    const userDB = await this.getUser(user);
    if (!userDB) {
      throw new UnauthorizedException();
    }
    return userDB;
  }

  async getUser(user: any) {
    if (!user.email) throw new BadRequestException('Email is required');
    const db_user = await User.getByEmail(user);
    if (!db_user) return;
    return db_user;
  }

  protected createJWT(user: any, options?: JwtSignOptions) {
    return this.jwtService.sign(user, options);
  }

  async refreshToken(
    active_directory_user: ActiveDirectoryUser,
  ): Promise<AccessToken> {
    const db_user = await this.validateUser(active_directory_user);
    const { access_token, refresh_token } = this.generateTokens(
      active_directory_user,
      db_user,
    );
    return { access_token, refresh_token };
  }

  protected generateTokens(data: any, db_user: User): AccessToken {
    const user = { ...db_user };
    const access_token = this.createJWT({
        ...user,
        display_name: data.display_name,
        exp: data.exp,
        sub: data.sub,
      }),
      refresh_token = data.refresh_token;
    return { access_token, refresh_token };
  }
}
