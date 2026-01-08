import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User, UserRecord} from "../types/user";

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
  const userRecord: UserRecord = {
    id: fakeUserId++,
    email,
    username,
    password_hash: hashedpassword,
  };

  //save hashpassword to db
  const user: User = {
    id: userRecord.id,
    email: userRecord.email,
    username: userRecord.username,
  };
  users;
  //error check
  console.log("Saving user to DB:", {
    email,
    hashedpassword,
  });
  users.push(userRecord); // for mock db
  return user;
};

//login 驗證身分，發 token
export const login = async (email: string, password: string) => {
  // find user by email
  const userRecord = users.find((u) => u.email === email);
  if (!userRecord) {
    throw new Error("Invalid email or password");
  }
  //bcrypt compare
  const isPasswordValid = await bcrypt.compare(
    password,
    userRecord.password_hash
  );
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  //generate JWT
  const token = jwt.sign(
    {
      userId: userRecord.id,
      email: userRecord.email,
    },
    process.env.JWT_SECRET || "supersecretkey",
    {
      expiresIn: "100h",
    }
  );
  //return token user
  return {
    token,
    user: {
      id: userRecord.id,
      email: userRecord.email,
      username: userRecord.username,
    },
  };
};
