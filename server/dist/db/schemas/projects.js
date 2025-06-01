"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.projects = (0, pg_core_1.pgTable)("projects", {
    uuid: (0, pg_core_1.uuid)("uuid").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    nameColor: (0, pg_core_1.varchar)("name_color", { length: 7 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    archived: (0, pg_core_1.boolean)("archived").default(false).notNull(),
    creatorId: (0, pg_core_1.uuid)("creator_id")
        .notNull()
        .references(() => users_1.users.id, { onDelete: "cascade" }),
}).enableRLS();
