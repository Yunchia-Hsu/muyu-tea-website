// Public user shape returned to clients.
export type User = {
  id: number;
  username: string;
  email: string;
};
// Internal user record shape including hashed password.
export type UserRecord = {
  id: number;
  email: string;
  username: string;
  password_hash: string;
};
