import {
  pgTable,
  text,
  integer,
  numeric,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export type OrderItemRecord = {
  dishId: string;
  dishName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
};

export const ordersTable = pgTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("received"),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  deliveryFee: numeric("delivery_fee", { precision: 10, scale: 2 }).notNull(),
  tax: numeric("tax", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  items: jsonb("items").$type<OrderItemRecord[]>().notNull(),
  estimatedReadyAt: timestamp("estimated_ready_at", { withTimezone: true })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  itemCount: integer("item_count").notNull().default(0),
});

export type OrderRecord = typeof ordersTable.$inferSelect;
export type InsertOrder = typeof ordersTable.$inferInsert;
