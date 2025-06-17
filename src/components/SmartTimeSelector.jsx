"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Paper, Skeleton, Alert } from "@mui/material"
import Grid from "@mui/material/Grid"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

// Simulación de disponibilidad de horarios
const getAvailableSlots = (date, serviceId) => {
  // En una implementación real, esto vendría de una API
  if (!date) return Promise.resolve([])

  const day = date.getDay()

  // Simular diferentes disponibilidades según el día de la semana
  let slots = []

  // Horario de mañana
  for (let hour = 10; hour <= 13; hour++) {
    // Simular algunos horarios ocupados
    if (day === 5 && hour === 11) continue // Viernes a las 11 ocupado
    if (day === 6 && hour === 12) continue // Sábado a las 12 ocupado

    slots.push(`${hour}:00`)
    if (hour !== 13) slots.push(`${hour}:30`)
  }

  // Horario de tarde
  for (let hour = 16; hour <= 19; hour++) {
    // Simular algunos horarios ocupados
    if (day === 3 && hour === 17) continue // Miércoles a las 17 ocupado
    if (day === 4 && hour === 18) continue // Jueves a las 18 ocupado

    slots.push(`${hour}:00`)
    if (hour !== 19) slots.push(`${hour}:30`)
  }

  // Domingo cerrado
  if (day === 0) slots = []

  // Simular carga de datos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(slots)
    }, 800)
  })
}

export default function SmartTimeSelector({ date, serviceId, onTimeSelect }) {
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!date) return

    setLoading(true)
    setError(null)

    getAvailableSlots(date, serviceId)
        .then((slots) => {
          setAvailableSlots(slots)
          setSelectedTime(null) // Reset selection when date changes
        })
        .catch((err) => {
          console.error("Error fetching time slots:", err)
          setError("No pudimos cargar los horarios disponibles. Por favor, inténtalo de nuevo.")
        })
        .finally(() => {
          setLoading(false)
        })
  }, [date, serviceId])

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    if (onTimeSelect) {
      onTimeSelect(time)
    }
  }

  if (!date) {
    return (
        <Alert severity="info" sx={{ mt: 2 }}>
          Por favor, selecciona una fecha para ver los horarios disponibles.
        </Alert>
    )
  }

  return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          Horarios disponibles:
        </Typography>

        {loading ? (
            <Grid container spacing={1}>
              {[...Array(8)].map((_, index) => (
                  <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
                    <Skeleton variant="rounded" height={36} />
                  </Grid>
              ))}
            </Grid>
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : availableSlots.length === 0 ? (
            <Alert severity="warning">No hay horarios disponibles para esta fecha. Por favor, selecciona otro día.</Alert>
        ) : (
            <Grid container spacing={1}>
              {availableSlots.map((time) => (
                  <Grid size={{ xs: 4, sm: 3, md: 2 }} key={time}>
                    <Paper
                        onClick={() => handleTimeSelect(time)}
                        sx={{
                          py: 1,
                          px: 2,
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          bgcolor: selectedTime === time ? "primary.main" : "background.paper",
                          color: selectedTime === time ? "white" : "text.primary",
                          border: "1px solid",
                          borderColor: selectedTime === time ? "primary.main" : "divider",
                          "&:hover": {
                            bgcolor: selectedTime === time ? "primary.dark" : "action.hover",
                            transform: "translateY(-2px)",
                          },
                        }}
                    >
                      <Typography variant="body2">{time}</Typography>
                    </Paper>
                  </Grid>
              ))}
            </Grid>
        )}
      </Box>
  )
}
