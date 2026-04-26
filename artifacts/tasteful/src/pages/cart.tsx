import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/use-cart";
import { useListDishes } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, updateQty, remove, totals, clear } = useCart();
  const { data: dishes } = useListDishes();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg mb-8">Looks like you haven't added anything to your order yet.</p>
          <Link href="/menu">
            <Button size="lg" className="h-14 px-8 rounded-full text-lg">
              Browse Menu
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-serif font-bold mb-10">Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
                <h2 className="font-serif font-bold text-xl">Order Items</h2>
                <Button variant="ghost" size="sm" onClick={clear} className="text-muted-foreground hover:text-destructive">
                  Clear cart
                </Button>
              </div>
              <div className="divide-y divide-border">
                {items.map((item) => {
                  const dish = dishes?.find((d) => d.id === item.dishId);
                  if (!dish) return null;

                  return (
                    <div key={item.dishId} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-24 h-24 object-cover rounded-xl border shrink-0" 
                      />
                      <div className="flex-1">
                        <Link href={`/dishes/${dish.id}`}>
                          <a className="font-bold text-lg hover:text-primary transition-colors block mb-1">
                            {dish.name}
                          </a>
                        </Link>
                        <div className="text-primary font-medium">
                          {formatCurrency(dish.price)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                        <div className="flex items-center border border-input rounded-full bg-background p-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full" 
                            onClick={() => updateQty(item.dishId, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full" 
                            onClick={() => updateQty(item.dishId, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="font-bold text-lg min-w-[80px] text-right">
                          {formatCurrency(dish.price * item.quantity)}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                          onClick={() => remove(item.dishId)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border shadow-sm p-6 sticky top-24">
              <h2 className="font-serif font-bold text-xl mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">{formatCurrency(totals.deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">{formatCurrency(totals.tax)}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-serif font-bold text-3xl text-primary">{formatCurrency(totals.total)}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full h-14 rounded-full text-lg shadow-lg">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
