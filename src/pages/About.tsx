import { Target, Eye, Heart } from "lucide-react";
import officeImg from "@/assets/office.png";
import trainingImg from "@/assets/training-center.png";
import gradImg from "@/assets/graduation.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function About() {
  const { t } = useLanguage();
  const faqs = t.about.faqItems;

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.about.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.about.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="gold-divider mb-4" />
            <h2 className="heading-section mb-4">{t.about.storyTitle}</h2>
            <div className="space-y-4 text-body">
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-md overflow-hidden">
            <img src={officeImg} alt="Horizon Manpower office" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide grid md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: t.about.missionTitle, desc: t.about.missionDesc },
            { icon: Eye, title: t.about.visionTitle, desc: t.about.visionDesc },
            { icon: Heart, title: t.about.valuesTitle, desc: t.about.valuesDesc },
          ].map((item) => (
            <div key={item.title} className="card-corporate text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-body-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 aspect-[4/3] rounded-md overflow-hidden">
            <img src={gradImg} alt="Training graduation" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="gold-divider mb-4" />
            <h2 className="heading-section mb-4">{t.about.licenseTitle}</h2>
            <p className="text-body mb-4">{t.about.licenseSub}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="gold-divider mb-4" />
            <h2 className="heading-section mb-4">{t.about.trainingTitle}</h2>
            <p className="text-body mb-4">{t.about.trainingSub}</p>
          </div>
          <div className="aspect-[4/3] rounded-md overflow-hidden">
            <img src={trainingImg} alt="Training center" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-10">
            <div className="gold-divider mx-auto mb-4" />
            <h2 className="heading-section mb-3">{t.about.faqTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">
              {t.about.faqSub}
            </p>
          </div>

          <div className="card-corporate">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`about-faq-${index}`}>
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
    </>
  );
}
