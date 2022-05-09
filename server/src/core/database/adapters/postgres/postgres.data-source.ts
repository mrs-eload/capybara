import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Injectable } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

@Injectable()
export class PostgresDataSourceFactory {
  public static async create(
    config: ConfigService,
  ): Promise<ConnectionOptions> {
    return <PostgresConnectionOptions>{
      type: config.get('database.main.adapter'),
      host: config.get('database.main.host'),
      port: config.get('database.main.port'),
      username: config.get('database.main.username'),
      password: config.get('database.main.password'),
      database: config.get('database.main.database'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
