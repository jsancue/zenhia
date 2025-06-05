"use client"

import { useState, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { LanguageProvider } from "./contexts/LanguageContext"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import ServicesSection from "./components/ServicesSection"
import AboutSection from "./components/AboutSection"
import GallerySection from "./components/GallerySection"
import TestimonialsSection from "./components/TestimonialsSection"
import BookingSection from "./components/BookingSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import LoadingScreen from "./components/LoadingScreen"
import ScrollIndicator from "./components/ScrollIndicator"
import SkipLink from "./components/SkipLink"
import ChatAssistant from "./components/ChatAssistant"
import ReadingModeToggle from "./components/ReadingModeToggle"
import LoyaltyWidget from "./components/LoyaltyWidget"
import LiveActivityNotifications from "./components/LiveActivityNotifications"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("zenhia-theme-mode")
    return savedMode || "light"
  })

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const theme = createTheme({
    palette: {
      mode,
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
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 600,
        letterSpacing: "-0.025em",
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      h2: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 600,
        letterSpacing: "-0.025em",
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      h3: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      h4: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      h5: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      h6: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      body1: {
        lineHeight: 1.7,
        color: mode === "light" ? "#3F2E2E" : "#F9F5F5",
      },
      body2: {
        lineHeight: 1.6,
        color: mode === "light" ? "#6A5555" : "#D4A5A5",
      },
      button: {
        fontWeight: 500,
        letterSpacing: "0.02em",
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: (factor) => `${0.5 * factor}rem`,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "0.75rem 1.5rem",
            transition: "all 0.3s ease",
            borderRadius: "4px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          },
          outlined: {
            borderWidth: "1px",
            "&:hover": {
              borderWidth: "1px",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            borderRadius: "8px",
            "&:hover": {
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            "@media (min-width: 600px)": {
              paddingLeft: "2rem",
              paddingRight: "2rem",
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            margin: "1.5rem 0",
            borderColor: "rgba(0, 0, 0, 0.08)",
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
  })

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("zenhia-theme-mode", newMode)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SkipLink />
        <ScrollIndicator />
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <main id="main-content">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <GallerySection />
          <TestimonialsSection />
          <BookingSection />
          <ContactSection />
        </main>
        <Footer />

        {/* Widgets flotantes */}
        <ChatAssistant />
        <ReadingModeToggle />
        <LoyaltyWidget />
        <LiveActivityNotifications />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
