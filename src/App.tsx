import { useEffect, useState, type JSX } from "react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { InfoCarousel } from "./components/InfoCarousel";
import { Footer } from "./components/Footer";

export default function App(): JSX.Element {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ------------------ THEME ------------------ */
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("njikam_dark");
    if (stored !== null) return stored === "1";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("njikam_dark", darkMode ? "1" : "0");
  }, [darkMode]);

  /* ------------------ MANUAL NAVIGATION ------------------ */
  const scrollToSection = (id: string) => {
    const targetId = id === "home" ? "home" : "portfolio-sections";
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <AnimatedBackground />

      <Navigation
        activeSection={activeSection}
        darkMode={darkMode}
        mobileOpen={mobileOpen}
        onNavigate={scrollToSection}
        onToggleDark={() => setDarkMode((v) => !v)}
        onToggleMobile={() => setMobileOpen((v) => !v)}
      />

      <main className="pt-24">
        {/* HOME */}
        <section id="home" className="scroll-mt-24">
          <Hero onNavigate={scrollToSection} />
        </section>

        {/* CONTENT */}
        <section id="portfolio-sections" className="relative px-4 md:px-8 scroll-mt-24">
          <InfoCarousel
            activeId={activeSection}
            onSectionChange={(id) => setActiveSection(id)}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
