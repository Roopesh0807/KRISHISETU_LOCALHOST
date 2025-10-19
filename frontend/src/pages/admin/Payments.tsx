// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Badge } from "../../components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
// import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
// import { StatCard } from "../../components/admin/StatCard";

// interface Payment {
//   payment_id: string;
//   order_id: string;
//   consumer_name: string;
//   amount: number;
//   payment_method: string;
//   razorpay_payment_id: string;
//   status: 'success' | 'pending' | 'failed' | 'refunded';
//   payment_date: string;
// }

// export default function PaymentsPage() {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Mock data
//     setPayments([
//       {
//         payment_id: "PAY001",
//         order_id: "ORD001",
//         consumer_name: "Amit Sharma",
//         amount: 135,
//         payment_method: "UPI",
//         razorpay_payment_id: "pay_abc123def456",
//         status: "success",
//         payment_date: "2025-01-04 14:30"
//       },
//       {
//         payment_id: "PAY002",
//         order_id: "ORD002",
//         consumer_name: "Neha Verma",
//         amount: 250,
//         payment_method: "Card",
//         razorpay_payment_id: "pay_xyz789ghi012",
//         status: "success",
//         payment_date: "2025-01-05 10:15"
//       },
//     ]);
//     setLoading(false);
//   }, []);

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'success':
//         return <Badge className="bg-success text-success-foreground">Success</Badge>;
//       case 'pending':
//         return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
//       case 'failed':
//         return <Badge variant="destructive">Failed</Badge>;
//       case 'refunded':
//         return <Badge variant="secondary">Refunded</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   const totalRevenue = payments.reduce((sum, p) => p.status === 'success' ? sum + p.amount : sum, 0);
//   const successRate = ((payments.filter(p => p.status === 'success').length / payments.length) * 100).toFixed(1);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Payment Management</h1>
//         <p className="text-muted-foreground">Monitor transactions and Razorpay integration</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard
//           title="Total Revenue"
//           value={`₹${totalRevenue.toLocaleString()}`}
//           icon={DollarSign}
//           trend={{ value: "+15%", isPositive: true }}
//         />
//         <StatCard
//           title="Success Rate"
//           value={`${successRate}%`}
//           icon={TrendingUp}
//         />
//         <StatCard
//           title="Failed Payments"
//           value={payments.filter(p => p.status === 'failed').length}
//           icon={AlertCircle}
//         />
//       </div>

//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
//         <div className="rounded-lg border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Payment ID</TableHead>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Consumer</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Method</TableHead>
//                 <TableHead>Razorpay ID</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
//                 </TableRow>
//               ) : payments.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                     No payments found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 payments.map((payment) => (
//                   <TableRow key={payment.payment_id}>
//                     <TableCell className="font-mono text-sm">{payment.payment_id}</TableCell>
//                     <TableCell className="font-mono text-sm">{payment.order_id}</TableCell>
//                     <TableCell>{payment.consumer_name}</TableCell>
//                     <TableCell className="font-semibold">₹{payment.amount}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">{payment.payment_method}</Badge>
//                     </TableCell>
//                     <TableCell className="font-mono text-xs">{payment.razorpay_payment_id}</TableCell>
//                     <TableCell>{getStatusBadge(payment.status)}</TableCell>
//                     <TableCell className="text-sm text-muted-foreground">{payment.payment_date}</TableCell>
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
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { adminAPI } from "../../lib/api";

interface Payment {
  payment_id: string;
  order_id: string;
  consumer_name: string;
  amount: number;
  payment_method: string;
  razorpay_payment_id: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  payment_date: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await adminAPI.getPayments();
        const payload = (res as any)?.data?.payments ?? [];
        setPayments(Array.isArray(payload) ? payload : []);
      } catch (e) {
        // handle error optionally
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-success text-success-foreground">Success</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalRevenue = payments.reduce((sum, p) => p.status === 'success' ? sum + parseFloat(p.amount.toString()) : sum, 0);

  // Correct calculation for Success Rate based on your new logic
  const totalCompletedTransactions = payments.filter(p => p.status === 'success' || p.status === 'pending'|| p.status === 'failed').length;
  const successfulTransactions = payments.filter(p => p.status === 'success'|| p.status === 'pending').length;

  const successRate = totalCompletedTransactions > 0
    ? ((successfulTransactions / totalCompletedTransactions) * 100).toFixed(1)
    : '0.0';

  const failedPaymentsCount = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-muted-foreground">Monitor transactions and Razorpay integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: "+15%", isPositive: true }}
        />
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={TrendingUp}
        />
        <StatCard
          title="Failed Payments"
          value={failedPaymentsCount}
          icon={AlertCircle}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Consumer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Razorpay ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">Loading...</TableCell>
                </TableRow>
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No payments found
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.payment_id}>
                    <TableCell className="font-mono text-sm">{payment.payment_id}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.order_id}</TableCell>
                    <TableCell>{payment.consumer_name}</TableCell>
                    <TableCell className="font-semibold">₹{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.payment_method}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{payment.razorpay_payment_id}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}