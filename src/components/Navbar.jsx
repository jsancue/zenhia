// src/components/Navbar.jsx
"use client"

import { useState, useEffect, useContext, useMemo } from "react";
import { Link as RouterLink } from 'react-router-dom'; // Import Link
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
    // Slide, // Removed
    Fade,
    Container,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { LanguageContext } from "../contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"

/**
 * @param {object} props
 * @param {() => void} props.toggleColorMode - Function to toggle color mode.
 * @param {'light' | 'dark'} props.mode - Current color mode.
 */
export default function Navbar({ toggleColorMode, mode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("inicio");
    const { texts } = useContext(LanguageContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const nonScrolledColor = mode === 'light' ? theme.palette.text.primary : 'white';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            const sections = document.querySelectorAll("section, [id]");
            let currentActiveSection = "inicio";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                    currentActiveSection = section.id || "inicio";
                }
            });
            setActiveSection(currentActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = useMemo(() => [
        { name: texts.nav.home, href: "#inicio" },
        { name: texts.nav.services, href: "#servicios" },
        { name: texts.nav.about, href: "#nosotros" },
        { name: texts.nav.gallery, href: "#galeria" },
        { name: texts.nav.testimonials, href: "#testimonios" },
        { name: texts.nav.booking, href: "/reservar" }, // Changed to route
        { name: texts.nav.contact, href: "#contacto" },
        { name: "Admin", href: "/admin" }, // Added Admin link
    ], [texts.nav]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <AppBar
            position="fixed" // Remains fixed
            elevation={isScrolled ? 4 : 0}
            sx={{
                bgcolor: isScrolled
                    ? mode === "light"
                        ? "rgba(255, 255, 255, 0.95)"
                        : "rgba(18, 18, 18, 0.95)"
                    : "transparent",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                backdropFilter: isScrolled ? "blur(10px)" : "none",
                borderBottom: isScrolled ? (theme) => `1px solid ${theme.palette.divider}` : "none",
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
                                color: isScrolled ? "text.primary" : nonScrolledColor,
                                "&:hover": {
                                    transform: "scale(1.03)",
                                    color: isScrolled ? "primary.main" : (mode === 'light' ? theme.palette.secondary.dark : theme.palette.secondary.light),
                                },
                            }}
                        >
                            Zenhia Belleza
                        </Typography>
                    </Fade>

                    {isMobile ? (
                        <>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <LanguageSelector isScrolled={isScrolled} mode={mode} />
                                <ThemeToggle toggleColorMode={toggleColorMode} mode={mode} isScrolled={isScrolled} />
                                <IconButton
                                    edge="end"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    sx={{
                                        transition: "transform 0.2s ease",
                                        color: isScrolled ? "text.primary" : nonScrolledColor,
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
                                        bgcolor: 'background.paper',
                                        color: 'text.primary',
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
                                                key={link.name}
                                                component={link.href.startsWith('/') ? RouterLink : 'a'}
                                                to={link.href.startsWith('/') ? link.href : undefined}
                                                href={!link.href.startsWith('/') ? link.href : undefined}
                                                sx={{
                                                    borderLeft: activeSection === (link.href.startsWith('#') ? link.href.substring(1) : '') ? `4px solid ${theme.palette.primary.main}` : "none",
                                                    bgcolor: activeSection === (link.href.startsWith('#') ? link.href.substring(1) : '') ? theme.palette.action.hover : "transparent",
                                                    transition: "all 0.2s ease",
                                                    animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
                                                    // TODO: Move @keyframes fadeIn to global CSS or implement with framer-motion variants for better organization.
                                                    "@keyframes fadeIn": {
                                                        "0%": { opacity: 0, transform: "translateX(50px)" },
                                                        "100%": { opacity: 1, transform: "translateX(0)" },
                                                    },
                                                    color: 'text.primary',
                                                    "& .MuiListItemText-primary": {
                                                        fontWeight: activeSection === (link.href.startsWith('#') ? link.href.substring(1) : '') ? "bold" : "normal",
                                                        color: 'text.primary',
                                                    },
                                                    '&:hover': {
                                                        bgcolor: theme.palette.action.selected,
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={link.name}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {navLinks.map((link) => {
                                const isRouterLink = link.href.startsWith('/');
                                const buttonProps = {
                                    key: link.name,
                                    component: isRouterLink ? RouterLink : 'a',
                                    [isRouterLink ? 'to' : 'href']: link.href,
                                    sx: {
                                        mx: 1,
                                        position: "relative",
                                        overflow: "hidden",
                                        color: isScrolled ? "text.primary" : nonScrolledColor,
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: !isRouterLink && activeSection === link.href.substring(1) ? "100%" : "0%",
                                            height: "2px",
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
                                            transition: "width 0.3s ease",
                                        },
                                        "&:hover::after": {
                                            width: "100%",
                                        },
                                        fontWeight: !isRouterLink && activeSection === link.href.substring(1) ? "bold" : "normal",
                                    }
                                };
                                return (
                                    <Button {...buttonProps}>
                                        {link.name}
                                    </Button>
                                );
                            })}
                            <LanguageSelector isScrolled={isScrolled} mode={mode} />
                            <ThemeToggle toggleColorMode={toggleColorMode} mode={mode} isScrolled={isScrolled} />
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
