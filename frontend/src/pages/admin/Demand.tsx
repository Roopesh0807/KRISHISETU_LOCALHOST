// import { useState, useEffect } from "react";
// import { Card } from "../../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
// import { TrendingUp, TrendingDown, MapPin, Package, Users, Calendar, Download, RefreshCw, Sparkles, Target, AlertCircle } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";

// interface LocalityDemand {
//   pincode: string;
//   locality: string;
//   crop_name: string;
//   total_orders: number;
//   avg_quantity: number;
//   predicted_demand: number;
//   growth_rate: number;
//   confidence: number;
// }

// interface CropTrend {
//   month: string;
//   actual: number;
//   predicted: number;
// }

// interface InsightData {
//   title: string;
//   value: string;
//   change: number;
//   trend: "up" | "down";
//   icon: any;
//   color: string;
// }

// const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

// export default function DemandPrediction() {
//   const { toast } = useToast();
//   const [demandData, setDemandData] = useState<LocalityDemand[]>([]);
//   const [selectedCrop, setSelectedCrop] = useState<string>("Tomato");
//   const [selectedTimeframe, setSelectedTimeframe] = useState<string>("7d");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const crops = ["Tomato", "Potato", "Onion", "Carrot", "Cabbage", "Cauliflower"];

//   const cropTrendData: CropTrend[] = [
//     { month: "Jan", actual: 145, predicted: 140 },
//     { month: "Feb", actual: 152, predicted: 155 },
//     { month: "Mar", actual: 168, predicted: 165 },
//     { month: "Apr", actual: 178, predicted: 180 },
//     { month: "May", actual: 195, predicted: 198 },
//     { month: "Jun", actual: 210, predicted: 215 },
//   ];

//   const marketShareData = [
//     { name: "Bangalore South", value: 35 },
//     { name: "Bangalore North", value: 28 },
//     { name: "Bangalore East", value: 22 },
//     { name: "Bangalore West", value: 15 },
//   ];

//   useEffect(() => {
//     loadDemandData();
//   }, [selectedCrop, selectedTimeframe]);

//   const loadDemandData = () => {
//     // Mock demand prediction data with enhanced metrics
//     setDemandData([
//       {
//         pincode: "560001",
//         locality: "Indiranagar",
//         crop_name: "Tomato",
//         total_orders: 145,
//         avg_quantity: 12.5,
//         predicted_demand: 160,
//         growth_rate: 10.3,
//         confidence: 94
//       },
//       {
//         pincode: "560002",
//         locality: "Koramangala",
//         crop_name: "Tomato",
//         total_orders: 132,
//         avg_quantity: 10.8,
//         predicted_demand: 148,
//         growth_rate: 12.1,
//         confidence: 91
//       },
//       {
//         pincode: "560003",
//         locality: "Whitefield",
//         crop_name: "Tomato",
//         total_orders: 98,
//         avg_quantity: 9.2,
//         predicted_demand: 110,
//         growth_rate: 12.2,
//         confidence: 88
//       },
//       {
//         pincode: "560004",
//         locality: "Jayanagar",
//         crop_name: "Tomato",
//         total_orders: 167,
//         avg_quantity: 14.3,
//         predicted_demand: 185,
//         growth_rate: 10.8,
//         confidence: 96
//       },
//       {
//         pincode: "560005",
//         locality: "HSR Layout",
//         crop_name: "Tomato",
//         total_orders: 121,
//         avg_quantity: 11.1,
//         predicted_demand: 135,
//         growth_rate: 11.6,
//         confidence: 92
//       },
//       {
//         pincode: "560006",
//         locality: "Malleshwaram",
//         crop_name: "Tomato",
//         total_orders: 110,
//         avg_quantity: 10.5,
//         predicted_demand: 125,
//         growth_rate: 13.6,
//         confidence: 89
//       },
//     ]);
//   };

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     setTimeout(() => {
//       loadDemandData();
//       setIsRefreshing(false);
//       toast({
//         title: "Data Refreshed",
//         description: "Demand predictions updated successfully",
//       });
//     }, 1000);
//   };

//   const handleExport = () => {
//     toast({
//       title: "Export Started",
//       description: "Downloading demand report...",
//     });
//   };

//   const filteredData = demandData.filter(item => 
//     item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.pincode.includes(searchQuery)
//   );

//   const totalOrders = demandData.reduce((sum, d) => sum + d.total_orders, 0);
//   const totalPredicted = demandData.reduce((sum, d) => sum + d.predicted_demand, 0);
//   const avgGrowth = (demandData.reduce((sum, d) => sum + d.growth_rate, 0) / demandData.length).toFixed(1);
//   const avgConfidence = (demandData.reduce((sum, d) => sum + d.confidence, 0) / demandData.length).toFixed(0);

//   const insights: InsightData[] = [
//     {
//       title: "Total Current Orders",
//       value: totalOrders.toString(),
//       change: 8.2,
//       trend: "up",
//       icon: Package,
//       color: "text-primary"
//     },
//     {
//       title: "Predicted Demand",
//       value: totalPredicted.toString(),
//       change: 12.5,
//       trend: "up",
//       icon: Target,
//       color: "text-accent"
//     },
//     {
//       title: "Avg Growth Rate",
//       value: `${avgGrowth}%`,
//       change: parseFloat(avgGrowth),
//       trend: "up",
//       icon: TrendingUp,
//       color: "text-success"
//     },
//     {
//       title: "Prediction Confidence",
//       value: `${avgConfidence}%`,
//       change: 2.1,
//       trend: "up",
//       icon: Sparkles,
//       color: "text-warning"
//     }
//   ];

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header Section */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             AI-Powered Demand Prediction
//           </h1>
//           <p className="text-muted-foreground mt-1">Advanced forecasting by locality and crop type</p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
//             <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button variant="default" size="sm" onClick={handleExport}>
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Insights Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {insights.map((insight, idx) => (
//           <Card key={idx} className="stat-card-premium animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
//             <div className="flex items-center justify-between mb-2">
//               <insight.icon className={`h-5 w-5 ${insight.color}`} />
//               <Badge variant={insight.trend === "up" ? "default" : "destructive"} className="text-xs">
//                 {insight.trend === "up" ? "+" : "-"}{Math.abs(insight.change)}%
//               </Badge>
//             </div>
//             <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
//             <p className="text-3xl font-bold mt-1">{insight.value}</p>
//           </Card>
//         ))}
//       </div>

//       {/* Filters and Search */}
//       <Card className="p-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <Input 
//               placeholder="Search by locality or pincode..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full"
//             />
//           </div>
//           <Select value={selectedCrop} onValueChange={setSelectedCrop}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Select crop" />
//             </SelectTrigger>
//             <SelectContent>
//               {crops.map(crop => (
//                 <SelectItem key={crop} value={crop}>{crop}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
//             <SelectTrigger className="w-[150px]">
//               <SelectValue placeholder="Timeframe" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="7d">Last 7 Days</SelectItem>
//               <SelectItem value="30d">Last 30 Days</SelectItem>
//               <SelectItem value="90d">Last 90 Days</SelectItem>
//               <SelectItem value="1y">Last Year</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </Card>

//       {/* Tabs for Different Views */}
//       <Tabs defaultValue="overview" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="trends">Trends</TabsTrigger>
//           <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
//           <TabsTrigger value="insights">AI Insights</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-6">
//           {/* Main Chart */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Demand by Locality - {selectedCrop}</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <ComposedChart data={filteredData}>
//                 <defs>
//                   <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
//                   </linearGradient>
//                   <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis 
//                   dataKey="locality" 
//                   stroke="hsl(var(--muted-foreground))"
//                   angle={-45}
//                   textAnchor="end"
//                   height={100}
//                   fontSize={12}
//                 />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'hsl(var(--card))', 
//                     border: '1px solid hsl(var(--border))',
//                     borderRadius: '8px'
//                   }} 
//                 />
//                 <Bar dataKey="total_orders" fill="url(#colorOrders)" name="Historical Orders" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="predicted_demand" fill="url(#colorPredicted)" name="Predicted Demand" radius={[8, 8, 0, 0]} />
//                 <Line type="monotone" dataKey="avg_quantity" stroke="hsl(var(--success))" name="Avg Quantity (kg)" strokeWidth={3} dot={{ r: 4 }} />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Card>

//           {/* Locality Cards */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Locality Analysis</h3>
//             <div className="space-y-3">
//               {filteredData.map((locality, idx) => (
//                 <div 
//                   key={locality.pincode} 
//                   className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/50 hover:border-primary/50 transition-all hover:shadow-md animate-slide-up"
//                   style={{ animationDelay: `${idx * 0.05}s` }}
//                 >
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-accent" />
//                       <h4 className="font-semibold">{locality.locality}</h4>
//                       <Badge variant="outline" className="text-xs">
//                         {locality.confidence}% confidence
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">Pincode: {locality.pincode}</p>
//                   </div>
//                   <div className="flex gap-8 text-sm">
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Historical</p>
//                       <p className="font-bold text-lg">{locality.total_orders}</p>
//                       <p className="text-xs text-muted-foreground">orders</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Predicted</p>
//                       <p className="font-bold text-lg text-accent">{locality.predicted_demand}</p>
//                       <p className="text-xs text-muted-foreground">orders</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Growth</p>
//                       <div className="flex items-center gap-1">
//                         <TrendingUp className="h-3 w-3 text-success" />
//                         <p className="font-bold text-lg text-success">{locality.growth_rate}%</p>
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Avg Qty</p>
//                       <p className="font-bold text-lg">{locality.avg_quantity}</p>
//                       <p className="text-xs text-muted-foreground">kg</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trends" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Historical vs Predicted Trends</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={cropTrendData}>
//                   <defs>
//                     <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
//                     </linearGradient>
//                     <linearGradient id="colorPredictedTrend" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                   <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
//                   <YAxis stroke="hsl(var(--muted-foreground))" />
//                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                   <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
//                   <Area type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorPredictedTrend)" strokeWidth={2} strokeDasharray="5 5" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Market Share by Region</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={marketShareData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }: any) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {marketShareData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="heatmap" className="space-y-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Demand Heatmap</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//               {filteredData.map((locality) => {
//                 const intensity = (locality.predicted_demand / 200);
//                 const bgOpacity1 = Math.min(intensity, 1);
//                 const bgOpacity2 = Math.min(intensity / 1.5, 1);
//                 return (
//                   <div 
//                     key={locality.pincode}
//                     className="p-4 rounded-lg text-center transition-all hover:scale-105 cursor-pointer"
//                     style={{
//                       background: `linear-gradient(135deg, 
//                         hsla(var(--primary), ${bgOpacity1}) 0%, 
//                         hsla(var(--accent), ${bgOpacity2}) 100%)`
//                     }}
//                   >
//                     <p className="font-semibold text-sm mb-1">{locality.locality}</p>
//                     <p className="text-2xl font-bold">{locality.predicted_demand}</p>
//                     <p className="text-xs text-muted-foreground">orders</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </Card>
//         </TabsContent>

//         <TabsContent value="insights" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6 border-l-4 border-l-success">
//               <div className="flex items-start gap-3">
//                 <Sparkles className="h-5 w-5 text-success mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">High Growth Opportunity</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Jayanagar shows the highest predicted demand at 185 orders with 96% confidence. 
//                     Consider allocating more farmers to this region.
//                   </p>
//                   <Badge variant="default">Action Required</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-accent">
//               <div className="flex items-start gap-3">
//                 <TrendingUp className="h-5 w-5 text-accent mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Strong Growth Trend</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Whitefield and Malleshwaram show growth rates above 12%, indicating emerging markets 
//                     with potential for expansion.
//                   </p>
//                   <Badge variant="secondary">Trending</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-warning">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-warning mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Stock Preparation</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Total predicted demand exceeds current inventory by 12.5%. Recommend contacting 
//                     additional farmers for {selectedCrop} supply.
//                   </p>
//                   <Badge variant="outline" className="border-warning text-warning">Monitor</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-primary">
//               <div className="flex items-start gap-3">
//                 <Users className="h-5 w-5 text-primary mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Consumer Pattern</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Average order quantity is 11.2kg per order. Subscription model adoption is 
//                     increasing by 8% month-over-month in premium localities.
//                   </p>
//                   <Badge>Insight</Badge>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }















//BASED ON PLACE ORDER AND CONSUMER REGISTRATION
// Demand.tsx

// Demand.tsx
// import { useState, useEffect, useCallback } from "react";
// import { Card } from "../../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
// import { TrendingUp, TrendingDown, MapPin, Package, Users, Calendar, Download, RefreshCw, Sparkles, Target, AlertCircle } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";
// import { adminAPI } from "../../lib/api";

// interface LocalityDemand {
//   pincode: string;
//   locality: string;
//   crop_name: string;
//   total_orders: number;
//   avg_quantity: number;
//   predicted_demand: number;
//   growth_rate: number;
//   confidence: number;
// }

// interface CropTrend {
//   month: string;
//   actual: number;
//   predicted: number;
// }

// interface InsightData {
//   title: string;
//   value: string;
//   change: number;
//   trend: "up" | "down";
//   icon: any;
//   color: string;
// }

// const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

// // Utility function to safely convert string-numbers from DB to float
// const safeParseFloat = (value: any): number => parseFloat(value) || 0;


// export default function DemandPrediction() {
//   const { toast } = useToast();
//   const [demandData, setDemandData] = useState<LocalityDemand[]>([]);
//   const [selectedCrop, setSelectedCrop] = useState<string>("all");
//   const [selectedTimeframe, setSelectedTimeframe] = useState<string>("7d");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const crops = ["all", "Tomato", "Potato", "Onion", "Carrot", "Cabbage", "Cauliflower"];

//   const [cropTrendData, setCropTrendData] = useState<CropTrend[]>([]);
//   const [marketShareData, setMarketShareData] = useState<any[]>([]);

//   // FIX: Wrap loadDemandData in useCallback to stabilize the function
//   const loadDemandData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await adminAPI.getDemandPrediction(selectedCrop !== 'all' ? selectedCrop : undefined);
      
//       const { localityDemand, trends, marketShare } = response.data.data || response.data || {};

//       const demandArray = Array.isArray(localityDemand) ? localityDemand : [];
      
//       const parsedDemandData = demandArray.map((d: any) => ({
//           ...d,
//           // total_orders is aliased in the backend query
//           total_orders: safeParseFloat(d.total_orders), 
//           avg_quantity: safeParseFloat(d.avg_quantity),
//           predicted_demand: safeParseFloat(d.predicted_demand),
//           growth_rate: safeParseFloat(d.growth_rate),
//           confidence: safeParseFloat(d.confidence) || 90, 
//       }));

//       setDemandData(parsedDemandData);
//       setCropTrendData(trends || []);
//       setMarketShareData(marketShare || []);
//     } catch (error) {
//       console.error('Error fetching demand prediction:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load demand prediction data",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCrop, toast]); // Dependencies: Only selectedCrop changes the API call payload

//   // FIX: useEffect now depends on the stable loadDemandData function
//   useEffect(() => {
//     loadDemandData();
//   }, [loadDemandData, selectedTimeframe]); 

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     loadDemandData().finally(() => {
//       setIsRefreshing(false);
//       toast({
//         title: "Data Refreshed",
//         description: "Demand predictions updated successfully",
//       });
//     });
//   };

//   const handleExport = () => {
//     if (demandData.length === 0) {
//       toast({
//         title: "No Data",
//         description: "Cannot export an empty dataset.",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     const headers = ["Locality", "Pincode", "Crop", "Historical Orders", "Predicted Demand", "Growth Rate (%)", "Avg Quantity (kg)", "Confidence (%)"];
//     const csv = [
//       headers.join(','),
//       ...demandData.map(d => [
//         // Use quotes around locality in case it contains commas
//         `"${d.locality}"`,
//         d.pincode,
//         d.crop_name,
//         d.total_orders,
//         d.predicted_demand,
//         d.growth_rate,
//         d.avg_quantity,
//         d.confidence
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute('download', `krishisetu_demand_report_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     toast({
//       title: "Export Successful",
//       description: "Demand report downloaded.",
//     });
//   };

//   const filteredData = demandData.filter(item => 
//     item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.pincode.includes(searchQuery)
//   );

//   const totalOrders = filteredData.reduce((sum, d) => sum + d.total_orders, 0);
//   const totalPredicted = filteredData.reduce((sum, d) => sum + d.predicted_demand, 0);
//   // Prevent division by zero
//   const avgGrowth = (filteredData.length > 0 ? filteredData.reduce((sum, d) => sum + d.growth_rate, 0) / filteredData.length : 0).toFixed(1);
//   const avgConfidence = (filteredData.length > 0 ? filteredData.reduce((sum, d) => sum + d.confidence, 0) / filteredData.length : 0).toFixed(0);

//   const insights: InsightData[] = [
//     {
//       title: "Total Current Orders",
//       value: totalOrders.toString(),
//       change: 8.2,
//       trend: "up",
//       icon: Package,
//       color: "text-primary"
//     },
//     {
//       title: "Predicted Demand",
//       value: totalPredicted.toString(),
//       change: 12.5,
//       trend: "up",
//       icon: Target,
//       color: "text-accent"
//     },
//     {
//       title: "Avg Growth Rate",
//       value: `${avgGrowth}%`,
//       change: parseFloat(avgGrowth),
//       trend: "up",
//       icon: TrendingUp,
//       color: "text-success"
//     },
//     {
//       title: "Prediction Confidence",
//       value: `${avgConfidence}%`,
//       change: 2.1,
//       trend: "up",
//       icon: Sparkles,
//       color: "text-warning"
//     }
//   ];

//   if (loading && !isRefreshing) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header Section */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             AI-Powered Demand Prediction
//           </h1>
//           <p className="text-muted-foreground mt-1">Advanced forecasting by locality and crop type</p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
//             <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button variant="default" size="sm" onClick={handleExport}>
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Insights Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {insights.map((insight, idx) => (
//           <Card key={idx} className="stat-card-premium animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
//             <div className="flex items-center justify-between mb-2">
//               <insight.icon className={`h-5 w-5 ${insight.color}`} />
//               <Badge variant={insight.trend === "up" ? "default" : "destructive"} className="text-xs">
//                 {insight.trend === "up" ? "+" : "-"}{Math.abs(insight.change)}%
//               </Badge>
//             </div>
//             <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
//             <p className="text-3xl font-bold mt-1">{insight.value}</p>
//           </Card>
//         ))}
//       </div>

//       {/* Filters and Search */}
//       <Card className="p-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <Input 
//               placeholder="Search by locality or pincode..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full"
//             />
//           </div>
//           <Select value={selectedCrop} onValueChange={setSelectedCrop}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Select crop" />
//             </SelectTrigger>
//             <SelectContent>
//               {crops.map(crop => (
//                 <SelectItem key={crop} value={crop}>{crop.charAt(0).toUpperCase() + crop.slice(1)}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
//             <SelectTrigger className="w-[150px]">
//               <SelectValue placeholder="Timeframe" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="7d">Last 7 Days</SelectItem>
//               <SelectItem value="30d">Last 30 Days</SelectItem>
//               <SelectItem value="90d">Last 90 Days</SelectItem>
//               <SelectItem value="1y">Last Year</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </Card>

//       {/* Tabs for Different Views */}
//       <Tabs defaultValue="overview" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="trends">Trends</TabsTrigger>
//           <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
//           <TabsTrigger value="insights">AI Insights</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-6">
//           {/* Main Chart */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Demand by Locality - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <ComposedChart data={filteredData}>
//                 <defs>
//                   <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
//                   </linearGradient>
//                   <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis 
//                   dataKey="locality" 
//                   stroke="hsl(var(--muted-foreground))"
//                   angle={-45}
//                   textAnchor="end"
//                   height={100}
//                   fontSize={12}
//                 />
//                 <YAxis stroke="hsl(var(--muted-foreground))" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'hsl(var(--card))', 
//                     border: '1px solid hsl(var(--border))',
//                     borderRadius: '8px'
//                   }} 
//                 />
//                 <Bar dataKey="total_orders" fill="url(#colorOrders)" name="Historical Orders" radius={[8, 8, 0, 0]} />
//                 <Bar dataKey="predicted_demand" fill="url(#colorPredicted)" name="Predicted Demand" radius={[8, 8, 0, 0]} />
//                 <Line type="monotone" dataKey="avg_quantity" stroke="hsl(var(--success))" name="Avg Quantity (kg)" strokeWidth={3} dot={{ r: 4 }} />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Card>

//           {/* Locality Cards */}
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Locality Analysis</h3>
//             <div className="space-y-3">
//               {filteredData.map((locality, idx) => (
//                 <div 
//                   key={`${locality.pincode}-${locality.crop_name}`} 
//                   className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/50 hover:border-primary/50 transition-all hover:shadow-md animate-slide-up"
//                   style={{ animationDelay: `${idx * 0.05}s` }}
//                 >
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-accent" />
//                       <h4 className="font-semibold">{locality.locality}</h4>
//                       <Badge variant="outline" className="text-xs">
//                         {locality.confidence}% confidence
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">Pincode: {locality.pincode}</p>
//                   </div>
//                   <div className="flex gap-8 text-sm">
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Historical</p>
//                       <p className="font-bold text-lg">{locality.total_orders}</p>
//                       <p className="text-xs text-muted-foreground">orders</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Predicted</p>
//                       <p className="font-bold text-lg text-accent">{locality.predicted_demand}</p>
//                       <p className="text-xs text-muted-foreground">orders</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Growth</p>
//                       <div className="flex items-center gap-1">
//                         <TrendingUp className="h-3 w-3 text-success" />
//                         <p className="font-bold text-lg text-success">{locality.growth_rate}%</p>
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs text-muted-foreground">Avg Qty</p>
//                       <p className="font-bold text-lg">{locality.avg_quantity}</p>
//                       <p className="text-xs text-muted-foreground">kg</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trends" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Historical vs Predicted Trends</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={cropTrendData}>
//                   <defs>
//                     <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
//                     </linearGradient>
//                     <linearGradient id="colorPredictedTrend" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                   <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
//                   <YAxis stroke="hsl(var(--muted-foreground))" />
//                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                   <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
//                   <Area type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorPredictedTrend)" strokeWidth={2} strokeDasharray="5 5" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Card>

//             <Card className="p-6">
//               <h3 className="text-lg font-semibold mb-4">Market Share by Region</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={marketShareData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }: any) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {marketShareData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="heatmap" className="space-y-6">
//           <Card className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Demand Heatmap</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//               {filteredData.map((locality) => {
//                 const intensity = (locality.predicted_demand / 200);
//                 const bgOpacity1 = Math.min(intensity, 1);
//                 const bgOpacity2 = Math.min(intensity / 1.5, 1);
//                 return (
//                   <div 
//                     key={`${locality.pincode}-${locality.crop_name}`}
//                     className="p-4 rounded-lg text-center transition-all hover:scale-105 cursor-pointer"
//                     style={{
//                       background: `linear-gradient(135deg, 
//                         hsla(var(--primary), ${bgOpacity1}) 0%, 
//                         hsla(var(--accent), ${bgOpacity2}) 100%)`
//                     }}
//                   >
//                     <p className="font-semibold text-sm mb-1">{locality.locality}</p>
//                     <p className="text-2xl font-bold">{locality.predicted_demand}</p>
//                     <p className="text-xs text-muted-foreground">orders</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </Card>
//         </TabsContent>

//         <TabsContent value="insights" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="p-6 border-l-4 border-l-success">
//               <div className="flex items-start gap-3">
//                 <Sparkles className="h-5 w-5 text-success mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">High Growth Opportunity</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Jayanagar shows the highest predicted demand at 185 orders with 96% confidence. 
//                     Consider allocating more farmers to this region.
//                   </p>
//                   <Badge variant="default">Action Required</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-accent">
//               <div className="flex items-start gap-3">
//                 <TrendingUp className="h-5 w-5 text-accent mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Strong Growth Trend</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Whitefield and Malleshwaram show growth rates above 12%, indicating emerging markets 
//                     with potential for expansion.
//                   </p>
//                   <Badge variant="secondary">Trending</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-warning">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-warning mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Stock Preparation</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Total predicted demand exceeds current inventory by 12.5%. Recommend contacting 
//                     additional farmers for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} supply.
//                   </p>
//                   <Badge variant="outline" className="border-warning text-warning">Monitor</Badge>
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6 border-l-4 border-l-primary">
//               <div className="flex items-start gap-3">
//                 <Users className="h-5 w-5 text-primary mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-lg mb-2">Consumer Pattern</h4>
//                   <p className="text-sm text-muted-foreground mb-3">
//                     Average order quantity is 11.2kg per order. Subscription model adoption is 
//                     increasing by 8% month-over-month in premium localities.
//                   </p>
//                   <Badge>Insight</Badge>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }










//BASED ON DUMMY DATA
// Demand.tsx

import { useState, useEffect, useCallback } from "react"; // Added useCallback for stability
import { Card } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, MapPin, Package, Users, Calendar, Download, RefreshCw, Sparkles, Target, AlertCircle } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { adminAPI } from "../../lib/api";

// ... (Interface definitions remain the same)

interface LocalityDemand {
  pincode: string;
  locality: string;
  crop_name: string;
  total_orders: number;
  avg_quantity: number;
  predicted_demand: number;
  growth_rate: number;
  confidence: number;
}

interface CropTrend {
  month: string;
  actual: number;
  predicted: number;
}

interface InsightData {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: any;
  color: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

// Utility function to safely convert string-numbers from DB to float
const safeParseFloat = (value: any): number => parseFloat(value) || 0;


export default function DemandPrediction() {
  const { toast } = useToast();
  const [demandData, setDemandData] = useState<LocalityDemand[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("7d");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const crops = ["all", "Tomato", "Potato", "Onion", "Carrot", "Cabbage", "Cauliflower"];

  const [cropTrendData, setCropTrendData] = useState<CropTrend[]>([]);
  const [marketShareData, setMarketShareData] = useState<any[]>([]);

  // FIX: Use useCallback to stabilize loadDemandData
  const loadDemandData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getDemandPrediction(selectedCrop !== 'all' ? selectedCrop : undefined);
      
      // Access response.data and use a safe fallback ({})
      const { localityDemand, trends, marketShare } = response.data.data || response.data || {};

      const demandArray = Array.isArray(localityDemand) ? localityDemand : [];
      
      // FIX: Ensure all incoming numerical data is parsed into floats
      const parsedDemandData = demandArray.map((d: any) => ({
          ...d,
          // total_orders is now mapped correctly from historical_orders in the backend
          total_orders: safeParseFloat(d.total_orders), 
          avg_quantity: safeParseFloat(d.avg_quantity),
          predicted_demand: safeParseFloat(d.predicted_demand),
          growth_rate: safeParseFloat(d.growth_rate),
          confidence: safeParseFloat(d.confidence) || 90, 
      }));

      setDemandData(parsedDemandData);
      setCropTrendData(trends || []);
      setMarketShareData(marketShare || []);
    } catch (error) {
      console.error('Error fetching demand prediction:', error);
      toast({
        title: "Error",
        description: "Failed to load demand prediction data",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCrop, toast]); // Dependencies: selectedCrop

  useEffect(() => {
    loadDemandData();
  }, [loadDemandData, selectedTimeframe]); // Added selectedTimeframe as external filter

  const handleRefresh = () => {
    setIsRefreshing(true);
    // FIX: Call loadDemandData (which handles the selectedCrop filter)
    loadDemandData().finally(() => { 
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Demand predictions updated successfully",
      });
    });
  };

  // FIX: Implement export logic
  const handleExport = () => {
    if (demandData.length === 0) {
      toast({
        title: "No Data",
        description: "Cannot export an empty dataset.",
        variant: "destructive"
      });
      return;
    }
    
    const headers = ["Locality", "Pincode", "Crop", "Historical Orders", "Predicted Demand", "Growth Rate (%)", "Avg Quantity (kg)"];
    const csv = [
      headers.join(','),
      ...demandData.map(d => [
        `"${d.locality}"`,
        d.pincode,
        d.crop_name,
        d.total_orders,
        d.predicted_demand,
        d.growth_rate,
        d.avg_quantity
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `krishisetu_demand_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Demand report downloaded.",
    });
  };

  const filteredData = demandData.filter(item => 
    item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.pincode.includes(searchQuery)
  );

  // FIX: Calculations now use the correctly parsed and filtered data
  const totalOrders = filteredData.reduce((sum, d) => sum + d.total_orders, 0);
  const totalPredicted = filteredData.reduce((sum, d) => sum + d.predicted_demand, 0);
  const avgGrowth = (filteredData.reduce((sum, d) => sum + d.growth_rate, 0) / filteredData.length).toFixed(1);
  const avgConfidence = (filteredData.reduce((sum, d) => sum + d.confidence, 0) / filteredData.length).toFixed(0);

  const insights: InsightData[] = [
    {
      title: "Total Current Orders",
      value: totalOrders.toString(),
      change: 8.2, // Mocked change value
      trend: "up",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Predicted Demand",
      value: totalPredicted.toString(),
      change: 12.5, // Mocked change value
      trend: "up",
      icon: Target,
      color: "text-accent"
    },
    {
      title: "Avg Growth Rate",
      value: `${avgGrowth}%`,
      change: parseFloat(avgGrowth),
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Prediction Confidence",
      value: `${avgConfidence}%`,
      change: 2.1, // Mocked change value
      trend: "up",
      icon: Sparkles,
      color: "text-warning"
    }
  ];

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Powered Demand Prediction
          </h1>
          <p className="text-muted-foreground mt-1">Advanced forecasting by locality and crop type</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, idx) => (
          <Card key={idx} className="stat-card-premium animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between mb-2">
              <insight.icon className={`h-5 w-5 ${insight.color}`} />
              <Badge variant={insight.trend === "up" ? "default" : "destructive"} className="text-xs">
                {insight.trend === "up" ? "+" : "-"}{Math.abs(insight.change)}%
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{insight.title}</h3>
            <p className="text-3xl font-bold mt-1">{insight.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search by locality or pincode..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop.charAt(0).toUpperCase() + crop.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Demand by Locality - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="locality" 
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="total_orders" fill="url(#colorOrders)" name="Historical Orders" radius={[8, 8, 0, 0]} />
                <Bar dataKey="predicted_demand" fill="url(#colorPredicted)" name="Predicted Demand" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="avg_quantity" stroke="hsl(var(--success))" name="Avg Quantity (kg)" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          {/* Locality Cards */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Locality Analysis</h3>
            <div className="space-y-3">
              {filteredData.map((locality, idx) => (
                <div 
                  key={locality.pincode} 
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/50 hover:border-primary/50 transition-all hover:shadow-md animate-slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <h4 className="font-semibold">{locality.locality}</h4>
                      <Badge variant="outline" className="text-xs">
                        {locality.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Pincode: {locality.pincode}</p>
                  </div>
                  <div className="flex gap-8 text-sm">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Historical</p>
                      <p className="font-bold text-lg">{locality.total_orders}</p>
                      <p className="text-xs text-muted-foreground">orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Predicted</p>
                      <p className="font-bold text-lg text-accent">{locality.predicted_demand}</p>
                      <p className="text-xs text-muted-foreground">orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Growth</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <p className="font-bold text-lg text-success">{locality.growth_rate}%</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Avg Qty</p>
                      <p className="font-bold text-lg">{locality.avg_quantity}</p>
                      <p className="text-xs text-muted-foreground">kg</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Historical vs Predicted Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cropTrendData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredictedTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
                  <Area type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorPredictedTrend)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Market Share by Region</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name}: ${((percent as number) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Demand Heatmap</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {filteredData.map((locality) => {
                const intensity = (locality.predicted_demand / 200);
                const bgOpacity1 = Math.min(intensity, 1);
                const bgOpacity2 = Math.min(intensity / 1.5, 1);
                return (
                  <div 
                    key={locality.pincode}
                    className="p-4 rounded-lg text-center transition-all hover:scale-105 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsla(var(--primary), ${bgOpacity1}) 0%, 
                        hsla(var(--accent), ${bgOpacity2}) 100%)`
                    }}
                  >
                    <p className="font-semibold text-sm mb-1">{locality.locality}</p>
                    <p className="text-2xl font-bold">{locality.predicted_demand}</p>
                    <p className="text-xs text-muted-foreground">orders</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-l-success">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-success mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">High Growth Opportunity</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Jayanagar shows the highest predicted demand at 185 orders with 96% confidence. 
                    Consider allocating more farmers to this region.
                  </p>
                  <Badge variant="default">Action Required</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-accent mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Strong Growth Trend</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Whitefield and Malleshwaram show growth rates above 12%, indicating emerging markets 
                    with potential for expansion.
                  </p>
                  <Badge variant="secondary">Trending</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-warning">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Stock Preparation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Total predicted demand exceeds current inventory by 12.5%. Recommend contacting 
                    additional farmers for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} supply.
                  </p>
                  <Badge variant="outline" className="border-warning text-warning">Monitor</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Consumer Pattern</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Average order quantity is 11.2kg per order. Subscription model adoption is 
                    increasing by 8% month-over-month in premium localities.
                  </p>
                  <Badge>Insight</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}