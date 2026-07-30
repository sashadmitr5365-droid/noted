import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  // Tag 1
  tag1Icon: text("tag1_icon"),
  tag1Label: text("tag1_label"),
  tag1Position: text("tag1_position"), // "top-left" | "top-right" | "bottom-left" | "bottom-right" | "stack-top" | "stack-bottom"
  // Tag 2
  tag2Icon: text("tag2_icon"),
  tag2Label: text("tag2_label"),
  tag2Position: text("tag2_position"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  noteId: integer("note_id")
    .notNull()
    .references(() => notes.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  done: boolean("done").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
