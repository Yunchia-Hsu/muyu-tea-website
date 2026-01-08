//mock database for every userto check
export type User = {
  id: number;
  username: string;
  email: string;
};
//data base for insider backend
export type UserRecord = {
  id: number;
  email: string;
  username: string;
  password_hash: string;
};
