import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.contact.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <div className="gold-divider mb-4" />
                <h2 className="heading-section mb-6">{t.contact.getInTouch}</h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: t.contact.address, value: t.contact.addressValue },
                  { icon: Phone, label: t.contact.phone, value: t.contact.phoneValue },
                  { icon: Mail, label: t.contact.emailLabel, value: t.contact.emailValue },
                  { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue },
                ].map((item) => (
                  <div key={item.label} className="card-corporate flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{item.label}</h3>
                      <p className="text-body-sm whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://wa.me/251900000000" className="btn-gold">
                  <MessageCircle className="w-4 h-4 mr-2" /> {t.contact.whatsapp}
                </a>
                <a href="https://t.me/horizonmanpower" className="btn-primary-corporate">
                  <Send className="w-4 h-4 mr-2" /> {t.contact.telegram}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-md overflow-hidden bg-muted">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0Nic00C4wIkU!5e0!3m2!1sen!2set!4v1&z=15"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="card-corporate">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{t.contact.sendMessage}</h3>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input placeholder={t.contact.yourName} className="input-corporate" />
                  <input placeholder={t.contact.phoneOrEmail} className="input-corporate" />
                  <textarea placeholder={t.contact.yourMessage} rows={3} className="input-corporate" />
                  <button type="submit" className="btn-primary-corporate w-full">{t.contact.send}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
