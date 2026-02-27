import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 bg-[#eefcf3]/80 backdrop-blur-xl border-t border-emerald-200 overflow-hidden">
      {/* Neon glow background */}
      <div className="absolute inset-0 bg-linear-to-r from-lime-300/20 via-emerald-300/20 to-teal-300/20 rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
              <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white bg-linear-to-br from-lime-400 to-teal-400"
              translate="no"
              >
                NC
              </div>
              <div>
                <div className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-teal-400">
                  Njikam Mbehou Chouaibou
                </div>
                <div className="text-sm text-slate-600">Software Engineer</div>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="flex items-center gap-6 justify-center md:justify-end">
            <a
              href="https://github.com/MbehouChouaibou?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/njikam-mbehou-chouaibou-bbb246207"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-teal-700 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a href="mailto:chouaiboumbehou@gmail.com" className="text-slate-600 hover:text-cyan-700 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Njikam Mbehou Chouaibou
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
