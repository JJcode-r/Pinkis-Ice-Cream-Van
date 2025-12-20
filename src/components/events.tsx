// FIX 2: Remove unused 'React' import. 
import { useState, useEffect, type SyntheticEvent, type FC } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

// --- STYLES AND CONFIG ---
const GlobalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
`;

// Corporate badge/logo
const WORKPLACE_LOGO_URL = "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logo2.webp";

// -----------------------------------------------------------------------------
// GLOBAL IMAGE ERROR HELPER (FIX 1: Define handleImageError globally)
// -----------------------------------------------------------------------------
const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    // e.currentTarget refers to the <img> element (HTMLImageElement)
    const target = e.currentTarget as HTMLImageElement;
    // FIX: Access properties using type cast
    target.onerror = null; 
    target.src = fallbackSrc;
};


// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
// ... (Interfaces remain unchanged)

interface ServicePackage {
    title: string;
    imageUrl: string;
    price: string;
    capacity: string;
    description: string;
}

interface PackageCardProps {
    packageInfo: ServicePackage;
    gridClass?: string;
}

// -----------------------------------------------------------------------------
// EVENT SERVICES DATA (Unchanged)
// -----------------------------------------------------------------------------
const SERVICES: ServicePackage[] = [
// ... (Service data remains unchanged)
    { 
        title: "School Events & Fundraising", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo7.jpg", 
        price: "Fundraising Program",
        capacity: "No Pre-Payment Required",
        description: "We support school P&C with fundraising opportunities by donating back a percentage of total sales without having to make a pre-payment to book our services! At Pinki’s Ice Cream, we believe desserts can be both delicious and responsible. That’s why we offer balanced dessert choices — treats that kids love and parents feel confident serving. We use high-quality ingredients and carefully measured portions, so indulgence stays fun without overdoing it. We care about the planet as much as the party — our commitment to sustainability means we use eco-friendly packaging and utensils, reducing waste and environmental impact every time we serve. Planning a school event? Pinki’s team makes it easy. Our staff are trained to be friendly, efficient and professional, and we’re experienced at serving large, mixed-age crowds quickly so lines keep moving and the event keeps flowing. Whether it’s a school fete, sports day, fundraising event or end-of-term celebration, we aim to deliver not just ice cream, but memorable moments — happy children, relaxed parents and a smooth-running event. We bring passion, care and a sweet smile to every swirl." 
    },
    { 
        title: "Sports Events & Clubs", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo8.jpg", 
        price: "Custom Fundraising Plan",
        capacity: "A Winning Combination!",
        description: "Sports and Ice Cream: A Winning Combination! Sports and ice cream have one thing in common—they bring people together! When it comes to organizing a memorable sporting club event, an ice cream truck is the perfect addition. Whether it’s a weekend match, swimming carnival, a fundraising event, or an end-of-season celebration, an ice cream truck is sure to score big points with your attendees. Nothing says celebration like a refreshing ice cream treat after an intense game or competition. Having an ice cream truck on-site adds an element of excitement and anticipation for players, athletes, and spectators alike. As the match heats up, everyone will look forward to the sweet reward waiting for them after the final whistle blows.Planning a fundraising event for your club? An ice cream truck can be a creative and profitable addition. Pinki’s can work with your club to create a customised fundraising plan, allowing you to generate revenue while treating your supporters to something truly sweet." 
    },
    { 
        title: "Workplace Staff Events", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo9.jpg", 
        price: "Affordable & Tailored",
        capacity: "Tailored Capacity",
        description: "Worried about staying within budget? At Pinki’s, we believe everyone should be able to add a special touch to their event—which is why we offer affordable, fully tailored ice cream van hire. Whether you’re organising a workplace gathering or a large community celebration, we provide flexible packages and transparent pricing to suit your needs. If you’re wondering how much it costs to book a visiting treats van, simply view our corporate pricing schedule. You’ll receive clear, competitive quotes with no hidden fees. Our service covers everything from setup and serving to cleanup, so you can relax and enjoy your event." 
    },
    { 
        title: "Private Parties & Celebrations", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo10.jpg", 
        price: "Custom Indoor/Outdoor party plan",
        capacity: "Hassle-Free Booking",
        description: "Perfect for birthdays, weddings, and community gatherings. Choose between Upfront Payment or Pay-As-You-Go with ZERO booking fees! We make every occasion sweeter." 
    },
];

// -----------------------------------------------------------------------------
// FRAMER MOTION VARIANTS (TS2322 Transition Casting Review)
// -----------------------------------------------------------------------------

// FIX 3: Ensure 'containerVariants' transition is cast correctly
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } as Transition },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        // Cast to Transition to satisfy strict typing
        transition: { type: "spring", stiffness: 80, damping: 12, mass: 0.5 } as Transition 
    },
};


// -----------------------------------------------------------------------------
// PACKAGE CARD COMPONENT 
// -----------------------------------------------------------------------------
// Removed the inner handleImageError definition since it's now global
const PackageCard: FC<PackageCardProps> = ({ packageInfo, gridClass = '' }) => {
    const isFundraising = packageInfo.price.includes("Fundraising") || packageInfo.price.includes("Custom");
    const isWorkplaceEvent = packageInfo.title === "Workplace Staff Events";

    return (
        <motion.div 
            className={`bg-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-pink-100 transition duration-300 hover:shadow-2xl hover:border-pink-300 flex flex-col items-start text-left h-full group ${gridClass}`}
            variants={itemVariants}
        >
            <div className="relative h-48 w-full rounded-2xl mb-6 shadow-sm">
                <img
                    src={packageInfo.imageUrl}
                    alt={`Image for ${packageInfo.title}`}
                    loading="lazy" 
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                    // Use the global helper
                    onError={(e) => handleImageError(e, "https://placehold.co/600x400/d1d5db/374151?text=Service+Placeholder")}
                />
                <div className="absolute inset-0 bg-pink-900/10 mix-blend-overlay pointer-events-none rounded-2xl" />

                {isWorkplaceEvent && (
                    <div className="absolute -bottom-6 left-4 z-20">
                        <div className="relative group cursor-help w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 hover:scale-105 shadow-2xl" tabIndex={0}>
                            <img
                                src={WORKPLACE_LOGO_URL}
                                alt="Corporate Vetted Supplier Logo"
                                loading="lazy" 
                                className="w-full h-full object-cover rounded-xl border-4 border-white ring-4 ring-blue-600/80 transition-transform duration-300"
                                // Use the global helper
                                onError={(e) => handleImageError(e, "https://placehold.co/80x80/1f4e79/ffffff?text=Corp+Logo")} 
                            />
                            <span className="absolute hidden group-hover:block group-focus:block z-30 w-max bg-slate-800 text-white text-xs rounded-lg py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                                Corporate Vetted Supplier
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="font-fredoka text-2xl md:text-3xl font-bold text-slate-800 mb-3 leading-tight relative mt-4">
                {packageInfo.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
                <span className={`font-bold px-3 py-1 rounded-lg text-sm md:text-base border ${isFundraising ? 'bg-green-100 text-green-700 border-green-200' : 'bg-pink-100 text-pink-700 border-pink-200'}`}>
                    {packageInfo.price}
                </span>
                <span className="text-slate-500 text-sm font-medium flex items-center">
                    <span className="mr-1">🎉</span> {packageInfo.capacity}
                </span>
            </div>

            <p className="text-gray-600 text-base leading-relaxed flex-grow">
                {packageInfo.description}
            </p>
        </motion.div>
    );
};


// -----------------------------------------------------------------------------
// MAIN SECTION
// -----------------------------------------------------------------------------
export default function PackagesPreviewSection() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);
    
    const RaspberryGlaze = "#E83E8C";
    const DeepIndigo = "#1D2A3A";
    const CanvasCream = "#F7F7FF";

    const TailwindFixStyle = `
      ${GlobalStyles}
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
      .text-raspberry-glaze { color: ${RaspberryGlaze}; }
      .bg-raspberry-glaze { background-color: ${RaspberryGlaze}; }
      .text-deep-indigo { color: ${DeepIndigo}; }
      .bg-cream { background-color: ${CanvasCream}; } 
    `;

    // TS2322/TS7006 Fix: Explicitly type parameter 'direction' and cast transition
    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        // TS7006 Fix: Explicitly type custom parameter 'direction' as string literal union
        visible: (direction: 'left' | 'right') => ({ 
            opacity: 1, 
            x: isDesktop ? (direction === 'left' ? -70 : 70) : 0, 
            transition: { 
                type: "spring", 
                stiffness: 50, 
                damping: 15 
            } as Transition // TS2322 Fix: Cast to Transition
        }),
    };

    // TS2322 Fix: Cast transition object
    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 360, 
            transition: { 
                type: "spring", 
                stiffness: 50, 
                damping: 10 
            } as Transition // TS2322 Fix: Cast to Transition
        },
    };

    return (
        <section id="services" className="relative py-20 lg:pt-32 lg:pb-32 bg-cream overflow-hidden">
            <style>{TailwindFixStyle}</style>
            
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20 relative z-10">
                
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        // TS2322 Fix: Cast transition to Transition
                        transition={{ staggerChildren: 0.1 } as Transition} 
                        className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-raspberry-glaze mb-6"
                    >
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl text-center md:text-right">
                            OUR EVENT
                        </motion.span>

                        <motion.img
                            src="/images/ice-cream-cone-About.png"
                            alt="Ice Cream Cone Icon"
                            loading="lazy" 
                            variants={coneVariants}
                            className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain my-2 mx-auto md:my-0 md:mx-4"
                            // FIX: Use the global helper function
                            onError={(e) => handleImageError(e, "https://placehold.co/96x112/E83E8C/FFFFFF?text=🍦")}
                        />

                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl text-center md:text-left">
                            SERVICES
                        </motion.span>
                    </motion.h2>

                    <p className="text-deep-indigo font-fredoka font-bold text-xl mb-4 tracking-wide uppercase">
                        Book Pinki’s: Professional Service, Sweet Fun
                    </p>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        We take care of everything—from full compliance and hygiene to transparent pricing, delivering a smooth, reliable, and professional service for every gathering.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 lg:mb-24 max-w-7xl mx-auto"
                >
                    {SERVICES.map((pkg, index) => {
                        // Logic to center the last item if it's the only one on the last row
                        const gridClass = index === SERVICES.length - 1 && SERVICES.length % 3 === 1 ? 'lg:col-start-2' : ''; 
                        return <PackageCard packageInfo={pkg} key={index} gridClass={gridClass} />;
                    })}
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 } as Transition} // TS2322 Fix: Cast transition
                    className="text-center flex justify-center"
                >
                    <a href="/booking">
                        <button className="bg-raspberry-glaze hover:opacity-90 text-white font-fredoka font-bold py-4 px-8 rounded-full text-xl shadow-xl transition transform hover:-translate-y-1 active:scale-95 duration-200 ring-4 ring-pink-300/50 min-w-[200px]">
                            Book Your Event Now!
                        </button>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}