"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F9F5F5",
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
                    light: "#E2C1C1",
                    DEFAULT: "#D4A5A5",
                    dark: "#C68989",
                    darker: "#B86D6D",
                },
                secondary: {
                    light: "#B89999",
                    DEFAULT: "#9E7777",
                    dark: "#845555",
                    darker: "#6A3333",
                },
                accent: {
                    light: "#D4B888",
                    DEFAULT: "#BC9A6C",
                    dark: "#A47C50",
                    darker: "#8C5E34",
                },
                rose: {
                    50: "#FDF2F2",
                    100: "#FCE7E7",
                    200: "#F9D5D5",
                    300: "#F4B5B5",
                    400: "#ED8A8A",
                    500: "#D4A5A5",
                    600: "#C68989",
                    700: "#B86D6D",
                    800: "#9E5555",
                    900: "#7A4444",
                },
                gold: {
                    50: "#FDF8F0",
                    100: "#FBF1E1",
                    200: "#F7E3C3",
                    300: "#F1D5A5",
                    400: "#EBC787",
                    500: "#BC9A6C",
                    600: "#A47C50",
                    700: "#8C5E34",
                    800: "#744018",
                    900: "#5C2200",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
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
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
                shimmer: {
                    "0%": {
                        transform: "translateX(-100%)",
                    },
                    "100%": {
                        transform: "translateX(100%)",
                    },
                },
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                shimmer: "shimmer 2s infinite",
                "fade-in-up": "fade-in-up 0.6s ease-out",
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
            spacing: {
                section: "6rem", // Espaciado consistente para secciones
            },
            boxShadow: {
                soft: "0 4px 20px rgba(212, 165, 165, 0.15)",
                hover: "0 8px 30px rgba(212, 165, 165, 0.25)",
                gold: "0 4px 20px rgba(188, 154, 108, 0.20)",
                "gold-hover": "0 8px 30px rgba(188, 154, 108, 0.30)",
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)",
                "gradient-accent": "linear-gradient(135deg, #BC9A6C 0%, #D4B888 100%)",
                "gradient-soft": "linear-gradient(135deg, #F9F5F5 0%, #FCE7E7 100%)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
exports.default = config;
