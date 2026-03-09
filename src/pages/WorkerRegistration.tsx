import { useState, useRef } from "react";
import { Upload, CheckCircle, FileText, Image } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WorkerRegistration() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [submissionType, setSubmissionType] = useState<"self_submission" | "representative_submission">("self_submission");
  const [consent, setConsent] = useState(false);
  const [rep, setRep] = useState({ name: "", relationship: "", phone: "", email: "" });
  const [form, setForm] = useState({
    fullName: "", age: "", phone: "", email: "", passportStatus: "have",
    experience: "", desiredCountry: "Saudi Arabia", jobCategory: "Domestic",
    education: "", maritalStatus: "", emergencyContact: "", additionalNotes: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const updateRep = (field: string, value: string) => setRep((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!consent) {
      toast.error("Please confirm the consent checkbox before submitting.");
      return;
    }
    if (submissionType === "representative_submission" && (!rep.name.trim() || !rep.relationship.trim() || !rep.phone.trim() || !rep.email.trim())) {
      toast.error("Please fill in all representative information fields.");
      return;
    }
    setSubmitting(true);
    const applicationId = `HM-${Date.now().toString().slice(-6)}`;

    let cvPath: string | null = null;
    let photoPath: string | null = null;

    if (cvFile) {
      const ext = cvFile.name.split(".").pop();
      const path = `cv/${applicationId}.${ext}`;
      const { error: cvErr } = await supabase.storage.from("worker-documents").upload(path, cvFile);
      if (cvErr) { toast.error("CV upload failed."); setSubmitting(false); return; }
      cvPath = path;
    }

    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const path = `photo/${applicationId}.${ext}`;
      const { error: photoErr } = await supabase.storage.from("worker-documents").upload(path, photoFile);
      if (photoErr) { toast.error("Photo upload failed."); setSubmitting(false); return; }
      photoPath = path;
    }

    const { error } = await supabase.from("applications").insert({
      application_id: applicationId,
      full_name: form.fullName.trim(),
      age: form.age ? parseInt(form.age) : null,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      passport_status: form.passportStatus,
      experience: form.experience || null,
      desired_country: form.desiredCountry,
      job_category: form.jobCategory,
      education: form.education || null,
      marital_status: form.maritalStatus || null,
      emergency_contact: form.emergencyContact || null,
      additional_notes: form.additionalNotes || null,
      cv_path: cvPath,
      photo_path: photoPath,
      submission_type: submissionType,
      representative_name: submissionType === "representative_submission" ? rep.name.trim() : null,
      representative_relationship: submissionType === "representative_submission" ? rep.relationship.trim() : null,
      representative_phone: submissionType === "representative_submission" ? rep.phone.trim() : null,
      representative_email: submissionType === "representative_submission" ? rep.email.trim() : null,
      consent_confirmed: consent,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit. Please try again.");
      return;
    }
    setAppId(applicationId);
    setSubmitted(true);
    toast.success("Your application has been submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="section-padding bg-background">
        <div className="container-wide max-w-lg text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="heading-section mb-3">{t.register.successTitle}</h1>
          <p className="text-body mb-2">{t.register.successMsg.replace("{name}", form.fullName)}</p>
          <p className="text-body-sm mb-6">{t.register.successSub.replace("{phone}", form.phone)}</p>
          <div className="card-corporate inline-block text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-body mb-1">{t.register.refLabel}</div>
            <div className="font-heading text-xl font-bold text-foreground">{appId}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">{t.register.refNote}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary section-padding pb-12">
        <div className="container-wide">
          <div className="gold-divider mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{t.register.title}</h1>
          <p className="text-primary-foreground/70 font-body text-lg max-w-2xl">{t.register.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Submission Type */}
            <div className="card-corporate">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.submissionType}</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <input
                    type="radio"
                    name="submissionType"
                    checked={submissionType === "self_submission"}
                    onChange={() => { setSubmissionType("self_submission"); setConsent(false); }}
                    className="mt-1 accent-[hsl(var(--accent))]"
                  />
                  <span className="text-sm font-body text-foreground">{t.register.selfSubmission}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <input
                    type="radio"
                    name="submissionType"
                    checked={submissionType === "representative_submission"}
                    onChange={() => { setSubmissionType("representative_submission"); setConsent(false); }}
                    className="mt-1 accent-[hsl(var(--accent))]"
                  />
                  <span className="text-sm font-body text-foreground">{t.register.representativeSubmission}</span>
                </label>
              </div>
            </div>

            {/* Representative Information */}
            {submissionType === "representative_submission" && (
              <div className="card-corporate">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.representativeInfo}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.repName} *</label>
                    <input value={rep.name} onChange={(e) => updateRep("name", e.target.value)} className="input-corporate" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.repRelationship} *</label>
                    <input value={rep.relationship} onChange={(e) => updateRep("relationship", e.target.value)} className="input-corporate" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.repPhone} *</label>
                    <input value={rep.phone} onChange={(e) => updateRep("phone", e.target.value)} placeholder="+251..." className="input-corporate" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.repEmail} *</label>
                    <input type="email" value={rep.email} onChange={(e) => updateRep("email", e.target.value)} className="input-corporate" required />
                  </div>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="card-corporate">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.personalInfo}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.fullName} *</label>
                  <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="input-corporate" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.age} *</label>
                  <input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} className="input-corporate" required min="18" max="55" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.phone} *</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+251..." className="input-corporate" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.email}</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-corporate" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.education}</label>
                  <select value={form.education} onChange={(e) => update("education", e.target.value)} className="input-corporate">
                    <option value="">{t.register.selectPlaceholder}</option>
                    <option value="No formal education">{t.register.eduNone}</option>
                    <option value="Primary school">{t.register.eduPrimary}</option>
                    <option value="Secondary school">{t.register.eduSecondary}</option>
                    <option value="TVET / Diploma">{t.register.eduTvet}</option>
                    <option value="Degree">{t.register.eduDegree}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.maritalStatus}</label>
                  <select value={form.maritalStatus} onChange={(e) => update("maritalStatus", e.target.value)} className="input-corporate">
                    <option value="">{t.register.selectPlaceholder}</option>
                    <option value="Single">{t.register.single}</option>
                    <option value="Married">{t.register.married}</option>
                    <option value="Divorced">{t.register.divorced}</option>
                    <option value="Widowed">{t.register.widowed}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-corporate">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.empPrefs}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.passportStatus} *</label>
                  <select value={form.passportStatus} onChange={(e) => update("passportStatus", e.target.value)} className="input-corporate">
                    <option value="have">{t.register.passportHave}</option>
                    <option value="expired">{t.register.passportExpired}</option>
                    <option value="applying">{t.register.passportApplying}</option>
                    <option value="none">{t.register.passportNone}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.desiredCountry} *</label>
                  <select value={form.desiredCountry} onChange={(e) => update("desiredCountry", e.target.value)} className="input-corporate">
                    <option>Saudi Arabia</option><option>UAE</option><option>Qatar</option><option>Kuwait</option><option>Oman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.jobCategory} *</label>
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
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.experience}</label>
                  <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className="input-corporate">
                    <option value="">{t.register.selectPlaceholder}</option>
                    <option value="No experience">{t.register.noExp}</option>
                    <option value="Less than 1 year">{t.register.expLess1}</option>
                    <option value="1-3 years">{t.register.exp1to3}</option>
                    <option value="3+ years">{t.register.exp3plus}</option>
                    <option value="Previously worked abroad">{t.register.expAbroad}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-corporate">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.documents}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.uploadCv}</label>
                  <div className="input-corporate flex items-center gap-2 cursor-pointer" onClick={() => cvRef.current?.click()}>
                    {cvFile ? <FileText className="w-4 h-4 text-accent" /> : <Upload className="w-4 h-4 text-muted-foreground" />}
                    <span className={`text-sm ${cvFile ? "text-foreground" : "text-muted-foreground"}`}>{cvFile ? cvFile.name : t.register.chooseFile}</span>
                  </div>
                  <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.uploadPhoto}</label>
                  <div className="input-corporate flex items-center gap-2 cursor-pointer" onClick={() => photoRef.current?.click()}>
                    {photoFile ? <Image className="w-4 h-4 text-accent" /> : <Upload className="w-4 h-4 text-muted-foreground" />}
                    <span className={`text-sm ${photoFile ? "text-foreground" : "text-muted-foreground"}`}>{photoFile ? photoFile.name : t.register.chooseFile}</span>
                  </div>
                  <input ref={photoRef} type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                </div>
              </div>
            </div>

            <div className="card-corporate">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">{t.register.additionalInfo}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.emergencyContact}</label>
                  <input value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} className="input-corporate" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground font-body mb-1">{t.register.additionalNotes}</label>
                  <input value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} className="input-corporate" placeholder={t.register.notesPlaceholder} />
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="card-corporate">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[hsl(var(--accent))] shrink-0"
                  required
                />
                <span className="text-sm font-body text-foreground">
                  {submissionType === "self_submission" ? t.register.consentSelf : t.register.consentRepresentative} *
                </span>
              </label>
            </div>

            <button type="submit" disabled={submitting || !consent} className="btn-gold w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? t.register.submitting : t.register.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}