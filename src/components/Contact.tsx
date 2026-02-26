import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, Clock3 } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const Contact: React.FC = () => {
  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 space-y-4">
          <div className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5 text-center lg:text-left">
            <p className="text-lg font-semibold text-white">Let's work together</p>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Have a project in mind or want to discuss opportunities? Share your idea and I will reply quickly.
            </p>
          </div>

          <ContactLink
            icon={<Mail size={20} className="text-black" />}
            label="Email"
            value="chouaiboumbehou@gmail.com"
            href="mailto:chouaiboumbehou@gmail.com"
          />
          <ContactLink
            icon={<Phone size={20} className="text-black" />}
            label="Phone"
            value="+237 675 794 292"
            href="tel:+237675794292"
          />

          <div className="rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-4 space-y-3">
            <InfoRow icon={<MapPin size={16} className="text-lime-400" />} text="Douala, Cameroon" />
            <InfoRow icon={<Clock3 size={16} className="text-teal-400" />} text="Typically replies within 24h" />
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
            <SocialLink icon={<Github size={20} className="text-lime-300" />} href="#" />
            <SocialLink icon={<Linkedin size={20} className="text-teal-300" />} href="#" />
          </div>
        </div>

        <div className="xl:col-span-8 rounded-2xl border border-lime-400/20 bg-[#0b1411]/70 p-5 sm:p-6 lg:p-7">
          <h3 className="text-2xl font-bold mb-1 text-white text-center lg:text-left">Send a Message</h3>
          <p className="text-gray-400 mb-5 text-center lg:text-left">
            Tell me about your project goals, timeline, and expected outcome.
          </p>
          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
};

const ContactLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}> = ({ icon, label, value, href }) => (
  <motion.a
    href={href}
    className="flex items-center gap-3 p-4 rounded-2xl border border-lime-400/20 bg-[#0b1411]/70"
    whileHover={{ scale: 1.02 }}
  >
    <div className="w-10 h-10 shrink-0 rounded-xl bg-linear-to-tr from-lime-400 to-teal-400 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1 text-left text-gray-200">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold break-all">{value}</p>
    </div>
  </motion.a>
);

const SocialLink: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <motion.a
    href={href}
    className="p-3 rounded-xl border border-lime-400/20 bg-[#0b1411]/70 flex items-center justify-center"
    whileHover={{ scale: 1.08 }}
  >
    {icon}
  </motion.a>
);

const InfoRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-300 text-sm">
    {icon}
    <span>{text}</span>
  </div>
);
