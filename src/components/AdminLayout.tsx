import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Briefcase, Users, Building2, LogOut } from "lucide-react";

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Jobs", path: "/admin/jobs", icon: Briefcase },
  { label: "Applications", path: "/admin/applications", icon: Users },
  { label: "Employer Requests", path: "/admin/employers", icon: Building2 },
];

export default function AdminLayout() {
  const { isAdmin, loading, signOut, user } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-body">Loading...</p></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col shrink-0">
        <div className="p-5 border-b border-primary-foreground/10">
          <h2 className="font-heading text-lg font-bold">Admin Panel</h2>
          <p className="text-xs opacity-60 font-body">Horizon Manpower</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-body rounded-md transition-colors ${
                (l.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(l.path))
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
              }`}
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-foreground/10">
          <button onClick={signOut} className="flex items-center gap-3 px-3 py-2 text-sm text-primary-foreground/60 hover:text-primary-foreground font-body w-full transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
