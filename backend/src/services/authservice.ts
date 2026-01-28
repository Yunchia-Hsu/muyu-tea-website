import {pool} from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User, UserRecord} from "../types/user";
import { hash } from "crypto";

let fakeUserId = 1;

const users: UserRecord[] = [];

export const register = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  // business logic
  if (!email || !password || !username) {
    throw new Error("Email , username and password are required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  //hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
  const result = await pool.query(
    
   `INSERT INTO users (username, email, hashed_password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email`,  
    [username, email, hashedpassword]
    );

  //error check
  console.log("Saving user to DB:", {
    email,
    hashedpassword,
  });
  // users.push(userRecord); // for mock db
  return result.rows[0];
} catch (error: any) {
    if (error?.code === "23505"){
      throw new Error ("Email already in use" );
    }
    throw error
}
};

//login 驗證身分，發 token
export const login = async (email: string, password: string) => {
  // find user in the data base by email
 const matchUser = await pool.query (
    `SELECT id, email, username, hashed_password FROM users 
    WHERE email =$1`,
    [email],
 );
  if (matchUser.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  //bcrypt compare
  const isPasswordValid = await bcrypt.compare(
    password,
    matchUser.rows[0].hashed_password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  //generate JWT
  const token = jwt.sign(
    {
      userId: matchUser.rows[0].id,
      email: matchUser.rows[0].email,
    },
    process.env.JWT_SECRET || "supersecretkey",
    {
      expiresIn: "48h",
    }
  );
  //return token user
  return {
    token,
    user: {
      id:  matchUser.rows[0].id,
      email:  matchUser.rows[0].email,
      username:  matchUser.rows[0].username,
    },
  };
};
