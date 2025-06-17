"use client"

import { useState, useEffect, useContext } from "react"
import {
    Fab,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    LinearProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    IconButton,
    Collapse, // Import Collapse
} from "@mui/material"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import StarIcon from "@mui/icons-material/Star"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import EventIcon from "@mui/icons-material/Event"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { LanguageContext } from "../contexts/LanguageContext"

// Datos simulados de fidelización
const mockLoyaltyData = {
    points: 350,
    level: "Plata",
    nextLevel: "Oro",
    pointsToNextLevel: 150,
    totalPointsForNextLevel: 500,
    history: [
        { id: 1, date: "2023-10-15", description: "Tratamiento facial", points: 55 },
        { id: 2, date: "2023-09-28", description: "Corte de pelo", points: 35 },
        { id: 3, date: "2023-09-10", description: "Coloración", points: 65 },
        { id: 4, date: "2023-08-22", description: "Bono de referido", points: 100 },
        { id: 5, date: "2023-08-05", description: "Manicura", points: 25 },
        { id: 6, date: "2023-07-20", description: "Pedicura", points: 30 },
        { id: 7, date: "2023-07-01", description: "Tratamiento corporal", points: 60 },
    ],
    rewards: [
        { id: 1, name: "10% de descuento", points: 200, claimed: true },
        { id: 2, name: "Tratamiento facial gratis", points: 500, claimed: false },
        { id: 3, name: "Sesión de manicura", points: 300, claimed: false },
        { id: 4, name: "Masaje de 30 minutos", points: 400, claimed: false },
        { id: 5, name: "Kit de productos", points: 600, claimed: false },
    ],
}

// Niveles de fidelización
const loyaltyLevels = {
    Bronce: { min: 0, max: 299, color: "#CD7F32" },
    Plata: { min: 300, max: 499, color: "#C0C0C0" },
    Oro: { min: 500, max: 799, color: "#FFD700" },
    Platino: { min: 800, max: Number.POSITIVE_INFINITY, color: "#E5E4E2" },
}

export default function LoyaltyWidget() {
    const [open, setOpen] = useState(false)
    const [loyaltyData, setLoyaltyData] = useState(mockLoyaltyData)
    const [activeTab, setActiveTab] = useState("points")
    const [expandHistory, setExpandHistory] = useState(false)
    const { language } = useContext(LanguageContext)

    const translations = {
        es: {
            tooltip: "Programa de fidelización",
            title: "Tu programa de fidelización",
            points: "Puntos",
            level: "Nivel",
            nextLevel: "Siguiente nivel",
            pointsToNextLevel: "Puntos para el siguiente nivel",
            history: "Historial",
            rewards: "Recompensas",
            claim: "Reclamar",
            claimed: "Reclamado",
            close: "Cerrar",
            showMore: "Ver más",
            showLess: "Ver menos",
            pointsLabel: "puntos",
            date: "Fecha",
            description: "Descripción",
            earned: "Ganados",
        },
        en: {
            tooltip: "Loyalty program",
            title: "Your loyalty program",
            points: "Points",
            level: "Level",
            nextLevel: "Next level",
            pointsToNextLevel: "Points to next level",
            history: "History",
            rewards: "Rewards",
            claim: "Claim",
            claimed: "Claimed",
            close: "Close",
            showMore: "Show more",
            showLess: "Show less",
            pointsLabel: "points",
            date: "Date",
            description: "Description",
            earned: "Earned",
        },
    }

    const text = translations[language]

    useEffect(() => {
        // Aquí se podría cargar los datos reales del usuario desde una API
        // Por ahora usamos datos simulados
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const handleClaimReward = (rewardId) => {
        // Simulación de reclamar recompensa
        setLoyaltyData((prev) => ({
            ...prev,
            points: prev.points - prev.rewards.find((r) => r.id === rewardId).points,
            rewards: prev.rewards.map((reward) => (reward.id === rewardId ? { ...reward, claimed: true } : reward)),
        }))
    }

    const toggleExpandHistory = () => {
        setExpandHistory(!expandHistory)
    }

    // Formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Calcular el progreso hacia el siguiente nivel
    const progress =
        ((loyaltyData.points - loyaltyLevels[loyaltyData.level].min) /
            (loyaltyLevels[loyaltyData.nextLevel].min - loyaltyLevels[loyaltyData.level].min)) *
        100

    return (
        <>
            <Tooltip title={text.tooltip} placement="left">
                <Fab
                    size="medium"
                    color="secondary"
                    aria-label="loyalty program"
                    onClick={handleOpen}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 168,
                        zIndex: 1000,
                        bgcolor: loyaltyLevels[loyaltyData.level].color,
                        color: loyaltyData.level === "Oro" || loyaltyData.level === "Platino" ? "#000" : "#fff",
                        "&:hover": {
                            bgcolor: loyaltyLevels[loyaltyData.level].color,
                            filter: "brightness(0.9)",
                        },
                    }}
                >
                    <CardGiftcardIcon />
                </Fab>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        bgcolor: "primary.main",
                        color: (theme) => theme.palette.primary.contrastText, // Changed
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {text.title}
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    {/* Resumen de puntos */}
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            {loyaltyData.points}
                            <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 1 }}>
                                {text.pointsLabel}
                            </Typography>
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                            <Chip
                                label={loyaltyData.level}
                                sx={{
                                    bgcolor: loyaltyLevels[loyaltyData.level].color,
                                    color: loyaltyData.level === "Oro" || loyaltyData.level === "Platino" ? "#000" : "#fff",
                                    fontWeight: "bold",
                                }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                                →
                            </Typography>
                            <Chip
                                label={loyaltyData.nextLevel}
                                variant="outlined"
                                sx={{
                                    borderColor: loyaltyLevels[loyaltyData.nextLevel].color,
                                    color: "text.primary",
                                }}
                            />
                        </Box>

                        <Box sx={{ px: 2 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    mb: 1,
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: loyaltyLevels[loyaltyData.nextLevel].color,
                                    },
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {text.pointsToNextLevel}: {loyaltyData.pointsToNextLevel} {text.pointsLabel}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Pestañas */}
                    <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}>
                        <Button
                            sx={{
                                flexGrow: 1,
                                py: 1.5,
                                borderRadius: 0,
                                borderBottom: activeTab === "history" ? 2 : 0,
                                borderColor: "primary.main",
                                color: activeTab === "history" ? "primary.main" : "text.secondary",
                            }}
                            onClick={() => handleTabChange("history")}
                            startIcon={<EventIcon />}
                        >
                            {text.history}
                        </Button>
                        <Button
                            sx={{
                                flexGrow: 1,
                                py: 1.5,
                                borderRadius: 0,
                                borderBottom: activeTab === "rewards" ? 2 : 0,
                                borderColor: "primary.main",
                                color: activeTab === "rewards" ? "primary.main" : "text.secondary",
                            }}
                            onClick={() => handleTabChange("rewards")}
                            startIcon={<LocalOfferIcon />}
                        >
                            {text.rewards}
                        </Button>
                    </Box>

                    {/* Contenido de pestañas */}
                    <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                        {activeTab === "history" && (
                            <List disablePadding> {/* Added disablePadding for better Collapse integration */}
                                <ListItem sx={{ bgcolor: "action.hover" }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex" }}>
                                                <Typography variant="body2" sx={{ width: "30%", fontWeight: "bold" }}>
                                                    {text.date}
                                                </Typography>
                                                <Typography variant="body2" sx={{ width: "50%", fontWeight: "bold" }}>
                                                    {text.description}
                                                </Typography>
                                                <Typography variant="body2" sx={{ width: "20%", fontWeight: "bold", textAlign: "right" }}>
                                                    {text.earned}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {/* Always render the first few items */}
                                {loyaltyData.history.slice(0, 3).map((item) => (
                                    <ListItem key={item.id} divider>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: "flex" }}>
                                                    <Typography variant="body2" sx={{ width: "30%" }}>
                                                        {formatDate(item.date)}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ width: "50%" }}>
                                                        {item.description}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ width: "20%", textAlign: "right", fontWeight: "bold" }}>
                                                        +{item.points}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                                {/* Conditionally render the rest within Collapse */}
                                {loyaltyData.history.length > 3 && (
                                    <>
                                        <Collapse in={expandHistory} timeout="auto" unmountOnExit>
                                            <List disablePadding component="div"> {/* component="div" for proper nesting */}
                                                {loyaltyData.history.slice(3).map((item) => (
                                                    <ListItem key={item.id} divider>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{ display: "flex" }}>
                                                                    <Typography variant="body2" sx={{ width: "30%" }}>
                                                                        {formatDate(item.date)}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{ width: "50%" }}>
                                                                        {item.description}
                                                                    </Typography>
                                                                    <Typography variant="body2" sx={{ width: "20%", textAlign: "right", fontWeight: "bold" }}>
                                                                        +{item.points}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                        <ListItem button onClick={toggleExpandHistory}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2" color="primary" sx={{ textAlign: "center" }}>
                                                        {expandHistory ? text.showLess : text.showMore}
                                                    </Typography>
                                                }
                                            />
                                            {expandHistory ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        )}

                        {activeTab === "rewards" && (
                            <List>
                                {loyaltyData.rewards.map((reward) => (
                                    <ListItem key={reward.id} divider>
                                        <ListItemIcon>
                                            <StarIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={reward.name} secondary={`${reward.points} ${text.pointsLabel}`} />
                                        {reward.claimed ? (
                                            <Chip label={text.claimed} size="small" color="success" />
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                disabled={loyaltyData.points < reward.points}
                                                onClick={() => handleClaimReward(reward.id)}
                                            >
                                                {text.claim}
                                            </Button>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} color="primary">
                        {text.close}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
