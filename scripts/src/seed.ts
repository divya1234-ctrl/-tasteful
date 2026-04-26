import {
  db,
  pool,
  categoriesTable,
  dishesTable,
  ordersTable,
} from "@workspace/db";

type SeedDish = {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: string;
  ratingCount: number;
  prepTimeMinutes: number;
  calories: number;
  spiceLevel: number;
  isVegetarian: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  ingredients: string[];
};

const categories = [
  {
    id: "cat-mains",
    name: "Mains",
    slug: "mains",
    description: "Hearty, soulful plates from our wood-fired kitchen",
    emoji: "Mains",
    sortOrder: 1,
  },
  {
    id: "cat-bowls",
    name: "Bowls",
    slug: "bowls",
    description: "Grain bowls layered with seasonal goodness",
    emoji: "Bowls",
    sortOrder: 2,
  },
  {
    id: "cat-handhelds",
    name: "Handhelds",
    slug: "handhelds",
    description: "Burgers, sandwiches and tacos for hungry hands",
    emoji: "Handhelds",
    sortOrder: 3,
  },
  {
    id: "cat-asian",
    name: "Asian Kitchen",
    slug: "asian-kitchen",
    description: "From late-night ramen to bright Thai noodles",
    emoji: "Asian",
    sortOrder: 4,
  },
  {
    id: "cat-greens",
    name: "Greens & Salads",
    slug: "greens-salads",
    description: "Crisp, vibrant, garden-forward",
    emoji: "Greens",
    sortOrder: 5,
  },
  {
    id: "cat-breakfast",
    name: "All-Day Breakfast",
    slug: "all-day-breakfast",
    description: "Comfort served sunrise to sundown",
    emoji: "Breakfast",
    sortOrder: 6,
  },
  {
    id: "cat-sweets",
    name: "Sweets",
    slug: "sweets",
    description: "Pastries and desserts worth the wait",
    emoji: "Sweets",
    sortOrder: 7,
  },
  {
    id: "cat-drinks",
    name: "Drinks",
    slug: "drinks",
    description: "Espresso, lattes and cold-pressed favourites",
    emoji: "Drinks",
    sortOrder: 8,
  },
];

const dishes: SeedDish[] = [
  {
    id: "dish-margherita",
    categoryId: "cat-mains",
    name: "Wood-Fired Margherita",
    tagline: "Tomato, buffalo mozzarella, basil",
    description:
      "A 90-second sprint in our 900-degree wood oven. San Marzano tomatoes, hand-pulled buffalo mozzarella from a small dairy in Sonoma, fresh basil, and finishing oil pressed in Tuscany.",
    price: "18.00",
    imageUrl: "/api/images/generated_images/pizza_margherita.png",
    rating: "4.9",
    ratingCount: 312,
    prepTimeMinutes: 18,
    calories: 720,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: true,
    isFeatured: true,
    ingredients: [
      "San Marzano tomato",
      "Buffalo mozzarella",
      "Fresh basil",
      "00 flour dough",
      "Tuscan olive oil",
      "Sea salt",
    ],
  },
  {
    id: "dish-smash-burger",
    categoryId: "cat-handhelds",
    name: "Double Smash Burger",
    tagline: "Two patties, American cheese, brioche",
    description:
      "Two thin smashed patties of dry-aged grass-fed beef, melted American cheese, caramelized onions, butter pickles, and our umami house sauce on a toasted brioche bun.",
    price: "16.50",
    imageUrl: "/api/images/generated_images/burger_smash.png",
    rating: "4.8",
    ratingCount: 487,
    prepTimeMinutes: 14,
    calories: 880,
    spiceLevel: 0,
    isVegetarian: false,
    isPopular: true,
    isFeatured: true,
    ingredients: [
      "Grass-fed beef",
      "American cheese",
      "Caramelized onion",
      "Butter pickles",
      "House sauce",
      "Brioche bun",
    ],
  },
  {
    id: "dish-pad-thai",
    categoryId: "cat-asian",
    name: "Prawn Pad Thai",
    tagline: "Rice noodles, tamarind, peanut, lime",
    description:
      "Wok-tossed rice noodles in a bright tamarind-palm sugar sauce with charred wild prawns, scrambled egg, bean sprouts, garlic chives, crushed peanuts, and a generous squeeze of lime.",
    price: "19.00",
    imageUrl: "/api/images/generated_images/pad_thai.png",
    rating: "4.8",
    ratingCount: 264,
    prepTimeMinutes: 16,
    calories: 690,
    spiceLevel: 1,
    isVegetarian: false,
    isPopular: true,
    isFeatured: true,
    ingredients: [
      "Rice noodles",
      "Wild prawn",
      "Tamarind",
      "Palm sugar",
      "Peanut",
      "Bean sprout",
      "Lime",
    ],
  },
  {
    id: "dish-buddha-bowl",
    categoryId: "cat-bowls",
    name: "Harvest Buddha Bowl",
    tagline: "Quinoa, kale, sweet potato, tahini",
    description:
      "Tri-colour quinoa, massaged kale, roasted sweet potato, crispy chickpeas, avocado, pickled red cabbage, and a drizzle of lemon-tahini dressing. Plant-powered and properly satisfying.",
    price: "15.50",
    imageUrl: "/api/images/generated_images/buddha_bowl.png",
    rating: "4.7",
    ratingCount: 198,
    prepTimeMinutes: 12,
    calories: 540,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: true,
    isFeatured: false,
    ingredients: [
      "Tri-colour quinoa",
      "Kale",
      "Sweet potato",
      "Crispy chickpea",
      "Avocado",
      "Pickled cabbage",
      "Tahini",
    ],
  },
  {
    id: "dish-tonkotsu-ramen",
    categoryId: "cat-asian",
    name: "Spicy Tonkotsu Ramen",
    tagline: "24-hour pork broth, chashu, jammy egg",
    description:
      "Our signature pork bone broth simmers for 24 hours until milky and rich. Topped with melt-in-mouth chashu, ajitsuke tamago, scallions, nori, and a swirl of house chili oil.",
    price: "17.00",
    imageUrl: "/api/images/generated_images/ramen_tonkotsu.png",
    rating: "4.9",
    ratingCount: 421,
    prepTimeMinutes: 15,
    calories: 760,
    spiceLevel: 2,
    isVegetarian: false,
    isPopular: true,
    isFeatured: true,
    ingredients: [
      "Tonkotsu broth",
      "Wheat noodle",
      "Chashu pork",
      "Jammy egg",
      "Scallion",
      "Nori",
      "Chili oil",
    ],
  },
  {
    id: "dish-poke",
    categoryId: "cat-bowls",
    name: "Sashimi Tuna Poke",
    tagline: "Yellowfin, mango, avocado, sushi rice",
    description:
      "Sushi-grade yellowfin tuna marinated in shoyu and sesame, layered over warm sushi rice with edamame, cucumber, mango, avocado, pickled ginger, and toasted sesame.",
    price: "20.00",
    imageUrl: "/api/images/generated_images/poke_tuna.png",
    rating: "4.8",
    ratingCount: 176,
    prepTimeMinutes: 10,
    calories: 580,
    spiceLevel: 0,
    isVegetarian: false,
    isPopular: false,
    isFeatured: true,
    ingredients: [
      "Yellowfin tuna",
      "Sushi rice",
      "Edamame",
      "Cucumber",
      "Mango",
      "Avocado",
      "Sesame",
    ],
  },
  {
    id: "dish-pancakes",
    categoryId: "cat-breakfast",
    name: "Buttermilk Pancake Stack",
    tagline: "Maple, blueberries, brown butter",
    description:
      "Three plush buttermilk pancakes stacked with melting brown butter, warm Vermont maple syrup, fresh blueberries, and a snowfall of vanilla powdered sugar.",
    price: "12.50",
    imageUrl: "/api/images/generated_images/pancakes_stack.png",
    rating: "4.8",
    ratingCount: 233,
    prepTimeMinutes: 12,
    calories: 690,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: false,
    isFeatured: false,
    ingredients: [
      "Buttermilk batter",
      "Brown butter",
      "Maple syrup",
      "Blueberry",
      "Vanilla sugar",
    ],
  },
  {
    id: "dish-short-ribs",
    categoryId: "cat-mains",
    name: "Braised Short Rib & Polenta",
    tagline: "Red wine, gremolata, creamy polenta",
    description:
      "Bone-in beef short ribs braised six hours in Cabernet and aromatics until they fall apart. Served over stone-ground polenta with a bright lemon-parsley gremolata.",
    price: "28.00",
    imageUrl: "/api/images/generated_images/short_ribs.png",
    rating: "4.9",
    ratingCount: 152,
    prepTimeMinutes: 22,
    calories: 820,
    spiceLevel: 0,
    isVegetarian: false,
    isPopular: false,
    isFeatured: true,
    ingredients: [
      "Bone-in short rib",
      "Cabernet reduction",
      "Stone-ground polenta",
      "Gremolata",
      "Mirepoix",
    ],
  },
  {
    id: "dish-lava-cake",
    categoryId: "cat-sweets",
    name: "Molten Chocolate Lava Cake",
    tagline: "Single-origin chocolate, vanilla bean ice cream",
    description:
      "Warm 70% Valrhona chocolate cake with a molten centre, served with a scoop of Tahitian vanilla bean ice cream and fresh raspberries.",
    price: "10.00",
    imageUrl: "/api/images/generated_images/lava_cake.png",
    rating: "4.9",
    ratingCount: 367,
    prepTimeMinutes: 14,
    calories: 540,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: true,
    isFeatured: true,
    ingredients: [
      "Valrhona chocolate",
      "Brown butter",
      "Vanilla bean ice cream",
      "Raspberry",
    ],
  },
  {
    id: "dish-chicken-sandwich",
    categoryId: "cat-handhelds",
    name: "Crispy Chicken Sandwich",
    tagline: "Buttermilk-fried chicken, slaw, spicy mayo",
    description:
      "Buttermilk-brined chicken thigh fried golden crisp, stacked with crunchy slaw, butter pickles and spicy mayo on a toasted potato bun. Served with shoestring fries.",
    price: "15.00",
    imageUrl: "/api/images/generated_images/chicken_sandwich.png",
    rating: "4.7",
    ratingCount: 289,
    prepTimeMinutes: 14,
    calories: 820,
    spiceLevel: 1,
    isVegetarian: false,
    isPopular: true,
    isFeatured: false,
    ingredients: [
      "Buttermilk chicken thigh",
      "Slaw",
      "Spicy mayo",
      "Butter pickle",
      "Potato bun",
      "Shoestring fries",
    ],
  },
  {
    id: "dish-caesar-salad",
    categoryId: "cat-greens",
    name: "Little Gem Caesar",
    tagline: "Anchovy, parmesan, garlic croutons",
    description:
      "Crisp little gem hearts tossed in our anchovy-rich Caesar dressing with shaved Parmigiano-Reggiano, sourdough croutons, and a soft-boiled egg.",
    price: "14.00",
    imageUrl: "/api/images/stock_images/caesar_salad.jpg",
    rating: "4.6",
    ratingCount: 142,
    prepTimeMinutes: 10,
    calories: 420,
    spiceLevel: 0,
    isVegetarian: false,
    isPopular: false,
    isFeatured: false,
    ingredients: [
      "Little gem lettuce",
      "Anchovy",
      "Parmigiano-Reggiano",
      "Sourdough crouton",
      "Soft-boiled egg",
    ],
  },
  {
    id: "dish-salmon-risotto",
    categoryId: "cat-mains",
    name: "Crispy Salmon & Pea Risotto",
    tagline: "Atlantic salmon, peas, lemon, dill",
    description:
      "Pan-seared Atlantic salmon over a creamy spring pea risotto finished with mascarpone, lemon zest, fresh dill, and a glass-suggested Sancerre.",
    price: "26.00",
    imageUrl: "/api/images/stock_images/salmon_risotto.jpg",
    rating: "4.8",
    ratingCount: 188,
    prepTimeMinutes: 20,
    calories: 690,
    spiceLevel: 0,
    isVegetarian: false,
    isPopular: false,
    isFeatured: true,
    ingredients: [
      "Atlantic salmon",
      "Arborio rice",
      "Spring pea",
      "Mascarpone",
      "Lemon",
      "Dill",
    ],
  },
  {
    id: "dish-tacos-asada",
    categoryId: "cat-handhelds",
    name: "Carne Asada Tacos",
    tagline: "Three tacos, salsa verde, lime",
    description:
      "Three soft corn tortillas piled with marinated grilled skirt steak, white onion, cilantro, and our roasted tomatillo salsa verde. Lime wedges on the side.",
    price: "14.50",
    imageUrl: "/api/images/generated_images/tacos_asada.png",
    rating: "4.7",
    ratingCount: 215,
    prepTimeMinutes: 12,
    calories: 620,
    spiceLevel: 1,
    isVegetarian: false,
    isPopular: true,
    isFeatured: false,
    ingredients: [
      "Skirt steak",
      "Corn tortilla",
      "White onion",
      "Cilantro",
      "Salsa verde",
      "Lime",
    ],
  },
  {
    id: "dish-iced-matcha",
    categoryId: "cat-drinks",
    name: "Iced Matcha Latte",
    tagline: "Ceremonial-grade matcha, oat milk",
    description:
      "Ceremonial-grade Uji matcha whisked to a deep emerald foam over ice with creamy oat milk and a touch of honey.",
    price: "6.50",
    imageUrl: "/api/images/generated_images/iced_matcha.png",
    rating: "4.7",
    ratingCount: 134,
    prepTimeMinutes: 5,
    calories: 180,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: false,
    isFeatured: false,
    ingredients: ["Uji matcha", "Oat milk", "Honey", "Ice"],
  },
  {
    id: "dish-cappuccino",
    categoryId: "cat-drinks",
    name: "House Cappuccino",
    tagline: "Single-origin espresso, silky foam",
    description:
      "Our house espresso blend pulled to a sweet caramel ristretto, topped with steamed whole milk and a kiss of foam art.",
    price: "5.00",
    imageUrl: "/api/images/generated_images/cappuccino.png",
    rating: "4.8",
    ratingCount: 412,
    prepTimeMinutes: 4,
    calories: 120,
    spiceLevel: 0,
    isVegetarian: true,
    isPopular: false,
    isFeatured: false,
    ingredients: ["Single-origin espresso", "Whole milk"],
  },
];

async function main() {
  console.log("Seeding categories…");
  await db.delete(ordersTable);
  await db.delete(dishesTable);
  await db.delete(categoriesTable);

  await db.insert(categoriesTable).values(categories);
  console.log(`  inserted ${categories.length} categories`);

  console.log("Seeding dishes…");
  await db.insert(dishesTable).values(dishes);
  console.log(`  inserted ${dishes.length} dishes`);

  console.log("Seeding sample order…");
  const subtotal = 18.0 + 17.0 + 10.0;
  const deliveryFee = 4.99;
  const tax = Math.round(subtotal * 0.0875 * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  await db.insert(ordersTable).values({
    id: "order-sample-001",
    orderNumber: "TF-100200",
    customerName: "Mira Patel",
    customerEmail: "mira@example.com",
    customerPhone: "+1 415 555 0123",
    deliveryAddress: "350 Folsom St, San Francisco, CA 94105",
    notes: "Please ring buzzer 4B. Leave at door if no answer.",
    status: "preparing",
    subtotal: subtotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    items: [
      {
        dishId: "dish-margherita",
        dishName: "Wood-Fired Margherita",
        unitPrice: 18.0,
        quantity: 1,
        imageUrl: "/api/images/generated_images/pizza_margherita.png",
      },
      {
        dishId: "dish-tonkotsu-ramen",
        dishName: "Spicy Tonkotsu Ramen",
        unitPrice: 17.0,
        quantity: 1,
        imageUrl: "/api/images/generated_images/ramen_tonkotsu.png",
      },
      {
        dishId: "dish-lava-cake",
        dishName: "Molten Chocolate Lava Cake",
        unitPrice: 10.0,
        quantity: 1,
        imageUrl: "/api/images/generated_images/lava_cake.png",
      },
    ],
    itemCount: 3,
    estimatedReadyAt: new Date(Date.now() + 35 * 60 * 1000),
  });
  console.log("  inserted 1 sample order");

  await pool.end();
  console.log("Done.");
}

main().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
