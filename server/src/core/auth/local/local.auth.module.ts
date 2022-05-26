import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalAuthController } from './local.auth.controller';
import { LocalAuthService } from './local.auth.service';
import { LocalStrategy } from './local.strategy';

/**
 * Azure Auth Module.
 */
@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(`auth`).strategies.jwt.secret,
        verifyOptions: {
          issuer: configService.get('auth').strategies.jwt.issuer,
        },
        signOptions: {
          issuer: configService.get('auth').strategies.jwt.issuer,
        },
      }),
    }),
  ],
  controllers: [LocalAuthController],
  providers: [JwtStrategy, LocalAuthService, ConfigService, LocalStrategy],
  exports: [],
})
export class LocalAuthModule {}
