// src/App.jsx
"use client"

import { useState, useEffect, lazy, Suspense } from "react"; // Added lazy, Suspense
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from '@mui/material/CircularProgress'; // For Suspense fallback
import Box from '@mui/material/Box'; // For centering fallback
import { LanguageProvider } from "./contexts/LanguageContext";
import getAppTheme from "./theme";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen"; // Keep for initial load
import ScrollIndicator from "./components/ScrollIndicator";
import SkipLink from "./components/SkipLink";
import "./App.css";

// Lazy load sections
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const BookingSection = lazy(() => import('./components/BookingSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// Lazy load floating widgets
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const ReadingModeToggle = lazy(() => import('./components/ReadingModeToggle'));
const LoyaltyWidget = lazy(() => import('./components/LoyaltyWidget'));
const LiveActivityNotifications = lazy(() => import('./components/LiveActivityNotifications'));

const MainContentFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </Box>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("zenhia-theme-mode");
      return savedMode || "light";
    }
    return "light";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(mode === 'dark' ? 'dark-theme' : 'light-theme');
  }, [mode]);

  useEffect(() => {
    // Ensure class is set on initial mount
    document.body.classList.add(mode === 'dark' ? 'dark-theme' : 'light-theme');
  }, []); // Empty dependency array means this runs once on mount

  const theme = getAppTheme(mode);

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("zenhia-theme-mode", newMode);
    }
  };

  // No longer return LoadingScreen early here.
  // if (loading) {
  //  return <LoadingScreen />;
  // }

  return (
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
              <LoadingScreen />
          ) : (
              <> {/* Fragment for main app content */}
                <SkipLink />
                <ScrollIndicator />
                <Navbar toggleColorMode={toggleColorMode} mode={mode} />
                <main id="main-content">
                  <HeroSection />
                  <Suspense fallback={<MainContentFallback />}>
                    <ServicesSection />
                    <AboutSection />
                    <GallerySection />
                    <TestimonialsSection />
                    <BookingSection />
                    <ContactSection />
                  </Suspense>
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <ChatAssistant />
                  <ReadingModeToggle />
                  <LoyaltyWidget />
                  <LiveActivityNotifications />
                </Suspense>
              </>
          )}
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;
