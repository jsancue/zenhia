import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

export default function LazyImage({ src, alt, sx, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // ← Cambiado de '' a null

  useEffect(() => {
    if (!src) return; // ← Evita comportamiento no deseado si src está vacío
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <>
      {!isLoaded && (
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{
            ...sx,
            bgcolor: 'rgba(0,0,0,0.1)',
          }}
        />
      )}
      {imageSrc && ( // ← Solo renderiza si hay src válido
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          sx={{
            ...sx,
            display: isLoaded ? 'block' : 'none',
            transition: 'opacity 0.3s ease',
          }}
          {...props}
        />
      )}
    </>
  );
}
