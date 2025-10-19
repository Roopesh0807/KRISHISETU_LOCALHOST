// import { useEffect, useState } from "react";
// import { StatCard } from "../../components/admin/StatCard";
// import { Users, ShoppingCart, Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
// import { Card } from "../../components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// const COLORS = ['hsl(199, 89%, 48%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(233, 47%, 25%)'];

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalFarmers: 0,
//     totalConsumers: 0,
//     totalProducts: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//     flashDeals: 0
//   });

//   // Sample data for charts
//   const revenueData = [
//     { month: 'Jan', revenue: 45000 },
//     { month: 'Feb', revenue: 52000 },
//     { month: 'Mar', revenue: 48000 },
//     { month: 'Apr', revenue: 61000 },
//     { month: 'May', revenue: 55000 },
//     { month: 'Jun', revenue: 67000 },
//   ];

//   const orderTypeData = [
//     { name: 'Instant', value: 400 },
//     { name: 'Subscription', value: 300 },
//     { name: 'Flash Deals', value: 200 },
//     { name: 'Bargaining', value: 150 },
//   ];

//   const topCropsData = [
//     { crop: 'Tomato', orders: 450 },
//     { crop: 'Potato', orders: 380 },
//     { crop: 'Onion', orders: 320 },
//     { crop: 'Rice', orders: 290 },
//     { crop: 'Wheat', orders: 250 },
//   ];

//   useEffect(() => {
//     // TODO: Fetch real stats from API
//     // fetch('/api/admin/stats')
//     setStats({
//       totalFarmers: 1234,
//       totalConsumers: 5678,
//       totalProducts: 456,
//       totalRevenue: 234567,
//       pendingOrders: 89,
//       flashDeals: 12
//     });
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
//         <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard
//           title="Total Farmers"
//           value={stats.totalFarmers.toLocaleString()}
//           icon={Users}
//           trend={{ value: "+12%", isPositive: true }}
//         />
//         <StatCard
//           title="Total Consumers"
//           value={stats.totalConsumers.toLocaleString()}
//           icon={ShoppingCart}
//           trend={{ value: "+18%", isPositive: true }}
//         />
//         <StatCard
//           title="Active Products"
//           value={stats.totalProducts}
//           icon={Package}
//           trend={{ value: "+5%", isPositive: true }}
//         />
//         <StatCard
//           title="Total Revenue"
//           value={`₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
//           icon={DollarSign}
//           trend={{ value: "+24%", isPositive: true }}
//         />
//         <StatCard
//           title="Pending Orders"
//           value={stats.pendingOrders}
//           icon={TrendingUp}
//           trend={{ value: "-8%", isPositive: false }}
//         />
//         <StatCard
//           title="Active Flash Deals"
//           value={stats.flashDeals}
//           icon={AlertCircle}
//         />
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Chart */}
//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
//               <YAxis stroke="hsl(var(--muted-foreground))" />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'hsl(var(--card))', 
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }} 
//               />
//               <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Order Types */}
//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Order Types Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={orderTypeData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {orderTypeData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Top Crops */}
//         <Card className="p-6 lg:col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Top Selling Crops</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topCropsData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="crop" stroke="hsl(var(--muted-foreground))" />
//               <YAxis stroke="hsl(var(--muted-foreground))" />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'hsl(var(--card))', 
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }} 
//               />
//               <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//     </div>
//   );
// }






















import { useEffect, useState } from "react";
import { StatCard } from "../../components/admin/StatCard";
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

import { adminAPI } from "../../lib/api";

const COLORS = ['hsl(199, 89%, 48%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(233, 47%, 25%)'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalConsumers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeFlashDeals: 0
  });

  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [orderTypeData, setOrderTypeData] = useState<any[]>([]);
  const [topCropsData, setTopCropsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getAnalyticsdashboard(),
        ]);

        const statsData = statsRes?.data?.stats ?? {};
        
        setStats({
          totalFarmers: statsData.totalFarmers ?? 0,
          totalConsumers: statsData.totalConsumers ?? 0,
          totalProducts: statsData.totalProducts ?? 0, 
          totalRevenue: parseFloat(statsData.totalRevenue) || 0,
          pendingOrders: statsData.pendingOrders ?? 0,
          activeFlashDeals: statsData.activeFlashDeals ?? 0,
        });

        const analytics = analyticsRes?.data?.data ?? {};
        
        setRevenueData(Array.isArray(analytics.revenueTrend) ? analytics.revenueTrend : []);
        setOrderTypeData(Array.isArray(analytics.orderTypeDistribution) ? analytics.orderTypeDistribution : []);
        setTopCropsData(Array.isArray(analytics.topCrops) ? analytics.topCrops : []);

      } catch (e) {
        console.error("Dashboard failed to load data:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-lg font-semibold text-muted-foreground">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Farmers"
          value={stats.totalFarmers.toLocaleString()}
          icon={Users}
          trend={{ value: "+12%", isPositive: true }}
        />
        <StatCard
          title="Total Consumers"
          value={stats.totalConsumers.toLocaleString()}
          icon={ShoppingCart}
          trend={{ value: "+18%", isPositive: true }}
        />
        <StatCard
          title="Active Products"
          value={stats.totalProducts.toLocaleString()}
          icon={Package}
          trend={{ value: "+5%", isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: "+24%", isPositive: true }}
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders.toLocaleString()}
          icon={TrendingUp}
          trend={{ value: "-8%", isPositive: false }}
        />
        <StatCard
          title="Active Flash Deals"
          value={stats.activeFlashDeals.toLocaleString()}
          icon={AlertCircle}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Order Types */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Order Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Crops */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Top Selling Crops</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCropsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="crop" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}