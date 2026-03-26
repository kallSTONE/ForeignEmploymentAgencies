import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, DollarSign, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/contexts/LanguageContext";

type Job = Tables<"jobs">;

export default function PortalHome() {
  const { t } = useLanguage();
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loadingFeaturedJobs, setLoadingFeaturedJobs] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedJobs = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(8);

      if (!isMounted) return;

      setFeaturedJobs(data ?? []);
      setLoadingFeaturedJobs(false);
    };

    loadFeaturedJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
            {t.nav.candidatePortal}
          </h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">
            Browse active opportunities, complete registration, and track your application from one place.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/portal/register" className="btn-gold">
              {t.nav.register} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/portal/status" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              {t.nav.status}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="gold-divider mb-4" />
              <h2 className="heading-section mb-2">{t.home.jobsTitle}</h2>
              <p className="text-body">{t.home.jobsSub}</p>
            </div>
            <Link to="/portal/jobs" className="btn-outline-corporate text-xs">
              {t.home.viewAll} <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {loadingFeaturedJobs &&
              Array.from({ length: 8 }).map((_, i) => (
                <div key={`job-skeleton-${i}`} className="card-corporate animate-pulse" aria-hidden="true">
                  <div className="h-5 w-24 rounded bg-muted mb-3" />
                  <div className="h-6 w-4/5 rounded bg-muted mb-2" />
                  <div className="h-4 w-1/2 rounded bg-muted mb-2" />
                  <div className="h-4 w-2/5 rounded bg-muted mb-5" />
                  <div className="h-4 w-20 rounded bg-muted" />
                </div>
              ))}

            {!loadingFeaturedJobs &&
              featuredJobs.map((job) => (
                <div key={job.id} className="card-corporate">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-accent" />
                    <span className="badge-gold text-[10px]">{job.contract_length ?? "-"}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{job.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground font-body mb-2">
                    <MapPin className="w-3 h-3" /> {job.country}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-accent font-body">
                    <DollarSign className="w-3 h-3" /> ${job.salary_min ?? 0}-{job.salary_max ?? 0}
                    {t.jobs.month}
                  </div>
                  <Link to="/portal/jobs" className="mt-4 block text-sm font-medium text-primary hover:text-accent transition-colors font-body">
                    {t.home.applyNow} →
                  </Link>
                </div>
              ))}

            {!loadingFeaturedJobs && featuredJobs.length === 0 && (
              <div className="lg:col-span-4 md:col-span-2 text-center py-10 text-body">{t.jobs.noResults}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
