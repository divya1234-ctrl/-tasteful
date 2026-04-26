import { Dish } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Plus, Star, Clock, Flame, Leaf } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DishCardProps {
  dish: Dish;
  featured?: boolean;
}

export function DishCard({ dish, featured = false }: DishCardProps) {
  const { add } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation since it's inside a Link
    add(dish.id, 1);
    toast({
      title: "Added to cart",
      description: `${dish.name} added to your order.`,
      duration: 2000,
    });
  };

  return (
    <Link href={`/dishes/${dish.id}`}>
      <a className="group flex flex-col h-full bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted tf-shine">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {dish.isPopular && (
              <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-sm border-none shadow-sm">
                Popular
              </Badge>
            )}
            {dish.isVegetarian && (
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-green-600 border-none shadow-sm flex gap-1 items-center">
                <Leaf size={12} /> Veg
              </Badge>
            )}
          </div>
          {dish.spiceLevel > 0 && (
            <div className="absolute top-3 right-3 flex gap-0.5 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                <Flame key={i} size={12} className="text-red-500 fill-red-500" />
              ))}
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="font-serif font-bold text-lg leading-tight line-clamp-2">{dish.name}</h3>
            <span className="font-medium text-lg text-primary whitespace-nowrap">
              {formatCurrency(dish.price)}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {dish.tagline || dish.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span>{dish.rating.toFixed(1)} ({dish.ratingCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{dish.prepTimeMinutes}m</span>
              </div>
            </div>
            
            <Button
              size="sm"
              className="rounded-full w-9 h-9 p-0 shrink-0 shadow-sm tf-pulse-ring tf-press transition-all hover:rotate-90 hover:scale-110"
              onClick={handleAdd}
            >
              <Plus size={16} />
              <span className="sr-only">Add</span>
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
}
