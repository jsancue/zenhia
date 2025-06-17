// src/theme.js
import { createTheme } from "@mui/material/styles";

const getAppTheme = (mode) => {
    // Base palette definitions
    const basePalette = {
        primary: {
            light: "#E2C1C1",
            main: "#D4A5A5",
            dark: "#C68989",
            contrastText: "#fff",
        },
        secondary: {
            light: "#B89999",
            main: "#9E7777",
            dark: "#845555",
            contrastText: "#fff",
        },
        accent: {
            light: "#D4B888",
            main: "#BC9A6C",
            dark: "#A47C50",
            contrastText: "#fff",
        },
        background: {
            default: mode === "light" ? "#F9F5F5" : "#1A1A1A",
            paper: mode === "light" ? "#FFFFFF" : "#2D2D2D",
        },
        text: {
            primary: mode === "light" ? "#3F2E2E" : "#F9F5F5",
            secondary: mode === "light" ? "#6A5555" : "#D4A5A5",
        },
        divider: mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
    };

    // Dark mode specific overrides for contrastText
    if (mode === 'dark') {
        basePalette.primary.contrastText = '#2A2A2A'; // Dark text for light pink primary bg in dark mode
        basePalette.accent.contrastText = '#2A2A2A';  // Dark text for light gold accent bg in dark mode
        // basePalette.secondary.contrastText could also be changed if needed: e.g. '#fafafa' or a very dark color
        // but #9E7777 vs #fff is 4.04:1, which is okay for large text/icons.
        // Let's keep secondary.contrastText as #fff for now.
    }

    return createTheme({
        palette: {
            mode,
            ...basePalette, // Spread the possibly modified basePalette
        },
        typography: { // Typography definitions remain the same, colors are mode-dependent
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            h1: { fontFamily: '"Playfair Display", serif', fontWeight: 600, letterSpacing: "-0.025em", color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            h2: { fontFamily: '"Playfair Display", serif', fontWeight: 600, letterSpacing: "-0.025em", color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            h3: { fontFamily: '"Playfair Display", serif', fontWeight: 500, color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            h4: { fontFamily: '"Playfair Display", serif', fontWeight: 500, color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            h5: { fontFamily: '"Playfair Display", serif', fontWeight: 500, color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            h6: { fontFamily: '"Playfair Display", serif', fontWeight: 500, color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            body1: { lineHeight: 1.7, color: mode === "light" ? "#3F2E2E" : "#F9F5F5" },
            body2: { lineHeight: 1.6, color: mode === "light" ? "#6A5555" : "#D4A5A5" },
            button: { fontWeight: 500, letterSpacing: "0.02em" },
        },
        shape: { borderRadius: 8 },
        spacing: (factor) => `${0.5 * factor}rem`,
        components: { // Component style overrides remain the same as per previous fixes
            MuiButton: { styleOverrides: { root: { textTransform: "none", padding: "0.75rem 1.5rem", transition: "all 0.3s ease", borderRadius: "4px" }, contained: { "&:hover": {} }, outlined: { borderWidth: "1px", "&:hover": { borderWidth: "1px", backgroundColor: (theme) => theme.palette.action.hover } } } },
            MuiCard: { styleOverrides: { root: { transition: "transform 0.3s ease, box-shadow 0.3s ease", borderRadius: "8px", "&:hover": {} } } },
            MuiContainer: { styleOverrides: { root: { paddingLeft: "1.5rem", paddingRight: "1.5rem", "@media (min-width: 600px)": { paddingLeft: "2rem", paddingRight: "2rem" } } } },
            MuiDivider: { styleOverrides: { root: { margin: "1.5rem 0", borderColor: (theme) => theme.palette.divider } } },
            MuiFab: { styleOverrides: { root: { "&:hover": {} } } },
            MuiPaper: { styleOverrides: { root: {} } },
        },
    });
};

export default getAppTheme;
