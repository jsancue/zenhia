import React, { useState } from 'react';
import { 
  Box, 
  Fab, 
  Drawer, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Switch, 
  Slider, 
  FormControlLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CloseIcon from '@mui/icons-material/Close';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import ContrastIcon from '@mui/icons-material/Contrast';
import MotionPhotosOffIcon from '@mui/icons-material/MotionPhotosOff';

export default function AccessibilityWidget({ setFontSize, setHighContrast, setReducedMotion }) {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSizeLocal] = useState(100);
  const [contrast, setContrastLocal] = useState(false);
  const [reducedMotion, setReducedMotionLocal] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFontSizeChange = (event, newValue) => {
    setFontSizeLocal(newValue);
    setFontSize(newValue);
    // Save to localStorage
    localStorage.setItem('zenhia-fontSize', newValue);
  };

  const handleContrastChange = (event) => {
    setContrastLocal(event.target.checked);
    setHighContrast(event.target.checked);
    // Save to localStorage
    localStorage.setItem('zenhia-highContrast', event.target.checked);
  };

  const handleReducedMotionChange = (event) => {
    setReducedMotionLocal(event.target.checked);
    setReducedMotion(event.target.checked);
    // Save to localStorage
    localStorage.setItem('zenhia-reducedMotion', event.target.checked);
  };

  // Load preferences from localStorage on component mount
  React.useEffect(() => {
    const savedFontSize = localStorage.getItem('zenhia-fontSize');
    const savedHighContrast = localStorage.getItem('zenhia-highContrast') === 'true';
    const savedReducedMotion = localStorage.getItem('zenhia-reducedMotion') === 'true';
    
    if (savedFontSize) {
      setFontSizeLocal(Number(savedFontSize));
      setFontSize(Number(savedFontSize));
    }
    
    if (savedHighContrast !== null) {
      setContrastLocal(savedHighContrast);
      setHighContrast(savedHighContrast);
    }
    
    if (savedReducedMotion !== null) {
      setReducedMotionLocal(savedReducedMotion);
      setReducedMotion(savedReducedMotion);
    }
  }, []);

  return (
    <>
      <Tooltip title="Opciones de accesibilidad" aria-label="opciones de accesibilidad">
        <Fab
          color="primary"
          aria-label="opciones de accesibilidad"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
          onClick={() => toggleDrawer(true)}
        >
          <AccessibilityNewIcon />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">Opciones de Accesibilidad</Typography>
          <IconButton onClick={() => toggleDrawer(false)} aria-label="cerrar panel de accesibilidad">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem>
            <ListItemText 
              primary="Tamaño del texto" 
              secondary="Ajusta el tamaño del texto para mejorar la legibilidad"
            />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 2 }}>
              <TextDecreaseIcon sx={{ mr: 2 }} />
              <Slider
                value={fontSize}
                onChange={handleFontSizeChange}
                aria-labelledby="font-size-slider"
                step={10}
                marks
                min={80}
                max={150}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
              <TextIncreaseIcon sx={{ ml: 2 }} />
            </Box>
          </ListItem>

          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={contrast}
                  onChange={handleContrastChange}
                  name="contrast"
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ContrastIcon sx={{ mr: 1 }} />
                  <Typography>Alto contraste</Typography>
                </Box>
              }
            />
          </ListItem>

          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={reducedMotion}
                  onChange={handleReducedMotionChange}
                  name="reducedMotion"
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MotionPhotosOffIcon sx={{ mr: 1 }} />
                  <Typography>Reducir animaciones</Typography>
                </Box>
              }
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          Estas preferencias se guardarán para tus próximas visitas.
        </Typography>
      </Drawer>
    </>
  );
}