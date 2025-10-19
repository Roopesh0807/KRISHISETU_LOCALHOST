// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Search, CheckCircle, XCircle, Ban, Eye } from "lucide-react";
// import { toast } from "sonner";

// interface Farmer {
//   farmer_id: string;
//   name: string;
//   email: string;
//   phone_number: string;
//   crops_grown: string;
//   farm_size: number;
//   status: 'active' | 'pending' | 'banned';
//   total_earnings: number;
// }

// export default function FarmersPage() {
//   const [farmers, setFarmers] = useState<Farmer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFarmers();
//   }, []);

//   const fetchFarmers = async () => {
//     try {
//       // TODO: Replace with actual API call
//       // const response = await fetch('/api/admin/farmers');
//       // const data = await response.json();
      
//       // Mock data for now
//       setFarmers([
//         {
//           farmer_id: "KRST01FR001",
//           name: "Ruchita Sharma",
//           email: "ruchita@gmail.com",
//           phone_number: "9886543210",
//           crops_grown: "Tomatoes, Wheat",
//           farm_size: 2.5,
//           status: "active",
//           total_earnings: 45000
//         },
//         {
//           farmer_id: "KRST01FR002",
//           name: "Arush Kumar",
//           email: "arush@gmail.com",
//           phone_number: "9876543211",
//           crops_grown: "Potatoes, Carrots",
//           farm_size: 3.0,
//           status: "active",
//           total_earnings: 38000
//         },
//         {
//           farmer_id: "KRST01FR003",
//           name: "Pavan Reddy",
//           email: "pavan@gmail.com",
//           phone_number: "9876543212",
//           crops_grown: "Onions, Garlic",
//           farm_size: 1.8,
//           status: "pending",
//           total_earnings: 0
//         },
//       ]);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load farmers");
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (farmerId: string) => {
//     try {
//       // TODO: API call to approve farmer
//       toast.success("Farmer approved successfully");
//       fetchFarmers();
//     } catch (error) {
//       toast.error("Failed to approve farmer");
//     }
//   };

//   const handleReject = async (farmerId: string) => {
//     try {
//       // TODO: API call to reject farmer
//       toast.success("Farmer rejected");
//       fetchFarmers();
//     } catch (error) {
//       toast.error("Failed to reject farmer");
//     }
//   };

//   const handleBan = async (farmerId: string) => {
//     try {
//       // TODO: API call to ban farmer
//       toast.success("Farmer banned");
//       fetchFarmers();
//     } catch (error) {
//       toast.error("Failed to ban farmer");
//     }
//   };

//   const filteredFarmers = farmers.filter(farmer =>
//     farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     farmer.farmer_id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'active':
//         return <Badge className="bg-success text-success-foreground">Active</Badge>;
//       case 'pending':
//         return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
//       case 'banned':
//         return <Badge variant="destructive">Banned</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Farmer Management</h1>
//           <p className="text-muted-foreground">Manage farmer accounts and approvals</p>
//         </div>
//       </div>

//       <Card className="p-6">
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search farmers by name, email, or ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Farmer ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Crops</TableHead>
//                 <TableHead>Farm Size</TableHead>
//                 <TableHead>Earnings</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : filteredFarmers.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                     No farmers found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredFarmers.map((farmer) => (
//                   <TableRow key={farmer.farmer_id}>
//                     <TableCell className="font-mono text-sm">{farmer.farmer_id}</TableCell>
//                     <TableCell className="font-medium">{farmer.name}</TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         <div>{farmer.email}</div>
//                         <div className="text-muted-foreground">{farmer.phone_number}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-sm">{farmer.crops_grown}</TableCell>
//                     <TableCell>{farmer.farm_size} acres</TableCell>
//                     <TableCell className="font-semibold">₹{farmer.total_earnings.toLocaleString()}</TableCell>
//                     <TableCell>{getStatusBadge(farmer.status)}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button size="sm" variant="ghost">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         {farmer.status === 'pending' && (
//                           <>
//                             <Button size="sm" variant="ghost" onClick={() => handleApprove(farmer.farmer_id)}>
//                               <CheckCircle className="w-4 h-4 text-success" />
//                             </Button>
//                             <Button size="sm" variant="ghost" onClick={() => handleReject(farmer.farmer_id)}>
//                               <XCircle className="w-4 h-4 text-destructive" />
//                             </Button>
//                           </>
//                         )}
//                         {farmer.status === 'active' && (
//                           <Button size="sm" variant="ghost" onClick={() => handleBan(farmer.farmer_id)}>
//                             <Ban className="w-4 h-4 text-destructive" />
//                           </Button>
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
import { Search, CheckCircle, XCircle, Ban, Eye } from "lucide-react";
import { toast } from "sonner";
import { adminAPI } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

interface Farmer {
  farmer_id: string;
  name: string;
  email: string;
  phone_number: string;
  total_orders: number;
  total_earnings: number;
  status: 'active' | 'pending' | 'banned' | 'approved' | 'rejected';
}

interface FarmerDetails {
  farmer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  aadhaar_no: string;
  residential_address: string;
  farm_address: string;
  farm_size: number;
  crops_grown: string;
  farming_method: string;
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // State for rejection dialog
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);

  // State for view dialog
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerDetails | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getFarmers();
      const farmersData = res?.data?.farmers ?? [];

      const normalizedFarmers = farmersData.map((farmer: any) => ({
        farmer_id: farmer.farmer_id,
        name: farmer.farmer_name ?? 'N/A',
        email: farmer.email ?? 'N/A',
        phone_number: farmer.phone_number ?? 'N/A',
        total_orders: farmer.total_orders ?? 0,
        total_earnings: farmer.total_earnings ?? 0,
        status: farmer.status ?? 'unknown',
      }));

      setFarmers(Array.isArray(normalizedFarmers) ? normalizedFarmers : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load farmers");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (farmerId: string) => {
    try {
      await adminAPI.approveFarmer(farmerId);
      toast.success("Farmer approved successfully");
      fetchFarmers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to approve farmer");
    }
  };

  const handleRejectClick = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    setIsRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (!selectedFarmerId || !rejectionReason.trim()) {
      toast.error("Rejection reason cannot be empty.");
      return;
    }
    try {
      await adminAPI.rejectFarmer(selectedFarmerId, { reason: rejectionReason });
      toast.success("Farmer rejected successfully.");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      fetchFarmers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject farmer.");
    }
  };

  const handleBan = async (farmerId: string) => {
    try {
      await adminAPI.banFarmer(farmerId);
      toast.success("Farmer banned successfully");
      fetchFarmers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to ban farmer");
    }
  };

  const handleView = async (farmerId: string) => {
    setViewLoading(true);
    setIsViewDialogOpen(true);
    try {
      const res = await adminAPI.getFarmerDetails(farmerId);
      setSelectedFarmer(res.data.farmer);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load farmer details");
      setIsViewDialogOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  const filteredFarmers = farmers.filter(farmer =>
    (farmer.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.email ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.farmer_id ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'banned':
        return <Badge variant="destructive">Banned</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmer Management</h1>
          <p className="text-muted-foreground">Manage farmer accounts and approvals</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search farmers by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
                </TableRow>
              ) : filteredFarmers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No farmers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredFarmers.map((farmer) => (
                  <TableRow key={farmer.farmer_id}>
                    <TableCell className="font-mono text-sm">{farmer.farmer_id}</TableCell>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{farmer.email}</div>
                        <div className="text-muted-foreground">{farmer.phone_number}</div>
                      </div>
                    </TableCell>
                    <TableCell>{farmer.total_orders}</TableCell>
                    <TableCell className="font-semibold">₹{farmer.total_earnings.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(farmer.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(farmer.farmer_id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {farmer.status === 'pending' && (
                          <>
                            <Button size="sm" variant="ghost" onClick={() => handleApprove(farmer.farmer_id)}>
                              <CheckCircle className="w-4 h-4 text-success" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleRejectClick(farmer.farmer_id)}>
                              <XCircle className="w-4 h-4 text-destructive" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => handleBan(farmer.farmer_id)}>
                          <Ban className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Farmer</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this farmer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <Button onClick={handleReject}>Submit Rejection</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Farmer Details</DialogTitle>
            <DialogDescription>
              {viewLoading ? "Loading..." : "View detailed information about the farmer."}
            </DialogDescription>
          </DialogHeader>
          {!viewLoading && selectedFarmer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Name:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{`${selectedFarmer.first_name} ${selectedFarmer.last_name}`}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Contact:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.email} / {selectedFarmer.phone_number}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">D.O.B:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.dob}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Gender:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.gender}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Aadhaar:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.aadhaar_no}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Address:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.residential_address}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Farm:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.farm_address} ({selectedFarmer.farm_size} acres)</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Crops:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.crops_grown}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 text-sm font-medium">Method:</span>
                <span className="col-span-3 text-sm text-muted-foreground">{selectedFarmer.farming_method}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}