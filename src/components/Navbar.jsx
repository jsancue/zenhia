"use client"

import { useState, useEffect, useContext } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Slide,
  Fade,
  Container,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { LanguageContext } from "../contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"

export default function Navbar({ toggleColorMode, mode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const { texts } = useContext(LanguageContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Detectar sección activa
      const sections = document.querySelectorAll("section, [id]")
      let currentActiveSection = "inicio"

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentActiveSection = section.id || "inicio"
        }
      })

      setActiveSection(currentActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: texts.nav.home, href: "#inicio" },
    { name: texts.nav.services, href: "#servicios" },
    { name: texts.nav.about, href: "#nosotros" },
    { name: texts.nav.gallery, href: "#galeria" },
    { name: texts.nav.testimonials, href: "#testimonios" },
    { name: texts.nav.booking, href: "#reservas" },
    { name: texts.nav.contact, href: "#contacto" },
  ]

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  return (
    <Slide appear={false} direction="down" in={!isScrolled}>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          bgcolor: isScrolled
            ? mode === "light"
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(18, 18, 18, 0.95)"
            : "transparent",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          borderBottom: isScrolled ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            <Fade in={true} timeout={1000}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  transition: "all 0.3s ease",
                  color: isScrolled ? "text.primary" : "white",
                  "&:hover": {
                    transform: "scale(1.03)",
                    color: isScrolled ? "primary.main" : "secondary.light",
                  },
                }}
              >
                Zenhia Belleza
              </Typography>
            </Fade>

            {isMobile ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LanguageSelector isScrolled={isScrolled} />
                  <ThemeToggle toggleColorMode={toggleColorMode} mode={mode} isScrolled={isScrolled} />
                  <IconButton
                    edge="end"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{
                      transition: "transform 0.2s ease",
                      color: isScrolled ? "text.primary" : "white",
                      "&:hover": {
                        transform: "rotate(90deg)",
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      width: 250,
                      background: "linear-gradient(to bottom, rgba(138, 155, 110, 0.95), rgba(196, 183, 162, 0.95))",
                      color: "white",
                      borderTopLeftRadius: 16,
                      borderBottomLeftRadius: 16,
                    },
                  }}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      {navLinks.map((link, index) => (
                        <ListItem
                          button
                          key={link.name}
                          component="a"
                          href={link.href}
                          sx={{
                            borderLeft: activeSection === link.href.substring(1) ? "4px solid white" : "none",
                            bgcolor: activeSection === link.href.substring(1) ? "rgba(255,255,255,0.1)" : "transparent",
                            transition: "all 0.2s ease",
                            transform: `translateX(${drawerOpen ? "0" : "50px"})`,
                            opacity: drawerOpen ? 1 : 0,
                            animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
                            "@keyframes fadeIn": {
                              "0%": { opacity: 0, transform: "translateX(50px)" },
                              "100%": { opacity: 1, transform: "translateX(0)" },
                            },
                          }}
                        >
                          <ListItemText
                            primary={link.name}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: activeSection === link.href.substring(1) ? "bold" : "normal",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    href={link.href}
                    sx={{
                      mx: 1,
                      position: "relative",
                      overflow: "hidden",
                      color: isScrolled ? "text.primary" : "white",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: activeSection === link.href.substring(1) ? "100%" : "0%",
                        height: "2px",
                        bgcolor: "secondary.main",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                      fontWeight: activeSection === link.href.substring(1) ? "bold" : "normal",
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
                <LanguageSelector isScrolled={isScrolled} />
                <ThemeToggle toggleColorMode={toggleColorMode} mode={mode} isScrolled={isScrolled} />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  )
}
