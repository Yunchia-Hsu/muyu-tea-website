import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authservice";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not matchhh" });
    }
    const user = await authService.register(email, password, username);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error); //hand to middleware
  }
};

//接收 request → 呼叫 login service → 回 JSON
export const login = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    //login logic here
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const result = await authService.login(email, password);//進service 驗證 傳送 token and user info
        res.status(200).json(result);

    }
    catch (error) {
        //handle error
        next(error);
    }
};


