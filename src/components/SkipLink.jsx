import { Box } from "@mui/material"

export default function SkipLink() {
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: "absolute",
        top: -40,
        left: 0,
        p: 2,
        bgcolor: "primary.main",
        color: "white",
        zIndex: 2000,
        transition: "top 0.2s ease",
        "&:focus": {
          top: 0,
        },
      }}
    >
      Saltar al contenido principal
    </Box>
  )
}
