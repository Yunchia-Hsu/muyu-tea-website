import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log server-side errors for debugging/monitoring.
  console.error(err);

  // Return a consistent error shape to clients.
  res.status(400).json({
    message: err.message || "Something went wrong",
  });
};
