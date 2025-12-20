import { motion, type Variants, type Transition } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Fallback Image URL (Unchanged)
const FALLBACK_IMAGE_URL = 'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photok1.jpg'; 

// --- Framer Motion Transition Definitions ---

// Explicitly define the spring transition to satisfy TypeScript
const springTransition: Transition = { 
    type: "spring", 
    stiffness: 100, 
    damping: 12 
};

// Explicitly define the button pulse animation transition
const buttonPulseTransition: Transition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut", // 'easeInOut' is a valid string for Transition
    repeatType: "reverse"
};

const truckEntranceTransition: Transition = { 
    type: "spring", 
    stiffness: 60, 
    damping: 15, 
    delay: 0.8 
};

// --- Framer Motion Variants (Now correctly typed using 'Variants') ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition // Use the typed object
    }
};

// Drip SVG Separator Component (Unchanged)
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

export default function HeroSection() {
    // Lazy-load the floating ice cream cone (Unchanged)
    const [coneLoaded, setConeLoaded] = useState(false);
    // Explicitly type the useRef hook for an HTMLImageElement
    const coneRef = useRef<HTMLImageElement>(null); 

    useEffect(() => {
        const img = coneRef.current;
        if (!img) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setConeLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(img);
        return () => observer.disconnect();
    }, []);


    return (
        <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-white">

            {/* 1. FALLBACK IMAGE CONTAINER */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-black" 
                style={{ backgroundImage: `url(${FALLBACK_IMAGE_URL})` }}
            />

            {/* 2. Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute w-full h-full object-cover opacity-70 transition-opacity duration-1000"
            >
                <source src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/HeroVideo.mp4" type="video/mp4" />
            </video>

            {/* 3. Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Floating Ice Cream Cone */}
            {coneLoaded && (
                <motion.img
                    ref={coneRef}
                    src="/images/ice-cream-cone.webp"
                    alt="Floating Ice Cream Cone"
                    initial={{ y: -50, rotate: 10 }}
                    animate={{ y: 0, rotate: -5 }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }}
                    className="absolute top-1/4 left-5 md:left-1/4 w-24 h-24 object-contain z-25 opacity-90 hidden lg:block"
                />
            )}

            {/* Content */}
            <motion.div
                className="relative z-30 w-[95%] max-w-5xl px-4 py-8 pt-28 md:pt-36 lg:pt-24 md:p-16 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1 }}
            >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] drop-shadow-lg"
                    >
                        Bring the Viral Joy:
                        <span className="block text-pink-300 -mt-1">
                            Book Pinki&apos;s Classic Ice Cream Van.
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl mt-5 mb-8 text-gray-100 max-w-3xl mx-auto drop-shadow-md"
                    >
                        We deliver the iconic charm, gourmet small-batch treats, and our
                        Always On-Time Sweet Guarantee directly to your party or corporate
                        event.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                    >
                        <motion.a
                            href="/booking"
                            role="button"
                            className="px-10 py-3 text-lg rounded-full bg-pink-600 text-white font-extrabold shadow-xl shadow-pink-500/50 hover:bg-pink-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: [1, 1.02, 1],
                                transition: buttonPulseTransition, // Used the typed object
                            }}
                        >
                            Book Us for Your Event 🍦
                        </motion.a>

                        <motion.a
                            href="/menu"
                            role="button"
                            className="px-10 py-3 text-lg rounded-full border-2 border-pink-600 bg-white text-pink-600 font-extrabold shadow-lg hover:bg-pink-50 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🍦 Explore our Menu
                        </motion.a>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Ice Cream Truck */}
            <motion.img
                src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/truck_proto1.png"
                alt="Ice Cream Van"
                loading="lazy"
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={truckEntranceTransition} // Used the typed object
                className="absolute bottom-[-50px] right-[-100px] w-[300px] sm:w-[450px] md:w-[500px] lg:w-[650px] z-20 drop-shadow-2xl"
            />

            <DripBottom />
        </section>
    );
}