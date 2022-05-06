import { Request, Response, NextFunction } from 'express';

export function secureHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age: 15552000; includeSubDomains',
  );
  res.removeHeader('Server');
  next();
}
