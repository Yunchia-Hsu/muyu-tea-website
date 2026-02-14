// read .env  DATABASE_URL
// create Pool
// export data to routes 
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
