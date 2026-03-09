import { useState } from "react";
import { Search, Clock, CheckCircle, AlertCircle, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

type AppResult = {
  application_id: string;
  full_name: string;
  status: string | null;
  status_note: string | null;
  updated_at: string;
} | null;

const stageStyles: Record<string, { icon: typeof Clock; color: string }> = {
  "Submitted": { icon: Clock, color: "text-muted-foreground" },
  "Under Review": { icon: Clock, color: "text-accent" },
  "Training": { icon: Clock, color: "text-accent" },
  "Document Processing": { icon: FileText, color: "text-blue-500" },
  "Visa Processing": { icon: FileText, color: "text-blue-600" },
  "Deployed": { icon: CheckCircle, color: "text-green-600" },
  "Rejected": { icon: AlertCircle, color: "text-destructive" },
};

export default function StatusChecker() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AppResult>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    setSearched(true);

    const { data } = await supabase
      .from("applications")
      .select("application_id, full_name, status, status_note, updated_at")
      .or(`application_id.eq.${trimmed.toUpperCase()},phone.eq.${trimmed}`)
      .limit(1)
      .maybeSingle();

    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.status.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.status.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-xl">
          <form onSubmit={handleSearch} className="card-corporate">
            <label className="block text-sm font-medium text-foreground font-body mb-2">{t.status.placeholder}</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., HM-123456 or +251..."
                  className="input-corporate pl-10"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-gold whitespace-nowrap">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.status.search}
              </button>
            </div>
          </form>

          {searched && !loading && result && (
            <div className="card-corporate mt-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const s = stageStyles[result.status ?? "Submitted"] || stageStyles["Submitted"];
                  return <s.icon className={`w-6 h-6 ${s.color}`} />;
                })()}
                <div>
                  <div className="font-heading text-lg font-semibold text-foreground">{result.full_name}</div>
                  <div className="text-xs text-muted-foreground font-body">{t.status.appId}: {result.application_id}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body mb-1">{t.status.stage}</div>
                  <div className="badge-gold">{result.status ?? "Submitted"}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body mb-1">{t.status.lastUpdated}</div>
                  <div className="text-sm text-foreground font-body">{new Date(result.updated_at).toLocaleDateString()}</div>
                </div>
                {result.status_note && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body mb-1">{t.status.note}</div>
                    <div className="text-sm text-foreground font-body">{result.status_note}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {searched && !loading && !result && (
            <div className="card-corporate mt-6 text-center animate-fade-in-up">
              <AlertCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-body">{t.status.notFound}</p>
              <p className="text-body-sm mt-1">{t.status.notFoundDesc}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
