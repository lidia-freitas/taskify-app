import { Request, Response, NextFunction } from 'express';

const responseMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message, data } = res.locals.result;
  const status = statusCode >= 400 ? 'error' : 'success';

  res.status(statusCode).json({ status, message, data });
};

export default responseMiddleware;
