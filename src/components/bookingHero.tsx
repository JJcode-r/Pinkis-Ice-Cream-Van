"use client";

import { lazy, Suspense, type SyntheticEvent } from 'react'; 
import { motion, type Variants, type Transition } from 'framer-motion'; 
import { CalendarHeart, ArrowDown } from 'lucide-react';

// Lazy-load Sparkles icon
const Sparkles = lazy(() => import('lucide-react').then(mod => ({ default: mod.Sparkles })));

// --- Custom Styles ---
const CustomStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
        .shadow-2xl-strong { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .bg-brand-cream { background-color: #FDF8EE; }
        .text-brand-primary { color: #db2777; }
        .bg-brand-primary { background-color: #db2777; }
        .text-brand-dark { color: #5B2C00; }
        .bg-brand-accent { background-color: #FFD7A5; }
        .button-press-effect:active { transform: translateY(2px); box-shadow: 0 2px 0 0 rgba(0,0,0,0.1); }
        .submit-button-hover:hover { background-color: #c01e63; box-shadow: 0 12px 20px -5px rgba(219, 39, 119, 0.7) !important; }
    `}</style>
);

const containerVariants: Variants = { 
    hidden: { opacity: 0 }, 
    visible: { 
        opacity: 1, 
        transition: { delayChildren: 0.2, staggerChildren: 0.15 } 
    } 
};

const itemVariants: Variants = { 
    hidden: { opacity: 0, y: 30 }, 
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.7, 
            ease: "easeOut" 
        } as Transition 
    } 
};

export default function BookingHero() {
    // --- Optimized Scroll Logic ---
    const scrollToForm = () => {
        const formSection = document.getElementById('booking-form');
        if (formSection) {
            // Precise offset calculation for a professional landing
            const yOffset = -100; 
            const y = formSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full min-h-[90dvh] flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 bg-brand-cream">
            <CustomStyles />

            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 z-0 opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.img
                src="/images/ice-cream-cone.webp"
                alt="Floating Ice Cream Icon"
                className="absolute top-10 left-10 md:left-32 w-16 h-16 md:w-20 md:h-20 opacity-30 z-0 object-contain"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-7xl w-full py-20 grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT TEXT BLOCK */}
                <motion.div className="text-center lg:text-left space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/60 border border-brand-primary/20 backdrop-blur-sm text-brand-primary font-fredoka font-medium text-sm tracking-wide shadow-sm">
                            <CalendarHeart className="h-4 w-4 mr-2" />
                            OFFICIAL BOOKINGS
                        </span>
                    </motion.div>

                    <motion.h1 
                        className="text-5xl sm:text-6xl lg:text-7xl font-fredoka font-extrabold leading-[1.1] text-brand-primary drop-shadow-[0_4px_10px_rgba(219,39,119,0.3)] max-w-full whitespace-normal" 
                        variants={itemVariants}
                    >
                        Make Your Next Event <br />
                        <span className="text-brand-dark text-4xl sm:text-6xl lg:text-7xl">
                            Unforgettable.
                        </span>
                    </motion.h1>

                    <motion.p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed" variants={itemVariants}>
                        Pinki’s brings professional service, vintage charm, and the sweetest soft-serve directly to your organization's next big day.
                    </motion.p>

                    <motion.div variants={itemVariants} className="pt-4">
                        {/* CHANGED: Better Button Text & Action */}
                        <button 
                            onClick={scrollToForm} 
                            className="flex items-center justify-center mx-auto lg:mx-0 px-12 py-5 bg-brand-primary text-white font-fredoka font-bold text-2xl rounded-full shadow-xl submit-button-hover transition-all button-press-effect"
                        >
                            Start Your Booking
                            <ArrowDown className="ml-3 h-6 w-6 animate-bounce" />
                        </button>
                        <p className="mt-4 text-sm text-gray-500 font-fredoka">
                            * Perfect for Schools, Corporations & Community Festivals.
                        </p>
                    </motion.div>
                </motion.div>

                {/* RIGHT IMAGE BLOCK */}
                <motion.div className="relative flex justify-center lg:justify-end min-h-[400px] lg:h-[600px] items-center" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
                    
                    <motion.div className="absolute right-0 top-10 w-3/4 h-3/4 rounded-[3rem] bg-brand-accent shadow-xl rotate-6" initial={{ scale: 0.8, rotate: 0 }} animate={{ scale: 1, rotate: 6 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }} />

                    <motion.img
                        src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo9.jpg"
                        alt="Pinki's Ice Cream Van at a Party"
                        className="relative z-10 w-[85%] max-w-md lg:max-w-lg rounded-[2.5rem] shadow-2xl-strong border-8 border-white object-cover aspect-[4/5]"
                        loading="lazy"
                        decoding="async"
                        initial={{ y: 20, rotate: -2 }}
                        animate={{ y: 0, rotate: -3 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
                        onError={(e: SyntheticEvent<HTMLImageElement>) => { 
                            (e.target as HTMLImageElement).onerror = null; 
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x700/db2777/FDF8EE?text=Party+Event+Photo"; 
                        }}
                    />

                    <Suspense fallback={null}>
                        <motion.div className="absolute bottom-10 left-0 md:left-10 z-20 bg-white p-5 rounded-2xl shadow-xl border-4 border-brand-primary" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", delay: 1, stiffness: 120 }}>
                            <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => <Sparkles key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="font-fredoka font-bold text-brand-primary text-sm">"Professional & Reliable"</p>
                        </motion.div>
                    </Suspense>
                </motion.div>

            </div>
        </section>
    );
}