import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { EXPERIENCES } from "../data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-4">
        {EXPERIENCES.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.company}</h3>
                <p className="text-lime-400 font-semibold">{exp.role}</p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-lime-400/30 bg-lime-500/10">
                <Calendar size={14} className="text-lime-400" />
                <span className="text-sm text-white">{exp.period}</span>
              </div>
            </div>

            <ul className="space-y-2 mb-4 text-gray-300 text-sm sm:text-base">
              {exp.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-400 mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium border border-lime-400/30 bg-lime-400/10 text-lime-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
};
