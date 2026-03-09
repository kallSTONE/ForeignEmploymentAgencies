import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Briefcase, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/contexts/LanguageContext";

type Job = Tables<"jobs">;

const countriesFilter = ["All Countries", "Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman"];
const categoriesFilter = ["All Categories", "Domestic", "Construction", "Hospitality", "Driving", "Security", "Logistics"];

export default function Jobs() {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("All Countries");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Job | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false });
      setJobs(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = jobs.filter((j) => {
    if (country !== "All Countries" && j.country !== country) return false;
    if (category !== "All Categories" && j.category !== category) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.jobs.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.jobs.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="card-corporate mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-accent" />
              <span className="font-heading text-sm font-semibold text-foreground">{t.jobs.search}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder={t.jobs.search} value={search} onChange={(e) => setSearch(e.target.value)} className="input-corporate pl-10" />
              </div>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="input-corporate">
                <option>{t.jobs.allCountries}</option>
                {countriesFilter.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-corporate">
                <option>{t.jobs.allCategories}</option>
                {categoriesFilter.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelected(null)}>
              <div className="bg-card rounded-md max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="badge-gold mb-3">{selected.category}</div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-1">{selected.title}</h2>
                <p className="text-sm text-muted-foreground font-body mb-6">{selected.country}</p>
                <div className="space-y-4">
                  {[
                    { label: t.jobs.salary, value: `$${selected.salary_min ?? 0}-${selected.salary_max ?? 0}${t.jobs.month}` },
                    { label: t.jobs.contract, value: selected.contract_length ?? "—" },
                    { label: t.jobs.benefits, value: selected.benefits ?? "—" },
                    { label: t.jobs.accommodation, value: selected.accommodation ?? "—" },
                    { label: t.jobs.requirements, value: selected.requirements ?? "—" },
                    { label: t.jobs.description, value: selected.description ?? "—" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body mb-1">{row.label}</div>
                      <div className="text-sm text-foreground font-body">{row.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Link to="/register" className="btn-gold flex-1 text-center text-xs">{t.jobs.apply}</Link>
                  <button onClick={() => setSelected(null)} className="btn-outline-corporate flex-1 text-xs">{t.jobs.close}</button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-body text-center py-12">{t.jobs.loading}</p>
          ) : (
            <>
              <div className="text-sm text-muted-foreground font-body mb-4">{filtered.length} positions found</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((job) => (
                  <div key={job.id} className="card-corporate cursor-pointer" onClick={() => setSelected(job)}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-gold text-[10px]">{job.category}</span>
                      <span className="text-xs text-muted-foreground font-body">{job.contract_length}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                        <MapPin className="w-3.5 h-3.5" /> {job.country}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-accent font-body">
                        <DollarSign className="w-3.5 h-3.5" /> ${job.salary_min ?? 0}-{job.salary_max ?? 0}{t.jobs.month}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border text-xs text-primary font-semibold font-body hover:text-accent transition-colors">
                      {t.jobs.details} →
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-body">{t.jobs.noResults}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
