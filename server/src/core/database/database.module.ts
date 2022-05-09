import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresDataSourceFactory } from './adapters/postgres/postgres.data-source';
import { PostgresModule } from './adapters/postgres/postgres.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService, PostgresDataSourceFactory],
      imports: [ConfigModule, PostgresModule],
      useFactory: async (config: ConfigService) =>
        await PostgresDataSourceFactory.create(config),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
