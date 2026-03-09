import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmployerRequest() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: "", country: "Saudi Arabia", contactPerson: "", email: "", phone: "",
    workersNeeded: "", jobCategory: "Domestic", startDate: "", additionalInfo: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("employer_requests").insert({
      company_name: form.companyName.trim(),
      country: form.country,
      contact_person: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone || null,
      workers_needed: form.workersNeeded ? parseInt(form.workersNeeded) : null,
      job_category: form.jobCategory,
      start_date: form.startDate || null,
      additional_info: form.additionalInfo || null,
    });
    setSubmitting(false);
    if (error) { toast.error("Failed to submit. Please try again."); return; }
    setSubmitted(true);
    toast.success("Your request has been submitted.");
  };

  if (submitted) {
    return (
      <div className="section-padding bg-background">
        <div className="container-wide max-w-lg text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="heading-section mb-3">{t.employer.successTitle}</h1>
          <p className="text-body">{t.employer.successMsg.replace("{company}", form.companyName).replace("{email}", form.email)}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.employer.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.employer.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-2xl">
          <form onSubmit={handleSubmit} className="card-corporate space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.companyName} *</label>
                <input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="input-corporate" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.country} *</label>
                <select value={form.country} onChange={(e) => update("country", e.target.value)} className="input-corporate">
                  <option>Saudi Arabia</option><option>UAE</option><option>Qatar</option><option>Kuwait</option><option>Oman</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.contactPerson} *</label>
                <input value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className="input-corporate" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.emailLabel} *</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-corporate" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.phoneLabel}</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input-corporate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.workers}</label>
                <input type="number" value={form.workersNeeded} onChange={(e) => update("workersNeeded", e.target.value)} className="input-corporate" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.jobCategory}</label>
                <select value={form.jobCategory} onChange={(e) => update("jobCategory", e.target.value)} className="input-corporate">
                  <option value="Domestic">{t.common.domestic}</option>
                  <option value="Construction">{t.common.construction}</option>
                  <option value="Hospitality">{t.common.hospitality}</option>
                  <option value="Driving">{t.common.driving}</option>
                  <option value="Security">{t.common.security}</option>
                  <option value="Other">{t.common.other}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.startDate}</label>
                <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className="input-corporate" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground font-body mb-1">{t.employer.additionalInfo}</label>
              <textarea value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} rows={4} className="input-corporate" placeholder={t.employer.infoPlaceholder} />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary-corporate w-full py-4 text-base">
              {submitting ? t.employer.submitting : t.employer.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
