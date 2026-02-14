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
        description: `Looking to treat your team to something fun and memorable? Pinki’s Ice Cream Van is the perfect addition to workplace staff events of all sizes. Whether you’re hosting a team celebration, staff appreciation day, or company gathering, we offer fully tailored ice cream van hire to suit your event. We attend with our iconic vans serving classic vanilla soft serve with a range of fun topping options—simple, crowd-pleasing, and always a hit. With clear communication and a smooth, professional service, we take care of everything from setup and serving through to pack-down. Enjoyable experience that lets you focus on your team while we handle the treats`,
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/aboutUs4.jpg",
        theme: "#F3EEFF",
        showBadge: true
    },
    {
        id: "schools",
        title: "School Events",
        tagline: "Community & Growth",
        description: `Pinki’s Ice Cream Van is a popular addition to school events, bringing classic vanilla soft serve with a range of fun topping options that kids love.

We attend school fetes, sports days, end-of-term celebrations and community school events with a smooth, well-organised service designed to keep things running efficiently. Our experienced team is trained to serve large, mixed-age crowds quickly and professionally, helping lines move smoothly and events stay on schedule.

At Pinki’s, we keep things simple and familiar. We serve classic vanilla soft serve only, paired with a variety of colourful and exciting toppings, making it an easy, crowd-pleasing treat for students and families, even the teachers! 

We use high-quality ingredients and carefully measured portions to ensure an enjoyable experience, while remaining mindful of balance and suitability for school environments. Our commitment to sustainability means we also use eco-friendly packaging and utensils wherever possible.

All school bookings are professionally managed, with clear communication throughout the planning process.

Whether you’re organising a school fete, sports carnival or celebration day, Pinki’s Ice Cream Van delivers a fun, reliable treat experience that adds something special to your school event.
Sorry yeah I am changing texts as I go with pictures to make it easy for you`,
 imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/school1.webp",
        theme: "#FFEEF2"
    },
    {
        id: "sports",
        title: "Community events & sport events",
        tagline: "A Winning Combination",
        description: `Community, connection and ice cream, a perfect match! 
At Pinki’s Ice Cream Van, community events are at the heart of what we do. From local parks and open spaces to neighbourhood celebrations and family-friendly gatherings, our iconic vans are all about creating relaxed, feel-good moments where people come together.

You’ll often find us popping up at parks, community days and public events, serving classic vanilla soft serve with a range of fun topping options that both kids and adults love. It’s simple, familiar and perfectly suited to casual, outdoor environments where people are already enjoying the day.

Alongside community events, we also attend sporting fixtures, club days and end-of-season celebrations. Whether it’s a local match, sports carnival or presentation day, our ice cream service adds a refreshing treat that players, families and spectators can enjoy together.

With experienced staff and an efficient service flow, we’re well equipped to handle busy community settings and larger crowds. From arrival and setup through to serving and pack down, we help keep events running smoothly while adding something special to the atmosphere.

Whether you’re organising a community gathering, park event, local celebration or sporting occasion, Pinki’s Ice Cream Van brings people together over a sweet, memorable experience.`,
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
                                <span className="text-lg lg:text-3xl 2xl:text-4xl font-bold text-slate-900 leading-none font-fredoka">Fully Licensed & <br className="hidden lg:block" /> Compliant</span>
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