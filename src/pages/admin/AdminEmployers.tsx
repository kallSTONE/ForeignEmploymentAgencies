import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type EmployerRequest = Tables<"employer_requests">;

const statuses = ["New", "Contacted", "In Progress", "Completed", "Declined"];

export default function AdminEmployers() {
  const [requests, setRequests] = useState<EmployerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EmployerRequest | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("employer_requests").select("*").order("created_at", { ascending: false });
    setRequests(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("employer_requests").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Status updated to ${status}`);
    setSelected(null);
    load();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">Employer Requests</h1>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-md max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">{selected.company_name}</h2>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3 mb-6">
              {[
                ["Contact Person", selected.contact_person],
                ["Email", selected.email],
                ["Phone", selected.phone || "—"],
                ["Country", selected.country],
                ["Workers Needed", selected.workers_needed?.toString() || "—"],
                ["Job Category", selected.job_category || "—"],
                ["Start Date", selected.start_date || "—"],
                ["Additional Info", selected.additional_info || "—"],
                ["Submitted", new Date(selected.created_at).toLocaleDateString()],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body">{label}</div>
                  <div className="text-sm text-foreground font-body">{value}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-2">Update Status</h3>
              <div className="flex gap-2 flex-wrap">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`text-xs px-3 py-1.5 rounded font-body border transition-colors ${selected.status === s ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:border-accent"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-body">Loading requests...</p>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {requests.map((r) => (
              <div key={r.id} className="card-corporate p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className="font-heading text-base font-semibold text-foreground">{r.company_name}</h2>
                    <p className="text-sm text-muted-foreground font-body mt-0.5">{r.contact_person}</p>
                  </div>
                  <span className="badge-gold text-[10px]">{r.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-body text-muted-foreground mb-4">
                  <div>
                    <div className="uppercase tracking-wider">Country</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">{r.country}</div>
                  </div>
                  <div>
                    <div className="uppercase tracking-wider">Workers</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">{r.workers_needed ?? "—"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="uppercase tracking-wider">Date</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">{new Date(r.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <button onClick={() => setSelected(r)} className="btn-outline-corporate w-full text-xs py-2 px-3">
                  <Eye className="w-3.5 h-3.5 mr-1" /> View Details
                </button>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-3">Company</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Workers</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-3 font-medium text-foreground">{r.company_name}</td>
                    <td className="py-3 px-3 text-muted-foreground">{r.country}</td>
                    <td className="py-3 px-3 text-muted-foreground">{r.contact_person}</td>
                    <td className="py-3 px-3 text-muted-foreground">{r.workers_needed ?? "—"}</td>
                    <td className="py-3 px-3"><span className="badge-gold text-[10px]">{r.status}</span></td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-3">
                      <button onClick={() => setSelected(r)} className="text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {requests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No employer requests yet.</div>
          )}
        </>
      )}
    </div>
  );
}
