"use client"

import { useState, useEffect, useContext } from "react"
import { Fab, Tooltip, Menu, MenuItem, Typography, Switch, Box, Divider, Fade } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import FormatSizeIcon from "@mui/icons-material/FormatSize"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import ContrastIcon from "@mui/icons-material/Contrast"
import { LanguageContext } from "../contexts/LanguageContext"
import { motion } from "framer-motion"

export default function ReadingModeToggle() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [readingMode, setReadingMode] = useState(false)
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const { language } = useContext(LanguageContext)

  const translations = {
    es: {
      tooltip: "Opciones de lectura",
      title: "Opciones de accesibilidad",
      readingMode: "Modo de lectura simplificada",
      dyslexiaFont: "Fuente para dislexia",
      highContrast: "Alto contraste",
      largeText: "Texto grande",
    },
    en: {
      tooltip: "Reading options",
      title: "Accessibility options",
      readingMode: "Simplified reading mode",
      dyslexiaFont: "Dyslexia font",
      highContrast: "High contrast",
      largeText: "Large text",
    },
  }

  const text = translations[language]

  useEffect(() => {
    // Recuperar configuraciones guardadas
    const savedReadingMode = localStorage.getItem("zenhia-reading-mode") === "true"
    const savedDyslexiaFont = localStorage.getItem("zenhia-dyslexia-font") === "true"
    const savedHighContrast = localStorage.getItem("zenhia-high-contrast") === "true"
    const savedLargeText = localStorage.getItem("zenhia-large-text") === "true"

    setReadingMode(savedReadingMode)
    setDyslexiaFont(savedDyslexiaFont)
    setHighContrast(savedHighContrast)
    setLargeText(savedLargeText)

    // Aplicar configuraciones
    applyReadingMode(savedReadingMode)
    applyDyslexiaFont(savedDyslexiaFont)
    applyHighContrast(savedHighContrast)
    applyLargeText(savedLargeText)
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleReadingMode = () => {
    const newValue = !readingMode
    setReadingMode(newValue)
    localStorage.setItem("zenhia-reading-mode", newValue)
    applyReadingMode(newValue)
  }

  const toggleDyslexiaFont = () => {
    const newValue = !dyslexiaFont
    setDyslexiaFont(newValue)
    localStorage.setItem("zenhia-dyslexia-font", newValue)
    applyDyslexiaFont(newValue)
  }

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem("zenhia-high-contrast", newValue)
    applyHighContrast(newValue)
  }

  const toggleLargeText = () => {
    const newValue = !largeText
    setLargeText(newValue)
    localStorage.setItem("zenhia-large-text", newValue)
    applyLargeText(newValue)
  }

  // Aplicar modo de lectura simplificada
  const applyReadingMode = (enabled) => {
    if (enabled) {
      document.body.classList.add("reading-mode");
      // CSS for .reading-mode in global CSS file should handle:
      // - max-width: 800px;
      // - margin: 0 auto;
      // - line-height: 1.8;
      // - transition: all 0.5s ease;
      // CSS should also define styles for .non-essential elements within reading-mode
      // e.g., body.reading-mode .non-essential-for-reading { display: none !important; }
      // Ensure relevant page elements have 'non-essential-for-reading' class where appropriate.

      // Remove direct style manipulations for .non-essential elements:
      // const nonEssentialElements = document.querySelectorAll(".non-essential")
      // nonEssentialElements.forEach((el) => {
      //  el.style.display = "none"
      // })
      // Remove direct style manipulations for body layout:
      // document.body.style.maxWidth = "800px"
      // document.body.style.margin = "0 auto"
      // document.body.style.lineHeight = "1.8"
      // document.body.style.transition = "all 0.5s ease" // Transition should be in CSS
    } else {
      document.body.classList.remove("reading-mode");
      // Remove direct style manipulations for .non-essential elements:
      // const nonEssentialElements = document.querySelectorAll(".non-essential")
      // nonEssentialElements.forEach((el) => {
      //  el.style.display = ""
      // })
      // Remove direct style manipulations for body layout:
      // document.body.style.maxWidth = ""
      // document.body.style.margin = ""
      // document.body.style.lineHeight = ""
    }
  };

  // Aplicar fuente para dislexia
  const applyDyslexiaFont = (enabled) => {
    if (enabled) {
      document.body.classList.add("dyslexia-font");
      // CSS for .dyslexia-font in global CSS file should handle:
      // - font-family: 'YourDyslexiaFriendlyFont', sans-serif !important;
      // - transition: font-family 0.3s ease;
      // Ensure 'YourDyslexiaFriendlyFont' is loaded via @font-face or font service.
      // Remove direct style manipulation:
      // document.body.style.transition = "font-family 0.3s ease" // Transition should be in CSS
    } else {
      document.body.classList.remove("dyslexia-font");
    }
  };

  // Aplicar alto contraste
  const applyHighContrast = (enabled) => {
    if (enabled) {
      document.body.classList.add("high-contrast");
      // CSS for .high-contrast in global CSS file should handle:
      // - filter: contrast(1.4); /* Or more sophisticated color adjustments */
      // - transition: filter 0.3s ease;
      // Remove direct style manipulation:
      // document.body.style.filter = "contrast(1.4)"
      // document.body.style.transition = "filter 0.3s ease" // Transition should be in CSS
    } else {
      document.body.classList.remove("high-contrast");
      // Remove direct style manipulation:
      // document.body.style.filter = ""
    }
  };

  // Aplicar texto grande
  const applyLargeText = (enabled) => {
    if (enabled) {
      document.body.classList.add("large-text");
      // CSS for .large-text in global CSS file should handle:
      // - font-size: 120%; /* Or target specific text elements for sizing */
      // - transition: font-size 0.3s ease;
      // Remove direct style manipulation:
      // document.body.style.fontSize = "120%"
      // document.body.style.transition = "font-size 0.3s ease" // Transition should be in CSS
    } else {
      document.body.classList.remove("large-text");
      // Remove direct style manipulation:
      // document.body.style.fontSize = ""
    }
  };

  return (
      <>
        <Tooltip title={text.tooltip} placement="left">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <Fab
                size="medium"
                color="secondary"
                aria-label="reading options"
                onClick={handleClick}
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 96,
                  zIndex: 1000,
                  boxShadow: (theme) => theme.shadows[3], // Changed
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: (theme) => theme.shadows[5], // Changed
                  },
                }}
            >
              <VisibilityIcon />
            </Fab>
          </motion.div>
        </Tooltip>

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            TransitionComponent={Fade}
            PaperProps={{
              // elevation: 3, // Can be controlled by theme.shadows if preferred
              sx: {
                mt: 1.5,
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[2], // Changed
                minWidth: 280,
                overflow: "visible",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: -10,
                  right: "50%",
                  transform: "translateX(50%) rotate(45deg)",
                  width: 20,
                  height: 20,
                  bgcolor: "background.paper",
                  zIndex: 0,
                },
              },
            }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              {text.title}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={toggleReadingMode} sx={{ py: 1.5 }}>
            <FormatSizeIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {text.readingMode}
            </Typography>
            <Switch
                checked={readingMode}
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "primary.main",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "primary.main",
                  },
                }}
            />
          </MenuItem>
          <MenuItem onClick={toggleDyslexiaFont} sx={{ py: 1.5 }}>
            <TextFieldsIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {text.dyslexiaFont}
            </Typography>
            <Switch
                checked={dyslexiaFont}
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "primary.main",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "primary.main",
                  },
                }}
            />
          </MenuItem>
          <MenuItem onClick={toggleHighContrast} sx={{ py: 1.5 }}>
            <ContrastIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {text.highContrast}
            </Typography>
            <Switch
                checked={highContrast}
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "primary.main",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "primary.main",
                  },
                }}
            />
          </MenuItem>
          <MenuItem onClick={toggleLargeText} sx={{ py: 1.5 }}>
            <FormatSizeIcon sx={{ mr: 2, color: "primary.main" }} />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {text.largeText}
            </Typography>
            <Switch
                checked={largeText}
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "primary.main",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "primary.main",
                  },
                }}
            />
          </MenuItem>
        </Menu>
      </>
  )
}
