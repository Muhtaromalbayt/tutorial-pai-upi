import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Official UPI Red Palette
                primary: {
                    50: "#fef2f4",
                    100: "#fde6ea",
                    200: "#fad1d9",
                    300: "#f5acba",
                    400: "#ee7d94",
                    500: "#e34d70",
                    600: "#C41230", // Official UPI Red
                    700: "#a30f29",
                    800: "#881027",
                    900: "#741225",
                    950: "#400510",
                },
                // Professional Slate Secondary
                secondary: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                    950: "#020617",
                },
                // Elegant Gold Accent
                accent: {
                    50: "#fefce8",
                    100: "#fef9c3",
                    200: "#fef08a",
                    300: "#fde047",
                    400: "#facc15",
                    500: "#C9A227", // Elegant Gold
                    600: "#a68512",
                    700: "#856a0f",
                    800: "#6b5412",
                    900: "#5a4516",
                    950: "#332508",
                },
                // Neutral Gray
                neutral: {
                    50: "#fafafa",
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                    950: "#0a0a0a",
                },
            },
            fontFamily: {
                sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
                heading: ["var(--font-outfit)", "var(--font-plus-jakarta)", "sans-serif"],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
        },
    },
    plugins: [],
};

export default config;
