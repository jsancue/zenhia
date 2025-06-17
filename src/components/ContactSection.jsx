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
                        elevation={3} // ADDED/CHANGED
                        sx={{
                            width: "100%",
                            maxWidth: "550px",
                            p: { xs: 3, sm: 4 },
                            borderRadius: 2, // Keep this consistent with BookingSection's Paper
                            // border: "1px solid", // REMOVE
                            // borderColor: "divider", // REMOVE
                            bgcolor: "background.paper",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                color: "text.primary", // Changed
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                            }}
                        >
                            Envíanos un mensaje
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2.5 }}>
                                {/* Removed Typography label for Name */}
                                <TextField
                                    fullWidth
                                    id="name" // ID can remain
                                    name="name"
                                    label={texts.contact.form.name} // Added label prop
                                    required // MUI will typically add an asterisk
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.name)}
                                    helperText={formErrors.name}
                                    variant="outlined"
                                    // placeholder="Tu nombre" // Often redundant with floating label
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon sx={{ color: "action.active", fontSize: 20 }} /> {/* Changed */}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            // borderRadius: 1, // REMOVED
                                            bgcolor: "background.paper",
                                            "& fieldset": {
                                                borderColor: "divider",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "primary.light", // Or theme.palette.primary.light
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "primary.main", // Or theme.palette.primary.main
                                                // borderWidth: "1px", // REMOVED to use MUI default focused border
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
                                {/* Removed Typography label for Email */}
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    type="email"
                                    label={texts.contact.form.email} // Added label prop
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.email)}
                                    helperText={formErrors.email}
                                    variant="outlined"
                                    // placeholder="Tu email" // Often redundant with floating label
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon sx={{ color: "action.active", fontSize: 20 }} /> {/* Changed */}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            // borderRadius: 1, // REMOVED
                                            bgcolor: "background.paper",
                                            "& fieldset": {
                                                borderColor: "divider",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "primary.light", // Or theme.palette.primary.light
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "primary.main", // Or theme.palette.primary.main
                                                // borderWidth: "1px", // REMOVED to use MUI default focused border
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
                                {/* Removed Typography label for Subject */}
                                <TextField
                                    fullWidth
                                    id="subject"
                                    name="subject"
                                    label={texts.contact.form.subject} // Added label prop
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.subject)}
                                    helperText={formErrors.subject}
                                    variant="outlined"
                                    // placeholder="Asunto del mensaje" // Often redundant with floating label
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SubjectIcon sx={{ color: "action.active", fontSize: 20 }} /> {/* Changed */}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            // borderRadius: 1, // REMOVED
                                            bgcolor: "background.paper",
                                            "& fieldset": {
                                                borderColor: "divider",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "primary.light", // Or theme.palette.primary.light
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "primary.main", // Or theme.palette.primary.main
                                                // borderWidth: "1px", // REMOVED to use MUI default focused border
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
                                {/* Removed Typography label for Message */}
                                <TextField
                                    fullWidth
                                    id="message"
                                    multiline
                                    rows={4}
                                    name="message"
                                    label={texts.contact.form.message} // Added label prop
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.message)}
                                    helperText={formErrors.message}
                                    variant="outlined"
                                    // placeholder="Escribe tu mensaje aquí" // Often redundant with floating label
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                                                <ChatBubbleOutlineIcon sx={{ color: "action.active", fontSize: 20 }} /> {/* Changed */}
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            // borderRadius: 1, // REMOVED
                                            bgcolor: "background.paper",
                                            "& fieldset": {
                                                borderColor: "divider",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "primary.light", // Or theme.palette.primary.light
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "primary.main", // Or theme.palette.primary.main
                                                // borderWidth: "1px", // REMOVED to use MUI default focused border
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
                                    color="primary" // Added
                                    disabled={submitting}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        // bgcolor: "#D4A5A5", // Removed
                                        // color: "white", // Removed (handled by contrastText)
                                        py: 1.5,
                                        px: 4,
                                        // borderRadius: 1, // REMOVE/CHANGE
                                        borderRadius: "30px", // ADDED to match BookingSection
                                        textTransform: "none",
                                        fontWeight: 500,
                                        // boxShadow: "none", // Default variant="contained" has shadow, remove if not desired
                                        minWidth: "180px",
                                        // "&:hover": { // Handled by theme for contained buttons
                                        //   bgcolor: "#C68989",
                                        //   boxShadow: "none",
                                        // },
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