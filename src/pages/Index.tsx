import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Globe, Users, Award, Star, ChevronRight, MapPin, Briefcase, DollarSign, MessageCircle, Send, Phone } from "lucide-react";
import heroImg from "@/assets/hero-workers.jpg";
import gulfImg from "@/assets/gulf-skyline.jpg";
import trainingImg from "@/assets/training-center.jpg";
import officeImg from "@/assets/office.jpg";
import gradImg from "@/assets/graduation.jpg";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/contexts/LanguageContext";

type Job = Tables<"jobs">;

const countries = [
  { name: "Saudi Arabia", flag: "🇸🇦", jobs: 120 },
  { name: "United Arab Emirates", flag: "🇦🇪", jobs: 85 },
  { name: "Qatar", flag: "🇶🇦", jobs: 42 },
  { name: "Kuwait", flag: "🇰🇼", jobs: 35 },
  { name: "Oman", flag: "🇴🇲", jobs: 28 },
];

const testimonials = [
  { name: "Almaz T.", location: "Working in Dubai, UAE", text: "Horizon Manpower helped me find a great job in Dubai. The training I received before departure prepared me well for my work. I'm now supporting my family back home." },
  { name: "Kebede M.", location: "Working in Riyadh, Saudi Arabia", text: "I was nervous about working abroad, but the agency guided me through every step — from registration to arrival. I feel safe and well supported." },
  { name: "Tigist A.", location: "Working in Doha, Qatar", text: "The pre-departure training was excellent. I learned the language basics and cultural expectations. My employer is very satisfied with my work." },
];

export default function HomePage() {
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
        .limit(4);

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
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Ethiopian workers departing for Gulf employment" className="w-full h-full object-cover" />
          <div className="overlay-navy absolute inset-0" />
        </div>
        <div className="relative container-wide section-padding">
          <div className="max-w-2xl">
            <div className="badge-gold mb-6 animate-fade-in-up">{t.nav.licensed}</div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up animate-delay-100">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg text-primary-foreground/80 font-body leading-relaxed mb-8 animate-fade-in-up animate-delay-200">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <Link to="/jobs" className="btn-gold">
                {t.home.browseJobs} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/register" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                {t.home.registerNow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-card border-b border-border">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { value: "5,000+", label: t.home.statsWorkers },
            { value: "5", label: t.home.statsCountries },
            { value: "15+", label: t.home.statsYears },
            { value: "98%", label: t.home.statsRate },
          ].map((stat) => (
            <div key={stat.label} className="py-6 px-4 text-center">
              <div className="font-heading text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-body-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.home.countriesTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{t.home.countriesSub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {countries.map((c) => (
              <Link key={c.name} to={`/jobs?country=${encodeURIComponent(c.name)}`} className="card-corporate text-center group">
                <div className="text-4xl mb-3">{c.flag}</div>
                <h3 className="font-heading text-base font-semibold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">{c.jobs} {t.home.viewJobs}</p>
                <ChevronRight className="w-4 h-4 text-accent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="gold-divider mb-4" />
              <h2 className="heading-section mb-2">{t.home.jobsTitle}</h2>
              <p className="text-body">{t.home.jobsSub}</p>
            </div>
            <Link to="/jobs" className="btn-outline-corporate text-xs">
              {t.home.viewAll} <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {loadingFeaturedJobs &&
              Array.from({ length: 4 }).map((_, i) => (
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
                    <DollarSign className="w-3 h-3" /> ${job.salary_min ?? 0}-{job.salary_max ?? 0}{t.jobs.month}
                  </div>
                  <Link to="/jobs" className="mt-4 block text-sm font-medium text-primary hover:text-accent transition-colors font-body">
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

      {/* CTA Registration */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={gulfImg} alt="Gulf cities skyline" className="w-full h-full object-cover" />
          <div className="overlay-dark absolute inset-0" />
        </div>
        <div className="relative container-wide section-padding text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t.home.ctaTitle}</h2>
          <p className="text-primary-foreground/80 font-body text-lg mb-8 max-w-xl mx-auto">{t.home.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-gold">
              {t.home.ctaRegister} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/status" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              {t.home.ctaStatus}
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.home.credTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{t.home.credSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t.home.credLicensed, desc: t.home.credLicensedDesc },
              { icon: Globe, title: t.home.credGlobal, desc: t.home.credGlobalDesc },
              { icon: Users, title: t.home.credSupport, desc: t.home.credSupportDesc },
              { icon: Award, title: t.home.credTrack, desc: t.home.credTrackDesc },
            ].map((item) => (
              <div key={item.title} className="card-corporate text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-body-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.home.testimonialsTitle}</h2>
            <p className="text-body">{t.home.testimonialsSub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="card-corporate">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-body-sm italic mb-4">"{item.text}"</p>
                <div>
                  <div className="font-heading text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground font-body">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.home.galleryTitle}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[heroImg, trainingImg, officeImg, gulfImg, gradImg, trainingImg].map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-md">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t.home.contactTitle}</h2>
          <p className="text-primary-foreground/70 font-body mb-8 max-w-lg mx-auto">{t.home.contactSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/251900000000" className="btn-gold">
              <MessageCircle className="w-4 h-4 mr-2" /> {t.home.whatsapp}
            </a>
            <a href="https://t.me/horizonmanpower" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Send className="w-4 h-4 mr-2" /> {t.home.telegram}
            </a>
            <a href="tel:+251111000000" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="w-4 h-4 mr-2" /> {t.home.callUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
