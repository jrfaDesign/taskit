import {
  pgTable,
  varchar,
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const projects = pgTable("projects", {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  nameColor: varchar("name_color", { length: 7 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  archived: boolean("archived").default(false).notNull(),
  creatorId: uuid("creator_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;
