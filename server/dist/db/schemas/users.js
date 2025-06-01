"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const auth = (0, pg_core_1.pgSchema)("auth");
exports.users = auth.table("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey(),
});
