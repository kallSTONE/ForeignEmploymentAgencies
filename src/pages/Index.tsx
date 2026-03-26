import { Link } from "react-router-dom";
import { ArrowRight, Shield, Globe, Users, Award, Star, ChevronRight, MessageCircle, Send, Phone, Briefcase } from "lucide-react";
import heroImg from "@/assets/hero-workers.jpg";
import gulfImg from "@/assets/gulf-skyline.jpg";
import trainingImg from "@/assets/training-center.png";
import officeImg from "@/assets/office.png";
import gradImg from "@/assets/graduation.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const countries = [
  { name: "Saudi Arabia", flag: "🇸🇦", jobs: 120 },
  { name: "United Arab Emirates", flag: "🇦🇪", jobs: 85 },
  { name: "Qatar", flag: "🇶🇦", jobs: 42 },
  { name: "Kuwait", flag: "🇰🇼", jobs: 35 },
  { name: "Oman", flag: "🇴🇲", jobs: 28 },
];

const testimonials = [
  { name: "Al Noor Recruitment", location: "Riyadh, Saudi Arabia", text: "Horizon consistently delivers pre-screened Ethiopian candidates who match our client job orders and deployment timelines." },
  { name: "GulfConnect Manpower", location: "Dubai, UAE", text: "Their documentation process is transparent and fast. We can track every candidate stage from intake to mobilization." },
  { name: "Doha Talent Services", location: "Doha, Qatar", text: "The training readiness and communication quality from Horizon reduced onboarding issues and improved retention for our placements." },
];

export default function HomePage() {
  const { t } = useLanguage();
  const faqs = t.home.faqItems;

  const supportServices = [
    {
      icon: Briefcase,
      title: "Immediate Job Placement Assistance",
      desc: "Supporting job seekers in finding employment opportunities quickly and efficiently.",
    },
    {
      icon: Award,
      title: "Pre-Employment Training & Orientation",
      desc: "Equipping candidates with necessary skills and cultural understanding to thrive in international job markets.",
    },
    {
      icon: Shield,
      title: "Visa & Documentation Support",
      desc: "Assisting with visa processing, contract management, and compliance documentation.",
    },
    {
      icon: Globe,
      title: "Relocation & Transition Assistance",
      desc: "Helping candidates with smooth relocation, from travel arrangements to settling into new job environments.",
    },
    {
      icon: Users,
      title: "Emergency Workforce Solutions",
      desc: "Offering quick deployment of workers in urgent or unforeseen circumstances.",
    },
    {
      icon: MessageCircle,
      title: "Client Support",
      desc: "Providing responsive support for employers and candidates throughout recruitment and deployment.",
    },
  ];

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
              <Link to="/employer" className="btn-gold">
                {t.nav.forEmployers} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/portal" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                {t.nav.candidatePortal}
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
              <Link key={c.name} to={`/portal/jobs?country=${encodeURIComponent(c.name)}`} className="card-corporate text-center group">
                <div className="text-4xl mb-3">{c.flag}</div>
                <h3 className="font-heading text-base font-semibold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">{c.jobs} {t.home.viewJobs}</p>
                <ChevronRight className="w-4 h-4 text-accent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">We Are Always Ready to Help You</h2>
            <p className="text-body max-w-3xl mx-auto">
              At Horizon Manpower, we are always here to support you. Whether you are looking for reliable workers or seeking the right job opportunity,
              our team is committed to providing exceptional service with integrity, professionalism, and care.
            </p>
            <p className="text-body max-w-3xl mx-auto mt-3">
              Reach out to us today, and let us assist you in making the right connection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((item, index) => (
              <div
                key={item.title}
                className="card-corporate h-full border border-border/80 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold font-body tracking-wide text-muted-foreground">
                    SERVICE {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-snug">{item.title}</h3>
                <p className="text-body-sm leading-relaxed">{item.desc}</p>

                <div className="mt-5 pt-4 border-t border-border/70">
                  <Link to="/contact" className="text-sm font-medium text-primary hover:text-accent transition-colors font-body">
                    Talk to our team →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/employer" className="btn-gold">
              {t.nav.forEmployers} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/portal" className="btn-outline-corporate">
              {t.nav.candidatePortal}
            </Link>
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
            <Link to="/employer" className="btn-gold">
              {t.home.ctaRegister} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/portal/status" className="btn-outline-corporate border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
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

      {/* FAQ */}
      <section className="section-padding bg-secondary">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-10">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.home.faqTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">
              {t.home.faqSub}
            </p>
          </div>

          <div className="card-corporate">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`home-faq-${index}`}>
                  <AccordionTrigger className="text-left font-heading text-base text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
