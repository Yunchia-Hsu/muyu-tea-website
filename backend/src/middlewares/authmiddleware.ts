import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. 從 request 拿 token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  //2. 驗證 token 是不是真的
  const token = authHeader.split(" ")[1]; //delete Bearer
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey"
    );

    //3. 把使用者身分放進 req.user

    (req as any).user = decoded; //typescript 不認識 user 屬性 as any 是一種「先跳過型別檢查」

    //4.決定要不要放行 request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
