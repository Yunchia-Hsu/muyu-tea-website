import cors from "cors";
import { pool } from "./db";
import SwaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import express from "express";
import authRoutes from "./routes/authroutes";
import courseRoutes from "./routes/courseroutes";
import { errorHandler } from "./middlewares/errormiddleware";

const app = express();
app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(
  cors(
    {
      origin: "http://localhost:5173",
      credentials: true,
    }
  )
);
app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);

app.get("/health/db", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT 1 AS ok");
    res.json({ ok: result.rows[0].ok === 1 });
  } catch (err) {
    next(err);
  }
});
//for api Error("Unauthorized (text)") testing
// app.get("/api/test/text-error", (req, res) => {
//   res.status(401).type("text/plain").send("Unauthorized (text)");
// });

// app.get("/api/test/html-error", (req, res) => {
//   res.status(502).type("text/html").send("<h1>Bad Gateway</h1>");
// });
// app.post("/api/test/no-content", (req, res) => {
//   res.status(204).send();
// });


app.use(errorHandler);
export default app;
