// src/components/aboutUs.tsx

import { useState, useEffect } from 'react';
// Import necessary types from framer-motion for correct variant typing
import { motion, type Variants, type Transition } from 'framer-motion'; 

// --- STYLES AND CONFIG ---
const GlobalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
`;

const MOCK_IMAGES = [
    { id: 1, text: "Pinki's Van on a Sunny Day", url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/pinkisVan.webp" },
    { id: 2, text: "The Owners / Family Portrait", url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/1000373256.jpg" },
    { id: 3, text: "Close-up of a Perfect Cone", url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/aboutImage3.webp" },
    { id: 4, text: "A Catering Event Setup", url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/aboutImage5.webp" },
];

// --- COMPONENTS ---
const ImageCarouselPlaceholder = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % MOCK_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-64 sm:h-80 lg:h-[450px] w-full rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
            {MOCK_IMAGES.map((img, index) => (
                <motion.div
                    key={img.id}
                    className={`absolute inset-0`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentIndex ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    style={{ zIndex: index === currentIndex ? 1 : 0 }}
                >
                    <motion.div
                        className={`w-full h-full relative overflow-hidden`}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={img.url}
                            alt={img.text}
                            className="w-full h-full object-cover"
                            // FIX TS2339: Cast e.target to HTMLImageElement
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.src="https://placehold.co/800x600/d1d5db/374151?text=Visual+Placeholder"; 
                            }}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-6 md:p-8">
                            <div className="text-center opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                                <p className="font-fredoka text-xl lg:text-2xl text-white drop-shadow-lg">
                                    {img.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

// Animation variants
// Add Variants type for consistency
const bodyItemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } as Transition } };

// Main Component
function AboutSection() {
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // FIX TS7006: Explicitly type 'direction' as a string literal.
    // FIX TS2322: Cast transition as Transition from framer-motion.
    const splitTextVariants: Variants = {
        hidden: (direction: 'left' | 'right') => ({ opacity: 0, x: isDesktop ? (direction === 'left' ? 70 : -70) : 0 }),
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } as Transition }
    };

    // FIX TS2322: Cast transition as Transition from framer-motion.
    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: { opacity: 1, scale: 1, rotateY: 360, transition: { type: 'spring', stiffness: 50, damping: 10 } as Transition },
    };

    const IceCreamConeImage = () => (
        <motion.img
            src="/images/ice-cream-cone-About.png"
            alt="Ice Cream Cone Icon"
            variants={coneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 object-contain mx-2 md:mx-4"
        />
    );

    return (
        <section id="about-us-preview" className="relative pt-24 pb-20 bg-white overflow-hidden">
            <style>{GlobalStyles}</style>
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20 relative z-10">

                {/* Header */}
                <motion.header
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="flex items-center justify-center mb-6 md:mb-10 lg:mb-16 flex-wrap"
                >
                    {/* Variants are now correctly typed */}
                    <motion.h2 custom="left" variants={splitTextVariants} className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600">
                        ABOUT
                    </motion.h2>

                    <IceCreamConeImage />

                    {/* Variants are now correctly typed */}
                    <motion.h2 custom="right" variants={splitTextVariants} className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600">
                        US
                    </motion.h2>
                </motion.header>

                {/* Sub-heading / Pitch */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-2xl md:text-3xl font-fredoka font-semibold text-gray-800 mb-12 lg:mb-20"
                >
                    Pinki's: Professional Promise & Reliability in Every Scoop
                </motion.p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                    {/* Left Text Content */}
                    <div className="order-1 lg:order-1 space-y-6 md:space-y-8">
                        {/* Variants are correctly typed */}
                        <motion.div variants={bodyItemVariants}>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                Pinki’s has been operating for over 10 years and supported hundreds of events and community social gatherings. We take care of everything from staffing and hygiene to full health and safety compliance. Our vans are fully licensed, insured, and operated by qualified professionals. Whether you’re organising a school function or a corporate event, you can count on our team to deliver a smooth, reliable, and professional service.
                            </p>
                        </motion.div>

                        <motion.div variants={bodyItemVariants} className="w-24 h-2 rounded-full bg-pink-400/70 shadow-sm" />

                        <motion.div variants={bodyItemVariants} className="pt-4 md:pt-6">
                            <a
                                href="/about"
                                className="inline-flex items-center px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-extrabold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-xl transform hover:scale-[1.03]"
                            >
                                <span className="mr-2">🧡</span> Meet the Pinki's Family & Full Story
                                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Image Carousel */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.8, ease: "easeOut" }} 
                        className="order-2 lg:order-2 group"
                    >
                        <ImageCarouselPlaceholder />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutSection;