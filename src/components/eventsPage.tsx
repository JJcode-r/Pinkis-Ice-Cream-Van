import { useState, useEffect, type SyntheticEvent, type FC } from 'react';
import { motion, type Variants, type Transition, AnimatePresence, type TargetAndTransition } from 'framer-motion';

// --- ASSETS & CONFIG ---
const WORKPLACE_LOGO_URL = "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logo2.webp";
const CONE_ICON_URL = "/images/ice-cream-cone-About.png"; 

const GlobalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
`;

const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    const target = e.currentTarget as HTMLImageElement;
    target.onerror = null; 
    target.src = fallbackSrc;
};

// --- DATA ---
const EVENT_DATA = [
     {
        id: "workplace",
        title: "Workplace Staff Events",
        tagline: "Vetted & Professional",
        description: `Worried about staying within budget? At Pinki’s, we believe everyone should be able to add a special touch to their event. which is why we offer affordable, fully tailored ice cream van hire.\n\nWhether you’re organising a workplace gathering or a large community celebration, we provide flexible packages and transparent pricing to suit your needs.\n\nIf you’re wondering how much it costs to book a visiting treats van, simply view our corporate pricing schedule. You’ll receive clear, competitive quotes with no hidden fees.\n\nOur service covers everything from setup and serving to cleanup, so you can relax and enjoy your event.`,
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo9.jpg",
        theme: "#F3EEFF",
        showBadge: true
    },
    {
        id: "schools",
        title: "School Events",
        tagline: "Community & Growth",
        description: `We support school P&C with fundraising opportunities by donating back a percentage of total sales without having to make a pre-payment to book our services!\n\nAt Pinki’s Ice Cream, we believe desserts can be both delicious and responsible. That’s why we offer balanced dessert choices — treats that kids love and parents feel confident serving. We use high-quality ingredients and carefully measured portions, so indulgence stays fun without overdoing it.\n\nWe care about the planet as much as the party — our commitment to sustainability means we use eco-friendly packaging and utensils, reducing waste and environmental impact every time we serve.\n\nPlanning a school event? Pinki’s team makes it easy. Our staff are trained to be friendly, efficient and professional, and we’re experienced at serving large, mixed-age crowds quickly so lines keep moving and the event keeps flowing. Whether it’s a school fete, sports day, fundraising event or end-of-term celebration, we aim to deliver not just ice cream, but memorable moments — happy children, relaxed parents and a smooth-running event.\n\nWe bring passion, care and a sweet smile to every swirl.`,
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/school1.webp",
        theme: "#FFEEF2"
    },
    {
        id: "sports",
        title: "Sports Events",
        tagline: "A Winning Combination",
        description: `Sports and Ice Cream: A Winning Combination!\n\nSports and ice cream have one thing in common—they bring people together! When it comes to organizing a memorable sporting club event, an ice cream truck is the perfect addition. Whether it’s a weekend match, swimming carnival, a fundraising event, or an end-of-season celebration, an ice cream truck is sure to score big points with your attendees.\n\nNothing says celebration like a refreshing ice cream treat after an intense game or competition. Having an ice cream truck on-site adds an element of excitement and anticipation for players, athletes, and spectators alike. As the match heats up, everyone will look forward to the sweet reward waiting for them after the final whistle blows.\n\nPlanning a fundraising event for your club? An ice cream truck can be a creative and profitable addition. Pinki’s can work with your club to create a customised fundraising plan, allowing you to generate revenue while treating your supporters to something truly sweet.`,
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/sportVan.webp",
        theme: "#EBF3FF"
    },
];

// --- SUB-COMPONENT: EDITORIAL ROW ---
const EditorialRow: FC<{ section: typeof EVENT_DATA[0], index: number }> = ({ section, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <div 
            id={section.id} 
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-screen relative scroll-mt-20`} 
            style={{ backgroundColor: section.theme }}
        >
            {/* IMAGE SIDE */}
            <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-0 lg:pt-20 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-end">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden rounded-[2rem] lg:rounded-none shadow-xl lg:shadow-none">
                    <img src={section.imageUrl} alt={section.title} className="w-full h-full object-cover lg:object-bottom" />
                    
                    {section.showBadge && (
                        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="absolute bottom-6 right-6 lg:bottom-16 lg:right-16 flex items-center gap-4 lg:gap-6 bg-white/95 backdrop-blur-xl p-3 pr-8 lg:p-5 lg:pr-12 rounded-[2.5rem] shadow-2xl border border-white/40">
                            <div className="w-16 h-16 lg:w-28 lg:h-28 2xl:w-36 2xl:h-36 bg-white rounded-3xl shadow-inner flex items-center justify-center p-2 lg:p-4">
                                <img src={WORKPLACE_LOGO_URL} className="w-full h-full object-contain" alt="Verified" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] lg:text-sm font-black uppercase tracking-[0.2em] text-pink-500 mb-2">Official Supplier</span>
                                <span className="text-lg lg:text-3xl 2xl:text-4xl font-bold text-slate-900 leading-none font-fredoka">Vetted & <br className="hidden lg:block" /> Compliant</span>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* TEXT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white/40 backdrop-blur-md">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl text-left w-full">
                    <span className="text-pink-600 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">{section.tagline}</span>
                    <h2 className="font-fredoka text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">{section.title}</h2>
                    
                    <div className="relative">
                        <motion.div
                            animate={{ height: isExpanded ? "auto" : "300px" }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden relative"
                        >
                            <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                                {section.description}
                            </div>

                            <AnimatePresence>
                                {!isExpanded && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/95 via-white/50 to-transparent pointer-events-none" 
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-6 flex items-center gap-2 text-pink-600 font-bold uppercase text-xs tracking-[0.2em] hover:text-pink-700 transition-colors group"
                        >
                            {isExpanded ? (
                                <>Show Less <span className="group-hover:-translate-y-1 transition-transform inline-block">↑</span></>
                            ) : (
                                <>Read Full Details <span className="group-hover:translate-y-1 transition-transform inline-block">↓</span></>
                            )}
                        </button>
                    </div>

                    <div className="mt-12">
                        <motion.a 
                            whileHover={{ scale: 1.05 } as TargetAndTransition}
                            whileTap={{ scale: 0.95 } as TargetAndTransition}
                            href="/booking" 
                            className="inline-flex items-center px-10 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-lg shadow-pink-400/50 font-fredoka group"
                        >
                            Book {section.title} <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function EventsSection() {
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
            x: isDesktop ? (direction === 'left' ? -70 : 70) : 0, 
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
        <div className="bg-white font-sans antialiased overflow-x-hidden">
            <style>{GlobalStyles}</style>

            <header className="relative pt-24 pb-16 px-6 text-center bg-[#F7F7FF]">
                <div className="mx-auto max-w-7xl">
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.1 } as Transition} className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-pink-600 mb-6">
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl">OUR EVENT</motion.span>
                        <motion.img src={CONE_ICON_URL} variants={coneVariants} className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain mx-4" onError={(e) => handleImageError(e, "https://placehold.co/96x112/E83E8C/FFFFFF?text=🍦")} />
                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl">SERVICES</motion.span>
                    </motion.h2>
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="text-[#1D2A3A] font-fredoka font-bold text-xl mb-4 tracking-wide uppercase">Book Pinki’s: Professional Service, Sweet Fun</p>
                        <p className="text-xl text-gray-700 leading-relaxed">We take care of everything—from full compliance and hygiene to transparent pricing, delivering a professional service for every gathering.</p>
                    </div>
                </div>
            </header>

            <main>
                {EVENT_DATA.map((section, i) => (
                    <EditorialRow key={section.id} section={section} index={i} />
                ))}
            </main>
        </div>
    );
}