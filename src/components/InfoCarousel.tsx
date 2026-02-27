import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sections = [
  {
    id: "about",
    label: "ABOUT",
    description: "Who I am, how I work, and what I build.",
    component: <About />,
  },
  {
    id: "skills",
    label: "SKILLS",
    description: "Core technologies and strengths I rely on in production.",
    component: <Skills />,
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    description: "Professional roles and impact delivered across teams.",
    component: <Experience />,
  },
  {
    id: "projects",
    label: "PROJECTS",
    description: "Selected work with real outcomes and measurable value.",
    component: <Projects />,
  },
  {
    id: "contact",
    label: "CONTACT",
    description: "Reach out for projects, collaboration, or opportunities.",
    component: <Contact />,
  },
];

interface InfoCarouselProps {
  activeId?: string;
  onSectionChange?: (id: string) => void;
}

export const InfoCarousel: React.FC<InfoCarouselProps> = ({
  activeId,
  onSectionChange,
}) => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const bounded = ((index % sections.length) + sections.length) % sections.length;
    setCurrent(bounded);
    onSectionChange?.(sections[bounded].id);
  };

  useEffect(() => {
    if (!activeId) return;

    const index = sections.findIndex((s) => s.id === activeId);
    if (index === -1) return;

    setCurrent((prev) => (prev === index ? prev : index));
  }, [activeId]);

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const CurrentSection = sections[current];

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="absolute inset-0 bg-linear-to-r from-lime-300/20 via-emerald-300/15 to-teal-300/15 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
            {CurrentSection.label}
          </h2>
          <p className="mt-3 text-slate-600 text-center max-w-3xl mx-auto">
            {CurrentSection.description}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 md:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-white/90 hover:bg-lime-100 backdrop-blur-lg border border-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.14)] hover:scale-110 transition-all duration-300"
            aria-label="Previous section"
          >
            <ChevronLeft className="text-emerald-700" size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={CurrentSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full sm:px-14 md:px-8"
            >
              {CurrentSection.component}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={next}
            className="hidden md:flex absolute right-0 md:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-white/90 hover:bg-teal-100 backdrop-blur-lg border border-teal-300 shadow-[0_0_18px_rgba(16,185,129,0.14)] hover:scale-110 transition-all duration-300"
            aria-label="Next section"
          >
            <ChevronRight className="text-teal-700" size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center mt-8 gap-3">
          <button
            onClick={prev}
            className="md:hidden p-2.5 rounded-full bg-white/90 hover:bg-lime-100 backdrop-blur-lg border border-emerald-300 transition-all duration-300"
            aria-label="Previous section"
          >
            <ChevronLeft className="text-emerald-700" size={20} />
          </button>

          {sections.map((section, idx) => (
            <motion.button
              key={section.id}
              onClick={() => goTo(idx)}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === idx
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to ${section.label}`}
            />
          ))}

          <button
            onClick={next}
            className="md:hidden p-2.5 rounded-full bg-white/90 hover:bg-teal-100 backdrop-blur-lg border border-teal-300 transition-all duration-300"
            aria-label="Next section"
          >
            <ChevronRight className="text-teal-700" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
