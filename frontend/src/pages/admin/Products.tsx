// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
// import { toast } from "sonner";

// interface Product {
//   product_id: string;
//   product_name: string;
//   farmer_name: string;
//   category: string;
//   price_1kg: number;
//   farming_method: string;
//   status: 'pending' | 'approved' | 'rejected';
//   availability: string;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       // Mock data
//       setProducts([
//         {
//           product_id: "PRD001",
//           product_name: "Organic Tomatoes",
//           farmer_name: "Ruchita Sharma",
//           category: "Vegetables",
//           price_1kg: 27.00,
//           farming_method: "Organic",
//           status: "pending",
//           availability: "In Stock"
//         },
//         {
//           product_id: "PRD002",
//           product_name: "Fresh Potatoes",
//           farmer_name: "Arush Kumar",
//           category: "Vegetables",
//           price_1kg: 25.00,
//           farming_method: "Organic",
//           status: "approved",
//           availability: "In Stock"
//         },
//       ]);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load products");
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (productId: string) => {
//     try {
//       // TODO: API call
//       toast.success("Product approved");
//       fetchProducts();
//     } catch (error) {
//       toast.error("Failed to approve product");
//     }
//   };

//   const handleReject = async (productId: string) => {
//     try {
//       // TODO: API call
//       toast.success("Product rejected");
//       fetchProducts();
//     } catch (error) {
//       toast.error("Failed to reject product");
//     }
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.farmer_name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filter === 'all' || product.status === filter;
//     return matchesSearch && matchesFilter;
//   });

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return <Badge className="bg-success text-success-foreground">Approved</Badge>;
//       case 'pending':
//         return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
//       case 'rejected':
//         return <Badge variant="destructive">Rejected</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Product Management</h1>
//         <p className="text-muted-foreground">Review and approve farmer products</p>
//       </div>

//       <Card className="p-6">
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={filter === 'all' ? 'default' : 'outline'}
//               onClick={() => setFilter('all')}
//             >
//               All
//             </Button>
//             <Button
//               variant={filter === 'pending' ? 'default' : 'outline'}
//               onClick={() => setFilter('pending')}
//             >
//               Pending
//             </Button>
//             <Button
//               variant={filter === 'approved' ? 'default' : 'outline'}
//               onClick={() => setFilter('approved')}
//             >
//               Approved
//             </Button>
//           </div>
//         </div>

//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product ID</TableHead>
//                 <TableHead>Product Name</TableHead>
//                 <TableHead>Farmer</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Price/kg</TableHead>
//                 <TableHead>Method</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : filteredProducts.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                     No products found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <TableRow key={product.product_id}>
//                     <TableCell className="font-mono text-sm">{product.product_id}</TableCell>
//                     <TableCell className="font-medium">{product.product_name}</TableCell>
//                     <TableCell>{product.farmer_name}</TableCell>
//                     <TableCell>{product.category}</TableCell>
//                     <TableCell className="font-semibold">₹{product.price_1kg}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">{product.farming_method}</Badge>
//                     </TableCell>
//                     <TableCell>{getStatusBadge(product.status)}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button size="sm" variant="ghost">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         {product.status === 'pending' && (
//                           <>
//                             <Button size="sm" variant="ghost" onClick={() => handleApprove(product.product_id)}>
//                               <CheckCircle className="w-4 h-4 text-success" />
//                             </Button>
//                             <Button size="sm" variant="ghost" onClick={() => handleReject(product.product_id)}>
//                               <XCircle className="w-4 h-4 text-destructive" />
//                             </Button>
//                           </>
//                         )}
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
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { adminAPI } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

interface Product {
  product_id: string;
  product_name: string;
  farmer_name: string;
  market_type: string;
  price_per_kg: number;
  farming_method: string;
  status: 'pending' | 'approved' | 'rejected';
  availability: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [filterMarketType, setFilterMarketType] = useState<'all' | 'KrishiSetu Market' | 'Bargaining Market'>('all');
  const [loading, setLoading] = useState(true);

  // State for view dialog
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filterStatus, filterMarketType]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Pass both filters to the API call
      const res = await adminAPI.getProducts(filterStatus, filterMarketType);
      const productsData = res?.data?.products ?? [];
      
      // Map data to frontend interface, handling potential nulls
      const normalizedProducts = productsData.map((product: any) => ({
        product_id: product.product_id,
        // FIX: The backend is already aliasing produce_name as product_name.
        // So we should use product.product_name directly.
        product_name: product.product_name ?? 'N/A',
        farmer_name: product.farmer_name ?? 'N/A',
        market_type: product.market_type ?? 'N/A',
        price_per_kg: parseFloat(product.price_per_kg) || 0,
        farming_method: product.farming_method ?? 'N/A',
        status: product.status ?? 'pending',
        availability: product.availability ?? 0
      }));
      
      setProducts(Array.isArray(normalizedProducts) ? normalizedProducts : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId: string) => {
    try {
      await adminAPI.approveProduct(productId);
      toast.success("Product approved");
      fetchProducts();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to approve product");
    }
  };

  const handleReject = async (productId: string) => {
    try {
      await adminAPI.rejectProduct(productId);
      toast.success("Product rejected");
      fetchProducts();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject product");
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.product_name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.farmer_name ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch; 
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Product Management</h1>
        <p className="text-muted-foreground">Review and approve farmer products</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {/* Filter by Market Type */}
            <Button
              variant={filterMarketType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterMarketType('all')}
            >
              All Markets
            </Button>
            <Button
              variant={filterMarketType === 'KrishiSetu Market' ? 'default' : 'outline'}
              onClick={() => setFilterMarketType('KrishiSetu Market')}
            >
              KrishiSetu
            </Button>
            <Button
              variant={filterMarketType === 'Bargaining Market' ? 'default' : 'outline'}
              onClick={() => setFilterMarketType('Bargaining Market')}
            >
              Bargaining
            </Button>
            {/* Filter by Status */}
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All Status
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('approved')}
            >
              Approved
            </Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Market Type</TableHead>
                <TableHead>Price/kg</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell className="font-mono text-sm">{product.product_id}</TableCell>
                    <TableCell className="font-medium">{product.product_name}</TableCell>
                    <TableCell>{product.farmer_name}</TableCell>
                    <TableCell>{product.market_type}</TableCell>
                    <TableCell className="font-semibold">₹{product.price_per_kg}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.farming_method}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(product)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {product.status === 'pending' && (
                          <>
                            <Button size="sm" variant="ghost" onClick={() => handleApprove(product.product_id)}>
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleReject(product.product_id)}>
                              <XCircle className="w-4 h-4 text-destructive" />
                            </Button>
                          </>
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
    
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Product Details</DialogTitle>
                  <DialogDescription>
                      Details for product ID: {selectedProduct?.product_id}
                  </DialogDescription>
              </DialogHeader>
              {selectedProduct && (
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Product Name:</span>
                          <span>{selectedProduct.product_name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Farmer:</span>
                          <span>{selectedProduct.farmer_name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Market Type:</span>
                          <span>{selectedProduct.market_type}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Price/kg:</span>
                          <span>₹{selectedProduct.price_per_kg}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Farming Method:</span>
                          <span>{selectedProduct.farming_method}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Current Status:</span>
                          <span>{getStatusBadge(selectedProduct.status)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <span className="font-medium">Availability:</span>
                          <span>{selectedProduct.availability} kg</span>
                      </div>
                  </div>
              )}
          </DialogContent>
      </Dialog>
    </div>
  );
}