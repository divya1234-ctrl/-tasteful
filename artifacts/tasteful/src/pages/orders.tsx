import { Layout } from "@/components/layout/Layout";
import { useListOrders } from "@workspace/api-client-react";
import { Link } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Receipt, ChevronRight } from "lucide-react";

export default function OrdersList() {
  const { data: orders, isLoading } = useListOrders();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received": return <Badge variant="secondary">Received</Badge>;
      case "preparing": return <Badge className="bg-orange-500 hover:bg-orange-600">Preparing</Badge>;
      case "on_the_way": return <Badge className="bg-blue-500 hover:bg-blue-600">On the way</Badge>;
      case "delivered": return <Badge className="bg-green-600 hover:bg-green-700">Delivered</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-10">Your Orders</h1>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-card rounded-2xl border animate-pulse" />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">When you place an order, it will appear here.</p>
            <Link href="/menu">
              <a className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground h-11 px-8 font-medium hover:bg-primary/90 transition-colors">
                Start Ordering
              </a>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <a className="block bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-6 animate-in slide-in-from-bottom-4 group" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg">Order #{order.orderNumber}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                    <div className="text-xl font-serif font-bold text-primary">
                      {formatCurrency(order.total)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-3 overflow-hidden">
                        {order.items.slice(0, 4).map((item, idx) => (
                          <img 
                            key={idx}
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-background object-cover"
                            src={item.imageUrl}
                            alt={item.dishName}
                          />
                        ))}
                        {order.items.length > 4 && (
                          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-background bg-muted text-xs font-medium">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium ml-3">
                        {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      </span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                      View details <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
