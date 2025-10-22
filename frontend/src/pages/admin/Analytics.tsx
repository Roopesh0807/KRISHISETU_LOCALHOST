// import { useState } from "react";
// import { Card } from "../../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
// import { TrendingUp, DollarSign, ShoppingCart, Users, Activity, Package } from "lucide-react";
// import { Badge } from "../../components/ui/badge";

// const revenueData = [
//   { month: "Jan", revenue: 45000, orders: 320, profit: 12000 },
//   { month: "Feb", revenue: 52000, orders: 385, profit: 15000 },
//   { month: "Mar", revenue: 48000, orders: 350, profit: 13500 },
//   { month: "Apr", revenue: 61000, orders: 425, profit: 18000 },
//   { month: "May", revenue: 70000, orders: 480, profit: 21000 },
//   { month: "Jun", revenue: 78000, orders: 520, profit: 24000 },
// ];

// const userGrowthData = [
//   { month: "Jan", farmers: 120, consumers: 850 },
//   { month: "Feb", farmers: 145, consumers: 920 },
//   { month: "Mar", farmers: 165, consumers: 1050 },
//   { month: "Apr", farmers: 185, consumers: 1180 },
//   { month: "May", farmers: 210, consumers: 1320 },
//   { month: "Jun", farmers: 235, consumers: 1450 },
// ];

// const topCropsData = [
//   { name: "Tomato", value: 3200, color: "hsl(var(--primary))" },
//   { name: "Potato", value: 2800, color: "hsl(var(--accent))" },
//   { name: "Onion", value: 2400, color: "hsl(var(--success))" },
//   { name: "Carrot", value: 1900, color: "hsl(var(--warning))" },
//   { name: "Others", value: 1500, color: "hsl(var(--muted))" },
// ];

// const orderTypeData = [
//   { type: "Instant", count: 1200, percentage: 45 },
//   { type: "Subscription", count: 800, percentage: 30 },
//   { type: "Community", count: 450, percentage: 17 },
//   { type: "Bargain", count: 220, percentage: 8 },
// ];

// export default function Analytics() {
//   const [timeRange, setTimeRange] = useState("6m");

//   const stats = [
//     {
//       title: "Total Revenue",
//       value: "₹3,54,000",
//       change: "+23.5%",
//       trend: "up",
//       icon: DollarSign,
//       color: "text-success"
//     },
//     {
//       title: "Total Orders",
//       value: "2,480",
//       change: "+18.2%",
//       trend: "up",
//       icon: ShoppingCart,
//       color: "text-primary"
//     },
//     {
//       title: "Active Users",
//       value: "1,685",
//       change: "+12.7%",
//       trend: "up",
//       icon: Users,
//       color: "text-accent"
//     },
//     {
//       title: "Avg Order Value",
//       value: "₹1,428",
//       change: "+5.3%",
//       trend: "up",
//       icon: Activity,
//       color: "text-warning"
//     },
//   ];

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             Advanced Analytics
//           </h1>
//           <p className="text-muted-foreground mt-1">Comprehensive business insights and metrics</p>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger className="w-[150px]">
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1m">Last Month</SelectItem>
//             <SelectItem value="3m">Last 3 Months</SelectItem>
//             <SelectItem value="6m">Last 6 Months</SelectItem>
//             <SelectItem value="1y">Last Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, idx) => (
//           <Card key={idx} className="stat-card-premium animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
//             <div className="flex items-center justify-between mb-2">
//               <stat.icon className={`h-5 w-5 ${stat.color}`} />
//               <Badge variant="default" className="text-xs">
//                 {stat.change}
//               </Badge>
//             </div>
//             <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
//             <p className="text-3xl font-bold mt-1">{stat.value}</p>
//           </Card>
//         ))}
//       </div>

//       <Tabs defaultValue="revenue" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="revenue">Revenue</TabsTrigger>
//           <TabsTrigger value="users">User Growth</TabsTrigger>
//           <TabsTrigger value="products">Products</TabsTrigger>
//           <TabsTrigger value="orders">Order Types</TabsTrigger>
//         </TabsList>

//         <TabsContent value="revenue" className="space-y-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Revenue & Orders Trend</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <AreaChart data={revenueData}>
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
//                   </linearGradient>
//                   <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 <Legend />
//                 <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Revenue (₹)" />
//                 <Area type="monotone" dataKey="profit" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} name="Profit (₹)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </Card>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card className="p-6 border-l-4 border-l-success">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Profit</p>
//                   <p className="text-3xl font-bold text-success">₹1,03,500</p>
//                 </div>
//                 <TrendingUp className="h-8 w-8 text-success" />
//               </div>
//               <p className="text-sm text-muted-foreground mt-2">+29.2% from last period</p>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-primary">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Avg Monthly Revenue</p>
//                   <p className="text-3xl font-bold">₹59,000</p>
//                 </div>
//                 <DollarSign className="h-8 w-8 text-primary" />
//               </div>
//               <p className="text-sm text-muted-foreground mt-2">Steady growth trend</p>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-accent">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Profit Margin</p>
//                   <p className="text-3xl font-bold text-accent">29.2%</p>
//                 </div>
//                 <Activity className="h-8 w-8 text-accent" />
//               </div>
//               <p className="text-sm text-muted-foreground mt-2">Above industry average</p>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="users" className="space-y-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={userGrowthData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="farmers" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} name="Farmers" />
//                 <Line type="monotone" dataKey="consumers" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 4 }} name="Consumers" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h4 className="font-semibold mb-4">User Statistics</h4>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
//                   <span className="text-sm font-medium">Total Farmers</span>
//                   <span className="text-2xl font-bold text-success">235</span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
//                   <span className="text-sm font-medium">Total Consumers</span>
//                   <span className="text-2xl font-bold text-accent">1,450</span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
//                   <span className="text-sm font-medium">Consumer-Farmer Ratio</span>
//                   <span className="text-2xl font-bold text-primary">6.2:1</span>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h4 className="font-semibold mb-4">Growth Metrics</h4>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Farmer Growth</span>
//                     <span className="font-semibold text-success">+95.8%</span>
//                   </div>
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full bg-success w-[95.8%]"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Consumer Growth</span>
//                     <span className="font-semibold text-accent">+70.6%</span>
//                   </div>
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full bg-accent w-[70.6%]"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Overall Platform Growth</span>
//                     <span className="font-semibold text-primary">+75.2%</span>
//                   </div>
//                   <div className="h-2 bg-muted rounded-full overflow-hidden">
//                     <div className="h-full bg-primary w-[75.2%]"></div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="products" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Top Crops by Orders</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={topCropsData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }: any) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {topCropsData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Crop Performance</h3>
//               <div className="space-y-3">
//                 {topCropsData.map((crop, idx) => (
//                   <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }}></div>
//                       <span className="font-medium">{crop.name}</span>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold">{crop.value}</p>
//                       <p className="text-xs text-muted-foreground">orders</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="orders" className="space-y-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Order Distribution by Type</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={orderTypeData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {orderTypeData.map((order, idx) => (
//               <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
//                 <div className="flex items-center justify-between mb-3">
//                   <Package className="h-5 w-5 text-primary" />
//                   <Badge>{order.percentage}%</Badge>
//                 </div>
//                 <h4 className="text-sm text-muted-foreground mb-1">{order.type} Orders</h4>
//                 <p className="text-3xl font-bold">{order.count}</p>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }














import { useState,useEffect, useCallback } from "react";
import { Card } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users, Activity, Package } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { adminAPI } from "../../lib/api";

// --- INTERFACE DEFINITIONS START ---

interface MonthlyData {
  month: string;
  revenue: number;
  orders: number;
  profit: number;
}

interface UserGrowthData {
  month: string;
  farmers: number;
  consumers: number;
}

interface TopCropData {
  name: string;
  value: number;
  color: string;
  percentage: number;
  [key: string]: any;
}

interface OrderTypeData {
  type: string;
  count: number;
  percentage: number;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  avgOrderValue: number;
  revenueChange: number;
  ordersChange: number;
  usersChange: number;
  aovChange: number;
}

interface AnalyticsData {
  revenue: MonthlyData[];
  userGrowth: UserGrowthData[];
  topCrops: TopCropData[];
  orderTypes: OrderTypeData[];
  stats: Stats;
}
// --- INTERFACE DEFINITIONS END ---


const defaultStats: Stats = {
  totalRevenue: 0,
  totalOrders: 0,
  totalUsers: 0,
  avgOrderValue: 0,
  revenueChange: 0,
  ordersChange: 0,
  usersChange: 0,
  aovChange: 0,
};

const INITIAL_DATA: AnalyticsData = {
    revenue: [],
    userGrowth: [],
    topCrops: [],
    orderTypes: [],
    stats: defaultStats,
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData>(INITIAL_DATA);
    
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      // Pass the selected timeRange as a query parameter
      const response = await adminAPI.getAnalytics(timeRange);
        
      const fetchedData = response.data.data || {};
        
      setData({
          // Ensure all required fields exist, even if empty
          revenue: fetchedData.revenue || [],
          userGrowth: fetchedData.userGrowth || [],
          topCrops: fetchedData.topCrops || [],
          orderTypes: fetchedData.orderTypes || [],
          stats: fetchedData.stats || defaultStats,
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
      setData(INITIAL_DATA);
    } finally {
      setLoading(false);
    }
  }, [timeRange]); // Dependency on timeRange to refetch when it changes

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const latestFarmers = data.userGrowth[data.userGrowth.length - 1]?.farmers ?? 0;
  const latestConsumers = data.userGrowth[data.userGrowth.length - 1]?.consumers ?? 0;
  const farmerConsumerRatio = latestFarmers > 0
    ? (latestConsumers / latestFarmers).toFixed(1)
    : '0';

  const totalRevenueDisplay = (data.stats.totalRevenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const avgOrderValueDisplay = (data.stats.avgOrderValue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenueDisplay}`,
      change: `${(data.stats.revenueChange ?? 0) >= 0 ? '+' : ''}${Math.abs(data.stats.revenueChange ?? 0)}%`,
      trend: (data.stats.revenueChange ?? 0) >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Total Orders",
      value: (data.stats.totalOrders ?? 0).toLocaleString(),
      change: `${(data.stats.ordersChange ?? 0) >= 0 ? '+' : ''}${Math.abs(data.stats.ordersChange ?? 0)}%`,
      trend: (data.stats.ordersChange ?? 0) >= 0 ? "up" : "down",
      icon: ShoppingCart,
      color: "text-primary"
    },
    {
      title: "Active Users",
      value: (data.stats.totalUsers ?? 0).toLocaleString(),
      change: `${(data.stats.usersChange ?? 0) >= 0 ? '+' : ''}${Math.abs(data.stats.usersChange ?? 0)}%`,
      trend: (data.stats.usersChange ?? 0) >= 0 ? "up" : "down",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Avg Order Value",
      value: `₹${avgOrderValueDisplay}`,
      change: `${(data.stats.aovChange ?? 0) >= 0 ? '+' : ''}${Math.abs(data.stats.aovChange ?? 0)}%`,
      trend: (data.stats.aovChange ?? 0) >= 0 ? "up" : "down",
      icon: Activity,
      color: "text-warning"
    },
  ];

  // --- LOGIC FOR DYNAMIC USER GROWTH CARD START ---
  const calculateGrowthPercentage = (current: number, initial: number): { percentage: string, absValue: number } => {
    if (initial === 0) return { percentage: current > 0 ? '+100%' : '0%', absValue: current > 0 ? 100 : 0 };
    const change = ((current - initial) / initial) * 100;
    const absValue = Math.min(Math.abs(change), 100); // Cap for progress bar visualization
    const percentage = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    return { percentage, absValue };
  };

  const firstUserEntry = data.userGrowth[0];
  const lastUserEntry = data.userGrowth[data.userGrowth.length - 1];

  const farmerGrowth = calculateGrowthPercentage(
    lastUserEntry?.farmers ?? 0,
    firstUserEntry?.farmers ?? 0
  );
  const consumerGrowth = calculateGrowthPercentage(
    lastUserEntry?.consumers ?? 0,
    firstUserEntry?.consumers ?? 0
  );

  const totalInitialUsers = (firstUserEntry?.farmers ?? 0) + (firstUserEntry?.consumers ?? 0);
  const totalCurrentUsers = (lastUserEntry?.farmers ?? 0) + (lastUserEntry?.consumers ?? 0);
  const overallGrowth = calculateGrowthPercentage(
    totalCurrentUsers,
    totalInitialUsers
  );
  // --- LOGIC FOR DYNAMIC USER GROWTH CARD END ---


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Comprehensive business insights and metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="stat-card-premium animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <Badge variant={stat.trend === "up" ? "default" : "destructive"} className="text-xs">
                {stat.change}
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Order Types</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue & Orders Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data.revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Revenue (₹)" />
                <Area type="monotone" dataKey="profit" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} name="Profit (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-l-4 border-l-success">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Profit</p>
                  <p className="text-3xl font-bold text-success">
                    {/* Assuming a 30% mock profit margin for display */}
                    ₹{((data.stats.totalRevenue ?? 0) * 0.30).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                 {/* This static text could be made dynamic with more backend data, but kept as is for now */}
                +29.2% from last period
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Monthly Revenue</p>
                  <p className="text-3xl font-bold">
                    ₹{((data.stats.totalRevenue ?? 0) / (data.revenue.length || 1)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Steady growth trend</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                  <p className="text-3xl font-bold text-accent">29.2%</p>
                </div>
                <Activity className="h-8 w-8 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Above industry average</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="farmers" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} name="Farmers" />
                <Line type="monotone" dataKey="consumers" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 4 }} name="Consumers" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">User Statistics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <span className="text-sm font-medium">Total Farmers</span>
                  <span className="text-2xl font-bold text-success">
                    {latestFarmers.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                  <span className="text-sm font-medium">Total Consumers</span>
                  <span className="text-2xl font-bold text-accent">
                    {latestConsumers.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                  <span className="text-sm font-medium">Consumer-Farmer Ratio</span>
                  <span className="text-2xl font-bold text-primary">
                    {farmerConsumerRatio}:1
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4">Growth Metrics ({timeRange === '1m' ? 'Last Month' : `Last ${data.userGrowth.length} Months`})</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Farmer Growth</span>
                    <span className="font-semibold text-success">{farmerGrowth.percentage}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success" 
                      style={{ width: `${farmerGrowth.absValue}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consumer Growth</span>
                    <span className="font-semibold text-accent">{consumerGrowth.percentage}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: `${consumerGrowth.absValue}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Platform Growth</span>
                    <span className="font-semibold text-primary">{overallGrowth.percentage}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${overallGrowth.absValue}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Crops by Orders</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.topCrops}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // FIX: Ensure Pie chart label correctly handles the data structure
                    label={({ name, percentage }: any) => `${name}: ${((percentage ?? 0)).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.topCrops.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Crop Performance (Total Orders)</h3>
              <div className="space-y-3">
                {data.topCrops.map((crop, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }}></div>
                      <span className="font-medium">{crop.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{crop.value}</p>
                      <p className="text-xs text-muted-foreground">
                        orders ({ (crop.percentage ?? 0).toFixed(1) }%)
                      </p>
                    </div>
                  </div>
                ))}
                {data.topCrops.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">No crop data available for this period.</p>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Distribution by Type (Overall)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.orderTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.orderTypes.map((order, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Package className="h-5 w-5 text-primary" />
                  <Badge>{(order.percentage ?? 0).toFixed(1)}%</Badge>
                </div>
                <h4 className="text-sm text-muted-foreground mb-1">{order.type} Orders</h4>
                <p className="text-3xl font-bold">{order.count}</p>
              </Card>
            ))}
             {data.orderTypes.length === 0 && (
                <p className="text-center text-muted-foreground py-10 col-span-4">No order type data available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}