"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.staging";
dotenv_1.default.config({ path: envFile });
const auth_1 = __importDefault(require("./routes/auth"));
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use("/auth", auth_1.default);
app.listen(8000, () => {
    console.log("Loaded env:", envFile);
    console.log("Loaded env:", process.env.ENV);
    console.log("Server is running on port 8000");
});
