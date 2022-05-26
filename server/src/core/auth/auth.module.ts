import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthModule } from './local/local.auth.module';
import { ActiveDirectoryUserInterceptor } from './interceptors/active_directory_user.interceptor';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(`auth.strategies.jwt.secret`),
        verifyOptions: {
          issuer: configService.get(`auth.strategies.jwt.issuer`),
        },
        signOptions: {
          issuer: configService.get(`auth.strategies.jwt.issuer`),
        },
      }),
    }),
    ////////////////////////////////
    //   Authentication modules   //
    ////////////////////////////////
    LocalAuthModule, // for tests and dev
  ],
  controllers: [],
  providers: [ActiveDirectoryUserInterceptor],
  exports: [],
})
export class AuthModule {}
