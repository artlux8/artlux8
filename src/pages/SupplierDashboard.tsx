import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  RefreshCw,
  ExternalLink,
  Settings,
  Link2,
  Link2Off,
  Mail,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SupplierIntegration {
  id: string;
  supplier: string;
  is_connected: boolean;
  api_status: string;
  last_sync_at: string | null;
  webhook_url: string | null;
}


interface OrderFulfillment {
  id: string;
  order_id: string;
  shopify_order_id: string | null;
  supplier: string;
  status: string;
  tracking_number: string | null;
  tracking_url: string | null;
  carrier: string | null;
  customer_name: string | null;
  customer_email: string | null;
  total_amount: number | null;
  currency: string;
  created_at: string;
  shipped_at: string | null;
  notes: string | null;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-500", label: "Pending" },
  processing: { icon: RefreshCw, color: "text-blue-500", label: "Processing" },
  shipped: { icon: Truck, color: "text-purple-500", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-500", label: "Delivered" },
  cancelled: { icon: AlertCircle, color: "text-red-500", label: "Cancelled" },
  failed: { icon: AlertCircle, color: "text-red-500", label: "Failed" },
};

const SupplierDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<SupplierIntegration[]>([]);
  const [fulfillments, setFulfillments] = useState<OrderFulfillment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [integrationsRes, fulfillmentsRes] = await Promise.all([
        supabase.from("supplier_integrations").select("*"),
        supabase.from("order_fulfillments").select("*").order("created_at", { ascending: false }).limit(50),
      ]);

      if (integrationsRes.data) setIntegrations(integrationsRes.data);
      if (fulfillmentsRes.data) setFulfillments(fulfillmentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load supplier data");
    } finally {
      setLoading(false);
    }
  };

  const updateIntegrationStatus = async (supplier: string, isConnected: boolean) => {
    try {
      const { error } = await supabase
        .from("supplier_integrations")
        .update({ 
          is_connected: isConnected, 
          api_status: isConnected ? "connected" : "disconnected",
          last_sync_at: isConnected ? new Date().toISOString() : null
        })
        .eq("supplier", supplier);

      if (error) throw error;
      
      toast.success(`${supplier} marked as ${isConnected ? "connected" : "disconnected"}`);
      fetchData();
    } catch (error) {
      console.error("Error updating integration:", error);
      toast.error("Failed to update integration status");
    }
  };

  const sendStatusEmail = async (order: OrderFulfillment, status: "shipped" | "delivered") => {
    if (!order.customer_email) {
      toast.error("No customer email on this order");
      return;
    }

    try {
      toast.loading(`Sending ${status} notification...`, { id: "email-sending" });
      
      const { data, error } = await supabase.functions.invoke("order-status-email", {
        body: {
          order_id: order.order_id,
          status: status,
          customer_email: order.customer_email,
          customer_name: order.customer_name || "Valued Customer",
          tracking_number: order.tracking_number,
          tracking_url: order.tracking_url,
          carrier: order.carrier,
          order_total: order.total_amount,
          currency: order.currency,
        },
      });

      if (error) throw error;

      toast.success(`${status === "shipped" ? "Shipped" : "Delivered"} email sent!`, { id: "email-sending" });
      fetchData();
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error(`Failed to send email: ${error.message}`, { id: "email-sending" });
    }
  };

  const getSupplierStats = (supplier: string) => {
    const supplierOrders = fulfillments.filter(f => supplier === "all" || f.supplier === supplier);
    return {
      total: supplierOrders.length,
      pending: supplierOrders.filter(f => f.status === "pending").length,
      processing: supplierOrders.filter(f => f.status === "processing").length,
      shipped: supplierOrders.filter(f => f.status === "shipped").length,
      delivered: supplierOrders.filter(f => f.status === "delivered").length,
    };
  };

  const filteredFulfillments = selectedSupplier === "all" 
    ? fulfillments 
    : fulfillments.filter(f => f.supplier === selectedSupplier);

  const stats = getSupplierStats(selectedSupplier);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-background to-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-logo font-bold text-foreground">
                Supplier <span className="text-gold">Dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Track fulfillment status from Supliful & OKCapsule
              </p>
            </div>
            <Button onClick={fetchData} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Integration Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {integrations.map((integration) => (
            <Card key={integration.id} className={`border-2 ${integration.is_connected ? "border-green-500/30" : "border-border"}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {integration.is_connected ? (
                      <Link2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Link2Off className="w-6 h-6 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="capitalize text-lg">{integration.supplier}</CardTitle>
                      <CardDescription>
                        {integration.supplier === "supliful" 
                          ? "Private label supplements"
                          : "OKCapsule fulfillment"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={integration.is_connected ? "default" : "secondary"} className={integration.is_connected ? "bg-green-500" : ""}>
                    {integration.is_connected ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Sync:</span>
                    <span className="text-foreground">
                      {integration.last_sync_at 
                        ? new Date(integration.last_sync_at).toLocaleString()
                        : "Never"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">API Status:</span>
                    <Badge variant="outline" className="capitalize">{integration.api_status}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant={integration.is_connected ? "destructive" : "default"}
                      onClick={() => updateIntegrationStatus(integration.supplier, !integration.is_connected)}
                      className="flex-1"
                    >
                      {integration.is_connected ? "Mark Disconnected" : "Mark Connected"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(
                        integration.supplier === "supliful" 
                          ? "https://app.supliful.com" 
                          : "https://portal.okcapsule.app",
                        "_blank"
                      )}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-gold" />
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total Orders</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-foreground">{stats.processing}</div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-foreground">{stats.shipped}</div>
                <div className="text-xs text-muted-foreground">Shipped</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-foreground">{stats.delivered}</div>
                <div className="text-xs text-muted-foreground">Delivered</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fulfillment Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Order Fulfillments</CardTitle>
                <CardDescription>Track order status from all suppliers</CardDescription>
              </div>
              <Tabs value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="supliful">Supliful</TabsTrigger>
                  <TabsTrigger value="okcapsule">OKCapsule</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gold" />
                <p className="text-muted-foreground mt-2">Loading...</p>
              </div>
            ) : filteredFulfillments.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground">No orders yet</h3>
                <p className="text-muted-foreground">Orders will appear here once they're placed</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Supplier</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tracking</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Notify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFulfillments.map((order) => {
                      const StatusIcon = statusConfig[order.status]?.icon || Clock;
                      const statusColor = statusConfig[order.status]?.color || "text-muted-foreground";
                      const hasEmailSent = order.notes?.includes("email sent");
                      return (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary/30">
                          <td className="py-3 px-4 text-sm font-mono text-foreground">
                            {order.order_id.slice(0, 8)}...
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="capitalize">
                              {order.supplier}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`flex items-center gap-2 ${statusColor}`}>
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm capitalize">{order.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-foreground">
                            <div>
                              {order.customer_name || "—"}
                              {order.customer_email && (
                                <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-foreground">
                            {order.total_amount 
                              ? `${order.currency} ${order.total_amount.toFixed(2)}`
                              : "—"}
                          </td>
                          <td className="py-3 px-4">
                            {order.tracking_number ? (
                              <a 
                                href={order.tracking_url || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-gold hover:underline flex items-center gap-1"
                              >
                                {order.tracking_number.slice(0, 10)}...
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {(order.status === "shipped" || order.status === "processing") && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                                  onClick={() => sendStatusEmail(order, "shipped")}
                                  title="Send shipped notification"
                                >
                                  <Truck className="w-3 h-3 mr-1" />
                                  <Mail className="w-3 h-3" />
                                </Button>
                              )}
                              {order.status === "delivered" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                  onClick={() => sendStatusEmail(order, "delivered")}
                                  title="Send delivered notification"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  <Mail className="w-3 h-3" />
                                </Button>
                              )}
                              {hasEmailSent && (
                                <Badge variant="outline" className="text-xs text-green-500 border-green-500/30">
                                  Sent
                                </Badge>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Integration Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Badge className="bg-blue-500">Supliful</Badge>
                </h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Log into <a href="https://app.supliful.com" target="_blank" className="text-gold hover:underline">app.supliful.com</a></li>
                  <li>Go to Settings → Integrations</li>
                  <li>Connect Shopify store: <code className="bg-secondary px-1 rounded">artlux8-ypxf4.myshopify.com</code></li>
                  <li>Enable automatic order forwarding</li>
                  <li>Mark as connected above when done</li>
                </ol>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Badge className="bg-purple-500">OKCapsule</Badge>
                </h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Log into <a href="https://portal.okcapsule.app" target="_blank" className="text-gold hover:underline">portal.okcapsule.app</a></li>
                  <li>Go to Integration Settings</li>
                  <li>Connect Shopify store: <code className="bg-secondary px-1 rounded">artlux8-ypxf4.myshopify.com</code></li>
                  <li>Configure webhook for order updates</li>
                  <li>Mark as connected above when done</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SupplierDashboard;
