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
    <div className="min-h-screen bg-secondary md:flex">
      {/* Navigation */}
      <aside className="bg-primary text-primary-foreground md:w-64 md:shrink-0 md:min-h-screen md:flex md:flex-col">
        <div className="p-4 md:p-5 border-b border-primary-foreground/10 flex items-center justify-between md:block">
          <h2 className="font-heading text-lg font-bold">Admin Panel</h2>
          <p className="text-xs opacity-60 font-body mt-0.5">Horizon Manpower</p>

          <button
            onClick={signOut}
            className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
        <nav className="p-3 flex gap-2 overflow-x-auto md:overflow-visible md:flex-1 md:block md:space-y-1 md:gap-0">
          {adminLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`shrink-0 md:shrink flex items-center gap-2 md:gap-3 px-3 py-2.5 text-sm font-body rounded-md transition-colors whitespace-nowrap ${(l.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(l.path))
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block p-3 border-t border-primary-foreground/10">
          <button onClick={signOut} className="flex items-center gap-3 px-3 py-2 text-sm text-primary-foreground/60 hover:text-primary-foreground font-body w-full transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
