// src/App.tsx (Simplified)

import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import Navbar from "./components/Navbar";
import PageLoader from "./components/preloader";

// --- Lazy load pages ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function AppContent() {
  const location = useLocation();

  // --- Dynamic tab title effect (Keep this) ---
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "PinKi's Ice Cream Van | Home",
      "/about": "PinKi's Ice Cream Van | About",
      "/menu": "PinKi's Ice Cream Van | Menu",
      "/booking": "PinKi's Ice Cream Van | Booking",
    };

    document.title = titles[location.pathname] || "PinKi's Ice Cream Van";
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        {/* 1. The key={location.pathname} forces AnimatePresence to see a change.
          2. Suspense handles the loading of the *new* lazy-loaded chunk.
          3. The fallback is displayed until the chunk loads.
        */}
        <Suspense fallback={<PageLoader key="loader" />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}