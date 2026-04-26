import { Router, type IRouter } from "express";
import { db, categoriesTable, dishesTable } from "@workspace/db";
import { asc, eq, sql } from "drizzle-orm";
import { serializeCategory } from "../lib/serializers";

const router: IRouter = Router();

router.get("/categories", async (_req, res) => {
  const cats = await db
    .select()
    .from(categoriesTable)
    .orderBy(asc(categoriesTable.sortOrder));

  const counts = await db
    .select({
      categoryId: dishesTable.categoryId,
      count: sql<number>`count(*)::int`,
    })
    .from(dishesTable)
    .groupBy(dishesTable.categoryId);

  const countMap = new Map(counts.map((c) => [c.categoryId, c.count]));
  res.json(cats.map((c) => serializeCategory(c, countMap.get(c.id) ?? 0)));
});

export default router;
