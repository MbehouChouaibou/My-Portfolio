import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { number: "1+", label: "Years Experience" },
  { number: "4+", label: "Projects Completed" },
  { number: "5+", label: "Core Technologies" },
  { number: "100%", label: "Commitment" },
];

const HIGHLIGHTS = [
  "Production-ready full-stack applications",
  "Cloud-native architecture and deployment",
  "Microservices and API design",
  "Performance-first engineering mindset",
];

const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "Docker",
  "AWS",
  "Kubernetes",
];

export const About: React.FC = () => {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-3 space-y-5 text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
              Building reliable software with clean architecture
            </h3>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              I am a <span className="text-emerald-800 font-semibold">Software Engineer</span> focused on designing robust products that solve real-world problems. I work across <span className="text-teal-800">frontend</span>, <span className="text-cyan-800">backend</span>, and <span className="text-emerald-700">cloud systems</span>, with strong attention to maintainability and delivery speed.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              I have built solutions in fintech, robotics, and enterprise environments, with a practical approach to architecture, automation, and performance tuning.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-100 to-teal-100 px-4 py-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-emerald-200 bg-white/80 px-4 py-3 text-sm sm:text-base text-slate-700"
              >
                <span className="text-emerald-700 mr-2">•</span>
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white/80 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-800 mb-3">Tech Focus</p>
            <div className="flex flex-wrap gap-2.5">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
