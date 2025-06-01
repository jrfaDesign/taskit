import { pgSchema, uuid } from "drizzle-orm/pg-core";

const auth = pgSchema("auth");

export const users = auth.table("users", {
  id: uuid("id").primaryKey(),
});
