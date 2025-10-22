// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { Search, Eye, DollarSign } from "lucide-react";
// import { toast } from "sonner";

// interface Consumer {
//   consumer_id: string;
//   name: string;
//   email: string;
//   phone_number: string;
//   total_orders: number;
//   wallet_balance: number;
//   status: 'active' | 'inactive';
// }

// export default function ConsumersPage() {
//   const [consumers, setConsumers] = useState<Consumer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchConsumers();
//   }, []);

//   const fetchConsumers = async () => {
//     try {
//       // Mock data
//       setConsumers([
//         {
//           consumer_id: "KRST01CS001",
//           name: "Amit Sharma",
//           email: "amit.sharma@example.com",
//           phone_number: "9876500010",
//           total_orders: 23,
//           wallet_balance: 500,
//           status: "active"
//         },
//         {
//           consumer_id: "KRST01CS002",
//           name: "Neha Verma",
//           email: "neha.verma@example.com",
//           phone_number: "9876500011",
//           total_orders: 15,
//           wallet_balance: 1200,
//           status: "active"
//         },
//       ]);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to load consumers");
//       setLoading(false);
//     }
//   };

//   const filteredConsumers = consumers.filter(consumer =>
//     consumer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     consumer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     consumer.consumer_id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Consumer Management</h1>
//         <p className="text-muted-foreground">View and manage consumer accounts</p>
//       </div>

//       <Card className="p-6">
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search consumers..."
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
//                 <TableHead>Consumer ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Orders</TableHead>
//                 <TableHead>Wallet</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : filteredConsumers.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
//                     No consumers found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredConsumers.map((consumer) => (
//                   <TableRow key={consumer.consumer_id}>
//                     <TableCell className="font-mono text-sm">{consumer.consumer_id}</TableCell>
//                     <TableCell className="font-medium">{consumer.name}</TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         <div>{consumer.email}</div>
//                         <div className="text-muted-foreground">{consumer.phone_number}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>{consumer.total_orders}</TableCell>
//                     <TableCell className="font-semibold">₹{consumer.wallet_balance}</TableCell>
//                     <TableCell>
//                       <Badge className="bg-success text-success-foreground">
//                         {consumer.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Button size="sm" variant="ghost">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button size="sm" variant="ghost">
//                           <DollarSign className="w-4 h-4" />
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
import { Search, Eye, DollarSign, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { adminAPI } from "../../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

interface Consumer {
  consumer_id: string;
  name: string;
  email: string;
  phone_number: string;
  total_orders: number;
  wallet_balance: number;
  status: 'active' | 'inactive';
}

// Interface for Wallet Update State
interface WalletUpdate {
  consumerId: string | null;
  amount: number;
  operation: 'add' | 'deduct';
}

export default function ConsumersPage() {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // State for Wallet Dialog
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [walletUpdate, setWalletUpdate] = useState<WalletUpdate>({
    consumerId: null,
    amount: 0,
    operation: 'add',
  });

  // State for View Dialog (Placeholder)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);

  useEffect(() => {
    fetchConsumers();
  }, []);

  const fetchConsumers = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getConsumers();
      const consumersData = res?.data?.consumers ?? [];

      // Map the backend data keys to the frontend interface keys
      const normalizedConsumers = consumersData.map((consumer: any) => ({
        consumer_id: consumer.consumer_id,
        name: consumer.consumer_name ?? 'N/A', // Mapped from 'consumer_name' to 'name'
        email: consumer.email ?? 'N/A',
        phone_number: consumer.phone_number ?? 'N/A',
        total_orders: consumer.total_orders ?? 0,
        wallet_balance: parseFloat(consumer.wallet_balance ?? 0),
        status: consumer.status ?? 'inactive',
      }));
      
      setConsumers(Array.isArray(normalizedConsumers) ? normalizedConsumers : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load consumers");
    } finally {
      setLoading(false);
    }
  };

  const handleWalletClick = (consumerId: string, operation: 'add' | 'deduct') => {
    setWalletUpdate({ consumerId, amount: 0, operation });
    setIsWalletDialogOpen(true);
  };

  const handleUpdateWallet = async () => {
    if (!walletUpdate.consumerId || walletUpdate.amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      // NOTE: We assume you have a 'updateConsumerWallet' function in api.ts
      // that sends the PUT request with { amount, operation }
      await adminAPI.updateConsumerWallet(walletUpdate.consumerId, {
        amount: walletUpdate.amount,
        operation: walletUpdate.operation,
      });

      toast.success(`Wallet balance ${walletUpdate.operation === 'add' ? 'added to' : 'deducted from'} successfully.`);
      setIsWalletDialogOpen(false);
      setWalletUpdate({ consumerId: null, amount: 0, operation: 'add' });
      fetchConsumers(); // Refresh data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update wallet");
    }
  };

  // Placeholder for View functionality
  const handleView = (consumer: Consumer) => {
    setSelectedConsumer(consumer);
    setIsViewDialogOpen(true);
  };

  const filteredConsumers = consumers.filter(consumer =>
    consumer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consumer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consumer.consumer_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Consumer Management</h1>
        <p className="text-muted-foreground">View and manage consumer accounts</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search consumers..."
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
                <TableHead>Consumer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
                </TableRow>
              ) : filteredConsumers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No consumers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredConsumers.map((consumer) => (
                  <TableRow key={consumer.consumer_id}>
                    <TableCell className="font-mono text-sm">{consumer.consumer_id}</TableCell>
                    <TableCell className="font-medium">{consumer.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{consumer.email}</div>
                        <div className="text-muted-foreground">{consumer.phone_number}</div>
                      </div>
                    </TableCell>
                    <TableCell>{consumer.total_orders}</TableCell>
                    <TableCell className="font-semibold">₹{consumer.wallet_balance.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={consumer.status === 'active' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                        {consumer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(consumer)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        {/* Wallet Add Button */}
                        <Button size="sm" variant="ghost" onClick={() => handleWalletClick(consumer.consumer_id, 'add')} title="Add Funds">
                          <Plus className="w-4 h-4 text-success" />
                        </Button>

                        {/* Wallet Deduct Button */}
                        <Button size="sm" variant="ghost" onClick={() => handleWalletClick(consumer.consumer_id, 'deduct')} title="Deduct Funds">
                          <Minus className="w-4 h-4 text-destructive" />
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
      
      {/* Wallet Update Dialog */}
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{walletUpdate.operation === 'add' ? 'Add Funds' : 'Deduct Funds'}</DialogTitle>
            <DialogDescription>
              Adjust the wallet balance for consumer **{walletUpdate.consumerId}**.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="amount"
                type="number"
                placeholder="Amount (₹)"
                value={walletUpdate.amount || ''}
                onChange={(e) => setWalletUpdate({ ...walletUpdate, amount: parseFloat(e.target.value) || 0 })}
                min="0.01"
              />
            </div>
          </div>
          <Button type="submit" onClick={handleUpdateWallet}>
            {walletUpdate.operation === 'add' ? 'Add to Wallet' : 'Deduct from Wallet'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog (Placeholder) */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Consumer Details: {selectedConsumer?.name}</DialogTitle>
            <DialogDescription>
              Basic information for quick review.
            </DialogDescription>
          </DialogHeader>
          {selectedConsumer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">ID:</span>
                <span className="col-span-2 text-sm text-muted-foreground">{selectedConsumer.consumer_id}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Email:</span>
                <span className="col-span-2 text-sm text-muted-foreground">{selectedConsumer.email}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Phone:</span>
                <span className="col-span-2 text-sm text-muted-foreground">{selectedConsumer.phone_number}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Total Orders:</span>
                <span className="col-span-2 text-sm text-muted-foreground">{selectedConsumer.total_orders}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Balance:</span>
                <span className="col-span-2 text-sm font-bold text-success">₹{selectedConsumer.wallet_balance.toFixed(2)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}