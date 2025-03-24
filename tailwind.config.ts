import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        textShadow: {
          "0%": {
            textShadow:
              "rgba(0, 30, 255, 0.09) 0.46px 0px 0.17px, rgba(255, 0, 80, 0.055) -0.46px 0px 0.17px, rgba(244, 239, 237, 0.176) 0px 0px 0.52px",
          },
          "50%": {
            textShadow:
              "rgba(0, 30, 255, 0.353) 1.83px 0px 0.70px, rgba(255, 0, 80, 0.21) -1.83px 0px 0.70px, rgba(244, 239, 237, 0.7) 0px 0px 2.10px",
          },
          "100%": {
            textShadow:
              "rgba(0, 30, 255, 0.09) 0.46px 0px 0.17px, rgba(255, 0, 80, 0.055) -0.46px 0px 0.17px, rgba(244, 239, 237, 0.176) 0px 0px 0.52px",
          },
        },
        starButton: {
          "0%": { "background-position": "center 100%" },
          "100%": { "background-position": "center 0" },
        },
      },
      animation: {
        starButton: "starButton 20s linear infinite",
        textShadow: "textShadow 1.6s infinite alternate",
      },
      colors: {
        "electric-blue": "hsl(var(--electric-blue))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
