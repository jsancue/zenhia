"use client"

import { useContext } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  useTheme,
  Button,
  Divider,
} from "@mui/material"
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"
import SpaIcon from "@mui/icons-material/Spa"
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural"
import ContentCutIcon from "@mui/icons-material/ContentCut"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function ServicesSection() {
  const { texts } = useContext(LanguageContext)
  const theme = useTheme()

  const services = [
    {
      id: "manicure",
      title: texts.services.manicure.title,
      description: texts.services.manicure.description,
      icon: <SpaIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Manos y Pies",
      price: "25€ - 35€",
    },
    {
      id: "depilation",
      title: texts.services.depilation.title,
      description: texts.services.depilation.description,
      icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1720424643395-f966961d7782?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Depilación",
      price: "15€ - 45€",
    },
    {
      id: "massage",
      title: texts.services.massage.title,
      description: texts.services.massage.description,
      icon: <SpaIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1611073615452-4889cb93422e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Masajes",
      price: "45€ - 65€",
    },
    {
      id: "maderoterapia",
      title: texts.services.maderoterapia.title,
      description: texts.services.maderoterapia.description,
      icon: <ColorLensIcon sx={{ fontSize: 32 }} />,
      image:
        "https://img.freepik.com/free-photo/closeup-woman-having-anti-cellulite-massage-maderotherapy-treatment-spa_637285-2132.jpg?t=st=1748002295~exp=1748005895~hmac=15d4cf771ed50ba51da437e9a2ef3d6414cdfae2f08c14463fe525c8da9654b6&w=2000",
      category: "Corporal",
      price: "50€ - 70€",
    },
    {
      id: "callus",
      title: texts.services.callus.title,
      description: texts.services.callus.description,
      icon: <ContentCutIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1633526543913-d30e3c230d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Pies",
      price: "20€ - 25€",
    },
    {
      id: "dermapen",
      title: texts.services.dermapen.title,
      description: texts.services.dermapen.description,
      icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Facial",
      price: "80€ - 120€",
    },
    {
      id: "microblading",
      title: texts.services.microblading.title,
      description: texts.services.microblading.description,
      icon: <ColorLensIcon sx={{ fontSize: 32 }} />,
      image:
        "https://images.unsplash.com/photo-1585885970325-81cba4494c27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Cejas",
      price: "150€ - 200€",
    },
  ]

  // Decoradores de sección con la nueva paleta
  const decorators = (
    <>
      <Box
        className="section-decorator section-decorator-1"
        sx={{
          position: "absolute",
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          top: { xs: -50, md: -100 },
          left: { xs: -50, md: -100 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}15, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        className="section-decorator section-decorator-2"
        sx={{
          position: "absolute",
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          bottom: { xs: -50, md: -100 },
          right: { xs: -50, md: -100 },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.accent.light}15, transparent 70%)`,
          zIndex: 0,
        }}
      />
    </>
  )

  return (
    <Box
      component="section"
      id="servicios"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {decorators}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box className="section-title-container" sx={{ textAlign: "center", mb: 8 }}>
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
                fontFamily: '"Playfair Display", serif',
                letterSpacing: "0.5px",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: 60, sm: 80 },
                  height: 2,
                  background: "linear-gradient(135deg, #D4A5A5 0%, #9E7777 100%)",
                  borderRadius: 3,
                },
              }}
            >
              {texts.services.title}
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
                fontWeight: "normal",
                lineHeight: 1.6,
                fontSize: "1.1rem",
              }}
            >
              {texts.services.subtitle}
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s ease",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(0, 0, 0, 0.04)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                      "& .MuiCardMedia-root": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image}
                      alt={service.title}
                      sx={{
                        transition: "transform 0.8s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1))",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: "rgba(212, 165, 165, 0.9)",
                          color: "white",
                          py: 0.5,
                          px: 1.5,
                          borderRadius: 5,
                          fontWeight: "medium",
                          fontSize: "0.7rem",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          mb: 1,
                        }}
                      >
                        {service.category}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          fontFamily: '"Playfair Display", serif',
                          fontSize: "1.3rem",
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "rgba(212, 165, 165, 0.1)",
                            color: "primary.main",
                            mr: 1.5,
                          }}
                        >
                          {service.icon}
                        </Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {service.price}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Divider sx={{ mb: 2, opacity: 0.6 }} />
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        endIcon={<ArrowForwardIcon />}
                        href="#reservas"
                        sx={{
                          borderRadius: 1,
                          px: 3,
                          py: 1,
                          textTransform: "none",
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          letterSpacing: "0.3px",
                          boxShadow: "none",
                          bgcolor: "primary.main",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            boxShadow: "0 4px 12px rgba(212, 165, 165, 0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Reservar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
