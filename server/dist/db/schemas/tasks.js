"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    isDone: (0, pg_core_1.boolean)("is_done").default(false),
    userId: (0, pg_core_1.integer)("user_id"),
});
