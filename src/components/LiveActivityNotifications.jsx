"use client"

import { useState, useEffect, useContext } from "react"
import { Snackbar, Alert, Typography, Box, Avatar } from "@mui/material"
import { LanguageContext } from "../contexts/LanguageContext"

// Datos simulados de notificaciones
const mockNotifications = [
  {
    id: 1,
    type: "booking",
    message: {
      es: "Ana acaba de reservar un tratamiento facial",
      en: "Ana just booked a facial treatment",
    },
    avatar: "https://source.unsplash.com/random/100x100/?woman-1",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
  },
  {
    id: 2,
    type: "review",
    message: {
      es: "María dejó una reseña de 5 estrellas",
      en: "María left a 5-star review",
    },
    avatar: "https://source.unsplash.com/random/100x100/?woman-2",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
  },
  {
    id: 3,
    type: "booking",
    message: {
      es: "Carlos reservó un corte de pelo para mañana",
      en: "Carlos booked a haircut for tomorrow",
    },
    avatar: "https://source.unsplash.com/random/100x100/?man-1",
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutos atrás
  },
  {
    id: 4,
    type: "promotion",
    message: {
      es: "¡Nueva promoción! 20% de descuento en coloración",
      en: "New promotion! 20% off on hair coloring",
    },
    avatar: null,
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
  },
]

export default function LiveActivityNotifications() {
  const [notifications, setNotifications] = useState([])
  const [currentNotification, setCurrentNotification] = useState(null)
  const [open, setOpen] = useState(false)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    // Cargar notificaciones simuladas
    setNotifications(mockNotifications)

    // Mostrar la primera notificación después de un breve retraso
    const timer = setTimeout(() => {
      if (mockNotifications.length > 0) {
        showNotification(mockNotifications[0])
      }
    }, 5000)

    // Configurar intervalo para mostrar notificaciones periódicamente
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockNotifications.length)
      showNotification(mockNotifications[randomIndex])
    }, 30000) // Cada 30 segundos

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const showNotification = (notification) => {
    setCurrentNotification(notification)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  // Formatear tiempo relativo
  const formatRelativeTime = (date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return language === "es" ? "hace unos segundos" : "a few seconds ago"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return language === "es" ? `hace ${minutes} minutos` : `${minutes} minutes ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return language === "es" ? `hace ${hours} horas` : `${hours} hours ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return language === "es" ? `hace ${days} días` : `${days} days ago`
    }
  }

  // Determinar el color de la alerta según el tipo de notificación
  const getAlertSeverity = (type) => {
    switch (type) {
      case "booking":
        return "success"
      case "review":
        return "info"
      case "promotion":
        return "warning"
      default:
        return "info"
    }
  }

  if (!currentNotification) return null

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        severity={getAlertSeverity(currentNotification.type)}
        sx={{ width: "100%", alignItems: "center" }}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {currentNotification.avatar && (
            <Avatar src={currentNotification.avatar} alt="User" sx={{ width: 32, height: 32, mr: 1.5 }} />
          )}
          <Box>
            <Typography variant="body2">{currentNotification.message[language]}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatRelativeTime(currentNotification.timestamp)}
            </Typography>
          </Box>
        </Box>
      </Alert>
    </Snackbar>
  )
}
