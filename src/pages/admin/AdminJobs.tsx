import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const emptyJob = {
  title: "", country: "Saudi Arabia", category: "Domestic", salary_min: 300, salary_max: 500,
  contract_length: "2 Years", benefits: "", accommodation: "", requirements: "", description: "", is_active: true,
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Job> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title?.trim()) { toast.error("Title is required"); return; }
    if (isNew) {
      const { error } = await supabase.from("jobs").insert({
        title: editing.title!, country: editing.country!, category: editing.category!,
        salary_min: editing.salary_min, salary_max: editing.salary_max,
        contract_length: editing.contract_length, benefits: editing.benefits,
        accommodation: editing.accommodation, requirements: editing.requirements,
        description: editing.description, is_active: editing.is_active ?? true,
      });
      if (error) { toast.error(error.message); return; }
      toast.success("Job created");
    } else {
      const { error } = await supabase.from("jobs").update({
        title: editing.title, country: editing.country, category: editing.category,
        salary_min: editing.salary_min, salary_max: editing.salary_max,
        contract_length: editing.contract_length, benefits: editing.benefits,
        accommodation: editing.accommodation, requirements: editing.requirements,
        description: editing.description, is_active: editing.is_active,
      }).eq("id", editing.id!);
      if (error) { toast.error(error.message); return; }
      toast.success("Job updated");
    }
    setEditing(null);
    load();
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    toast.success("Job deleted");
    load();
  };

  const update = (field: string, value: unknown) => setEditing((prev) => prev ? { ...prev, [field]: value } : prev);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Manage Jobs</h1>
        <button onClick={() => { setEditing(emptyJob); setIsNew(true); }} className="btn-gold text-xs w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4 mr-1" /> Add Job
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setEditing(null)}>
          <div className="bg-card rounded-md max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">{isNew ? "New Job" : "Edit Job"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Title *</label>
                <input value={editing.title ?? ""} onChange={(e) => update("title", e.target.value)} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Country</label>
                <select value={editing.country ?? ""} onChange={(e) => update("country", e.target.value)} className="input-corporate">
                  <option>Saudi Arabia</option><option>UAE</option><option>Qatar</option><option>Kuwait</option><option>Oman</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Category</label>
                <select value={editing.category ?? ""} onChange={(e) => update("category", e.target.value)} className="input-corporate">
                  <option>Domestic</option><option>Construction</option><option>Hospitality</option><option>Driving</option><option>Security</option><option>Logistics</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Contract Length</label>
                <input value={editing.contract_length ?? ""} onChange={(e) => update("contract_length", e.target.value)} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Min Salary ($)</label>
                <input type="number" value={editing.salary_min ?? ""} onChange={(e) => update("salary_min", Number(e.target.value))} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Max Salary ($)</label>
                <input type="number" value={editing.salary_max ?? ""} onChange={(e) => update("salary_max", Number(e.target.value))} className="input-corporate" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground font-body mb-1">Benefits</label>
                <input value={editing.benefits ?? ""} onChange={(e) => update("benefits", e.target.value)} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Accommodation</label>
                <input value={editing.accommodation ?? ""} onChange={(e) => update("accommodation", e.target.value)} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">Requirements</label>
                <input value={editing.requirements ?? ""} onChange={(e) => update("requirements", e.target.value)} className="input-corporate" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground font-body mb-1">Description</label>
                <textarea value={editing.description ?? ""} onChange={(e) => update("description", e.target.value)} rows={3} className="input-corporate" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => update("is_active", e.target.checked)} id="active" />
                <label htmlFor="active" className="text-sm font-body text-foreground">Active</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="btn-gold flex-1">Save</button>
              <button onClick={() => setEditing(null)} className="btn-outline-corporate flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-body">Loading jobs...</p>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {jobs.map((j) => (
              <div key={j.id} className="card-corporate p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-heading text-base font-semibold text-foreground leading-tight">{j.title}</h2>
                  <span className={`badge-gold text-[10px] ${j.is_active ? "" : "opacity-40"}`}>{j.is_active ? "Active" : "Inactive"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-body text-muted-foreground mb-4">
                  <div>
                    <div className="uppercase tracking-wider">Country</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">{j.country}</div>
                  </div>
                  <div>
                    <div className="uppercase tracking-wider">Category</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">{j.category}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="uppercase tracking-wider">Salary</div>
                    <div className="text-foreground text-sm normal-case tracking-normal">${j.salary_min}-{j.salary_max}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(j); setIsNew(false); }} className="btn-outline-corporate flex-1 text-xs py-2 px-3">
                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                  </button>
                  <button onClick={() => deleteJob(j.id)} className="btn-outline-corporate flex-1 text-xs py-2 px-3 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Salary</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-3 font-medium text-foreground">{j.title}</td>
                    <td className="py-3 px-3 text-muted-foreground">{j.country}</td>
                    <td className="py-3 px-3 text-muted-foreground">{j.category}</td>
                    <td className="py-3 px-3 text-muted-foreground">${j.salary_min}-{j.salary_max}</td>
                    <td className="py-3 px-3">
                      <span className={`badge-gold text-[10px] ${j.is_active ? "" : "opacity-40"}`}>{j.is_active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditing(j); setIsNew(false); }} className="text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteJob(j.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No jobs yet. Create your first job posting.</div>
          )}
        </>
      )}
    </div>
  );
}
