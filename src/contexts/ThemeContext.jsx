"use client"

import { createContext, useState } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Intentar obtener el modo guardado en localStorage
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("zenhia-theme-mode")
      return savedMode || "light"
    }
    return "light" // Valor por defecto para SSR
  })

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("zenhia-theme-mode", newMode)
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#8A9B6E",
      },
      secondary: {
        main: "#C4B7A2",
      },
      background: {
        default: mode === "light" ? "#F9F6F1" : "#121212",
        paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", serif',
      },
      h2: {
        fontFamily: '"Playfair Display", serif',
      },
      h3: {
        fontFamily: '"Playfair Display", serif',
      },
      h4: {
        fontFamily: '"Playfair Display", serif',
      },
      h5: {
        fontFamily: '"Playfair Display", serif',
      },
      h6: {
        fontFamily: '"Playfair Display", serif',
      },
    },
    shape: {
      borderRadius: 8,
    },
  })

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
