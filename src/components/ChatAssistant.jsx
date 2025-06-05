"use client"

import { useState, useRef, useEffect, useContext } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fab,
  Zoom,
  List,
  ListItem,
  Divider,
  Button,
  Collapse,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import { LanguageContext } from "../contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

// Respuestas predefinidas para el chatbot
const botResponses = {
  es: {
    greeting: "¡Hola! Soy Zen, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    services:
      "Ofrecemos servicios especializados en belleza y bienestar: Manicura y Pedicura, Depilación y Epilación, Masajes relajantes, Maderoterapia, Eliminación de durezas, Dermapen para rejuvenecimiento facial, y Microblading para cejas perfectas. ¿Te gustaría más información sobre alguno en particular?",
    booking:
      "Puedes reservar una cita a través de nuestra sección de reservas en la página web o llamando al +34 123 456 789. ¿Te gustaría que te ayude a programar una cita ahora?",
    hours: "Nuestro horario es: Lunes a Viernes de 10:00 a 20:00 y Sábados de 10:00 a 18:00. Domingos cerrado.",
    location: "Estamos ubicados en Calle Ejemplo 123, Lebrija, Sevilla, 41740. ¿Necesitas indicaciones?",
    prices:
      "Los precios varían según el servicio. Manicura desde 25€, Pedicura desde 30€, Depilación desde 15€, Masajes desde 45€, Maderoterapia desde 50€, Eliminación de durezas desde 20€, Dermapen desde 80€, y Microblading desde 150€. ¡Contáctanos para más detalles!",
    thanks: "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
    default:
      "Lo siento, no tengo información sobre eso. ¿Puedo ayudarte con algo más sobre nuestros servicios, reservas, horarios o ubicación?",
    goodbye:
      "¡Gracias por contactar con Zenhia Belleza! Esperamos verte pronto. Si tienes más preguntas, no dudes en preguntar.",
  },
  en: {
    greeting: "Hello! I'm Zen, your virtual assistant. How can I help you today?",
    services:
      "We offer specialized beauty and wellness services: Manicure and Pedicure, Hair Removal and Epilation, Relaxing Massages, Wood Therapy, Callus Removal, Dermapen for facial rejuvenation, and Microblading for perfect eyebrows. Would you like more information about any particular service?",
    booking:
      "You can book an appointment through our booking section on the website or by calling +34 123 456 789. Would you like me to help you schedule an appointment now?",
    hours: "Our hours are: Monday to Friday from 10:00 to 20:00 and Saturdays from 10:00 to 18:00. Closed on Sundays.",
    location: "We are located at Calle Ejemplo 123, Lebrija, Sevilla, 41740. Do you need directions?",
    prices:
      "Prices vary depending on the service. Manicure from €25, Pedicure from €30, Hair Removal from €15, Massages from €45, Wood Therapy from €50, Callus Removal from €20, Dermapen from €80, and Microblading from €150. Contact us for more details!",
    thanks: "You're welcome! I'm here to help. Is there anything else I can assist you with?",
    default:
      "I'm sorry, I don't have information about that. Can I help you with something else about our services, bookings, hours, or location?",
    goodbye:
      "Thank you for contacting Zenhia Belleza! We hope to see you soon. If you have more questions, don't hesitate to ask.",
  },
}

// Sugerencias rápidas para el chat
const quickSuggestions = {
  es: [
    { id: "services", text: "¿Qué servicios ofrecen?" },
    { id: "booking", text: "¿Cómo puedo reservar?" },
    { id: "hours", text: "¿Cuál es el horario?" },
    { id: "location", text: "¿Dónde están ubicados?" },
    { id: "prices", text: "¿Cuáles son los precios?" },
  ],
  en: [
    { id: "services", text: "What services do you offer?" },
    { id: "booking", text: "How can I book?" },
    { id: "hours", text: "What are your hours?" },
    { id: "location", text: "Where are you located?" },
    { id: "prices", text: "What are your prices?" },
  ],
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { language, texts } = useContext(LanguageContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const mode = theme.palette.mode

  // Inicializar el chat con un mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      // Simular efecto de escritura
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            text: botResponses[language].greeting,
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      }, 1000)
    }
  }, [isOpen, messages.length, language])

  // Scroll automático al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Añadir mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setShowSuggestions(false)
    setIsTyping(true)

    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botMessage = {
        id: Date.now(),
        text: getBotResponse(inputValue.toLowerCase(), language),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestionId) => {
    const suggestion = quickSuggestions[language].find((s) => s.id === suggestionId)
    if (suggestion) {
      setInputValue(suggestion.text)
      setShowSuggestions(false)

      // Añadir mensaje del usuario
      const userMessage = {
        id: Date.now(),
        text: suggestion.text,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)

      // Simular respuesta del bot después de un breve retraso
      setTimeout(() => {
        const botMessage = {
          id: Date.now(),
          text: botResponses[language][suggestionId],
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  // Función para determinar la respuesta del bot basada en el mensaje del usuario
  const getBotResponse = (message, lang) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("hola") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return botResponses[lang].greeting
    } else if (
      lowerMessage.includes("servicio") ||
      lowerMessage.includes("service") ||
      lowerMessage.includes("ofrece")
    ) {
      return botResponses[lang].services
    } else if (
      lowerMessage.includes("reserva") ||
      lowerMessage.includes("cita") ||
      lowerMessage.includes("book") ||
      lowerMessage.includes("appointment")
    ) {
      return botResponses[lang].booking
    } else if (
      lowerMessage.includes("horario") ||
      lowerMessage.includes("hora") ||
      lowerMessage.includes("hour") ||
      lowerMessage.includes("open")
    ) {
      return botResponses[lang].hours
    } else if (
      lowerMessage.includes("ubicación") ||
      lowerMessage.includes("dirección") ||
      lowerMessage.includes("location") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("where")
    ) {
      return botResponses[lang].location
    } else if (
      lowerMessage.includes("precio") ||
      lowerMessage.includes("costo") ||
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("how much")
    ) {
      return botResponses[lang].prices
    } else if (lowerMessage.includes("gracias") || lowerMessage.includes("thank")) {
      return botResponses[lang].thanks
    } else if (lowerMessage.includes("adiós") || lowerMessage.includes("bye") || lowerMessage.includes("chao")) {
      return botResponses[lang].goodbye
    } else {
      return botResponses[lang].default
    }
  }

  // Formatear la hora para los mensajes
  const formatTime = (date) => {
    return date.toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <Zoom in={!isOpen}>
        <Tooltip title={language === "es" ? "Chatea con nosotros" : "Chat with us"} placement="left">
          <Fab
            color="primary"
            aria-label="chat"
            onClick={toggleChat}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px) scale(1.05)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <ChatIcon />
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
              width: isMobile ? "calc(100% - 48px)" : 350,
              maxWidth: "100%",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                height: 450,
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* Cabecera del chat */}
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "white",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="/placeholder.svg?height=40&width=40"
                    alt="Zen Assistant"
                    sx={{
                      mr: 1,
                      bgcolor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <ChatIcon color="primary" />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                    Zen Assistant
                  </Typography>
                </Box>
                <IconButton
                  color="inherit"
                  onClick={toggleChat}
                  edge="end"
                  sx={{
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Área de mensajes */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 2,
                  bgcolor: "background.default",
                  backgroundImage:
                    mode === "light"
                      ? "radial-gradient(#e5e5e5 1px, transparent 1px)"
                      : "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <List>
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ListItem
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                            p: 0,
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "80%",
                              p: 1.5,
                              borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                              bgcolor:
                                message.sender === "user"
                                  ? "primary.main"
                                  : mode === "light"
                                    ? "background.paper"
                                    : "grey.800",
                              color: message.sender === "user" ? "white" : "text.primary",
                              boxShadow:
                                message.sender === "user"
                                  ? "0 2px 8px rgba(138, 155, 110, 0.3)"
                                  : "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Typography variant="body1">{message.text}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mx: 1 }}>
                            {formatTime(message.timestamp)}
                          </Typography>
                        </ListItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Indicador de "escribiendo" */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItem
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          p: 0,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "18px 18px 18px 4px",
                            bgcolor: mode === "light" ? "background.paper" : "grey.800",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "primary.main",
                              animation: "bounce 1.2s infinite ease-in-out",
                              animationDelay: "0s",
                              "@keyframes bounce": {
                                "0%, 100%": {
                                  transform: "translateY(0)",
                                },
                                "50%": {
                                  transform: "translateY(-5px)",
                                },
                              },
                            }}
                          />
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "primary.main",
                              animation: "bounce 1.2s infinite ease-in-out",
                              animationDelay: "0.2s",
                            }}
                          />
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "primary.main",
                              animation: "bounce 1.2s infinite ease-in-out",
                              animationDelay: "0.4s",
                            }}
                          />
                        </Box>
                      </ListItem>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </List>

                {/* Sugerencias rápidas */}
                <Collapse in={showSuggestions && messages.length === 1}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {language === "es" ? "Sugerencias:" : "Suggestions:"}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {quickSuggestions[language].map((suggestion, index) => (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleSuggestionClick(suggestion.id)}
                            sx={{
                              borderRadius: 4,
                              textTransform: "none",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            {suggestion.text}
                          </Button>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </Collapse>
              </Box>

              <Divider />

              {/* Área de entrada de texto */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  placeholder={language === "es" ? "Escribe un mensaje..." : "Type a message..."}
                  variant="outlined"
                  size="small"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  sx={{
                    mr: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      transition: "box-shadow 0.2s ease",
                      "&:hover, &.Mui-focused": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      },
                    },
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:not(:disabled):hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
