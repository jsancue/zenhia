"use client"

import { useContext, useState } from "react"
import { Box, Typography, Container, TextField, Button, Paper, Alert, Snackbar, InputAdornment } from "@mui/material"
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import SubjectIcon from "@mui/icons-material/Subject"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function ContactSection() {
  const { texts } = useContext(LanguageContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario escribe
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "El nombre es requerido"
    if (!formData.email.trim()) {
      errors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido"
    }
    if (!formData.subject.trim()) errors.subject = "El asunto es requerido"
    if (!formData.message.trim()) errors.message = "El mensaje es requerido"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitting(true)
      // Simulación de envío
      setTimeout(() => {
        setSubmitting(false)
        setSuccess(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 1500)
    }
  }

  const handleCloseSnackbar = () => {
    setSuccess(false)
  }

  return (
    <Box
      id="contacto"
      sx={{
        py: 8,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            {texts.contact.title}
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
            sx={{
              textAlign: "center",
              mb: 6,
              maxWidth: "800px",
              mx: "auto",
              color: "text.secondary",
            }}
          >
            {texts.contact.subtitle}
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: "550px",
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: "#3F2E2E",
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
              }}
            >
              Envíanos un mensaje
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    component="label"
                    htmlFor="name"
                    sx={{ color: "#3F2E2E", fontWeight: 500 }}
                  >
                    Nombre{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                      *
                    </Box>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(formErrors.name)}
                  helperText={formErrors.name}
                  required
                  variant="outlined"
                  placeholder="Tu nombre"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "divider",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.light",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      py: 1.5,
                    },
                    "& .MuiFormHelperText-root": {
                      mt: 0.5,
                      ml: 0,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    component="label"
                    htmlFor="email"
                    sx={{ color: "#3F2E2E", fontWeight: 500 }}
                  >
                    Correo electrónico{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                      *
                    </Box>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                  required
                  variant="outlined"
                  placeholder="Tu email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "divider",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.light",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      py: 1.5,
                    },
                    "& .MuiFormHelperText-root": {
                      mt: 0.5,
                      ml: 0,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    component="label"
                    htmlFor="subject"
                    sx={{ color: "#3F2E2E", fontWeight: 500 }}
                  >
                    Asunto{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                      *
                    </Box>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={Boolean(formErrors.subject)}
                  helperText={formErrors.subject}
                  required
                  variant="outlined"
                  placeholder="Asunto del mensaje"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SubjectIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "divider",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.light",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      py: 1.5,
                    },
                    "& .MuiFormHelperText-root": {
                      mt: 0.5,
                      ml: 0,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    component="label"
                    htmlFor="message"
                    sx={{ color: "#3F2E2E", fontWeight: 500 }}
                  >
                    Mensaje{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                      *
                    </Box>
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="message"
                  multiline
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={Boolean(formErrors.message)}
                  helperText={formErrors.message}
                  required
                  variant="outlined"
                  placeholder="Escribe tu mensaje aquí"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                        <ChatBubbleOutlineIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "background.paper",
                      "& fieldset": {
                        borderColor: "divider",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.light",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      mt: 0.5,
                      ml: 0,
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#D4A5A5",
                    color: "white",
                    py: 1.5,
                    px: 4,
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 500,
                    boxShadow: "none",
                    minWidth: "180px",
                    "&:hover": {
                      bgcolor: "#C68989",
                      boxShadow: "none",
                    },
                  }}
                >
                  {submitting ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: 1,
            }}
          >
            Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}
