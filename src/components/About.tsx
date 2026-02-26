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
            <h3 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-lime-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Building reliable software with clean architecture
            </h3>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              I am a <span className="text-lime-400 font-semibold">Software Engineer</span> focused on designing robust products that solve real-world problems. I work across <span className="text-teal-400">frontend</span>, <span className="text-cyan-400">backend</span>, and <span className="text-emerald-400">cloud systems</span>, with strong attention to maintainability and delivery speed.
            </p>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              I have built solutions in fintech, robotics, and enterprise environments, with a practical approach to architecture, automation, and performance tuning.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-lime-400/20 bg-linear-to-br from-lime-400/5 to-teal-500/5 px-4 py-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-lime-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 px-4 py-3 text-sm sm:text-base text-gray-300"
              >
                <span className="text-lime-400 mr-2">•</span>
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-300/90 mb-3">Tech Focus</p>
            <div className="flex flex-wrap gap-2.5">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-300 text-xs sm:text-sm font-medium"
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
