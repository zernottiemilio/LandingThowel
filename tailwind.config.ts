import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        thowel: {
          red: "#e74c3c",
          "red-soft": "rgba(231, 76, 60, 0.1)",
          blue: "#003399",
          "blue-hover": "#002080",
          "blue-deep": "#1e3a8a",
          text: "#333333",
          "text-soft": "#666666",
          "text-muted": "rgb(136, 136, 136)",
          bg: "#f5f5f5",
          "bg-alt": "#f8f9fa",
          "bg-mobile": "#e9ecef",
        },
      },
      fontFamily: {
        sans: [
          "Montserrat",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        // Escala fluida con clamp para responsive suave
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.25vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.25vw, 1.2rem)",
        "fluid-lg": "clamp(1.15rem, 1rem + 0.75vw, 1.5rem)",
        "fluid-xl": "clamp(1.3rem, 1.1rem + 1vw, 1.8rem)",
        "fluid-2xl": "clamp(1.6rem, 1.2rem + 2vw, 2.5rem)",
        "fluid-3xl": "clamp(1.9rem, 1.3rem + 3vw, 3rem)",
        "fluid-hero": "clamp(2rem, 1.2rem + 4vw, 3.5rem)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.1)",
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        pill: "50px",
        chip: "25px",
      },
      backdropBlur: {
        navbar: "10px",
      },
      animation: {
        bounce: "thowelBounce 2s infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        thowelBounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
