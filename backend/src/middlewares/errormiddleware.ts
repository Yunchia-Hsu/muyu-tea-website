import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // server log

  // 統一回傳格式為 { message: "..." }
  res.status(400).json({
    message: err.message || 'Something went wrong',
  });
};
