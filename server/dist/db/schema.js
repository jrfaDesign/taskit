"use strict";
/* export * from "./schemas/users";
export * from "./schemas/tasks";
export * from "./schemas/projects"; */
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users_table", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
});
exports.postsTable = (0, pg_core_1.pgTable)("posts_table", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});
