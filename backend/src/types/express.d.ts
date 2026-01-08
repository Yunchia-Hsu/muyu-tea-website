import { JwtPayload } from './auth';


//user?: JwtPayload：加一個 user 屬性到 Express 的 Request 介面，型別是 JwtPayload 或 undefined
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export {};