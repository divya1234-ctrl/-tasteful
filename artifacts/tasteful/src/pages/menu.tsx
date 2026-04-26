import { Layout } from "@/components/layout/Layout";
import { DishCard } from "@/components/DishCard";
import { useListCategories, useListDishes } from "@workspace/api-client-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Leaf, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [vegOnly, setVegOnly] = useState(false);
  const [spicyOnly, setSpiceOnly] = useState(false);

  const { data: categories } = useListCategories();
  const { data: dishes, isLoading } = useListDishes({ 
    categoryId: activeCategory, 
    search: search.trim() !== "" ? search : undefined 
  });

  const filteredDishes = dishes?.filter(d => {
    if (vegOnly && !d.isVegetarian) return false;
    if (spicyOnly && d.spiceLevel === 0) return false;
    return true;
  });

  return (
    <Layout>
      <div className="bg-card border-b py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-serif font-bold mb-6 text-foreground">Our Menu</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search dishes..." 
                className="pl-9 h-12 bg-background border-border/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={vegOnly ? "default" : "outline"}
                className={cn("h-12 rounded-full", vegOnly ? "bg-green-600 hover:bg-green-700 text-white" : "")}
                onClick={() => setVegOnly(!vegOnly)}
              >
                <Leaf className="mr-2 h-4 w-4" />
                Vegetarian
              </Button>
              <Button
                variant={spicyOnly ? "default" : "outline"}
                className={cn("h-12 rounded-full", spicyOnly ? "bg-red-500 hover:bg-red-600 text-white" : "")}
                onClick={() => setSpiceOnly(!spicyOnly)}
              >
                <Flame className="mr-2 h-4 w-4" />
                Spicy
              </Button>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 -mx-4 px-4 md:mx-0 md:px-0">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              className="rounded-full shrink-0 h-10 tf-press transition-all hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => setActiveCategory(undefined)}
            >
              All
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                className="rounded-full shrink-0 h-10 tf-press transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/60"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-card rounded-xl h-80 border" />
            ))}
          </div>
        ) : filteredDishes?.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">No dishes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearch("");
                setActiveCategory(undefined);
                setVegOnly(false);
                setSpiceOnly(false);
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes?.map((dish, i) => (
              <div key={dish.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 50}ms` }}>
                <DishCard dish={dish} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
