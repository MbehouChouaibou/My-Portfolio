"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function OpenToWork() {
  const t = useTranslations("openToWork");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mx-4 sm:mx-6 lg:mx-10 mt-6 mb-2"
    >
      <div className="max-w-5xl mx-auto glass-card-accent px-5 py-3.5 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <Sparkles size={13} className="text-primary" />
          {t("badge")}
        </span>
        <span className="text-sm text-muted">{t("message")}</span>
      </div>
    </motion.div>
  );
}
