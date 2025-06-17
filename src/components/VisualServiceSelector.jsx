"use client"

import { useState } from "react"
import { Box, Typography, Card, CardContent, CardMedia, CardActionArea, Chip, Fade } from "@mui/material"
import Grid from "@mui/material/Grid"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const services = [
  {
    id: "manicure",
    name: "Manicura y Pedicura",
    description: "Cuidado completo de manos y pies con técnicas profesionales.",
    image: "https://source.unsplash.com/random/300x200/?manicure",
    duration: "45-60 min",
    price: "25-35€",
  },
  {
    id: "depilation",
    name: "Depilación y Epilación",
    description: "Eliminación del vello no deseado con métodos seguros.",
    image: "https://source.unsplash.com/random/300x200/?waxing",
    duration: "30-90 min",
    price: "15-45€",
  },
  {
    id: "massage",
    name: "Masajes",
    description: "Masajes relajantes y terapéuticos para aliviar tensiones.",
    image: "https://source.unsplash.com/random/300x200/?massage",
    duration: "60 min",
    price: "45-65€",
  },
  {
    id: "maderoterapia",
    name: "Maderoterapia",
    description: "Técnica natural con instrumentos de madera para modelar el cuerpo.",
    image: "https://source.unsplash.com/random/300x200/?wood-therapy",
    duration: "75 min",
    price: "50-70€",
  },
  {
    id: "callus",
    name: "Eliminación de Durezas",
    description: "Tratamiento especializado para eliminar callosidades.",
    image: "https://source.unsplash.com/random/300x200/?foot-care",
    duration: "30 min",
    price: "20-25€",
  },
  {
    id: "dermapen",
    name: "Dermapen",
    description: "Microagujas para rejuvenecimiento facial y mejora de textura.",
    image: "https://source.unsplash.com/random/300x200/?facial-treatment",
    duration: "60 min",
    price: "80-120€",
  },
  {
    id: "microblading",
    name: "Microblading",
    description: "Micropigmentación para cejas perfectas y naturales.",
    image: "https://source.unsplash.com/random/300x200/?eyebrows",
    duration: "120 min",
    price: "150-200€",
  },
]

export default function VisualServiceSelector({ onServiceSelect }) {
  const [selectedService, setSelectedService] = useState(null)

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    if (onServiceSelect) {
      onServiceSelect(service)
    }
  }

  return (
      <Box sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Selecciona un servicio:
        </Typography>
        <Grid container spacing={2}>
          {services.map((service) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service.id}>
                <Card
                    sx={{
                      height: "100%",
                      position: "relative",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      },
                      border: selectedService?.id === service.id ? "2px solid" : "none",
                      borderColor: "primary.main",
                    }}
                >
                  <CardActionArea onClick={() => handleServiceSelect(service)} sx={{ height: "100%" }}>
                    <CardMedia component="img" height="140" image={service.image} alt={service.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Chip label={service.duration} size="small" color="primary" variant="outlined" />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {service.price}
                        </Typography>
                      </Box>
                    </CardContent>
                    {selectedService?.id === service.id && (
                        <Fade in={true}>
                          <Box
                              sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                bgcolor: "primary.main",
                                borderRadius: "50%",
                                width: 32,
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                          >
                            <CheckCircleIcon sx={{ color: "white" }} />
                          </Box>
                        </Fade>
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Box>
  )
}
