"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Contact as ContactData, Profile } from "@/lib/content";

interface ContactProps {
  contact: ContactData;
  profile: Pick<Profile, "location" | "social">;
}

export function Contact({ contact, profile }: ContactProps) {
  const t = useTranslations("contact");

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    `w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm
     text-foreground placeholder:text-muted-foreground
     focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50
     transition-colors`;

  return (
    <SectionWrapper id="contact">
      <SectionHeading label={t("label")} title={contact.heading} subtitle={contact.description} />

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left: form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass-card-accent p-7 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder={t("namePlaceholder")}
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder={t("emailPlaceholder")}
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <input
            type="text"
            name="subject"
            placeholder={t("subjectPlaceholder")}
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
          />

          <textarea
            name="message"
            required
            rows={5}
            placeholder={t("messagePlaceholder")}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />

          {/* Status feedback */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-success bg-success/10
                         border border-success/20 rounded-xl px-4 py-3"
            >
              <CheckCircle size={15} /> {t("success")}
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10
                         border border-red-400/20 rounded-xl px-4 py-3"
            >
              <AlertCircle size={15} /> {t("error")}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-primary text-primary-foreground font-semibold text-sm
                       hover:opacity-90 disabled:opacity-60 transition-opacity glow-primary"
          >
            <Send size={15} className={status === "sending" ? "animate-spin" : ""} />
            {status === "sending" ? t("sending") : t("send")}
          </button>
        </form>

        {/* Right: info */}
        <div className="lg:col-span-2 space-y-5">
          {[
            { Icon: Mail,   label: "Email",    value: contact.email,         href: `mailto:${contact.email}` },
            { Icon: MapPin, label: "Location", value: profile.location,      href: undefined },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="glass-card p-5 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Socials */}
          <div className="glass-card p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Socials
            </p>
            <div className="flex gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card text-muted-foreground hover:text-primary
                           hover:border-primary/30 transition-colors"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card text-muted-foreground hover:text-primary
                           hover:border-primary/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
