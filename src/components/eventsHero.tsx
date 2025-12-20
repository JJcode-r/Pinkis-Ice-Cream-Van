"use client";

import { lazy, Suspense, useState, useEffect } from 'react'; 
import { motion, type Variants } from 'framer-motion'; 
import { Truck, ArrowRight } from 'lucide-react';

const Sparkles = lazy(() => import('lucide-react').then(mod => ({ default: mod.Sparkles })));
const CONE_ICON_URL = "/images/ice-cream-cone-About.png"; 

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
        .button-press-effect:active { transform: translateY(2px); }
        .submit-button-hover:hover { 
            background-color: #c01e63; 
            box-shadow: 0 12px 20px -5px rgba(219, 39, 119, 0.7) !important; 
        }
    `}</style>
);

export default function EventsHero() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const splitVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (dir: 'left' | 'right') => ({ 
            opacity: 1, 
            y: 0,
            x: isDesktop ? (dir === 'left' ? -15 : 15) : 0, 
            transition: { type: "spring", stiffness: 40 } 
        }),
    };

    return (
        <section className="relative w-full min-h-[95dvh] lg:min-h-[90dvh] flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 lg:px-20 bg-brand-cream">
            <CustomStyles />

            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-50 via-pink-100/40 to-transparent z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            />

            <div className="relative z-10 max-w-7xl w-full py-12 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* LEFT BLOCK: BUSINESS COPY */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-1"
                >
                    <div className="flex items-center justify-center lg:justify-start">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 border border-brand-primary/20 backdrop-blur-sm text-brand-primary font-fredoka font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase shadow-sm">
                            <Truck className="h-3.5 w-3.5 mr-2" />
                            Australia's Premier Event Hire
                        </span>
                    </div>

                    <h1 className="font-fredoka font-extrabold leading-[1.05] text-brand-primary">
                        <motion.span variants={splitVariants} custom="left" initial="hidden" animate="visible" className="block text-5xl sm:text-7xl xl:text-8xl uppercase tracking-tight">
                            Event
                        </motion.span>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 -mt-1 sm:-mt-2">
                            <motion.img 
                                src={CONE_ICON_URL} 
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 object-contain drop-shadow-lg" 
                            />
                            <motion.span variants={splitVariants} custom="right" initial="hidden" animate="visible" className="text-brand-dark text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight">
                                Catering
                            </motion.span>
                        </div>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed px-2 sm:px-0">
                        Book the pink van that gives back! We provide <strong>hassle-free catering</strong> for corporate days and <strong>zero-cost fundraising</strong> for schools with generous donations returned to your community.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                        <a 
                            href="#pricing" 
                            className="w-full sm:w-auto px-10 py-4 sm:py-5 bg-brand-primary text-white font-fredoka font-bold text-xl rounded-full shadow-xl hover:shadow-pink-500/30 transition-all button-press-effect text-center"
                        >
                            Our Packages
                        </a>
                        <a 
                            href="/booking" 
                            className="w-full sm:w-auto flex items-center justify-center px-10 py-4 sm:py-5 bg-white border-2 border-brand-primary/10 text-brand-primary font-fredoka font-bold text-xl rounded-full shadow-lg hover:bg-pink-50 transition-all button-press-effect"
                        >
                            Book Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </motion.div>

                {/* RIGHT BLOCK: RESPONSIVE IMAGE CARD */}
                <motion.div 
                    className="relative flex justify-center lg:justify-end min-h-[320px] sm:min-h-[450px] lg:h-[600px] items-center order-1 lg:order-2"
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.9, delay: 0.2 }}
                >
                    {/* Decorative Background Card - Responsive Sizing */}
                    <motion.div 
                        className="absolute right-4 sm:right-0 top-6 w-[80%] h-[85%] rounded-[2.5rem] sm:rounded-[3rem] bg-brand-accent shadow-xl rotate-6" 
                        animate={{ rotate: [6, 4, 6] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.img
                        src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo8.jpg"
                        alt="Pinki's Ice Cream Van Catering a School Event"
                        className="relative z-10 w-[85%] sm:w-[80%] lg:w-[85%] max-w-md lg:max-w-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl-strong border-[6px] sm:border-[10px] border-white object-cover aspect-[4/5] -rotate-2"
                        loading="eager"
                    />

                    {/* Trust Badge - Hidden on very small screens to avoid clutter */}
                    <Suspense fallback={null}>
                        <motion.div 
                            className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 z-20 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-brand-primary hidden xs:block" 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            transition={{ type: "spring", delay: 1 }}
                        >
                            <div className="flex items-center space-x-1 text-pink-500 mb-0.5 sm:mb-1">
                                <Sparkles size={16} fill="currentColor" />
                            </div>
                            <p className="font-fredoka font-bold text-brand-dark text-[10px] sm:text-xs md:text-sm">5-Star Event Service</p>
                        </motion.div>
                    </Suspense>
                </motion.div>

            </div>
        </section>
    );
}