import { Request, Response, NextFunction } from 'express';
import { responseResult } from '../types';

const notFoundMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.result) {
    const result: responseResult<null> = { statusCode: 404, message: 'Route not found', data: null, };

    res.locals = { result };
  }
  next();
};

export default notFoundMiddleware;