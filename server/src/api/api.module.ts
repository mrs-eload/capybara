import { Module } from '@nestjs/common';
import { UsersApiModule } from './users/users.api.module';
import { ArticlesApiModule } from './articles/articles.api.module';
import { LibrariesApiModule } from './libraries/libraries.api.module';
import { RepositoriesApiModule } from './repositories/repositories.api.module';
import { TagsApiModule } from './tags/tags.api.module';

@Module({
  imports: [
    UsersApiModule,
    ArticlesApiModule,
    LibrariesApiModule,
    RepositoriesApiModule,
    TagsApiModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
