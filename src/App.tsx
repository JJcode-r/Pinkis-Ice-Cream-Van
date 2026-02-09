// src/App.tsx (Simplified)

import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import Navbar from "./components/Navbar";
import PageLoader from "./components/preloader";

// --- Lazy load pages ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const EVentsPage = lazy(() => import("./pages/EventsPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Footer = lazy(() => import("./components/footer"));
const InquiryFloatingWidget = lazy(() => import("./components/inquiry"));
function AppContent() {
  const location = useLocation();

  // --- Dynamic tab title effect (Keep this) ---
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "PinKi's Ice Cream Van | Home",
      "/about": "PinKi's Ice Cream Van | About",
      "/events": "PinKi's Ice Cream Van | Events & Fundraising",
      "/menu": "PinKi's Ice Cream Van | Menu",
      "/booking": "PinKi's Ice Cream Van | Booking",
    };

    document.title = titles[location.pathname] || "PinKi's Ice Cream Van";
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      

      <AnimatePresence mode="wait">
       
        <Suspense fallback={<PageLoader key="loader" />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EVentsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <InquiryFloatingWidget />
      <Footer />
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