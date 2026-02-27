import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, MapPin, Code, Cloud, Server, Database, Brain, Cpu, Zap } from "lucide-react";
import { useTypingEffect } from "../hooks/useTypingEffect";
import profileImg from "../assets/WhatsApp Image 2025-10-21 at 12.11.45_fb607ba5.jpg";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const typed = useTypingEffect([
    "Software Engineer",
    "Full-Stack Developer",
    "Cloud Architect",
    "DevOps Enthusiast",
  ]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-linear-to-b from-[#f8fffb] via-[#eefcf3] to-[#e6f8ee] text-slate-900 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Full width container with equal height columns */}
      <div className="w-full grid lg:grid-cols-2 min-h-[calc(100svh-6rem)] lg:min-h-screen">
        {/* Left Side - Image - Full height matching right side */}
        <motion.div
          className="relative order-1 lg:order-1 h-[320px] sm:h-[380px] md:h-[420px] lg:h-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group h-full w-full">
            {/* Glow effect that touches the edge */}
            <div className="absolute -inset-1 -left-2 lg:-left-4 rounded-r-3xl lg:rounded-r-none bg-linear-to-r from-lime-300 via-emerald-300 to-teal-300 blur-xl opacity-30 group-hover:opacity-50 transition-all duration-700" />
            {/* Full height image container */}
            <div className="relative w-full h-full rounded-b-2xl lg:rounded-none overflow-hidden border-x-0 lg:border-r-3 border-t-4 border-b-4 border-emerald-300/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <img
                src={profileImg}
                alt="Njikam Mbehou Chouaibou"
                className="w-full h-full object-cover object-[center_18%] lg:object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side - Content - Fills entire height */}
        <motion.div
          className="order-2 lg:order-2 px-4 sm:px-6 lg:px-8 xl:px-12 h-full flex flex-col py-6 lg:py-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Content container - fills entire height */}
          <div className="flex flex-col h-full">
            {/* Top section - starting at same level as image top */}
            <div className="pt-4 lg:pt-4">
              {/* Role Tag - Minimal */}
              <motion.div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">Dynamic Role</span>
              </motion.div>

              {/* Name on single line with inline gradient */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
                <span className="text-slate-900">Njikam Mbehou </span>
                <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(16,185,129,0.28)]">
                  Chouaibou
                </span>
              </h1>

              {/* Typing Text - Tight spacing */}
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-600 min-h-8 mt-2">
                <span className="mr-1">{typed}</span>
                <span className="inline-block w-0.5 h-4 bg-emerald-500 align-middle animate-pulse" />
              </div>

              {/* Description - Minimal margins */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-snug max-w-2xl mt-3">
                Crafting intelligent, cloud-ready experiences through modern web
                technologies. Passionate about automation, performance, and
                futuristic design.
              </p>

              {/* Technical Skills Section - Added content */}
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                  <Cpu size={18} />
                  Core Expertise
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Code size={14} className="text-emerald-700" />
                    <span className="text-sm">Software Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Cloud size={14} className="text-teal-700" />
                    <span className="text-sm">Cloud Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Server size={14} className="text-emerald-400" />
                    <span className="text-sm">API & Microservices</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Database size={14} className="text-cyan-400" />
                    <span className="text-sm">Database Design</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Cpu size={14} className="text-yellow-400" />
                    <span className="text-sm">DevOps & CI/CD</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Brain size={14} className="text-fuchsia-400" />
                    <span className="text-sm">AI Integration</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Code size={14} className="text-emerald-700" />
                    <span className="text-sm">System Design</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Zap size={14} className="text-amber-300" />
                    <span className="text-sm">Testing & QA</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Cloud size={14} className="text-cyan-300" />
                    <span className="text-sm">Observability</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Server size={14} className="text-emerald-300" />
                    <span className="text-sm">Security Practices</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-emerald-200">
                    <Brain size={14} className="text-violet-300" />
                    <span className="text-sm">Prompt Engineering</span>
                  </div>
                </div>
              </div>

              {/* Buttons - Tight grouping */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-8">
                <motion.button
                  onClick={() => onNavigate("projects")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-linear-to-r from-lime-300 via-emerald-300 to-teal-300 text-slate-900 font-bold rounded-lg sm:rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 flex-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <ExternalLink size={14} />
                </motion.button>

                <motion.button
                  onClick={() => onNavigate("contact")}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base border-2 border-emerald-400 text-emerald-700 rounded-lg sm:rounded-xl font-semibold hover:bg-emerald-300 hover:text-slate-900 transition-all duration-300 flex-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.button>
              </div>

              {/* Quick Stats - Added content */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-white/70 border border-emerald-200">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-700">4+</div>
                  <div className="text-xs text-slate-500">Projects</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/70 border border-emerald-200">
                  <div className="text-xl sm:text-2xl font-bold text-teal-700">1+</div>
                  <div className="text-xs text-slate-500">Years Exp</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/70 border border-emerald-200">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-500">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Socials - Pushed to bottom */}
            <div className="flex flex-wrap items-center gap-2 mt-auto pb-4 sm:pb-6 pt-4 border-t border-emerald-200">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/MbehouChouaibou?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-emerald-200 shadow-[0_0_5px_rgba(16,185,129,0.14)] hover:shadow-[0_0_10px_rgba(16,185,129,0.24)] transition-all duration-300 hover:scale-105"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/njikam-mbehou-chouaibou-bbb246207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-emerald-200 shadow-[0_0_5px_rgba(16,185,129,0.14)] hover:shadow-[0_0_10px_rgba(16,185,129,0.24)] transition-all duration-300 hover:scale-105 text-emerald-700"
                >
                  <Linkedin size={16} />
                </a>
              </div>
              <div className="hidden sm:block h-4 w-px bg-emerald-200 mx-1" />
              <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 flex-1">
                <MapPin size={12} />
                <span>Douala & Yaounde, Cameroon</span>
              </div>
              <div className="text-xs text-slate-500">
                Available for freelance
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
