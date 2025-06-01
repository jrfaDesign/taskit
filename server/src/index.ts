// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.staging";
dotenv.config({ path: envFile });

import authRouter from "./routes/auth";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("Loaded env:", envFile);
  console.log("Loaded env:", process.env.ENV);
  console.log("Server is running on port 8000");
});
