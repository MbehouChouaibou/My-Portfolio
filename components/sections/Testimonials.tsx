"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import type { Testimonial } from "@/lib/content";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <SectionWrapper>
      <SectionHeading label="Kind words" title="What clients say" align="center" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="glass-card-accent p-6 flex flex-col gap-4"
          >
            {/* Quote icon */}
            <Quote size={20} className="text-primary/40" />

            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={13}
                  className={j < t.rating ? "text-primary fill-primary" : "text-border"}
                />
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              {t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-9 w-9 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary
                                 flex items-center justify-center font-bold text-sm">
                  {t.name[0]}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
