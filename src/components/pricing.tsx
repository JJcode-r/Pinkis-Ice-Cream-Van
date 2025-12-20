import { useState, useEffect, type FC } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

const CONE_ICON_URL = "/images/ice-cream-cone-About.png"; 

const PricingSection: FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // --- ANIMATION VARIANTS ---
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
                
                {/* --- HEADER: Animation triggers ONLY ONCE --- */}
                <header className="relative mb-20 text-center">
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
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} // Fixed: Now only animates once
                        transition={{ delay: 0.4 }}
                        className="max-w-3xl mx-auto"
                    >
                        <p className="text-2xl md:text-3xl text-pink-600 font-bold font-fredoka mb-4">
                            🍦 Hire an Ice Cream Van with ZERO Booking Fees! 🍦
                        </p>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            With Pinki’s, your corporate or school event just got a whole lot sweeter! Book for free, make your organization's day special, and even earn money for your cause.
                        </p>
                    </motion.div>
                </header>

                {/* --- OPTIONS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Option 1: Upfront */}
                    <motion.div 
                        whileHover={isDesktop ? { y: -10 } : {}} // Technical Polish: Desktop only hover
                        className="relative p-8 md:p-12 bg-[#F8FAFC] rounded-[3rem] border-2 border-transparent hover:border-pink-200 transition-all flex flex-col shadow-sm"
                    >
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">🏢</span>
                                <h3 className="text-3xl font-fredoka font-bold text-slate-900 uppercase leading-tight">Option 1: Upfront Payment</h3>
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium">
                                Pay a fixed cost based on the number of ice creams you want. Simply share your event details, and the van arrives ready to serve your team or clients.
                            </p>
                            <div className="p-6 bg-white/60 rounded-2xl border border-slate-100">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">Service Focus:</p>
                                <p className="text-slate-700 font-fredoka font-bold italic text-lg">Corporate Staff Days & Workplace Rewards</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <motion.a 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/booking"
                                className="inline-block w-full text-center px-10 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-lg shadow-pink-400/50 font-fredoka uppercase tracking-wider"
                            >
                                Get a Corporate Quote
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Option 2: Pay-As-You-Go */}
                    <motion.div 
                        whileHover={isDesktop ? { y: -10 } : {}} // Technical Polish: Desktop only hover
                        className="relative p-8 md:p-12 bg-pink-50 rounded-[3rem] border-2 border-pink-200 transition-all flex flex-col shadow-sm"
                    >
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">🏫</span>
                                <h3 className="text-3xl font-fredoka font-bold text-slate-900 uppercase leading-tight">Option 2: Pay-As-You-Go</h3>
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium">
                                No upfront fees! The van sells directly to your guests. Perfect for fundraisers where Pinki's donates a percentage of sales back to your school or club.
                            </p>
                            <div className="p-6 bg-white/80 rounded-2xl border border-pink-100">
                                <p className="text-sm text-pink-600 font-bold uppercase tracking-widest mb-2">Organization Benefit:</p>
                                <p className="text-slate-700 font-fredoka font-bold italic text-lg">Earn money for your school or sports club!</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <motion.a 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/booking"
                                className="inline-block w-full text-center px-10 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-lg shadow-pink-400/50 font-fredoka uppercase tracking-wider"
                            >
                                Book Your Fundraiser
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* --- POLISHED SPECIALIZATION BLOCK --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                            Make your event memorable without spending a fortune on booking fees. With Pinki’s, it’s fun, easy, and absolutely hassle-free!
                        </p>
                        
                        {/* Refined Disclaimer: Focuses on "Specialization" */}
                        <div className="inline-block px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8">
                            <p className="text-sm md:text-base text-slate-300">
                                <span className="text-pink-400 font-bold tracking-widest uppercase mr-3">Expertise:</span> 
                                We specialize exclusively in <span className="text-white font-bold">Corporate, School, & Community</span> events. 
                                <span className="block md:inline mt-1 md:mt-0 md:ml-2 italic text-slate-400 opacity-80">(We do not service private birthdays or weddings)</span>
                            </p>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-fredoka font-bold text-pink-400 leading-tight">
                            🎉 Book Pinki's today and turn your event into a sweet success! 🎉
                        </h3>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;