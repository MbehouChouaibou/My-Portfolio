import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:           "rgb(var(--background) / <alpha-value>)",
        foreground:           "rgb(var(--foreground) / <alpha-value>)",
        surface:              "rgb(var(--surface) / <alpha-value>)",
        "surface-2":          "rgb(var(--surface-2) / <alpha-value>)",
        border:               "rgb(var(--border) / <alpha-value>)",
        primary:              "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        accent:               "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground":  "rgb(var(--accent-foreground) / <alpha-value>)",
        muted:                "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground":   "rgb(var(--muted-foreground) / <alpha-value>)",
        success:              "rgb(var(--success) / <alpha-value>)",
      },
      fontFamily: {
        sans:    ["var(--font-inter)",      "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "ring-spin":  { to: { transform: "rotate(360deg)" } },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        "blob-float": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(28px,-18px) scale(1.04)" },
          "66%":     { transform: "translate(-18px,14px) scale(0.97)" },
        },
        blink:        { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        "fade-in":    { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up":   {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "ring-spin":         "ring-spin 8s linear infinite",
        "blob-float":        "blob-float 10s ease-in-out infinite",
        "blob-float-slow":   "blob-float 14s ease-in-out infinite reverse",
        "blob-float-slower": "blob-float 18s ease-in-out infinite 3s",
        "gradient-x":        "gradient-x 4s ease infinite",
        "animate-blink":     "blink 1s step-end infinite",
        "fade-in":           "fade-in 0.3s ease-out",
        "slide-up":          "slide-up 0.4s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
