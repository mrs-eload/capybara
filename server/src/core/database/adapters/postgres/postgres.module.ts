import { Module } from '@nestjs/common';
import { PostgresDataSourceFactory } from './postgres.data-source';

@Module({
  imports: [],
  exports: [PostgresDataSourceFactory],
  providers: [PostgresDataSourceFactory],
})
export class PostgresModule {}
