"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const projects_1 = require("./projects");
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    estimatedTime: (0, pg_core_1.integer)("estimated_time"), // in minutes
    expendedTime: (0, pg_core_1.integer)("expended_time"), // in minutes
    details: (0, pg_core_1.varchar)("details", { length: 1000 }),
    priority: (0, pg_core_1.varchar)("priority", { enum: ["low", "medium", "high"] }),
    dueDate: (0, pg_core_1.timestamp)("due_date", { withTimezone: true }),
    completedAt: (0, pg_core_1.timestamp)("completed_at", { withTimezone: true }),
    position: (0, pg_core_1.integer)("position"),
    subtasks: (0, pg_core_1.jsonb)("subtasks").$type(),
    projectId: (0, pg_core_1.uuid)("project_id")
        .notNull()
        .references(() => projects_1.projects.uuid, { onDelete: "cascade" }),
}).enableRLS();
