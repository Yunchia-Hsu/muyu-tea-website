import { JwtPayload } from "./auth";


// Extend Express Request to include the authenticated JWT payload.
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export {};
