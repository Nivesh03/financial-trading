import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  panId: text("pan").notNull().unique(),
  password: text("password").notNull(),
  imageId: text("image_id").notNull(),
});

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
});

export type NewUser = typeof user.$inferInsert;
export type User = typeof user.$inferSelect;
