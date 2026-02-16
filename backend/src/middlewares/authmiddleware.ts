import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Read bearer token from Authorization header.
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  // Validate token format and extract the raw JWT.
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );

    // Attach decoded payload for downstream handlers.
    (req as any).user = decoded;

    // Continue to the next handler if token is valid.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
