import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";

export const Projects: React.FC = () => {
  const isValidExternalUrl = (url?: string) =>
    Boolean(url && /^https?:\/\//.test(url));

  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-emerald-200 bg-white/80 p-5 sm:p-6 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
              <div className="flex items-center gap-2 text-emerald-600">
                {isValidExternalUrl(project.githubUrl) && (
                  <motion.a
                    href={project.githubUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={`GitHub link for ${project.title}`}
                  >
                    <Github size={18} />
                  </motion.a>
                )}
                {isValidExternalUrl(project.liveUrl) && (
                  <motion.a
                    href={project.liveUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={`Live link for ${project.title}`}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base mb-4 text-center">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium border border-emerald-300 bg-emerald-50 text-emerald-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.impact && (
              <p className="mt-auto text-sm text-teal-700 font-medium">{project.impact}</p>
            )}
          </article>
        ))}
      </div>
    </motion.div>
  );
};
