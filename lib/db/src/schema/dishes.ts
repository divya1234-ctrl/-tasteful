import {
  pgTable,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";

export const dishesTable = pgTable("dishes", {
  id: text("id").primaryKey(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categoriesTable.id),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("4.7"),
  ratingCount: integer("rating_count").notNull().default(0),
  prepTimeMinutes: integer("prep_time_minutes").notNull().default(20),
  calories: integer("calories").notNull().default(0),
  spiceLevel: integer("spice_level").notNull().default(0),
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  isPopular: boolean("is_popular").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  ingredients: jsonb("ingredients").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Dish = typeof dishesTable.$inferSelect;
export type InsertDish = typeof dishesTable.$inferInsert;
