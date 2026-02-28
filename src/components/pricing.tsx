import { useState, useEffect, type FC } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react'; // Modern icons for 2026 feel

const CONE_ICON_URL = "/images/ice-cream-cone-About.png"; 

const PricingSection: FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        visible: (direction: 'left' | 'right') => ({ 
            opacity: 1, 
            x: isDesktop ? (direction === 'left' ? -40 : 40) : 0, 
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition 
        }),
    };

    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: { 
            opacity: 1, scale: 1, rotateY: 360, 
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition 
        },
    };

    return (
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <header className="relative mb-16 text-center">
                    <motion.h2 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.5 }} 
                        className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-pink-600 mb-6"
                    >
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl uppercase">
                            PACKAGES &
                        </motion.span>
                        <motion.img 
                            src={CONE_ICON_URL} 
                            variants={coneVariants} 
                            className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain mx-4" 
                        />
                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl uppercase">
                            PRICING
                        </motion.span>
                    </motion.h2>
                </header>

                {/* --- CONSOLIDATED PRICING CARD --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-[#F8FAFC] rounded-[3rem] p-8 md:p-16 border-2 border-pink-100 shadow-xl shadow-pink-100/20 relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        
                        {/* Content Side */}
                        <div>
                            <h3 className="text-3xl md:text-4xl font-fredoka font-bold text-slate-900 mb-6">
                                Tailored for Your Event
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                              We keep things simple and stress-free. Whether you’re planning a workplace celebration, school event, sporting day or community gathering, Pinki’s Ice Cream Van delivers classic vanilla soft serve with fun topping options, freshly swirled and ready to enjoy. We offer clear pricing, easy booking, and a professional service from arrival to pack-down.   </p>
                            
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Classic Vanilla Soft Serve",
                                    " Fun Topping Options",
                                    "Full Public Liability Insurance",
                                    "Friendly, Professional Staff",
                                    "Reliable On-Time Service"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle2 className="text-pink-500 w-5 h-5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Side */}
                        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] shadow-inner border border-slate-100">
                            <div className="text-center mb-6">
                                <span className="text-pink-600 font-fredoka font-bold text-5xl md:text-6xl">FREE</span>
                                <p className="text-slate-500 uppercase tracking-widest font-bold text-sm mt-2">Booking Fees</p>
                            </div>
                            
                            <motion.a 
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(219 39 119 / 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                href="/booking#booking-form"
                                className="flex items-center gap-3 w-full justify-center px-8 py-5 text-xl font-bold rounded-full text-white bg-pink-600 transition-all font-fredoka uppercase tracking-wider"
                            >
                                <Send className="w-5 h-5" />
                                Get a Quote Now
                            </motion.a>
                            
                            <p className="mt-6 text-slate-400 text-sm italic">
                                Responses typically within 24 hours
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* --- SPECIALIZATION FOOTNOTE --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-16 max-w-5xl mx-auto px-4"
                >
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-pink-600 px-8 py-12 shadow-2xl shadow-pink-200">
                        {/* Subtle pattern overlay for texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" 
                             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} 
                        />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Top Line */}
                            <p className="font-fredoka text-xl md:text-2xl text-pink-50 font-medium mb-4 tracking-wide">
                                Make your event memorable with Pinki's. It’s fun, easy!
                            </p>

                            {/* The "Unmissable" Line */}
                            <h3 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight flex items-center justify-center gap-4">
                                <motion.span 
                                    animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    🍦
                                </motion.span>
                                Book Pinki's today and turn your event into a sweet success
                                <motion.span 
                                    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                >
                                    🍦
                                </motion.span>
                            </h3>
                        </div>

                        {/* Floating white sparkles for that "Celebration" feel */}
                        <motion.div 
                            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-6 right-10 text-white/20"
                        >
                            {/* <Sparkles size={48} /> */}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;