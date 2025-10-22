import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

export default function AdminLayout() {
  // Check if admin is logged in
  const adminToken = localStorage.getItem("adminToken");
  
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
