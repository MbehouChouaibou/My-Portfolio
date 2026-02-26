import React from "react";
import { motion } from "framer-motion";
import { Code, Cloud, Database, Smartphone } from "lucide-react";
import { TECHNICAL_SKILLS, SOFT_SKILLS } from "../data/portfolioData";

const SPECIALIZATIONS = [
  { icon: Code, label: "Frontend", color: "from-lime-400 to-teal-400" },
  { icon: Database, label: "Backend", color: "from-lime-400 to-cyan-400" },
  { icon: Cloud, label: "Cloud", color: "from-teal-400 to-cyan-400" },
  { icon: Smartphone, label: "Mobile", color: "from-lime-400 to-cyan-400" },
];

export const Skills: React.FC = () => {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5">
            <h3 className="text-xl font-semibold text-lime-400 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-300 text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5">
            <h3 className="text-xl font-semibold text-lime-400 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5">
          <h3 className="text-xl font-semibold text-lime-400 mb-4">Specializations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALIZATIONS.map((spec) => (
              <motion.div
                key={spec.label}
                whileHover={{ scale: 1.04, y: -2 }}
                className="rounded-2xl border border-lime-400/20 bg-linear-to-br from-lime-400/5 to-teal-400/5 p-4 text-center"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-r ${spec.color} flex items-center justify-center mx-auto mb-2`}
                >
                  <spec.icon size={22} className="text-white" />
                </div>
                <p className="text-gray-200 font-semibold text-sm">{spec.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
