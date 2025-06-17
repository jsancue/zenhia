// src/App.jsx
"use client"

import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LanguageProvider } from "./contexts/LanguageContext";
import getAppTheme from "./theme";
import Navbar from "./components/Navbar";
// HeroSection is now part of HomePage
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollIndicator from "./components/ScrollIndicator";
import SkipLink from "./components/SkipLink";
import "./App.css";

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
// AdminPage is removed, new admin pages below

// Lazy load Admin components
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const BookingsCalendarPage = lazy(() => import('./pages/admin/BookingsCalendarPage'));
const ServicesManagementPage = lazy(() => import('./pages/admin/ServicesManagementPage'));
const InvoicesPage = lazy(() => import('./pages/admin/InvoicesPage'));

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

  return (
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
              <LoadingScreen />
          ) : (
              <BrowserRouter>
                <SkipLink />
                <ScrollIndicator />
                <Navbar toggleColorMode={toggleColorMode} mode={mode} />
                <main id="main-content">
                  <Suspense fallback={<MainContentFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/reservar" element={<BookingPage />} />
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="bookings" element={<BookingsCalendarPage />} />
                        <Route path="services" element={<ServicesManagementPage />} />
                        <Route path="invoices" element={<InvoicesPage />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <Suspense fallback={null}> {/* Fallback for widgets can be null or a very minimal spinner */}
                  <ChatAssistant />
                  <ReadingModeToggle />
                  <LoyaltyWidget />
                  <LiveActivityNotifications />
                </Suspense>
              </BrowserRouter>
          )}
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;
