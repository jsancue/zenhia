"use client"

import { useState, useContext } from "react"
import { Box, Button, Menu, MenuItem, ListItemIcon, ListItemText, Fade } from "@mui/material"
import LanguageIcon from "@mui/icons-material/Language"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { LanguageContext } from "../contexts/LanguageContext"

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { language, setLanguage } = useContext(LanguageContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode)
    localStorage.setItem("zenhia-language", langCode)
    handleClose()
  }

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <>
      <Button
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transition: "transform 0.3s ease",
              transform: Boolean(anchorEl) ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        sx={{
          color: "inherit",
          textTransform: "none",
          fontSize: "0.875rem",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          }}
        >
          <Box component="span" sx={{ mr: 0.5, fontSize: "1.2rem" }}>
            {currentLanguage?.flag}
          </Box>
          {currentLanguage?.name}
        </Box>
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        elevation={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={language === lang.code}
            sx={{
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <Box component="span" sx={{ fontSize: "1.2rem" }}>
                {lang.flag}
              </Box>
            </ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
