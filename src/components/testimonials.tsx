"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "Our annual School Carnival has never been easier. Pinki's handled over 400 students with incredible speed, and the percentage donated back was fantastic!",
        name: "Principal Mark S.",
        title: "Primary School Fundraiser",
        color: "bg-pink-50/90",
        border: "border-pink-200"
    },
    {
        id: 2,
        quote: "We booked Pinki's for our Corporate Staff Appreciation Day. The truck was spotless, professional, and the 'Upfront' package made the accounting seamless.",
        name: "Jennifer W.",
        title: "HR Director, Global Logistics",
        color: "bg-blue-50/90",
        border: "border-blue-200"
    },
    {
        id: 3,
        quote: "Absolute lifesavers for our Sports Club Finals! Arrived exactly on time, required zero power setup, and kept the crowd happy through the heat.",
        name: "Coach Dave",
        title: "Junior Football League",
        color: "bg-yellow-50/90",
        border: "border-yellow-200"
    },
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    // HEADING ANIMATION VARIANTS
    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        visible: (dir: 'left' | 'right') => ({ 
            opacity: 1, 
            x: isDesktop ? (dir === 'left' ? -60 : 60) : 0, 
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition,
        }),
    };

    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.2, rotate: -45 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 80, damping: 12 } as Transition,
        },
    };

    // CAROUSEL SLIDE VARIANTS
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section id="testimonials" className="relative pt-16 lg:pt-32 pb-24 bg-white overflow-hidden flex flex-col items-center">
            <style>{`
                .font-fredoka { font-family: 'Fredoka', sans-serif; }
                .shadow-3xl { box-shadow: 0 30px 60px -12px rgba(219, 39, 119, 0.25); }
                .truck-mask {
                    mask-image: linear-gradient(to top, black 75%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to top, black 75%, transparent 100%);
                }
            `}</style>
            
            {/* BG TRUCK - Positioned to sit behind cards */}
            <motion.div
                className="absolute bottom-16 -right-10 w-full lg:w-2/3 flex justify-center lg:justify-end items-end z-0 pointer-events-none opacity-25 lg:opacity-60 truck-mask"
                initial={{ opacity: 0, x: 100, y: 50 }}
                whileInView={{ opacity: 0.6, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut" }}
            >
                <img 
                    src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/truck_proto1.png" 
                    alt="Pinki's Ice Cream Van"
                    className="w-full max-w-2xl lg:max-w-4xl h-auto object-contain"
                />
            </motion.div>

            {/* ENTRANCE ANIMATED HEADING */}
            <div className="mx-auto max-w-7xl px-4 relative z-10 w-full mb-8 text-center">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.2 } as Transition}
                    className="flex flex-wrap items-center justify-center font-fredoka font-extrabold text-pink-600 mb-4 gap-2 md:gap-0"
                >
                    <motion.span
                        variants={splitTextVariants}
                        custom="left"
                        className="text-3xl sm:text-5xl lg:text-6xl uppercase leading-tight"
                    >
                        Trusted By
                    </motion.span>

                    <motion.img 
                        variants={coneVariants}
                        src="/images/ice-cream-cone-About.png" 
                        className="w-10 h-14 sm:w-16 sm:h-20 md:w-24 md:h-28 object-contain mx-2" 
                        alt="cone" 
                    />

                    <motion.span
                        variants={splitTextVariants}
                        custom="right"
                        className="text-3xl sm:text-5xl lg:text-6xl uppercase leading-tight"
                    >
                        Communities
                    </motion.span>
                </motion.h2>
                <p className="text-lg sm:text-xl text-gray-500 font-medium">Professional service for professional organizations.</p>
            </div>

            {/* SLIDING CAROUSEL */}
            <div className="relative w-full max-w-5xl px-4 flex items-center group z-10">
                <button onClick={prevSlide} className="hidden md:flex absolute left-0 z-30 p-4 rounded-full border-2 border-pink-100 text-pink-600 bg-white/95 shadow-lg hover:bg-pink-600 hover:text-white transition-all">
                    <ChevronLeft size={32} />
                </button>

                <div className="relative w-full h-[480px] sm:h-[420px] flex items-center justify-center overflow-hidden sm:overflow-visible"
                     onMouseEnter={() => setIsPaused(true)}
                     onMouseLeave={() => setIsPaused(false)}>
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 80) prevSlide();
                                else if (info.offset.x < -80) nextSlide();
                            }}
                            className={`absolute w-full max-w-3xl p-8 sm:p-12 rounded-[3rem] shadow-3xl border-4 backdrop-blur-md cursor-grab active:cursor-grabbing ${TESTIMONIALS[currentIndex].border} ${TESTIMONIALS[currentIndex].color} text-center`}
                        >
                            <span className="text-6xl text-pink-300 opacity-40 font-serif leading-none block mb-4">“</span>
                            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 italic leading-relaxed mb-8">
                                {TESTIMONIALS[currentIndex].quote}
                            </p>
                            <div className="flex flex-col items-center">
                                <h4 className="font-fredoka text-xl font-bold text-pink-600 uppercase tracking-tight">{TESTIMONIALS[currentIndex].name}</h4>
                                <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">{TESTIMONIALS[currentIndex].title}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button onClick={nextSlide} className="hidden md:flex absolute right-0 z-30 p-4 rounded-full border-2 border-pink-100 text-pink-600 bg-white/95 shadow-lg hover:bg-pink-600 hover:text-white transition-all">
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* DOTS & PLAY/PAUSE */}
            <div className="flex items-center justify-center gap-6 mt-8 z-10">
                <div className="flex gap-2">
                    {TESTIMONIALS.map((_, index) => (
                        <button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                            className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-pink-600 w-10" : "bg-pink-200 w-3 hover:bg-pink-300"}`} />
                    ))}
                </div>
                <button onClick={() => setIsPaused(!isPaused)} className="p-2 text-gray-400 hover:text-pink-600 transition-colors">
                    {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                </button>
            </div>

            {/* CTA BUTTON */}
            <div className="mt-12 text-center relative z-20">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-14 py-5 bg-pink-600 text-white font-fredoka font-bold text-2xl rounded-full shadow-2xl hover:bg-pink-700 transition-all ring-8 ring-pink-50"
                >
                    Book Us 
                </motion.button>
            </div>
        </section>
    );
}