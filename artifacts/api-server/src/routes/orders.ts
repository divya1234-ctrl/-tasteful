import { Router, type IRouter } from "express";
import { db, ordersTable, dishesTable } from "@workspace/db";
import { desc, eq, inArray } from "drizzle-orm";
import { CreateOrderBody, GetOrderParams } from "@workspace/api-zod";
import { serializeOrder } from "../lib/serializers";

const router: IRouter = Router();

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.0875;

function newId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  );
}

function newOrderNumber(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `TF-${n}`;
}

router.get("/orders", async (_req, res) => {
  const rows = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt))
    .limit(50);
  res.json(rows.map(serializeOrder));
});

router.post("/orders", async (req, res) => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body", issues: parsed.error.issues });
    return;
  }
  const input = parsed.data;

  const dishIds = input.items.map((i) => i.dishId);
  const dishes = await db
    .select()
    .from(dishesTable)
    .where(inArray(dishesTable.id, dishIds));

  const dishMap = new Map(dishes.map((d) => [d.id, d]));
  for (const item of input.items) {
    if (!dishMap.has(item.dishId)) {
      res.status(400).json({ error: `Unknown dish ${item.dishId}` });
      return;
    }
  }

  const orderItems = input.items.map((item) => {
    const d = dishMap.get(item.dishId)!;
    return {
      dishId: d.id,
      dishName: d.name,
      unitPrice: Number(d.price),
      quantity: item.quantity,
      imageUrl: d.imageUrl,
    };
  });

  const subtotal = orderItems.reduce(
    (sum, it) => sum + it.unitPrice * it.quantity,
    0,
  );
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + DELIVERY_FEE + tax) * 100) / 100;

  const maxPrep = Math.max(
    ...orderItems.map((it) => dishMap.get(it.dishId)!.prepTimeMinutes),
  );
  const estimatedReadyAt = new Date(Date.now() + (maxPrep + 15) * 60 * 1000);
  const itemCount = orderItems.reduce((s, it) => s + it.quantity, 0);

  const id = newId();
  const orderNumber = newOrderNumber();

  const [inserted] = await db
    .insert(ordersTable)
    .values({
      id,
      orderNumber,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      deliveryAddress: input.deliveryAddress,
      notes: input.notes ?? "",
      status: "received",
      subtotal: subtotal.toFixed(2),
      deliveryFee: DELIVERY_FEE.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      items: orderItems,
      itemCount,
      estimatedReadyAt,
    })
    .returning();

  res.status(201).json(serializeOrder(inserted!));
});

router.get("/orders/:id", async (req, res) => {
  const parsed = GetOrderParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const rows = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, parsed.data.id))
    .limit(1);
  if (!rows.length) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(serializeOrder(rows[0]!));
});

export default router;
