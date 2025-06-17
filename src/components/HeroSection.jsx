"use client"

import { useContext, useState, useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom'; // Import Link
import { Box, Typography, Button, Container } from "@mui/material"
import { alpha } from '@mui/material/styles'; // Corrected alpha import
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"

export default function HeroSection() {
    const { texts } = useContext(LanguageContext)
    const [isVisible, setIsVisible] = useState(false)

    // Efecto para activar la animación cuando el componente está en el viewport
    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <Box
            component="section"
            id="inicio"
            sx={{
                position: "relative",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                padding: 0,
            }}
        >
            {/* Background Image with parallax effect */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scale(1.1)",
                    transition: "transform 0.5s ease-out",
                    "&:hover": {
                        transform: "scale(1.05)", // Sutil efecto parallax al hacer hover
                    },
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: (theme) => theme.palette.mode === 'light'
                            ? "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(212, 165, 165, 0.4))" // Keeps existing light mode overlay
                            : `linear-gradient(to bottom, rgba(0,0,0,0.5), ${alpha(theme.palette.common.black, 0.7)})`, // Example: Darker, more neutral overlay for dark mode
                    },
                }}
            />

            {/* Content with improved animations */}
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 3,
                            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: -15,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: { xs: "60px", sm: "80px", md: "100px" },
                                height: "3px",
                                background: "linear-gradient(135deg, #BC9A6C 0%, #D4B888 100%)",
                                borderRadius: "3px",
                            },
                        }}
                    >
                        {texts.hero.title}
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    <Typography
                        variant="h5"
                        component="p"
                        sx={{
                            color: "white",
                            textAlign: "center",
                            mb: 6,
                            maxWidth: "800px",
                            mx: "auto",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                            lineHeight: 1.6,
                        }}
                    >
                        {texts.hero.subtitle}
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={RouterLink} // Use Link component
                        to="/reservar" // Link to the booking page
                        sx={{
                            py: 1.5,
                            px: 4,
                            fontSize: "1.1rem",
                            borderRadius: "30px",
                            // background: "linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)", // Old
                            background: (theme) => theme.palette.mode === 'light'
                                ? 'linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)'
                                // For dark mode background, use existing .dark shades
                                : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,

                            color: (theme) => theme.palette.primary.contrastText,

                            boxShadow: (theme) => theme.palette.mode === 'light'
                                ? "0 4px 14px rgba(212, 165, 165, 0.4)"
                                // Ensure alpha is used correctly with a defined theme color
                                : `0 4px 14px ${alpha(theme.palette.primary.dark, 0.4)}`,

                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",

                            "&:hover": {
                                background: (theme) => theme.palette.mode === 'light'
                                    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                                    // Corrected: Use .dark for hover in dark mode, not .darker
                                    : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,

                                transform: "translateY(-3px)",

                                boxShadow: (theme) => theme.palette.mode === 'light'
                                    ? "0 6px 20px rgba(212, 165, 165, 0.6)"
                                    // Corrected: Use .dark for hover boxShadow color source in dark mode
                                    : `0 6px 20px ${alpha(theme.palette.primary.dark, 0.6)}`,

                                "&::after": {
                                    transform: "translateX(100%)",
                                },
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                transition: "transform 0.6s ease",
                            },
                        }}
                    >
                        {texts.hero.cta}
                    </Button>
                </motion.div>
            </Container>
        </Box>
    )
}