import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, Users } from "lucide-react";
import trainingImg from "@/assets/training-center.jpg";
import gradImg from "@/assets/graduation.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Training() {
  const { t } = useLanguage();

  const programs = [
    { title: "Arabic Language", duration: "4 Weeks", desc: "Basic Arabic vocabulary and phrases for daily communication and workplace interactions in Gulf countries.", icon: BookOpen },
    { title: "Housekeeping & Hospitality", duration: "3 Weeks", desc: "Professional housekeeping techniques, hotel standards, cooking basics, and hospitality service skills.", icon: Award },
    { title: "Cultural Orientation", duration: "1 Week", desc: "Understanding Gulf culture, customs, religious practices, and workplace etiquette for smooth integration.", icon: Users },
    { title: "Rights & Safety", duration: "3 Days", desc: "Know your rights as a migrant worker, emergency contacts, embassy information, and safety protocols.", icon: Clock },
  ];

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.training.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.training.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="gold-divider mb-4" />
            <h2 className="heading-section mb-4">{t.training.prepTitle}</h2>
            <p className="text-body mb-4">{t.training.prepP1}</p>
            <p className="text-body">{t.training.prepP2}</p>
          </div>
          <div className="aspect-[4/3] rounded-md overflow-hidden">
            <img src={trainingImg} alt="Training in progress" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section">{t.training.programsTitle}</h2>
            <p className="text-body mt-2">{t.training.programsSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="card-corporate flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <p.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{p.title}</h3>
                  <div className="badge-gold text-[10px] mb-2">{p.duration}</div>
                  <p className="text-body-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-md overflow-hidden">
            <img src={gradImg} alt="Graduation ceremony" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="gold-divider mb-4" />
            <h2 className="heading-section mb-4">{t.training.scheduleTitle}</h2>
            <div className="space-y-4">
              <div className="card-corporate">
                <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{t.training.scheduleLabel}</h4>
                <p className="text-body-sm">{t.training.scheduleValue}</p>
              </div>
              <div className="card-corporate">
                <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{t.training.reqLabel}</h4>
                <p className="text-body-sm">{t.training.reqValue}</p>
              </div>
              <div className="card-corporate">
                <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{t.training.locationLabel}</h4>
                <p className="text-body-sm">{t.training.locationValue}</p>
              </div>
            </div>
            <Link to="/register" className="btn-gold mt-6">{t.training.registerCta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
