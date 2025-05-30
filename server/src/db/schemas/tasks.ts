import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  integer,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  estimatedTime: integer("estimated_time"), // in minutes
  expendedTime: integer("expended_time"), // in minutes

  details: varchar("details", { length: 1000 }),
  priority: varchar("priority", { enum: ["low", "medium", "high"] }),
  dueDate: timestamp("due_date", { withTimezone: true }),

  completedAt: timestamp("completed_at", { withTimezone: true }),

  position: integer("position"),

  subtasks: jsonb("subtasks").$type<{ title: string; done: boolean }[]>(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.uuid, { onDelete: "cascade" }),
});

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;
