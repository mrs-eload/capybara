import { NextFunction, Request, Response } from 'express';

export function sniff(req: Request, res: Response, next: NextFunction) {
  console.log('sniffing');

  console.log(req);

  next();
}
