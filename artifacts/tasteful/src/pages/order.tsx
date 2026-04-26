import { Layout } from "@/components/layout/Layout";
import { useGetOrder } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChefHat, Bike, Home, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useGetOrder(id || "", {
    query: { enabled: !!id, queryKey: ["/api/orders", id] }
  });

  if (isLoading) {
    return <Layout><div className="container mx-auto py-20 px-4 animate-pulse"><div className="h-64 bg-muted rounded-2xl"></div></div></Layout>;
  }

  if (!order) {
    return <Layout><div className="p-20 text-center">Order not found</div></Layout>;
  }

  const steps = [
    { id: 'received', label: 'Order Received', icon: CheckCircle2 },
    { id: 'preparing', label: 'Preparing', icon: ChefHat },
    { id: 'on_the_way', label: 'On The Way', icon: Bike },
    { id: 'delivered', label: 'Delivered', icon: Home },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
        <Link href="/orders">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </a>
        </Link>

        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center mb-12 border border-primary/20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-2">Order #{order.orderNumber} has been placed successfully.</p>
          <p className="font-medium text-primary">Estimated ready time: {format(new Date(order.estimatedReadyAt), "h:mm a")}</p>
        </div>

        {/* Status Tracker */}
        <div className="bg-card rounded-2xl border shadow-sm p-8 mb-12">
          <h2 className="font-serif font-bold text-xl mb-8">Order Status</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full hidden sm:block"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full hidden sm:block transition-all duration-1000" 
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            ></div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const Icon = step.icon;
                
                return (
                  <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500",
                      isCompleted 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "bg-card border-muted text-muted-foreground"
                    )}>
                      <Icon size={20} />
                    </div>
                    <div className={cn(
                      "font-medium",
                      isCurrent ? "text-foreground font-bold" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif font-bold text-2xl mb-6">Order Details</h2>
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.dishName} className="w-16 h-16 rounded object-cover border" />
                    <div className="flex-1">
                      <div className="font-bold">{item.dishName}</div>
                      <div className="text-muted-foreground text-sm">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-muted/10 space-y-3 text-sm border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">{formatCurrency(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">{formatCurrency(order.tax)}</span>
                </div>
                <div className="pt-3 mt-3 border-t flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-xl text-primary">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif font-bold text-2xl mb-6">Delivery Info</h2>
            <div className="bg-card rounded-2xl border shadow-sm p-6 space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Customer</div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm">{order.customerEmail}</div>
                <div className="text-sm">{order.customerPhone}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Delivery Address</div>
                <div className="font-medium whitespace-pre-wrap">{order.deliveryAddress}</div>
              </div>

              {order.notes && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Notes</div>
                  <div className="text-sm italic">{order.notes}</div>
                </div>
              )}
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Order Time</div>
                <div className="text-sm">{format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
