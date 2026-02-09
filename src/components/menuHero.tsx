"use client";

// Added type imports for Framer Motion
import { motion, type Variants, type Transition } from "framer-motion";
// Removed unused 'React' import
import { UtensilsCrossed } from "lucide-react";

// --- Custom Styles (Unchanged) ---
const CustomStyles = () => (
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        
            .font-fredoka { font-family: 'Fredoka', sans-serif; }
            
            /* Colors harmonized with the Pinki's theme */
            .bg-brand-cream { background-color: #FDF8EE; }
            .text-brand-primary { color: #db2777; } /* Pink/Raspberry Glaze */
            .bg-brand-primary { background-color: #db2777; }
        
            /* Premium shadow for the main image */
            .shadow-hero {
                box-shadow: 0 40px 100px -30px rgba(0,0,0,0.3), 0 0 0 10px rgba(255, 255, 255, 0.8) inset;
            }

            /* Soft background shimmer effect */
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }

            .shimmer-bg {
                background-image: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.1) 20%,
                    rgba(255, 255, 255, 0.2) 60%,
                    rgba(255, 255, 255, 0) 100%
                );
                background-size: 200% 100%;
                animation: shimmer 10s infinite linear;
            }
        `}
    </style>
);

// --- Transition Definitions ---

const fadeTransition: Transition = { duration: 0.7, ease: "easeOut" };

const imageSlideTransition: Transition = { duration: 1.2, ease: [0.2, 0.8, 0.4, 1] };

const truckFloatTransition: Transition = { duration: 1.5, ease: "easeOut" };


// --- Animation presets (Now correctly typed as Variants) ---

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: fadeTransition },
};

const imageSlide: Variants = {
    hidden: { opacity: 0, x: 50, rotate: 2 },
    visible: { opacity: 1, x: 0, rotate: -3, transition: imageSlideTransition },
};

const truckFloat: Variants = {
    initial: { opacity: 0, y: 100 },
    // Changed 'animate' key to 'visible' if it's used within a parent container variant, 
    // but kept 'animate' and 'initial' for standalone use (as seen below).
    // The main error was the transition property inside the 'animate' state.
    animate: { opacity: 0.6, y: 0, transition: truckFloatTransition }, 
};

export default function MenuHero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-20 bg-brand-cream overflow-hidden">
            <CustomStyles />

            {/* Soft Gradient Background (Unchanged) */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-pink-100/70 to-pink-200/80 opacity-90" />
            
            {/* Background Ice Cream Pattern (Subtle) (Unchanged) */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23db2777' fill-opacity='0.1' d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Ice Cream Van — Softened & Blurred Behind */}
            <motion.img
                src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/newVan.png"
                alt="Ice Cream Van"
                loading="lazy"
                decoding="async"
                className="
                    absolute bottom-0 right-[-5%] lg:right-[0%] 
                    w-[240px] sm:w-[350px] md:w-[450px] lg:w-[550px] 
                    opacity-50 blur-[1px] 
                    pointer-events-none
                "
                variants={truckFloat}
                initial="initial"
                animate="animate"
            />

            {/* CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl w-full py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                
                {/* LEFT — TEXT */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="text-center md:text-left space-y-6"
                >
                    <motion.div variants={fadeUp} className="flex items-center justify-center md:justify-start">
                        <UtensilsCrossed className="h-7 w-7 text-brand-primary mr-3" />
                        <p className="text-lg font-fredoka font-medium text-brand-primary tracking-widest uppercase">
                            OUR DELIGHTFUL OFFERINGS
                        </p>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="
                            text-5xl sm:text-6xl lg:text-7xl 
                            font-fredoka font-extrabold leading-tight
                            text-brand-primary
                            drop-shadow-lg
                        "
                    >
                        Explore Our <br className="hidden md:inline"/>Delicious Menu
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-700 max-w-xl mx-auto md:mx-0 pt-2"
                    >
                        Discover freshly handcrafted soft-serve, specialty sundaes, and classic frozen treats — all made with Grandma Pinki’s secret recipes and served with a smile.
                    </motion.p>
                </motion.div>

                {/* RIGHT — IMAGE */}
                <motion.div
                    className="relative flex justify-center md:justify-end"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.img
                        src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/menu.png"
                        alt="Premium Ice Cream Showcase"
                        loading="lazy"
                        decoding="async"
                        className="
                            relative z-10 w-[85%] max-w-md rounded-3xl 
                            shadow-hero border-8 border-white 
                            object-cover aspect-[5/4]
                        "
                        variants={imageSlide}
                        // Correctly type the event object
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            // Use e.currentTarget to safely access element properties
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/menu.png";
                        }}
                    />
                    {/* Decorative background swirl (Unchanged) */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
                    <div className="absolute bottom-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}