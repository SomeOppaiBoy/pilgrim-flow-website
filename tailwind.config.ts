import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--primary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "prayer-wheel": {
          "0%": { transform: "rotate(0deg)", opacity: "0.7" },
          "50%": { opacity: "1" },
          "100%": { transform: "rotate(360deg)", opacity: "0.7" },
        },
        "lotus-bloom": {
          "0%": { 
            transform: "scale(0.9) rotate(-2deg)",
            opacity: "0.8",
          },
          "50%": { 
            transform: "scale(1.02) rotate(1deg)",
            opacity: "1",
          },
          "100%": { 
            transform: "scale(1) rotate(0deg)",
            opacity: "0.95",
          },
        },
        "temple-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)",
          },
          "50%": { 
            transform: "scale(1.02)",
            boxShadow: "0 0 0 8px hsl(var(--primary) / 0)",
          },
        },
        "peaceful-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "sacred-glow": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.2))",
          },
          "50%": {
            filter: "drop-shadow(0 0 16px hsl(var(--primary) / 0.4))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "prayer-wheel": "prayer-wheel 3s ease-in-out infinite",
        "lotus-bloom": "lotus-bloom 2s ease-out",
        "temple-pulse": "temple-pulse 2s ease-in-out infinite",
        "peaceful-enter": "peaceful-enter 0.6s ease-out",
        "sacred-glow": "sacred-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
