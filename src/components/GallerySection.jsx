"use client"

import { useContext, useState } from "react"
import { Box, Typography, Container, Card, Modal, IconButton, useTheme, alpha } from "@mui/material" // CardMedia removed, alpha added
import Grid from "@mui/material/Grid"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageContext } from "../contexts/LanguageContext"
import LazyImage from "./LazyImage"; // Import LazyImage
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

export default function GallerySection() {
    const { texts } = useContext(LanguageContext)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const theme = useTheme()

    // TODO: Externalize galleryImages data
    const galleryImages = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Facial Treatment",
            category: "Tratamientos Faciales",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Haircut",
            category: "Peluquería",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Hair Coloring",
            category: "Coloración",
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Manicure",
            category: "Manicura",
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Pedicure",
            category: "Pedicura",
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1611073615452-4889cb93422e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Massage",
            category: "Masajes",
        },
    ]

    const handleOpenImage = (image, index) => {
        setSelectedImage(image)
        setSelectedIndex(index)
    }

    const handleCloseImage = () => {
        setSelectedImage(null)
    }

    const handlePrevImage = (e) => {
        e.stopPropagation()
        const newIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length
        setSelectedIndex(newIndex)
        setSelectedImage(galleryImages[newIndex])
    }

    const handleNextImage = (e) => {
        e.stopPropagation()
        const newIndex = (selectedIndex + 1) % galleryImages.length
        setSelectedIndex(newIndex)
        setSelectedImage(galleryImages[newIndex])
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
                    background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)}, transparent 70%)`,
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
                    background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.accent.light, 0.15)}, transparent 70%)`,
                    zIndex: 0,
                }}
            />
        </>
    )

    return (
        <Box
            component="section"
            id="galeria"
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
                            {texts.gallery.title}
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
                            {texts.gallery.subtitle}
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={3}>
                    {galleryImages.map((image, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        overflow: "hidden",
                                        borderRadius: 2,
                                        boxShadow: (theme) => theme.shadows[1], // Changed
                                        transition: "all 0.4s ease",
                                        height: 280,
                                        position: "relative",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: (theme) => theme.shadows[4], // Changed for hover, or another appropriate index
                                            "& img": { // Target the img rendered by LazyImage
                                                transform: "scale(1.05)",
                                            },
                                            "& .image-overlay": {
                                                opacity: 0.7,
                                            },
                                            "& .image-category": {
                                                opacity: 1,
                                                transform: "translateY(0)",
                                            },
                                        },
                                    }}
                                    onClick={() => handleOpenImage(image, index)}
                                >
                                    <LazyImage
                                        src={image.src}
                                        alt={image.alt}
                                        sx={{
                                            width: '100%', // Make LazyImage fill the card area
                                            height: '100%', // Make LazyImage fill the card area
                                            objectFit: 'cover', // Ensure image covers the area
                                            transition: "transform 0.8s ease", // Keep original CardMedia transition if desired on image itself
                                        }}
                                    />
                                    <Box
                                        className="image-overlay"
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            background:
                                                "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1))",
                                            opacity: 0,
                                            transition: "opacity 0.4s ease",
                                        }}
                                    />
                                    <Box
                                        className="image-category"
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            padding: "20px",
                                            textAlign: "center",
                                            opacity: 0,
                                            transform: "translateY(20px)",
                                            transition: "all 0.4s ease",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "white",
                                                fontWeight: "medium",
                                                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                                fontFamily: '"Playfair Display", serif',
                                            }}
                                        >
                                            {image.category}
                                        </Typography>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Modal para ver imagen ampliada */}
                <Modal
                    open={Boolean(selectedImage)}
                    onClose={handleCloseImage}
                    aria-labelledby="image-modal-title"
                    aria-describedby="image-modal-description"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <AnimatePresence mode="wait">
                        {selectedImage && (
                            <motion.div
                                key={selectedImage.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: "relative",
                                    maxWidth: "90vw",
                                    maxHeight: "90vh",
                                    outline: "none",
                                }}
                            >
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseImage}
                                    sx={{
                                        position: "absolute",
                                        top: -50,
                                        right: -10,
                                        color: "white",
                                        bgcolor: "rgba(0, 0, 0, 0.5)",
                                        "&:hover": {
                                            bgcolor: "rgba(0, 0, 0, 0.7)",
                                        },
                                        zIndex: 10,
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                <IconButton
                                    aria-label="previous image"
                                    onClick={handlePrevImage}
                                    sx={{
                                        position: "absolute",
                                        left: -25,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "white",
                                        bgcolor: "rgba(0, 0, 0, 0.5)",
                                        "&:hover": {
                                            bgcolor: "rgba(0, 0, 0, 0.7)",
                                        },
                                        zIndex: 10,
                                    }}
                                >
                                    <ArrowBackIosNewIcon />
                                </IconButton>

                                <Box
                                    sx={{
                                        position: "relative",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        boxShadow: (theme) => theme.shadows[5], // Example theme shadow
                                        border: (theme) => `5px solid ${theme.palette.background.paper}`, // Changed
                                    }}
                                >
                                    <img
                                        src={selectedImage.src || "/placeholder.svg"}
                                        alt={selectedImage.alt}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "80vh",
                                            display: "block",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            padding: "20px",
                                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "white",
                                                fontWeight: "medium",
                                                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                                fontFamily: '"Playfair Display", serif',
                                            }}
                                        >
                                            {selectedImage.category}
                                        </Typography>
                                    </Box>
                                </Box>

                                <IconButton
                                    aria-label="next image"
                                    onClick={handleNextImage}
                                    sx={{
                                        position: "absolute",
                                        right: -25,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "white",
                                        bgcolor: "rgba(0, 0, 0, 0.5)",
                                        "&:hover": {
                                            bgcolor: "rgba(0, 0, 0, 0.7)",
                                        },
                                        zIndex: 10,
                                    }}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Modal>
            </Container>
        </Box>
    )
}
