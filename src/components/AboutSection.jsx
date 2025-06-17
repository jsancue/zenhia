"use client"

import { useContext } from "react"
import { Box, Typography, Container, Paper, Avatar, useTheme, Button } from "@mui/material"
import Grid from "@mui/material/Grid";
import { alpha } from '@mui/material/styles';
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"
import FlagIcon from "@mui/icons-material/Flag"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function AboutSection() {
    const { texts } = useContext(LanguageContext)
    const theme = useTheme()

    return (
        <Box
            component="section"
            id="nosotros"
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: "background.paper",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decoradores de sección */}
            <Box
                sx={{
                    position: "absolute",
                    width: { xs: 150, md: 300 },
                    height: { xs: 150, md: 300 },
                    top: { xs: -75, md: -150 },
                    right: { xs: -75, md: -150 },
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${alpha(theme.palette.accent.light, 0.15)}, transparent 70%)`, // Corrected
                    zIndex: 0,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Box className="section-title-container" sx={{ textAlign: "center", mb: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h2"
                            component="h2"
                            className="section-title"
                            sx={{
                                fontWeight: "bold",
                                position: "relative",
                                display: "inline-block",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -10,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: { xs: 60, sm: 80 },
                                    height: 3,
                                    background: "linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)",
                                    borderRadius: 3,
                                },
                            }}
                        >
                            {texts.about.title}
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Typography
                            variant="h6"
                            component="p"
                            className="section-subtitle"
                            sx={{
                                color: "text.secondary",
                                maxWidth: "800px",
                                mx: "auto",
                                mt: 3,
                            }}
                        >
                            {texts.about.subtitle}
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Box sx={{ position: "relative" }}>
                                {/* TODO: Externalize image URL */}
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Zenhia Belleza Salon"
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 3,
                                        boxShadow: "0 10px 30px rgba(212, 165, 165, 0.2)",
                                        transition: "transform 0.5s ease, box-shadow 0.5s ease",
                                        border: "5px solid white",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                            boxShadow: "0 15px 40px rgba(212, 165, 165, 0.3)",
                                        },
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: -20,
                                        right: -20,
                                        width: { xs: 100, md: 150 },
                                        height: { xs: 100, md: 150 },
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #BC9A6C 0%, #D4B888 100%)",
                                        opacity: 0.2,
                                        zIndex: -1,
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: -20,
                                        left: -20,
                                        width: { xs: 80, md: 120 },
                                        height: { xs: 80, md: 120 },
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)",
                                        opacity: 0.15,
                                        zIndex: -1,
                                    }}
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="body1"
                                paragraph
                                sx={{
                                    fontSize: "1.05rem",
                                    lineHeight: 1.8,
                                    mb: 4,
                                    color: "text.primary",
                                }}
                            >
                                {texts.about.description}
                            </Typography>

                            <Grid container spacing={3} sx={{ mt: 4 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            height: "100%",
                                            borderRadius: 3,
                                            transition: "all 0.3s ease",
                                            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.6) : theme.palette.divider}`, // Corrected
                                            background: (theme) => theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.primary.dark, 0.15)
                                                : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, #ffffff00 100%)`, // Corrected
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: (theme) => theme.shadows[4],
                                                borderColor: (theme) => theme.palette.primary.main,
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "primary.contrastText", // Ensure contrast
                                                    mr: 2,
                                                    boxShadow: (theme) => theme.shadows[2],
                                                }}
                                            >
                                                <FlagIcon />
                                            </Avatar>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "text.primary", // Use text.primary for better mode adaptability
                                                    fontFamily: '"Playfair Display", serif',
                                                }}
                                            >
                                                {texts.about.mission}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.7,
                                                mb: 2,
                                            }}
                                        >
                                            {texts.about.missionText}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            height: "100%",
                                            borderRadius: 3,
                                            transition: "all 0.3s ease",
                                            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? alpha(theme.palette.accent.dark, 0.6) : theme.palette.divider}`, // Corrected
                                            background: (theme) => theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.accent.dark, 0.15)
                                                : `linear-gradient(135deg, ${alpha(theme.palette.accent.light, 0.2)} 0%, #ffffff00 100%)`, // Corrected
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: (theme) => theme.shadows[4],
                                                borderColor: (theme) => theme.palette.accent.main,
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: "accent.main",
                                                    color: "accent.contrastText", // Ensure contrast
                                                    mr: 2,
                                                    boxShadow: (theme) => theme.shadows[2],
                                                }}
                                            >
                                                <VisibilityIcon />
                                            </Avatar>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "text.primary", // Use text.primary for better mode adaptability
                                                    fontFamily: '"Playfair Display", serif',
                                                }}
                                            >
                                                {texts.about.vision}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                lineHeight: 1.7,
                                                mb: 2,
                                            }}
                                        >
                                            {texts.about.visionText}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, textAlign: "center" }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    href="#reservas"
                                    sx={{
                                        borderRadius: 6,
                                        borderWidth: 2,
                                        borderColor: "primary.main",
                                        px: 4,
                                        py: 1,
                                        "&:hover": {
                                            borderWidth: 2,
                                            borderColor: "primary.dark",
                                            background: (theme) => theme.palette.action.hover, // Changed
                                            transform: "translateY(-3px)",
                                        },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Conoce Nuestros Servicios
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}