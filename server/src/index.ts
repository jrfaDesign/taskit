// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.staging";
dotenv.config({ path: envFile });

import usersRouter from "./routes/users";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/users", usersRouter);

app.listen(5000, () => {
  console.log("Loaded env:", envFile);
  console.log("Loaded env:", process.env.ENV);
  console.log("Server is running on port 5000");
});
