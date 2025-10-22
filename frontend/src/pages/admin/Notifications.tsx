// import { useState } from "react";
// import { Card } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Textarea } from "../../components/ui/textarea";
// import { Badge } from "../../components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../../components/ui/dialog";
// import { Label } from "../../components/ui/label";
// import { Bell, Send, Users, User, Megaphone, Plus, Trash2, Eye } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "warning" | "success" | "announcement";
//   target: "all" | "farmers" | "consumers" | "specific";
//   status: "draft" | "sent" | "scheduled";
//   recipients: number;
//   sentAt?: string;
//   scheduledFor?: string;
// }

// export default function Notifications() {
//   const { toast } = useToast();
//   const [notifications, setNotifications] = useState<Notification[]>([
//     {
//       id: "1",
//       title: "New Feature: Community Flash Deals",
//       message: "We've launched community flash deals! Join your local community and get amazing discounts on fresh produce.",
//       type: "announcement",
//       target: "consumers",
//       status: "sent",
//       recipients: 1250,
//       sentAt: "2024-01-15 10:30 AM"
//     },
//     {
//       id: "2",
//       title: "Farmer Payment Processed",
//       message: "Your monthly payment has been processed and credited to your account. Check your dashboard for details.",
//       type: "success",
//       target: "farmers",
//       status: "sent",
//       recipients: 450,
//       sentAt: "2024-01-14 09:00 AM"
//     },
//     {
//       id: "3",
//       title: "System Maintenance Notice",
//       message: "Scheduled maintenance on Jan 20th from 2 AM to 4 AM. Services may be temporarily unavailable.",
//       type: "warning",
//       target: "all",
//       status: "scheduled",
//       recipients: 1700,
//       scheduledFor: "2024-01-19 08:00 PM"
//     },
//   ]);

//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [newNotification, setNewNotification] = useState({
//     title: "",
//     message: "",
//     type: "info" as const,
//     target: "all" as const,
//   });

//   const handleCreateNotification = () => {
//     const notification: Notification = {
//       id: Date.now().toString(),
//       ...newNotification,
//       status: "draft",
//       recipients: 0,
//     };

//     setNotifications([notification, ...notifications]);
//     setIsCreateOpen(false);
//     setNewNotification({ title: "", message: "", type: "info", target: "all" });
    
//     toast({
//       title: "Notification Created",
//       description: "Notification saved as draft",
//     });
//   };

//   const handleSendNotification = (id: string) => {
//     setNotifications(notifications.map(n => 
//       n.id === id ? { ...n, status: "sent" as const, sentAt: new Date().toLocaleString(), recipients: getRecipientCount(n.target) } : n
//     ));
    
//     toast({
//       title: "Notification Sent",
//       description: "Notification has been sent successfully",
//     });
//   };

//   const handleDeleteNotification = (id: string) => {
//     setNotifications(notifications.filter(n => n.id !== id));
//     toast({
//       title: "Notification Deleted",
//       description: "Notification has been removed",
//     });
//   };

//   const getRecipientCount = (target: string) => {
//     switch(target) {
//       case "all": return 1700;
//       case "farmers": return 450;
//       case "consumers": return 1250;
//       default: return 0;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch(type) {
//       case "info": return "bg-primary/10 text-primary border-primary/20";
//       case "warning": return "bg-warning/10 text-warning border-warning/20";
//       case "success": return "bg-success/10 text-success border-success/20";
//       case "announcement": return "bg-accent/10 text-accent border-accent/20";
//       default: return "";
//     }
//   };

//   const getTargetIcon = (target: string) => {
//     switch(target) {
//       case "all": return Users;
//       case "farmers": return User;
//       case "consumers": return User;
//       default: return Users;
//     }
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Notifications & Announcements</h1>
//           <p className="text-muted-foreground mt-1">Send notifications to users</p>
//         </div>
//         <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="h-4 w-4 mr-2" />
//               Create Notification
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Create New Notification</DialogTitle>
//               <DialogDescription>Send notifications to your users</DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Title</Label>
//                 <Input 
//                   id="title"
//                   placeholder="Notification title"
//                   value={newNotification.title}
//                   onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="message">Message</Label>
//                 <Textarea 
//                   id="message"
//                   placeholder="Notification message"
//                   rows={5}
//                   value={newNotification.message}
//                   onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="type">Type</Label>
//                   <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification({...newNotification, type: value})}>
//                     <SelectTrigger id="type">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="info">Info</SelectItem>
//                       <SelectItem value="warning">Warning</SelectItem>
//                       <SelectItem value="success">Success</SelectItem>
//                       <SelectItem value="announcement">Announcement</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="target">Target Audience</Label>
//                   <Select value={newNotification.target} onValueChange={(value: any) => setNewNotification({...newNotification, target: value})}>
//                     <SelectTrigger id="target">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Users</SelectItem>
//                       <SelectItem value="farmers">Farmers Only</SelectItem>
//                       <SelectItem value="consumers">Consumers Only</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
//               <Button onClick={handleCreateNotification}>Create Draft</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="stat-card-premium">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-lg bg-primary/10">
//               <Send className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Sent Today</p>
//               <p className="text-2xl font-bold">12</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="stat-card-premium">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-lg bg-accent/10">
//               <Bell className="h-6 w-6 text-accent" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Scheduled</p>
//               <p className="text-2xl font-bold">3</p>
//             </div>
//           </div>
//         </Card>
//         <Card className="stat-card-premium">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-lg bg-success/10">
//               <Users className="h-6 w-6 text-success" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Total Reach</p>
//               <p className="text-2xl font-bold">1.7K</p>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <Card className="p-6">
//         <h3 className="text-lg font-semibold mb-4">All Notifications</h3>
//         <div className="space-y-3">
//           {notifications.map((notification) => {
//             const TargetIcon = getTargetIcon(notification.target);
//             return (
//               <div 
//                 key={notification.id}
//                 className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all"
//               >
//                 <div className={`p-3 rounded-lg ${getTypeColor(notification.type)}`}>
//                   <Megaphone className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h4 className="font-semibold">{notification.title}</h4>
//                     <Badge variant={notification.status === "sent" ? "default" : notification.status === "scheduled" ? "secondary" : "outline"}>
//                       {notification.status}
//                     </Badge>
//                     <Badge variant="outline" className="flex items-center gap-1">
//                       <TargetIcon className="h-3 w-3" />
//                       {notification.target}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
//                   <div className="flex items-center gap-4 text-xs text-muted-foreground">
//                     {notification.sentAt && <span>Sent: {notification.sentAt}</span>}
//                     {notification.scheduledFor && <span>Scheduled: {notification.scheduledFor}</span>}
//                     {notification.recipients > 0 && <span>Recipients: {notification.recipients}</span>}
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   {notification.status === "draft" && (
//                     <Button size="sm" onClick={() => handleSendNotification(notification.id)}>
//                       <Send className="h-4 w-4 mr-1" />
//                       Send
//                     </Button>
//                   )}
//                   <Button size="sm" variant="ghost">
//                     <Eye className="h-4 w-4" />
//                   </Button>
//                   <Button size="sm" variant="ghost" onClick={() => handleDeleteNotification(notification.id)}>
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Card>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from "react"; 
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Bell, Send, Users, User, Megaphone, Plus, Trash2, Eye } from "lucide-react"; 
import { useToast } from "../../hooks/use-toast";
import { adminAPI } from "../../lib/api";

interface Notification {
  id: string; 
  notification_id: string; 
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "alert"; 
  target_audience: "all" | "farmers" | "consumers"; 
  status: "draft" | "sent" | "scheduled";
  recipients: number; 
  sent_at?: string; 
  scheduled_at?: string; 
}

interface UserCounts {
    all: number;
    farmers: number;
    consumers: number;
}

export default function Notifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCounts, setUserCounts] = useState<UserCounts>({ all: 0, farmers: 0, consumers: 0 });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewedNotification, setViewedNotification] = useState<Notification | null>(null);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    target_audience: "all" as const,
  });
  
 // FIX 1: Make getRecipientCount a simple, pure function. It no longer needs useCallback.
const getRecipientCount = (target: string, counts: UserCounts): number => {
    switch(target) {
      case "all": return counts.all;
      case "farmers": return counts.farmers;
      case "consumers": return counts.consumers;
      default: return 0;
    }
};

// FIX 2: fetchNotifications no longer depends on getRecipientCount.
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch user counts first
      const countsRes = await adminAPI.getUserCounts();
      const fetchedCounts = countsRes.data.counts || { all: 0, farmers: 0, consumers: 0 };
      
      // Set the counts immediately, this triggers a re-render
      setUserCounts(fetchedCounts); 

      // Fetch notifications
      const response = await adminAPI.getNotifications();
      const fetchedData = response.data.notifications || [];
      
      // FIX 3: Pass fetchedCounts directly into the map function
      const mappedNotifications = fetchedData.map((n: any) => ({
          id: n.notification_id, 
          notification_id: n.notification_id,
          title: n.title,
          message: n.message,
          type: n.type,
          target_audience: n.target_audience,
          status: n.status,
          sent_at: n.sent_at, 
          scheduled_at: n.scheduled_at,
          // Use the pure function with fetched data
          recipients: getRecipientCount(n.target_audience, fetchedCounts), 
      }));

      setNotifications(mappedNotifications);
    } catch (error) {
      console.error('Error fetching notifications or counts:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // Dependencies for useCallback are clean.

  // FIX 4: useEffect remains clean.
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleCreateNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      toast({ title: "Error", description: "Please fill in all fields" });
      return;
    }

    try {
      await adminAPI.createNotification({...newNotification, status: 'draft'});
      toast({
        title: "Notification Created",
        description: "Notification saved as draft",
      });
      setIsCreateOpen(false);
      setNewNotification({ title: "", message: "", type: "info", target_audience: "all" });
      fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
      toast({
        title: "Error",
        description: "Failed to create notification",
      });
    }
  };

  const handleSendNotification = async (id: string) => {
    try {
      await adminAPI.sendNotification(id); 
      toast({
        title: "Notification Sent",
        description: "Notification has been sent successfully",
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
      });
    }
  };
  
  const handleViewNotification = (notification: Notification) => {
    setViewedNotification(notification);
    setIsViewDialogOpen(true);
  };

  const handleDeleteNotification = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this notification?');
    if (!confirmed) return;
    
    try {
      await adminAPI.deleteNotification(id);
      toast({
        title: "Notification Deleted",
        description: "Notification has been removed",
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: "Error",
        description: "Failed to delete notification",
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "info": return "bg-primary/10 text-primary border-primary/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "success": return "bg-success/10 text-success border-success/20";
      case "alert": return "bg-accent/10 text-accent border-accent/20";
      default: return "";
    }
  };

  const getTargetIcon = (target: string) => {
    switch(target) {
      case "all": return Users;
      case "farmers": return User;
      case "consumers": return User;
      default: return Users;
    }
  };

  const sentToday = notifications.filter(n => n.status === 'sent' && 
    n.sent_at && new Date(n.sent_at).toDateString() === new Date().toDateString()
  ).length;

  const scheduled = notifications.filter(n => n.status === 'scheduled').length;

  const totalReach = notifications
    .filter(n => n.status === 'sent')
    .reduce((sum, n) => sum + (n.recipients || 0), 0);

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
          <h1 className="text-3xl font-bold">Notifications & Announcements</h1>
          <p className="text-muted-foreground mt-1">Send notifications to users</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>Send notifications to your users</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  placeholder="Notification title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  placeholder="Notification message"
                  rows={5}
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newNotification.type} onValueChange={(value: any) => setNewNotification({...newNotification, type: value})}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Audience</Label>
                  <Select value={newNotification.target_audience} onValueChange={(value: any) => setNewNotification({...newNotification, target_audience: value})}>
                    <SelectTrigger id="target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users ({userCounts.all})</SelectItem>
                      <SelectItem value="farmers">Farmers Only ({userCounts.farmers})</SelectItem>
                      <SelectItem value="consumers">Consumers Only ({userCounts.consumers})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateNotification}>Create Draft</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="stat-card-premium">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sent Today</p>
              <p className="text-2xl font-bold">{sentToday}</p>
            </div>
          </div>
        </Card>
        <Card className="stat-card-premium">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-accent/10">
              <Bell className="h-6 w-6 text-accent" /> 
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold">{scheduled}</p>
            </div>
          </div>
        </Card>
        <Card className="stat-card-premium">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-success/10">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reach</p>
              <p className="text-2xl font-bold">{totalReach.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">All Notifications</h3>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No notifications yet</p>
          ) : (
            notifications.map((n) => {
            const TargetIcon = getTargetIcon(n.target_audience);
            return (
              <div 
                key={n.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all"
              >
                <div className={`p-3 rounded-lg ${getTypeColor(n.type)}`}>
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{n.title}</h4>
                    <Badge variant={n.status === "sent" ? "default" : n.status === "scheduled" ? "secondary" : "outline"}>
                      {n.status}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <TargetIcon className="h-3 w-3" />
                      {n.target_audience}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{n.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {n.sent_at && <span>Sent: {new Date(n.sent_at).toLocaleDateString()}</span>}
                    {n.scheduled_at && <span>Scheduled: {new Date(n.scheduled_at).toLocaleDateString()}</span>}
                    {n.recipients > 0 && <span>Recipients: {n.recipients.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {n.status === "draft" && (
                    <Button size="sm" onClick={() => handleSendNotification(n.id)}>
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => handleViewNotification(n)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteNotification(n.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })
          )}
        </div>
      </Card>

      {/* View Dialog Component */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>{viewedNotification?.title}</DialogTitle>
                  <DialogDescription>
                      Status: {viewedNotification?.status} | Type: {viewedNotification?.type}
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                  <p className="text-sm font-medium">Message:</p>
                  <div className="p-3 border rounded-md bg-muted/50">
                      <p className="text-sm whitespace-pre-wrap">{viewedNotification?.message}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                      <p>Target: {viewedNotification?.target_audience}</p>
                      {viewedNotification?.sent_at && <p>Sent At: {new Date(viewedNotification.sent_at).toLocaleString()}</p>}
                      {viewedNotification?.scheduled_at && <p>Scheduled At: {new Date(viewedNotification.scheduled_at).toLocaleString()}</p>}
                  </div>
              </div>
              <DialogFooter>
                  <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}