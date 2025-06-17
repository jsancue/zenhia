"use client"

import { Box, CircularProgress, Typography } from "@mui/material"
import { motion } from "framer-motion"

export default function LoadingScreen() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: (theme) => theme.palette.background.default, // Changed
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={(theme) => ({ // Changed to function to access theme
                        fontFamily: '"Playfair Display", serif',
                        mb: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, // Changed
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "40%",
                            height: 2,
                            background: `linear-gradient(135deg, ${theme.palette.accent.main} 0%, ${theme.palette.accent.light} 100%)`, // Changed
                        },
                    })}
                >
                    Zenhia Belleza
                </Typography>
            </motion.div>

            {/* Spinner personalizado */}
            <Box sx={{ position: "relative" }}>
                <CircularProgress
                    size={60}
                    thickness={3}
                    color="primary" // Changed
                    sx={{
                        // color: "#D4A5A5", // Removed
                        animation: "spin 1.5s linear infinite",
                        "@keyframes spin": {
                            "0%": {
                                transform: "rotate(0deg)",
                            },
                            "100%": {
                                transform: "rotate(360deg)",
                            },
                        },
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: (theme) => theme.palette.accent.main, // Changed
                        }}
                    />
                </Box>
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        mt: 3,
                        color: "text.secondary", // Changed
                        fontStyle: "italic",
                    }}
                >
                    Cargando experiencia de belleza...
                </Typography>
            </motion.div>
        </Box>
    )
}