"use client"

import { useContext, useState } from "react"
import { Box, Typography, Container, Paper, Avatar, Rating, IconButton, useTheme } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"

export default function TestimonialsSection() {
  const { texts } = useContext(LanguageContext)
  const [activeIndex, setActiveIndex] = useState(0)
  const theme = useTheme()

  const testimonials = [
    {
      id: 1,
      name: "María García",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      text: "Increíble experiencia en Zenhia Belleza. El tratamiento facial fue relajante y los resultados superaron mis expectativas. El personal es muy profesional y amable.",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
      text: "Excelente servicio de corte y peinado. Siempre salgo satisfecho y con un look renovado. Recomiendo totalmente este salón.",
    },
    {
      id: 3,
      name: "Laura Martínez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      text: "Los tratamientos corporales son maravillosos. Me ayudaron a relajarme y a sentirme renovada. El ambiente es muy acogedor y tranquilo.",
    },
  ]

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

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
      id="testimonios"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
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
              {texts.testimonials.title}
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
              {texts.testimonials.subtitle}
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            position: "relative",
            maxWidth: 800,
            mx: "auto",
            px: { xs: 6, md: 10 },
            height: { xs: 350, md: 300 },
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              color: "text.primary",
              zIndex: 2,
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  background: "white",
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontSize: 40,
                    color: "rgba(212, 165, 165, 0.2)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(188, 154, 108, 0.1) 0%, rgba(212, 184, 136, 0.1) 100%)",
                  }}
                />
                <Avatar
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid white",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "1.2rem",
                  }}
                >
                  {testimonials[activeIndex].name}
                </Typography>
                <Rating
                  value={testimonials[activeIndex].rating}
                  readOnly
                  sx={{
                    mb: 2,
                    "& .MuiRating-iconFilled": {
                      color: "accent.main",
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontStyle: "italic",
                    lineHeight: 1.8,
                    color: "text.secondary",
                    position: "relative",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                >
                  "{testimonials[activeIndex].text}"
                </Typography>
              </Paper>
            </motion.div>
          </AnimatePresence>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
              color: "text.primary",
              zIndex: 2,
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                mx: 0.5,
                bgcolor: index === activeIndex ? "primary.main" : "rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                  bgcolor: index === activeIndex ? "primary.main" : "rgba(0, 0, 0, 0.2)",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
