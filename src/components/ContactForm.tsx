import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import type { ContactFormData, FormStatus } from "../types";

export const ContactForm: React.FC = () => {
  const envApiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
  const isLocalHostUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(envApiBaseUrl);
  const isDeployedClient =
    typeof window !== "undefined" &&
    !["localhost", "127.0.0.1"].includes(window.location.hostname);
  const apiBaseUrl = isDeployedClient && isLocalHostUrl ? "" : envApiBaseUrl;
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response
          .json()
          .catch(() => ({ error: "Failed to send message" }));
        throw new Error(payload.error ?? "Failed to send message");
      }

      setStatus("success");
      setFeedback("Message sent successfully.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      if (error instanceof Error && error.message) {
        setFeedback(error.message);
      } else {
        setFeedback("Message could not be sent. Please try again in a moment.");
      }
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-4 rounded-2xl border border-emerald-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-4 rounded-2xl border border-emerald-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-4 rounded-2xl border border-emerald-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent resize-none transition-all duration-300"
        />
      </div>
      
      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-8 py-4 bg-linear-to-r from-lime-300 to-emerald-400 text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: status !== "sending" ? 1.02 : 1 }}
        whileTap={{ scale: status !== "sending" ? 0.98 : 1 }}
      >
        {status === "sending" ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send size={20} />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-200"
          >
            <CheckCircle size={20} />
            <span className="font-medium">{feedback || "Message sent successfully!"}</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200"
          >
            <AlertCircle size={20} />
            <span className="font-medium">{feedback || "Failed to send. Please try again."}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};
