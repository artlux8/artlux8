import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle2, Clock, ExternalLink, Loader2, Search, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrderTracking {
  orderId: string;
  status: string;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  customerName: string | null;
  createdAt: string;
}

const statusConfig: Record<string, { icon: typeof Package; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-500", label: "Processing" },
  processing: { icon: Package, color: "text-blue-500", label: "Preparing" },
  shipped: { icon: Truck, color: "text-accent", label: "Shipped" },
  in_transit: { icon: Truck, color: "text-accent", label: "In Transit" },
  delivered: { icon: CheckCircle2, color: "text-green-500", label: "Delivered" },
  cancelled: { icon: AlertCircle, color: "text-red-500", label: "Cancelled" },
};

const OrderTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderTracking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackByOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('order-tracking', {
        body: { orderId: orderId.trim() }
      });

      if (error) throw error;
      setOrders(data.orders || []);
      
      if (data.orders?.length === 0) {
        toast.info("No orders found with this order ID");
      }
    } catch (err) {
      console.error('Tracking error:', err);
      toast.error("Failed to look up order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('order-tracking', {
        body: { email: email.trim() }
      });

      if (error) throw error;
      setOrders(data.orders || []);
      
      if (data.orders?.length === 0) {
        toast.info("No orders found with this email");
      }
    } catch (err) {
      console.error('Tracking error:', err);
      toast.error("Failed to look up order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="order" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="order">Track by Order ID</TabsTrigger>
          <TabsTrigger value="email">Track by Email</TabsTrigger>
        </TabsList>

        <TabsContent value="order">
          <form onSubmit={handleTrackByOrder} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="orderId" className="sr-only">Order ID</Label>
              <Input
                id="orderId"
                placeholder="Enter your order ID (e.g., #1234)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button type="submit" disabled={isLoading || !orderId.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">Track</span>
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="email">
          <form onSubmit={handleTrackByEmail} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button type="submit" disabled={isLoading || !email.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">Track</span>
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Results */}
      {hasSearched && (
        <div className="mt-6">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No orders found. Please check your order ID or email.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 bg-card"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-secondary ${statusInfo.color}`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Order {order.orderId}
                          </p>
                          <p className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </p>
                        </div>
                      </div>

                      {order.trackingUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Track Package
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {order.carrier && (
                        <div>
                          <p className="text-muted-foreground text-xs">Carrier</p>
                          <p className="font-medium text-foreground">{order.carrier}</p>
                        </div>
                      )}
                      {order.trackingNumber && (
                        <div>
                          <p className="text-muted-foreground text-xs">Tracking #</p>
                          <p className="font-medium text-foreground font-mono text-xs">{order.trackingNumber}</p>
                        </div>
                      )}
                      {order.shippedAt && (
                        <div>
                          <p className="text-muted-foreground text-xs">Shipped</p>
                          <p className="font-medium text-foreground">{formatDate(order.shippedAt)}</p>
                        </div>
                      )}
                      {order.deliveredAt && (
                        <div>
                          <p className="text-muted-foreground text-xs">Delivered</p>
                          <p className="font-medium text-foreground">{formatDate(order.deliveredAt)}</p>
                        </div>
                      )}
                    </div>

                    {/* Status Timeline */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs">
                        {['pending', 'processing', 'shipped', 'delivered'].map((step, i) => {
                          const stepOrder = ['pending', 'processing', 'shipped', 'in_transit', 'delivered'];
                          const currentIndex = stepOrder.indexOf(order.status);
                          const stepIndex = stepOrder.indexOf(step === 'delivered' ? 'delivered' : step);
                          const isCompleted = stepIndex <= currentIndex && order.status !== 'cancelled';
                          const isCurrent = step === order.status || (step === 'shipped' && order.status === 'in_transit');

                          return (
                            <div key={step} className="flex flex-col items-center flex-1">
                              <div
                                className={`w-3 h-3 rounded-full mb-1 ${
                                  isCompleted
                                    ? 'bg-accent'
                                    : 'bg-muted'
                                } ${isCurrent ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}
                              />
                              <span className={`capitalize ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step === 'pending' ? 'Ordered' : step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracker;