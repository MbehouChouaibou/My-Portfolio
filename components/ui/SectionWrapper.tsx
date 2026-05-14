"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn("section-padding", className)}
    >
      <div className="container-max">{children}</div>
    </motion.section>
  );
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("mb-12", center && "text-center")}>
      {label && (
        <div className={cn("flex items-center gap-3 mb-4", center && "justify-center")}>
          {!center && <span className="w-7 h-[2px] rounded-full bg-primary" />}
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
            {label}
          </span>
          {!center && <span className="flex-1 h-px bg-border" />}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-muted text-base sm:text-lg leading-relaxed",
            center ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
