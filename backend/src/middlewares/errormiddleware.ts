import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // server log

  res.status(400).json({
    error: err.message || 'Something went wrong',
  });
};
