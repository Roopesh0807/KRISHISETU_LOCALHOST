// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Search, Eye, Package } from "lucide-react";
// import { toast } from "sonner";

// interface Order {
//   order_id: string;
//   order_type: 'instant' | 'subscription' | 'flash_deal' | 'bargaining';
//   consumer_name: string;
//   farmer_name: string;
//   product_name: string;
//   quantity: number;
//   amount: number;
//   status: 'pending' | 'processing' | 'delivered' | 'cancelled';
//   order_date: string;
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState<'all' | 'instant' | 'subscription' | 'flash_deal' | 'bargaining'>('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       // Mock data
//       setOrders([
//         {
//           order_id: "ORD001",
//           order_type: "instant",
//           consumer_name: "Amit Sharma",
//           farmer_name: "Ruchita Sharma",
//           product_name: "Organic Tomatoes",
//           quantity: 5,
//           amount: 135,
//           status: "delivered",
//           order_date: "2025-01-04"
//         },
//         {
//           order_id: "ORD002",
//           order_type: "subscription",
//           consumer_name: "Neha Verma",
//           farmer_name: "Arush Kumar",
//           product_name: "Fresh Potatoes",
//           quantity: 10,
//           amount: 250,
//           status: "processing",
//           order_date: "2025-01-05"
//         },
//       ]);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load orders");
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.consumer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.farmer_name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = filterType === 'all' || order.order_type === filterType;
//     return matchesSearch && matchesType;
//   });

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
//       case 'processing':
//         return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
//       case 'pending':
//         return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
//       case 'cancelled':
//         return <Badge variant="destructive">Cancelled</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const getTypeBadge = (type: string) => {
//     const typeMap: Record<string, { label: string; className: string }> = {
//       instant: { label: 'Instant', className: 'bg-accent text-accent-foreground' },
//       subscription: { label: 'Subscription', className: 'bg-primary text-primary-foreground' },
//       flash_deal: { label: 'Flash Deal', className: 'bg-warning text-warning-foreground' },
//       bargaining: { label: 'Bargaining', className: 'bg-secondary text-secondary-foreground' }
//     };
//     const config = typeMap[type] || { label: type, className: '' };
//     return <Badge className={config.className}>{config.label}</Badge>;
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Order Management</h1>
//         <p className="text-muted-foreground">Track and manage all orders</p>
//       </div>

//       <Card className="p-6">
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button variant={filterType === 'all' ? 'default' : 'outline'} onClick={() => setFilterType('all')}>All</Button>
//             <Button variant={filterType === 'instant' ? 'default' : 'outline'} onClick={() => setFilterType('instant')}>Instant</Button>
//             <Button variant={filterType === 'subscription' ? 'default' : 'outline'} onClick={() => setFilterType('subscription')}>Subscription</Button>
//             <Button variant={filterType === 'flash_deal' ? 'default' : 'outline'} onClick={() => setFilterType('flash_deal')}>Flash Deals</Button>
//           </div>
//         </div>

//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Consumer</TableHead>
//                 <TableHead>Farmer</TableHead>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Qty</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={10} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : filteredOrders.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
//                     No orders found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredOrders.map((order) => (
//                   <TableRow key={order.order_id}>
//                     <TableCell className="font-mono text-sm">{order.order_id}</TableCell>
//                     <TableCell>{getTypeBadge(order.order_type)}</TableCell>
//                     <TableCell>{order.consumer_name}</TableCell>
//                     <TableCell>{order.farmer_name}</TableCell>
//                     <TableCell>{order.product_name}</TableCell>
//                     <TableCell>{order.quantity}kg</TableCell>
//                     <TableCell className="font-semibold">₹{order.amount}</TableCell>
//                     <TableCell>{getStatusBadge(order.status)}</TableCell>
//                     <TableCell className="text-sm text-muted-foreground">{order.order_date}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button size="sm" variant="ghost">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button size="sm" variant="ghost">
//                           <Package className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
//     </div>
//   );
// }















// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Search, Eye, Package } from "lucide-react";
// import { toast } from "sonner";
// import { adminAPI } from "../../lib/api";

// interface Order {
//   order_id: string;
//   order_type: 'instant' | 'subscription' | 'flash_deal' | 'bargaining';
//   consumer_name: string;
//   farmer_name: string;
//   product_name: string;
//   quantity: number;
//   amount: number;
//   status: 'pending' | 'processing' | 'delivered' | 'cancelled';
//   order_date: string;
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState<'all' | 'instant' | 'subscription' | 'flash_deal' | 'bargaining'>('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await adminAPI.getOrders();
//       const payload = (res as any)?.data?.data ?? (res as any)?.data;
//       setOrders(Array.isArray(payload) ? payload : []);
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.consumer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.farmer_name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = filterType === 'all' || order.order_type === filterType;
//     return matchesSearch && matchesType;
//   });

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
//       case 'processing':
//         return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
//       case 'pending':
//         return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
//       case 'cancelled':
//         return <Badge variant="destructive">Cancelled</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const getTypeBadge = (type: string) => {
//     const typeMap: Record<string, { label: string; className: string }> = {
//       instant: { label: 'Instant', className: 'bg-accent text-accent-foreground' },
//       subscription: { label: 'Subscription', className: 'bg-primary text-primary-foreground' },
//       flash_deal: { label: 'Flash Deal', className: 'bg-warning text-warning-foreground' },
//       bargaining: { label: 'Bargaining', className: 'bg-secondary text-secondary-foreground' }
//     };
//     const config = typeMap[type] || { label: type, className: '' };
//     return <Badge className={config.className}>{config.label}</Badge>;
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Order Management</h1>
//         <p className="text-muted-foreground">Track and manage all orders</p>
//       </div>

//       <Card className="p-6">
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button variant={filterType === 'all' ? 'default' : 'outline'} onClick={() => setFilterType('all')}>All</Button>
//             <Button variant={filterType === 'instant' ? 'default' : 'outline'} onClick={() => setFilterType('instant')}>Instant</Button>
//             <Button variant={filterType === 'subscription' ? 'default' : 'outline'} onClick={() => setFilterType('subscription')}>Subscription</Button>
//             <Button variant={filterType === 'flash_deal' ? 'default' : 'outline'} onClick={() => setFilterType('flash_deal')}>Flash Deals</Button>
//             <Button variant={filterType === 'bargaining' ? 'default' : 'outline'} onClick={() => setFilterType('bargaining')}>Bargaining</Button>
//           </div>
//         </div>

//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Consumer</TableHead>
//                 <TableHead>Farmer</TableHead>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Qty</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={10} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : filteredOrders.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
//                     No orders found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredOrders.map((order) => (
//                   <TableRow key={order.order_id}>
//                     <TableCell className="font-mono text-sm">{order.order_id}</TableCell>
//                     <TableCell>{getTypeBadge(order.order_type)}</TableCell>
//                     <TableCell>{order.consumer_name}</TableCell>
//                     <TableCell>{order.farmer_name}</TableCell>
//                     <TableCell>{order.product_name}</TableCell>
//                     <TableCell>{order.quantity}kg</TableCell>
//                     <TableCell className="font-semibold">₹{order.amount}</TableCell>
//                     <TableCell>{getStatusBadge(order.status)}</TableCell>
//                     <TableCell className="text-sm text-muted-foreground">{order.order_date}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button size="sm" variant="ghost">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button size="sm" variant="ghost">
//                           <Package className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </Card>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Search, Eye, Package, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { adminAPI } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

interface Order {
  orderid: string; // Corrected from order_id to match DB
  order_type: 'instant' | 'subscription' | 'flash_deal' | 'bargain';
  consumer_name: string;
  farmer_name: string;
  produce_name: string;
  quantity: number;
  amount: number;
  status: 'Fulfilled' | 'Unfulfilled';
  payment_status: string;
  order_date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'instant' | 'subscription' | 'flash_deal' | 'bargain'>('all');
  const [loading, setLoading] = useState(true);

  // State for View Dialog
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getOrders();
      const ordersData = res?.data?.orders ?? [];
      const normalizedOrders = ordersData.map((order: any) => ({
        ...order,
        orderid: order.orderid,
        order_type: order.order_type.toLowerCase(),
        produce_name: order.produce_name,
        consumer_name: order.consumer_name ?? 'N/A',
        farmer_name: order.farmer_name ?? 'N/A',
        status: order.status,
        // Corrected line: Parse the amount to a floating-point number
        amount: parseFloat(order.amount), 
      }));
      setOrders(Array.isArray(normalizedOrders) ? normalizedOrders : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: 'Fulfilled' | 'Unfulfilled') => {
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      toast.success(`Order ${orderId} status updated to ${status}.`);
      fetchOrders(); // Refresh the list after updating
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update order status");
    }
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.orderid ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.consumer_name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.farmer_name ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || order.order_type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Fulfilled':
        return <Badge className="bg-success text-success-foreground">Fulfilled</Badge>;
      case 'Unfulfilled':
        return <Badge className="bg-warning text-warning-foreground">Unfulfilled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; className: string }> = {
      instant: { label: 'Instant', className: 'bg-accent text-accent-foreground' },
      subscription: { label: 'Subscription', className: 'bg-primary text-primary-foreground' },
      flash_deal: { label: 'Flash Deal', className: 'bg-warning text-warning-foreground' },
      bargain: { label: 'Bargain', className: 'bg-secondary text-secondary-foreground' }
    };
    const config = typeMap[type] || { label: type, className: '' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Track and manage all orders</p>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filterType === 'all' ? 'default' : 'outline'} onClick={() => setFilterType('all')}>All</Button>
            <Button variant={filterType === 'instant' ? 'default' : 'outline'} onClick={() => setFilterType('instant')}>Instant</Button>
            <Button variant={filterType === 'subscription' ? 'default' : 'outline'} onClick={() => setFilterType('subscription')}>Subscription</Button>
            <Button variant={filterType === 'flash_deal' ? 'default' : 'outline'} onClick={() => setFilterType('flash_deal')}>Flash Deals</Button>
            <Button variant={filterType === 'bargain' ? 'default' : 'outline'} onClick={() => setFilterType('bargain')}>Bargaining</Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Consumer</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">Loading...</TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.orderid}>
                    <TableCell className="font-mono text-sm">{order.orderid}</TableCell>
                    <TableCell>{getTypeBadge(order.order_type)}</TableCell>
                    <TableCell>{order.consumer_name}</TableCell>
                    <TableCell>{order.farmer_name}</TableCell>
                    <TableCell>{order.produce_name}</TableCell>
                    <TableCell>{order.quantity}kg</TableCell>
                    <TableCell className="font-semibold">₹{order.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.order_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(order)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.status === 'Unfulfilled' && (
                          <Button size="sm" variant="ghost" onClick={() => handleUpdateStatus(order.orderid, 'Fulfilled')} title="Mark as Fulfilled">
                            <CheckCircle className="w-4 h-4 text-success" />
                          </Button>
                        )}
                        {order.status === 'Fulfilled' && (
                          <Button size="sm" variant="ghost" onClick={() => handleUpdateStatus(order.orderid, 'Unfulfilled')} title="Mark as Unfulfilled">
                            <XCircle className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Details for order ID: {selectedOrder?.orderid}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Order ID:</span>
                <span>{selectedOrder.orderid}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Consumer:</span>
                <span>{selectedOrder.consumer_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Farmer:</span>
                <span>{selectedOrder.farmer_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Product:</span>
                <span>{selectedOrder.produce_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Quantity:</span>
                <span>{selectedOrder.quantity} kg</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Amount:</span>
                <span>₹{selectedOrder.amount.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Status:</span>
                <span>{getStatusBadge(selectedOrder.status)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Payment:</span>
                <span>{selectedOrder.payment_status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(selectedOrder.order_date).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}