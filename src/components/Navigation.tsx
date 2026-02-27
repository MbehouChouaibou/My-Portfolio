import React, { type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sun, Moon, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../data/portfolioData";

interface NavigationProps {
  activeSection: string;
  darkMode: boolean;
  mobileOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleDark: () => void;
  onToggleMobile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  darkMode,
  mobileOpen,
  onNavigate,
  onToggleDark,
  onToggleMobile,
}): JSX.Element => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 border-b border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.12)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate("home")}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-black bg-linear-to-br from-lime-300 via-emerald-300 to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] notranslate"
            translate="no"
          >
            NC
          </div>

          <div className="hidden sm:block">
            <div className="text-lg font-semibold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Njikam Mbehou Chouaibou
            </div>
            <div className="text-sm text-slate-500">Software Engineer</div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((n, index) => {
            const active = activeSection === n.id;
            return (
              <motion.button
                key={n.id}
                onClick={() => onNavigate(n.id)}
                className={`relative text-sm font-medium py-2 px-3 rounded-lg border transition-all duration-300 ${
                  active
                    ? "text-emerald-800 font-semibold bg-emerald-100 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.18)]"
                    : "text-slate-600 border-transparent hover:text-emerald-700 hover:bg-emerald-50"
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {n.label}
                {active && (
                  <motion.span
                    className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-lime-400 via-emerald-400 to-teal-400"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Download CV */}
          <motion.button
            onClick={() =>
              window.open("/files/NjIKAM_MBEHOU_CHOUAIBOU.pdf", "_blank")
            }
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-lime-300 via-emerald-300 to-teal-300 text-slate-900 font-semibold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
            <ExternalLink size={16} />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={onToggleDark}
            aria-label="Toggle theme"
            className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.12)]"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <Sun size={20} className="text-amber-500" />
            ) : (
              <Moon size={20} className="text-emerald-600" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={onToggleMobile}
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? (
                <X size={20} className="text-emerald-600" />
              ) : (
                <Menu size={20} className="text-emerald-600" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden border-t border-emerald-200 bg-white/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {NAV_ITEMS.map((n) => (
                <motion.button
                  key={n.id}
                  onClick={() => {
                    onToggleMobile();
                    requestAnimationFrame(() => onNavigate(n.id));
                  }}
                  className={`text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === n.id
                      ? "bg-linear-to-r from-lime-200 to-emerald-100 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                  whileHover={{ x: 8 }}
                >
                  {n.label}
                </motion.button>
              ))}

              {/* Mobile Download CV */}
              <motion.button
                onClick={() =>
                  window.open(
                    "/files/NjIKAM_MBEHOU_CHOUAIBOU.pdf",
                    "_blank"
                  )
                }
                className="mt-3 px-4 py-3 rounded-xl bg-linear-to-r from-lime-300 via-emerald-300 to-teal-300 text-slate-900 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
