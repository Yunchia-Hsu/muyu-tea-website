import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. from request take token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  //2.  authenticate if the token is correct
  const token = authHeader.split(" ")[1]; //delete Bearer
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );

    //3. Store the authenticated user information in req.user.

    (req as any).user = decoded; //TypeScript doesn’t recognize the user property, so using as any is a way to temporarily bypass type checking.

    //4.Decide whether to allow the request to proceed.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
