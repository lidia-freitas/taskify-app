import { Router } from 'express';
import { responseResult } from '../../types';

const router = Router();

router.get('/health', (_req, res, next) => {
  const result: responseResult<null> = { statusCode: 200, message: 'ok', data: null, };

  res.locals = { result };
  next();
});

export default router;
