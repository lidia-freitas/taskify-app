import { Request, Response, NextFunction } from 'express';

import { responseResult } from '../types';
import logsHandler from '../config/logsHandler.js';
import businessErrorCodes from '../utils/businessErrorCodes.js';

const errorMiddleware = (err: Error & { code: string }, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = businessErrorCodes.includes(err.code) ? 400 : 500;
  const message = err.message || 'Internal Server Error';

  const result: responseResult<Error> = { statusCode, message, data: err };
  res.locals = { result };

  logsHandler.error(err.stack);
  next();
};

export default errorMiddleware;
