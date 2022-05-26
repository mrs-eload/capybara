import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ModuleRef, Reflector } from '@nestjs/core';
import { ActiveDirectoryUserParserInterface } from '../base/active_directory_user.parser.interface';
import { ActiveDirectoryParserMetadata } from '../../../infrastructure/constants';

@Injectable()
export class ActiveDirectoryUserInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (!request?.user) {
      throw new UnauthorizedException();
    }

    const parserClassName = this.reflector.get(
      ActiveDirectoryParserMetadata,
      context.getClass(),
    );

    const parser: ActiveDirectoryUserParserInterface =
      this.moduleRef.get(parserClassName);
    request.active_directory_user = parser.parse(request.user);
    return next.handle();
  }
}
