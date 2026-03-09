import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Users, Building2, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ jobs: 0, applications: 0, employers: 0, deployed: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ count: jobs }, { count: applications }, { count: employers }, { count: deployed }] = await Promise.all([
        supabase.from("jobs").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("employer_requests").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "Deployed"),
      ]);
      setStats({ jobs: jobs ?? 0, applications: applications ?? 0, employers: employers ?? 0, deployed: deployed ?? 0 });
    };
    load();
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: "Active Jobs", value: stats.jobs, icon: Briefcase, color: "text-accent" },
          { label: "Applications", value: stats.applications, icon: Users, color: "text-blue-500" },
          { label: "Employer Requests", value: stats.employers, icon: Building2, color: "text-green-600" },
          { label: "Workers Deployed", value: stats.deployed, icon: TrendingUp, color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="card-corporate flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground font-body">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
