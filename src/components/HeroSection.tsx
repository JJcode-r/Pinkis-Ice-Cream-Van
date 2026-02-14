import { motion, type Variants, type Transition } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const FALLBACK_IMAGE_URL =
  "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/pinkisVan.webp";

// --- Animation Configs ---
const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
};

const buttonPulseTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut" as const,
  repeatType: "reverse",
};

const truckEntranceTransition: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 15,
  delay: 0.8,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

interface MeltButtonProps {
  pulseTransition: Transition;
}

const MeltButton = ({ pulseTransition }: MeltButtonProps) => {
  return (
    <div className="group relative flex flex-col items-center w-full sm:w-auto">
      <motion.a
        href="/booking#booking-form"
        role="button"
        className="relative z-20 w-full sm:w-auto px-9 py-4 text-center text-base sm:text-lg rounded-full bg-pink-600 text-white font-bold shadow-xl shadow-pink-500/40 hover:bg-pink-700 transition duration-300"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: [1, 1.02, 1],
          transition: pulseTransition,
        }}
      >
        Book Your Date
      </motion.a>

      <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-[85%] h-[60px] pointer-events-none z-10 overflow-hidden hidden sm:block">
        <div 
          className="w-full h-0 bg-[#db2777] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-x-[0.9] group-hover:h-[45px] group-hover:scale-x-100" 
          style={{
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0 0h200v15c0 8-8 25-25 25s-20-15-25-25-10-15-25-15-15 15-25 25-15 35-35 35-15-20-25-35S25 0 0 0z'/%3E%3C/svg%3E")`,
            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0 0h200v15c0 8-8 25-25 25s-20-15-25-25-10-15-25-15-15 15-25 25-15 35-35 35-15-20-25-35S25 0 0 0z'/%3E%3C/svg%3E")`,
            WebkitMaskSize: '100% 60px',
            maskSize: '100% 60px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
          }} 
        />
      </div>
    </div>
  );
};

const DripBottom = () => (
  <svg
    className="absolute bottom-0 left-0 w-full text-white z-10"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
    fill="currentColor"
  >
    <path d="M0,50 C240,10 480,90 720,50 C960,10 1200,90 1440,50 L1440,100 L0,100 Z" />
  </svg>
);

export default function App() {
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Timer to check if video has played after 30 seconds
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        setShowFallback(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Background Layer (Fallback) - Only visible if showFallback is true */}
      {showFallback && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${FALLBACK_IMAGE_URL})` }}
        />
      )}
      
      {/* Video Content */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        onPlay={() => setShowFallback(false)}
        className="absolute w-full h-full object-cover transition-opacity duration-1000 pointer-events-none z-0"
      >
        <source
          src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/HeroVideo.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-[#0f172a]/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/60 via-transparent to-[#0f172a]/60 z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Hero Content */}
      <motion.div
        className="relative z-30 w-full max-w-5xl px-6 pb-32 pt-32 md:pt-48 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            A Premium Ice Cream Van for
            <span className="block text-pink-300 mt-2 tracking-normal">
                Every Occasion
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl mt-6 mb-10 text-white max-w-2xl mx-auto drop-shadow-md font-medium px-4 leading-relaxed opacity-90"
          >
            Serving community spaces, school events, workplaces and school fundraisers with crowd-pleasing ice cream treats and a seamless set-up. 
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none"
          >
            <MeltButton pulseTransition={buttonPulseTransition} />

            <motion.a
              href="/menu"
              className="w-full sm:w-auto px-10 py-4 text-center text-lg rounded-full border-2 border-pink-600 bg-white text-pink-600 font-extrabold shadow-lg hover:bg-pink-50 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🍦 View the Menu
            </motion.a>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            variants={itemVariants}
            className="relative mt-12 md:mt-16 inline-flex items-center justify-center w-full px-4"
          >
            <div className="absolute inset-x-8 inset-y-0 rounded-full blur-3xl bg-pink-500/20" />

            <div className="relative flex flex-col md:flex-row items-center gap-3 md:gap-5 px-6 py-4 md:px-8 md:py-3.5 rounded-2xl md:rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] shadow-sm font-bold">
                  ✓
                </div>
                <span className="text-pink-300 font-black tracking-widest uppercase text-[10px] md:text-[11px] whitespace-nowrap">
                  Trusted
                </span>
              </div>
              
              <div className="hidden md:block w-px h-5 bg-white/30" />

              <span className="text-sm md:text-base text-white font-semibold text-center">
                by community spaces & events across Australia
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ice Cream Van Image */}
      <div className="absolute bottom-[-20px] md:bottom-[-40px] right-0 z-20 pointer-events-none px-4 sm:px-8">
        <motion.img
          src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/newVan.png"
          alt="Ice Cream Van"
          initial={{ x: 600, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={truckEntranceTransition}
          className="w-[220px] sm:w-[380px] md:w-[500px] lg:w-[650px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        />
      </div>

      <DripBottom />
    </section>
  );
}