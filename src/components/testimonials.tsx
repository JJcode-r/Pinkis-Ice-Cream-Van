// TS6133 Fix: Import types explicitly and use 'type FC' for function components
import type { FC } from 'react';
import { useState, useEffect } from 'react';
// Import Variants, Transition, and Target for framer-motion typing
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "OH MY GOSH... this is amazing! The Mint Chip Bliss was the star of our wedding. Everyone, from the kids to grandma, was lined up!",
        name: "Sarah & Tom H.",
        title: "Wedding Clients",
        color: "bg-pink-50",
        border: "border-pink-200"
    },
    {
        id: 2,
        quote: "Pinki's totally crushed it for our company retreat. Professional setup, incredible flavors, and zero stress. We'll be booking them every year.",
        name: "David Lee",
        title: "Operations Manager, TechCorp",
        color: "bg-blue-50",
        border: "border-blue-200"
    },
    {
        id: 3,
        quote: "That’s the sound we hear every day. Big smiles. Sticky fingers. Happy hearts. Pure joy in a cone!",
        name: "A Local Parent",
        title: "Loyal Customer",
        color: "bg-yellow-50",
        border: "border-yellow-200"
    },
];

// TS7031 Fix: Explicitly define the props interface
interface IceCreamConeImageProps {
    variants: Variants;
}

// TS7031 Fix: Use FC to type the component and its props
const IceCreamConeImage: FC<IceCreamConeImageProps> = ({ variants }) => {
    const imageUrl = "/images/ice-cream-cone-About.png";
    return (
        <motion.img
            src={imageUrl}
            alt="Icon"
            loading="lazy" 
            variants={variants}
            className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 object-contain mx-2 md:mx-4"
        />
    );
};

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const TailwindFixStyle = `
      .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
      .bg-white { background-color: #fff; }
      .text-pink-600 { color: #db2777; }
      .text-slate-800 { color: #1e293b; }
      .font-fredoka { font-family: Fredoka, sans-serif; }
    `;

    // TS2322/TS7006 Fix: Explicitly type 'splitTextVariants' as Variants, 
    // type the custom prop 'direction' as 'left' | 'right', and cast transition.
    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        visible: (direction: 'left' | 'right') => ({ 
            opacity: 1, 
            x: isDesktop ? (direction === 'left' ? -70 : 70) : 0, 
            // TS2322 Fix: Cast transition object to Transition
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition,
        }),
    };

    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 360,
            // TS2322 Fix: Cast transition object to Transition
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition,
        },
    };

    return (
        <section 
            id="testimonials" 
            className="relative pt-20 lg:pt-32 pb-0 bg-white overflow-hidden flex flex-col justify-between"
            style={{ minHeight: '80vh' }}
        >
            <style>{TailwindFixStyle}</style>
            
            {/* Header */}
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20 relative z-10 w-full mb-10">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ staggerChildren: 0.1 } as Transition} // Cast inline transition
                        className="flex items-center justify-center font-fredoka font-extrabold text-pink-600 mb-6"
                    >
                        <motion.span
                            variants={splitTextVariants}
                            custom="left"
                            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-right min-w-0"
                        >
                            SWEETEST
                        </motion.span>

                        <IceCreamConeImage variants={coneVariants} />

                        <motion.span
                            variants={splitTextVariants}
                            custom="right"
                            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-left min-w-0"
                        >
                            FEEDBACK
                        </motion.span>
                    </motion.h2>
                    <p className="text-xl text-gray-600">Big smiles. Sticky fingers. Happy hearts.</p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto h-[400px] md:h-[350px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`absolute w-full md:w-3/4 p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 ${TESTIMONIALS[currentIndex].border} ${TESTIMONIALS[currentIndex].color} text-center`}
                        >
                            <span className="text-6xl text-pink-300 opacity-50 font-serif leading-none block mb-4">“</span>
                            <p className="text-xl md:text-2xl font-medium text-slate-800 italic leading-relaxed mb-6">
                                {TESTIMONIALS[currentIndex].quote}
                            </p>
                            <div>
                                <h4 className="font-fredoka text-xl font-bold text-pink-600">
                                    {TESTIMONIALS[currentIndex].name}
                                </h4>
                                <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
                                    {TESTIMONIALS[currentIndex].title}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-4 mb-12">
                    {TESTIMONIALS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-pink-600 w-8" : "bg-pink-200 hover:bg-pink-400"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center z-20 relative">
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/book"
                        className="inline-flex items-center px-10 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-300/50 transition-all ring-4 ring-pink-300/50 min-w-[200px]"
                    >
                        Book Us Today
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </motion.a>
                </div>
            </div>

            {/* Background Ice Cream Van */}
            <motion.div
                className="absolute bottom-0 right-0 w-full lg:w-1/2 flex justify-center lg:justify-end items-end z-0 pointer-events-none opacity-20 lg:opacity-100 transform translate-y-8 lg:translate-y-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1 }}
            >
                <motion.img 
                    src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/truck_proto1.png" 
                    alt="Pinki's Ice Cream Van"
                    loading="lazy" 
                    className="w-full max-w-2xl lg:max-w-3xl h-auto object-contain" 
                    // TS2339 Fix: Explicitly type the SyntheticEvent to HTMLImageElement
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                        // e.target is now e.currentTarget which is correctly typed as HTMLImageElement
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "https://placehold.co/1000x500/94a3b8/1e293b?text=Ice+Cream+Van+Placeholder"; 
                    }}
                />
            </motion.div>
            
            <div className="absolute bottom-0 w-full h-4 bg-pink-100/50 border-t border-pink-200 z-0"></div>

        </section>
    );
}