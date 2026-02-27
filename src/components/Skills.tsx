import React from "react";
import { motion } from "framer-motion";
import { Code, Cloud, Database, Smartphone } from "lucide-react";
import { TECHNICAL_SKILLS, SOFT_SKILLS } from "../data/portfolioData";

const SPECIALIZATIONS = [
  { icon: Code, label: "Frontend", color: "from-emerald-500 to-teal-500" },
  { icon: Database, label: "Backend", color: "from-emerald-500 to-cyan-600" },
  { icon: Cloud, label: "Cloud", color: "from-teal-500 to-cyan-600" },
  { icon: Smartphone, label: "Mobile", color: "from-emerald-500 to-cyan-600" },
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
          <section className="rounded-2xl border border-emerald-200 bg-white/80 p-5">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {TECHNICAL_SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-100 text-emerald-800 text-sm font-semibold"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-white/80 p-5">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-100 text-emerald-800 text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-emerald-200 bg-white/80 p-5">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Specializations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALIZATIONS.map((spec) => (
              <motion.div
                key={spec.label}
                whileHover={{ scale: 1.04, y: -2 }}
                className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-100 to-teal-100 p-4 text-center"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-r ${spec.color} flex items-center justify-center mx-auto mb-2`}
                >
                  <spec.icon size={22} className="text-white" />
                </div>
                <p className="text-slate-800 font-semibold text-sm">{spec.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
