import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES_DATASOURCE } from '../../infrastructure/database/adapters/postgres.data-source';

@Module({
  imports: [TypeOrmModule.forRoot(POSTGRES_DATASOURCE)],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
