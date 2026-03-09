import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, X, Download, Image } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Application = Tables<"applications">;

const statuses = ["Submitted", "Under Review", "Training", "Document Processing", "Visa Processing", "Deployed", "Rejected"];

export default function AdminApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);
  const [filter, setFilter] = useState("All");
  const [statusNote, setStatusNote] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    setApps(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status, status_note: statusNote || null }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Status updated to ${status}`);
    setSelected(null);
    setStatusNote("");
    load();
  };

  const filtered = filter === "All" ? apps : apps.filter((a) => a.status === filter);

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Worker Applications</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-corporate w-auto">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-md max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">{selected.full_name}</h2>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ["Application ID", selected.application_id],
                ["Phone", selected.phone],
                ["Email", selected.email || "—"],
                ["Age", selected.age?.toString() || "—"],
                ["Education", selected.education || "—"],
                ["Marital Status", selected.marital_status || "—"],
                ["Passport", selected.passport_status],
                ["Experience", selected.experience || "—"],
                ["Desired Country", selected.desired_country],
                ["Job Category", selected.job_category],
                ["Emergency Contact", selected.emergency_contact || "—"],
                ["Notes", selected.additional_notes || "—"],
                ["Submitted", new Date(selected.created_at).toLocaleDateString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body">{label}</div>
                  <div className="text-sm text-foreground font-body">{value}</div>
                </div>
              ))}
              {(selected as any).cv_path && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body">CV Document</div>
                  <a href={supabase.storage.from("worker-documents").getPublicUrl((selected as any).cv_path).data.publicUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    <Download className="w-3 h-3" /> Download CV
                  </a>
                </div>
              )}
              {(selected as any).photo_path && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body">Photo</div>
                  <a href={supabase.storage.from("worker-documents").getPublicUrl((selected as any).photo_path).data.publicUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    <Image className="w-3 h-3" /> View Photo
                  </a>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-2">Update Status</h3>
              <div className="space-y-3">
                <select
                  defaultValue={selected.status ?? "Submitted"}
                  id="status-select"
                  className="input-corporate"
                >
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
                <input
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Status note (optional)"
                  className="input-corporate"
                />
                <button
                  onClick={() => {
                    const sel = (document.getElementById("status-select") as HTMLSelectElement).value;
                    updateStatus(selected.id, sel);
                  }}
                  className="btn-primary-corporate w-full"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-body">Loading applications...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-3 font-mono text-xs">{a.application_id}</td>
                  <td className="py-3 px-3 font-medium text-foreground">{a.full_name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{a.phone}</td>
                  <td className="py-3 px-3 text-muted-foreground">{a.desired_country}</td>
                  <td className="py-3 px-3 text-muted-foreground">{a.job_category}</td>
                  <td className="py-3 px-3"><span className="badge-gold text-[10px]">{a.status}</span></td>
                  <td className="py-3 px-3 text-muted-foreground text-xs">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <button onClick={() => setSelected(a)} className="text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
