"use client"

import { useContext, useState } from "react"
import { Link } from 'react-router-dom'; // Import Link for navigation if needed later
import { Box, Typography, Container, Grid, TextField, MenuItem, Button, Alert, Snackbar, Paper } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { motion } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"

// Note: Renamed component to BookingPage
export default function BookingPage() {
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

    // TODO: Fetch services from API
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

    // These handlers might be useful if specific logic is needed on select, beyond simple form data update.
    // const handleServiceSelect = (serviceValue) => {
    //   setFormData((prev) => ({ ...prev, service: serviceValue }))
    //   if (formErrors.service) {
    //     setFormErrors((prev) => ({ ...prev, service: "" }))
    //   }
    // }

    // const handleTimeSelect = (timeValue) => {
    //   setFormData((prev) => ({ ...prev, time: timeValue }))
    //   if (formErrors.time) {
    //     setFormErrors((prev) => ({ ...prev, time: "" }))
    //   }
    // }

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
            // TODO: Replace simulation with actual API call to backend
            // Example:
            // try {
            //   const response = await api.submitBooking(formData);
            //   setSuccess(true);
            //   setFormData({ name: "", email: "", phone: "", service: "", date: null, time: "", message: "" });
            // } catch (error) {
            //   setFormErrors({ api: "Error al enviar la reserva. Inténtalo de nuevo." });
            // } finally {
            //   setSubmitting(false);
            // }
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
        // Removed id="reservas" as this is a page now, not a section
        <Box
            sx={{
                py: { xs: 4, md: 10 }, // Adjusted padding for page view
                bgcolor: "background.default",
                minHeight: 'calc(100vh - 64px - 70px)', // Adjust based on Navbar and Footer height
                display: 'flex',
                alignItems: 'center', // Center content vertically
            }}
        >
            <Container maxWidth="md"> {/* Adjusted maxWidth for better focus on form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} // Changed to animate for page load
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h2"
                        component="h1" // Changed to h1 for page title
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
                    animate={{ opacity: 1 }} // Changed to animate for page load
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            textAlign: "center",
                            mb: { xs: 4, md: 8 }, // Adjusted margin bottom
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
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
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
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
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
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
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
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
                                <TextField
                                    fullWidth
                                    select
                                    label={texts.booking.service}
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange} // Direct usage of handleChange is fine for TextField select
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
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label={texts.booking.date}
                                        value={formData.date}
                                        onChange={handleDateChange}
                                        disablePast
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: Boolean(formErrors.date),
                                                helperText: formErrors.date,
                                                required: true,
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}> {/* Ensure Grid item is used */}
                                <TextField
                                    fullWidth
                                    label={texts.booking.time} // Assuming texts.booking.time exists
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange} // Direct usage of handleChange
                                    error={Boolean(formErrors.time)}
                                    helperText={formErrors.time}
                                    required
                                    // Consider using a TimePicker or select for specific time slots
                                />
                            </Grid>
                            <Grid item xs={12}> {/* Ensure Grid item is used */}
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
                            <Grid item xs={12}> {/* Ensure Grid item is used */}
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
