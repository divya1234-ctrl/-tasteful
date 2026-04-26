import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder, useListDishes, getListOrdersQueryKey } from "@workspace/api-client-react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(1, "Phone number is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const { data: dishes } = useListDishes();
  const createOrder = useCreateOrder();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      deliveryAddress: "",
      notes: "",
    },
  });

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Cart is empty</h1>
          <Link href="/menu">
            <Button>Return to Menu</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const order = await createOrder.mutateAsync({
        data: {
          ...data,
          items: items.map(item => ({
            dishId: item.dishId,
            quantity: item.quantity
          }))
        }
      });
      
      toast({
        title: "Order placed successfully!",
        description: `Order #${order.orderNumber} is confirmed.`,
      });
      
      clear();
      queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
      setLocation(`/orders/${order.id}`);
    } catch (err) {
      toast({
        title: "Failed to place order",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-serif font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
              <h2 className="font-serif font-bold text-2xl mb-6">Delivery Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, Apt 4B" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Notes (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Leave at the front door..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 rounded-full text-lg shadow-lg mt-8"
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending ? "Processing..." : `Pay ${formatCurrency(totals.total)}`}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 bg-muted/30 border-b">
                <h2 className="font-serif font-bold text-xl">Order Summary</h2>
              </div>
              <div className="p-6 border-b max-h-[40vh] overflow-y-auto">
                <div className="space-y-4">
                  {items.map(item => {
                    const dish = dishes?.find(d => d.id === item.dishId);
                    if (!dish) return null;
                    return (
                      <div key={item.dishId} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded border overflow-hidden shrink-0">
                            <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-medium block">{dish.name}</span>
                            <span className="text-muted-foreground text-xs">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-medium">{formatCurrency(dish.price * item.quantity)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="p-6 bg-muted/10 space-y-3 text-sm">
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
                <div className="pt-3 mt-3 border-t flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-2xl text-primary">{formatCurrency(totals.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
