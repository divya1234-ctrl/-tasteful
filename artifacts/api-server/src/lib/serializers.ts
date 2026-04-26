import type { Category, Dish, OrderRecord } from "@workspace/db";

export function serializeCategory(c: Category, dishCount: number) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    emoji: c.emoji,
    dishCount,
  };
}

export function serializeDish(
  d: Dish,
  categoryName: string,
) {
  return {
    id: d.id,
    categoryId: d.categoryId,
    categoryName,
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    price: Number(d.price),
    imageUrl: d.imageUrl,
    rating: Number(d.rating),
    ratingCount: d.ratingCount,
    prepTimeMinutes: d.prepTimeMinutes,
    calories: d.calories,
    spiceLevel: d.spiceLevel,
    isVegetarian: d.isVegetarian,
    isPopular: d.isPopular,
    isFeatured: d.isFeatured,
    ingredients: d.ingredients ?? [],
  };
}

export function serializeOrder(o: OrderRecord) {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    customerEmail: o.customerEmail,
    customerPhone: o.customerPhone,
    deliveryAddress: o.deliveryAddress,
    notes: o.notes,
    status: o.status,
    subtotal: Number(o.subtotal),
    deliveryFee: Number(o.deliveryFee),
    tax: Number(o.tax),
    total: Number(o.total),
    items: (o.items ?? []).map((it) => ({
      dishId: it.dishId,
      dishName: it.dishName,
      unitPrice: Number(it.unitPrice),
      quantity: it.quantity,
      imageUrl: it.imageUrl,
    })),
    createdAt: o.createdAt.toISOString(),
    estimatedReadyAt: o.estimatedReadyAt.toISOString(),
  };
}
