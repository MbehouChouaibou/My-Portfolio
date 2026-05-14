"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  // Only render the theme-aware icon after hydration to avoid SSR mismatch
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      aria-label={t("toggle")}
      className={`flex items-center w-full gap-2 px-3 py-2 rounded-xl
                  text-sm font-medium text-muted-foreground
                  hover:bg-surface-2 hover:text-foreground transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{   rotate:  90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} className="text-primary" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90,  opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{   rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={15} className="text-primary" />
          </motion.span>
        )}
      </AnimatePresence>
      <span suppressHydrationWarning>
        {isDark ? t("light") : t("dark")}
      </span>
    </button>
  );
}
