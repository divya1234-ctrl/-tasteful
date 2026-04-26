import { Layout } from "@/components/layout/Layout";
import { useGetDish, useListDishes } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ArrowLeft, Star, Clock, Flame, Leaf, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { DishCard } from "@/components/DishCard";

export default function DishDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: dish, isLoading } = useGetDish(id || "", {
    query: { enabled: !!id, queryKey: ["/api/dishes", id] },
  });
  
  // Just grab some popular dishes for "You may also like"
  const { data: relatedDishes } = useListDishes({ featured: true });
  
  const { add } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 animate-pulse">
          <div className="h-8 w-24 bg-muted mb-8 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[4/3] bg-muted rounded-2xl"></div>
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dish) return <Layout><div className="p-20 text-center">Dish not found</div></Layout>;

  const handleAdd = () => {
    add(dish.id, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${dish.name} added to your order.`,
    });
  };

  const related = relatedDishes?.filter(d => d.id !== dish.id).slice(0, 4) || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Link href="/menu">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </a>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-lg border">
            <img 
              src={dish.imageUrl} 
              alt={dish.name} 
              className="object-cover w-full h-full animate-in fade-in duration-700" 
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {dish.isPopular && (
                <Badge className="bg-primary/90 backdrop-blur-sm border-none shadow-sm text-sm px-3 py-1">
                  Popular
                </Badge>
              )}
              {dish.isVegetarian && (
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-green-600 border-none shadow-sm text-sm px-3 py-1 flex items-center gap-1">
                  <Leaf size={14} /> Vegetarian
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="mb-2 text-primary font-medium tracking-wide text-sm uppercase">
              {dish.categoryName}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              {dish.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 font-serif italic">
              {dish.tagline}
            </p>
            
            <div className="flex items-center gap-6 mb-8 text-sm font-medium pb-8 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <Star className="text-yellow-500 fill-yellow-500 h-5 w-5" />
                <span className="text-base">{dish.rating.toFixed(1)} <span className="text-muted-foreground font-normal">({dish.ratingCount} reviews)</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-base">{dish.prepTimeMinutes} mins</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-base">{dish.calories} cal</span>
              </div>
              {dish.spiceLevel > 0 && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="text-red-500 fill-red-500 h-5 w-5" />
                  ))}
                </div>
              )}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8">
              {dish.description}
            </p>

            <div className="mb-8">
              <h3 className="font-bold font-serif mb-3 text-lg">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map(ing => (
                  <span key={ing} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-border/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="text-3xl font-bold font-serif text-primary">
                {formatCurrency(dish.price)}
              </div>
              
              <div className="flex flex-1 w-full gap-4 items-center sm:justify-end">
                <div className="flex items-center border border-input rounded-full bg-background p-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full shrink-0" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full shrink-0" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button size="lg" className="flex-1 sm:flex-none h-12 px-8 rounded-full shadow-lg" onClick={handleAdd}>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Order
                </Button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pt-16 border-t border-border">
            <h2 className="text-3xl font-serif font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(d => (
                <DishCard key={d.id} dish={d} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
