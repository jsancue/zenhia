// src/components/LazyImage.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Box, Skeleton } from '@mui/material';

export default function LazyImage({ src, alt, sx, threshold = 0.1, ...props }) { // Added threshold prop
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isInView, setIsInView] = useState(false); // State to track visibility
  const imgRef = useRef(null); // Ref for the placeholder/image container

  useEffect(() => {
    if (!src) return;
    if (!isInView) return; // Only load if in view

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // Optional: Handle image load error, e.g., set a fallback or hide
      console.error(`Failed to load image: ${src}`);
      // setIsLoaded(true); // Potentially treat error as "loaded" to remove skeleton
    };
  }, [src, isInView]); // Depend on isInView

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (imgRef.current) {
              observer.unobserve(imgRef.current); // Unobserve after it's in view
            }
          }
        },
        {
          rootMargin: '0px', // Can be adjusted, e.g., '100px' to load when 100px away
          threshold: threshold, // Percentage of visibility
        }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [threshold]); // Re-run if threshold changes

  // Render skeleton if not in view yet OR if in view but not loaded
  const showSkeleton = !isInView || (isInView && !isLoaded);

  return (
      <Box ref={imgRef} sx={{ ...sx, position: 'relative', overflow: 'hidden' }}> {/* Ensure ref is on a DOM element */}
        {showSkeleton && (
            <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  width: '100%', // Ensure skeleton takes up space
                  height: '100%', // Ensure skeleton takes up space
                  position: isLoaded ? 'absolute' : 'relative', // Adjust based on need
                  bgcolor: 'rgba(0,0,0,0.1)',
                  ...sx // Apply sx to skeleton as well for dimensions
                }}
            />
        )}
        {isInView && imageSrc && ( // Only render img tag if in view and src is set
            (<Box
                component="img"
                src={imageSrc}
                alt={alt}
                sx={{
                  ...sx, // Original sx for dimensions and styling
                  display: isLoaded ? 'block' : 'none',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out', // Smoother transition
                  width: '100%', // Ensure image fills container
                  height: '100%',// Ensure image fills container
                  objectFit: sx?.objectFit || 'cover', // Default object-fit
                }}
                {...props}
            />)
        )}
      </Box>
  );
}
