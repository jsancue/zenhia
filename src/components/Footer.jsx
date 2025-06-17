"use client"

import { useContext } from "react"
import { Box, Typography, Container, Grid, Link, IconButton, Divider, useTheme, Stack, alpha } from "@mui/material" // Added alpha
import { LanguageContext } from "../contexts/LanguageContext"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

export default function Footer() {
    const { texts } = useContext(LanguageContext)
    const currentYear = new Date().getFullYear()
    const theme = useTheme()

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.mode === "light" ? "#F0E6E6" : "#2D2424",
                color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Logo y descripción */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                                mb: 3,
                                color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                            }}
                        >
                            Zenhia Belleza
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mb: 4,
                                maxWidth: 300,
                                lineHeight: 1.8,
                                color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                            }}
                        >
                            Descubre la armonía entre belleza y bienestar en nuestro espacio dedicado a realzar tu belleza natural.
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                            }}
                        >
                            Síguenos en redes sociales
                        </Typography>

                        <Stack direction="row" spacing={1.5}>
                            <IconButton
                                aria-label="Facebook"
                                component="a"
                                href="#" // Assuming these will eventually be external links
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.action.active, 0.05), // Subtle background from theme
                                    color: (theme) => theme.palette.text.secondary, // Use theme's secondary text color
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                                        transform: "translateY(-3px)",
                                        color: (theme) => theme.palette.primary.main, // Example: Hover to primary color
                                    },
                                }}
                            >
                                <FacebookIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                aria-label="Instagram"
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.action.active, 0.05),
                                    color: (theme) => theme.palette.text.secondary,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                                        transform: "translateY(-3px)",
                                        color: (theme) => theme.palette.primary.main,
                                    },
                                }}
                            >
                                <InstagramIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                aria-label="Twitter"
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.action.active, 0.05),
                                    color: (theme) => theme.palette.text.secondary,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                                        transform: "translateY(-3px)",
                                        color: (theme) => theme.palette.primary.main,
                                    },
                                }}
                            >
                                <TwitterIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                aria-label="LinkedIn"
                                component="a"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.action.active, 0.05),
                                    color: (theme) => theme.palette.text.secondary,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: (theme) => alpha(theme.palette.action.active, 0.1),
                                        transform: "translateY(-3px)",
                                        color: (theme) => theme.palette.primary.main,
                                    },
                                }}
                            >
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Enlaces rápidos */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 3,
                                color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                            }}
                        >
                            Enlaces Rápidos
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Link
                                        href="#inicio"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.home}
                                    </Link>

                                    <Link
                                        href="#servicios"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.services}
                                    </Link>

                                    <Link
                                        href="#nosotros"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.about}
                                    </Link>

                                    <Link
                                        href="#galeria"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.gallery}
                                    </Link>
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Link
                                        href="#testimonios"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.testimonials}
                                    </Link>

                                    <Link
                                        href="#reservas"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.booking}
                                    </Link>

                                    <Link
                                        href="#contacto"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        {texts.nav.contact}
                                    </Link>

                                    <Link
                                        href="#"
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "block",
                                            transition: "transform 0.2s",
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                            "&:hover": {
                                                transform: "translateX(5px)",
                                                color: theme.palette.mode === "light" ? "primary.main" : "white",
                                            },
                                        }}
                                    >
                                        Blog
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Información de contacto */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 3,
                                color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                            }}
                        >
                            Contacto
                        </Typography>

                        <Stack spacing={3}>
                            <Box sx={{ display: "flex" }}>
                                <LocationOnIcon
                                    sx={{
                                        mr: 2,
                                        color: theme.palette.mode === "light" ? "primary.main" : "rgba(255,255,255,0.6)",
                                        flexShrink: 0,
                                    }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                                        }}
                                    >
                                        Dirección
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        Calle Ejemplo 123, Lebrija, Sevilla, 41740
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                                <PhoneIcon
                                    sx={{
                                        mr: 2,
                                        color: theme.palette.mode === "light" ? "primary.main" : "rgba(255,255,255,0.6)",
                                        flexShrink: 0,
                                    }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                                        }}
                                    >
                                        Teléfono
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        +34 123 456 789
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                                <EmailIcon
                                    sx={{
                                        mr: 2,
                                        color: theme.palette.mode === "light" ? "primary.main" : "rgba(255,255,255,0.6)",
                                        flexShrink: 0,
                                    }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        info@zenhiabelleza.com
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                                <AccessTimeIcon
                                    sx={{
                                        mr: 2,
                                        color: theme.palette.mode === "light" ? "primary.main" : "rgba(255,255,255,0.6)",
                                        flexShrink: 0,
                                    }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.mode === "light" ? "#3F2E2E" : "#F9F5F5",
                                        }}
                                    >
                                        Horario
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        Lun-Vie: 10:00 - 20:00
                                        <br />
                                        Sáb: 10:00 - 18:00
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider
                    sx={{
                        my: 5,
                        borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "center", sm: "center" },
                        textAlign: { xs: "center", sm: "left" },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            mb: { xs: 2, sm: 0 },
                            color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.6)",
                        }}
                    >
                        © {currentYear} Zenhia Belleza. {texts.footer.rights}.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={{
                                transition: "color 0.2s",
                                color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.6)",
                                "&:hover": {
                                    color: theme.palette.mode === "light" ? "primary.main" : "white",
                                },
                            }}
                        >
                            {texts.footer.privacy}
                        </Link>

                        <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={{
                                transition: "color 0.2s",
                                color: theme.palette.mode === "light" ? "text.secondary" : "rgba(255,255,255,0.6)",
                                "&:hover": {
                                    color: theme.palette.mode === "light" ? "primary.main" : "white",
                                },
                            }}
                        >
                            {texts.footer.terms}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}