"use client"

import { IconButton, Tooltip, useTheme } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { motion } from "framer-motion"

export default function ThemeToggle({ toggleColorMode, mode }) {
  const theme = useTheme()

  return (
    <Tooltip
      title={mode === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      arrow
      placement="bottom"
      enterDelay={500}
    >
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        sx={{
          position: "relative",
          overflow: "hidden",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
            transform: "scale(0)",
            transition: "transform 0.5s ease-out",
          },
          "&:hover::before": {
            transform: "scale(2)",
          },
        }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.5, type: "spring" }}
          key={mode} // Esto hace que la animación se reinicie cuando cambia el modo
        >
          {mode === "dark" ? <Brightness7Icon sx={{ color: theme.palette.common.white }} /> : <Brightness4Icon />}
        </motion.div>
      </IconButton>
    </Tooltip>
  )
}
