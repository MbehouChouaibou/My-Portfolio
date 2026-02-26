import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, MapPin, Code, Cloud, Server, Database, Zap, Cpu } from "lucide-react";
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
      className="min-h-screen flex items-center bg-linear-to-b from-[#0c0f14] via-[#0e1a1a] to-[#0b0f0d] text-gray-100 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Full width container with equal height columns */}
      <div className="w-full grid lg:grid-cols-2 min-h-[calc(100svh-6rem)] lg:min-h-screen">
        {/* Left Side - Image - Full height matching right side */}
        <motion.div
          className="relative order-1 lg:order-1 h-[240px] sm:h-[320px] md:h-[420px] lg:h-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group h-full w-full">
            {/* Glow effect that touches the edge */}
            <div className="absolute -inset-1 -left-2 lg:-left-4 rounded-r-3xl lg:rounded-r-none bg-linear-to-r from-lime-400 via-teal-400 to-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700" />
            {/* Full height image container */}
            <div className="relative w-full h-full rounded-b-2xl lg:rounded-none overflow-hidden border-x-0 lg:border-r-3 border-t-4 border-b-4 border-teal-500/20 shadow-[0_0_20px_rgba(0,255,150,0.2)]">
              <img
                src={profileImg}
                alt="Njikam Mbehou Chouaibou"
                className="w-full h-full object-cover object-center"
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
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-900/20 border border-teal-700/50 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-xs font-medium text-teal-300">Dynamic Role</span>
              </motion.div>

              {/* Name on single line with inline gradient */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
                <span className="text-gray-100">Njikam Mbehou </span>
                <span className="bg-linear-to-r from-lime-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(72,255,167,0.7)]">
                  Chouaibou
                </span>
              </h1>

              {/* Typing Text - Tight spacing */}
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 min-h-8 mt-2">
                <span className="mr-1">{typed}</span>
                <span className="inline-block w-0.5 h-4 bg-lime-400 align-middle animate-pulse" />
              </div>

              {/* Description - Minimal margins */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-snug max-w-2xl mt-3">
                Crafting intelligent, cloud-ready experiences through modern web
                technologies. Passionate about automation, performance, and
                futuristic design.
              </p>

              {/* Technical Skills Section - Added content */}
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-teal-300 mb-3 flex items-center gap-2">
                  <Cpu size={18} />
                  Core Expertise
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c1210]/50 border border-gray-800">
                    <Code size={14} className="text-lime-400" />
                    <span className="text-sm">Full-Stack Dev</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c1210]/50 border border-gray-800">
                    <Cloud size={14} className="text-teal-400" />
                    <span className="text-sm">Cloud Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c1210]/50 border border-gray-800">
                    <Server size={14} className="text-emerald-400" />
                    <span className="text-sm">DevOps & CI/CD</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c1210]/50 border border-gray-800">
                    <Database size={14} className="text-cyan-400" />
                    <span className="text-sm">Database Design</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0c1210]/50 border border-gray-800">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-sm">Performance</span>
                  </div>
                </div>
              </div>

              {/* Buttons - Tight grouping */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-8">
                <motion.button
                  onClick={() => onNavigate("projects")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-linear-to-r from-lime-400 via-teal-400 to-emerald-500 text-black font-bold rounded-lg sm:rounded-xl shadow-[0_0_15px_rgba(0,255,150,0.4)] hover:shadow-[0_0_25px_rgba(0,255,150,0.6)] transition-all duration-300 flex-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <ExternalLink size={14} />
                </motion.button>

                <motion.button
                  onClick={() => onNavigate("contact")}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base border-2 border-lime-400 text-lime-300 rounded-lg sm:rounded-xl font-semibold hover:bg-lime-400 hover:text-black transition-all duration-300 flex-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.button>
              </div>

              {/* Quick Stats - Added content */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-[#0c1210]/30 border border-gray-800/50">
                  <div className="text-2xl font-bold text-lime-400">4+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#0c1210]/30 border border-gray-800/50">
                  <div className="text-2xl font-bold text-teal-400">1+</div>
                  <div className="text-xs text-gray-400">Years Exp</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#0c1210]/30 border border-gray-800/50">
                  <div className="text-2xl font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Socials - Pushed to bottom */}
            <div className="flex flex-wrap items-center gap-2 mt-auto pb-4 sm:pb-6 pt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0c1210] border border-gray-800 shadow-[0_0_5px_rgba(0,255,150,0.2)] hover:shadow-[0_0_10px_rgba(0,255,150,0.4)] transition-all duration-300 hover:scale-105"
                >
                  <Github size={16} />
                </a>
                <a
                  href="#"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#0c1210] border border-gray-800 shadow-[0_0_5px_rgba(0,255,150,0.2)] hover:shadow-[0_0_10px_rgba(72,255,167,0.4)] transition-all duration-300 hover:scale-105 text-lime-400"
                >
                  <Linkedin size={16} />
                </a>
              </div>
              <div className="hidden sm:block h-4 w-px bg-gray-700 mx-1" />
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 flex-1">
                <MapPin size={12} />
                <span>Douala, Cameroon</span>
              </div>
              <div className="text-xs text-gray-500">
                Available for freelance
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
