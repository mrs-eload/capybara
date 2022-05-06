import * as csurf from 'csurf';
import { NestMiddleware } from '@nestjs/common';
import { CookieOptions, NextFunction } from 'express';
const csrfProtection = csurf({
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'], // Only applied for POST, PUT, DELETE... METHODS, THE ONES THAT CAN MODIFY DATA
});

interface CsurfRequest extends Request {
  csrfToken(): string;
}

interface CookieResponse extends Response {
  cookie(name: string, value: string, options?: CookieOptions): CookieResponse;
}

export class CsrfProtectionMiddleware implements NestMiddleware {
  use(req: CsurfRequest, res: CookieResponse, next: NextFunction) {
    csrfProtection(req, res, next);
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    next();
  }
}
