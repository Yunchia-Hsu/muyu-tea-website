// 讀 .env 的 DATABASE_URL
// 建立 Pool
// export 出去讓 routes 用
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
