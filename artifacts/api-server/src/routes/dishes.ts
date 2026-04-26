import { Router, type IRouter } from "express";
import { db, dishesTable, categoriesTable } from "@workspace/db";
import { and, eq, ilike, or, asc } from "drizzle-orm";
import { ListDishesQueryParams, GetDishParams } from "@workspace/api-zod";
import { serializeDish } from "../lib/serializers";

const router: IRouter = Router();

router.get("/dishes", async (req, res) => {
  const parsed = ListDishesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { categoryId, search, featured } = parsed.data;

  const conditions = [];
  if (categoryId) conditions.push(eq(dishesTable.categoryId, categoryId));
  if (featured === true) conditions.push(eq(dishesTable.isFeatured, true));
  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    conditions.push(
      or(
        ilike(dishesTable.name, term),
        ilike(dishesTable.tagline, term),
        ilike(dishesTable.description, term),
      )!,
    );
  }

  const rows = await db
    .select({
      dish: dishesTable,
      categoryName: categoriesTable.name,
    })
    .from(dishesTable)
    .innerJoin(categoriesTable, eq(dishesTable.categoryId, categoriesTable.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(dishesTable.name));

  res.json(rows.map((r) => serializeDish(r.dish, r.categoryName)));
});

router.get("/dishes/:id", async (req, res) => {
  const parsed = GetDishParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const rows = await db
    .select({
      dish: dishesTable,
      categoryName: categoriesTable.name,
    })
    .from(dishesTable)
    .innerJoin(categoriesTable, eq(dishesTable.categoryId, categoriesTable.id))
    .where(eq(dishesTable.id, parsed.data.id))
    .limit(1);

  if (!rows.length) {
    res.status(404).json({ error: "Dish not found" });
    return;
  }

  res.json(serializeDish(rows[0]!.dish, rows[0]!.categoryName));
});

export default router;
