"use client";

// FIX 1: Remove unused 'React' import. 
// FIX 2: Import { SyntheticEvent, HTMLImageElement } for correct typing.
import { useState, useEffect, type SyntheticEvent } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const IMAGE_URL = "/images/ice-cream-cone-About.png";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader whenever route changes
    setLoading(true);

    // Give a minimum display time for smoothness
    const timeout = setTimeout(() => setLoading(false), 700);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 bg-[#FFF7FA] flex flex-col items-center justify-center z-[100]"
        >
          <motion.img
            src={IMAGE_URL}
            alt="Loading Ice Cream Cone"
            className="w-24 h-auto object-contain shadow-lg rounded-xl"
            animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            // FIX 3: Type the event and cast e.target to HTMLImageElement
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "https://placehold.co/100x120/8B0040/FFFFFF?text=🍦";
            }}
          />
          <motion.p
            className="mt-8 text-[#8B0040] font-fredoka text-2xl font-bold tracking-wider"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            Scooping up the fun...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}