"use client"

import { useContext, useState } from "react"
import { Box, Typography, Container, Grid, TextField, MenuItem, Button, Alert, Snackbar, Paper } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"

export default function BookingSection() {
  const { texts } = useContext(LanguageContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: null,
    time: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const services = [
    { value: "manicure", label: texts.services.manicure.title },
    { value: "depilation", label: texts.services.depilation.title },
    { value: "massage", label: texts.services.massage.title },
    { value: "maderoterapia", label: texts.services.maderoterapia.title },
    { value: "callus", label: texts.services.callus.title },
    { value: "dermapen", label: texts.services.dermapen.title },
    { value: "microblading", label: texts.services.microblading.title },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario escribe
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }))
    if (formErrors.date) {
      setFormErrors((prev) => ({ ...prev, date: "" }))
    }
  }

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({ ...prev, service: service.id }))
    if (formErrors.service) {
      setFormErrors((prev) => ({ ...prev, service: "" }))
    }
  }

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }))
    if (formErrors.time) {
      setFormErrors((prev) => ({ ...prev, time: "" }))
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
    if (!formData.phone.trim()) errors.phone = "El teléfono es requerido"
    if (!formData.service) errors.service = "Selecciona un servicio"
    if (!formData.date) errors.date = "Selecciona una fecha"
    if (!formData.time) errors.time = "Selecciona una hora"

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
          phone: "",
          service: "",
          date: null,
          time: "",
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
      id="reservas"
      sx={{
        py: 10,
        bgcolor: "background.default",
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
            {texts.booking.title}
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
              mb: 8,
              maxWidth: "800px",
              mx: "auto",
              color: "text.secondary",
            }}
          >
            {texts.booking.subtitle}
          </Typography>
        </motion.div>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={texts.booking.name}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(formErrors.name)}
                  helperText={formErrors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={texts.booking.email}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={texts.booking.phone}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(formErrors.phone)}
                  helperText={formErrors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label={texts.booking.service}
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  error={Boolean(formErrors.service)}
                  helperText={formErrors.service}
                  required
                >
                  {services.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={texts.booking.date}
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(formErrors.date)}
                        helperText={formErrors.date}
                        required
                      />
                    )}
                    disablePast
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={texts.booking.time}
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={Boolean(formErrors.time)}
                  helperText={formErrors.time}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={texts.booking.message}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={submitting}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: "30px",
                    }}
                  >
                    {submitting ? "Enviando..." : texts.booking.submit}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            {texts.booking.success}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}
