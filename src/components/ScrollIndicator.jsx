"use client"

import { useState, useEffect } from "react"
import { Box, Fab, Zoom, useTheme } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

export default function ScrollIndicator() {
    const [progress, setProgress] = useState(0)
    const [showButton, setShowButton] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPosition = window.scrollY
            const calculatedProgress = (scrollPosition / totalHeight) * 100

            setProgress(calculatedProgress)
            setShowButton(scrollPosition > 300)

            // Detectar si está scrolleando activamente
            setIsScrolling(true)
            clearTimeout(window.scrollTimeout)
            window.scrollTimeout = setTimeout(() => {
                setIsScrolling(false)
            }, 150)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            clearTimeout(window.scrollTimeout)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    zIndex: 2000,
                    opacity: isScrolling ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: `${progress}%`,
                        background: theme.palette.accent.main,
                        transition: "width 0.2s ease",
                        borderRadius: "0 2px 2px 0",
                        boxShadow: (theme) => isScrolling ? theme.shadows[1] : "none",
                    }}
                />
            </Box>

            <Zoom in={showButton}>
                <Fab
                    color="primary"
                    size="small"
                    aria-label="scroll back to top"
                    onClick={scrollToTop}
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(12), // 12 * 8px = 96px. Or directly 96.
                        right: 24,
                        zIndex: 1000,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        boxShadow: (theme) => theme.shadows[2],
                        "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: (theme) => theme.shadows[4],
                        },
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Zoom>
        </>
    )
}