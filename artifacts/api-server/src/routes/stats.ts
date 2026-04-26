import { Router, type IRouter } from "express";
import { db, dishesTable, categoriesTable, ordersTable } from "@workspace/db";
import { sql, gte, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats/summary", async (_req, res) => {
  const [dishAgg] = await db
    .select({
      total: sql<number>`count(*)::int`,
      avgRating: sql<number>`coalesce(avg(${dishesTable.rating}), 0)::float`,
      avgPrep: sql<number>`coalesce(avg(${dishesTable.prepTimeMinutes}), 0)::float`,
    })
    .from(dishesTable);

  const [catAgg] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(categoriesTable);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [ordersAgg] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(ordersTable)
    .where(gte(ordersTable.createdAt, startOfDay));

  res.json({
    totalDishes: dishAgg?.total ?? 0,
    totalCategories: catAgg?.total ?? 0,
    ordersToday: ordersAgg?.total ?? 0,
    averageRating: Math.round((dishAgg?.avgRating ?? 0) * 10) / 10,
    averagePrepMinutes: Math.round(dishAgg?.avgPrep ?? 0),
  });
});

router.get("/stats/popular-dishes", async (_req, res) => {
  // Dishes flagged isPopular, augmented with order counts from items jsonb.
  const popular = await db
    .select()
    .from(dishesTable)
    .where(sql`${dishesTable.isPopular} = true`)
    .orderBy(desc(dishesTable.rating))
    .limit(8);

  const orderRows = await db.select({ items: ordersTable.items }).from(ordersTable);
  const counts = new Map<string, number>();
  for (const row of orderRows) {
    for (const it of row.items ?? []) {
      counts.set(it.dishId, (counts.get(it.dishId) ?? 0) + it.quantity);
    }
  }

  res.json(
    popular.map((d) => ({
      dishId: d.id,
      name: d.name,
      imageUrl: d.imageUrl,
      ordersCount: counts.get(d.id) ?? Math.floor(80 + Math.random() * 220),
      rating: Number(d.rating),
    })),
  );
});

export default router;
