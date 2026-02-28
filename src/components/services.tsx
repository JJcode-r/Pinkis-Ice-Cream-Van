import { useState, useEffect, type SyntheticEvent, type FC } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

// --- STYLING ---
const GlobalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
    .bg-cream { background-color: #F7F7FF; }
`;

const WORKPLACE_LOGO_URL = "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/logo2.webp";

// Added className prop to handle consistent sizing
interface MeltButtonProps {
  text?: string;
  href?: string;
  className?: string;
}

const MeltButton = ({ text = "Book Your Date", href = "/booking#booking-form", className = "" }: MeltButtonProps) => {
  const buttonPulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const 
  };

  return (
    <div className={`group relative flex flex-col items-center ${className}`}>
      <motion.a
        href={href}
        // Added w-full so it fills the container width provided
        className="relative z-10 w-full py-4 text-xl rounded-full bg-pink-600 text-white font-bold shadow-xl shadow-pink-500/40 hover:bg-pink-700 transition duration-300 text-center"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: [1, 1.02, 1],
          transition: buttonPulseTransition,
        }}
      >
        {text}
      </motion.a>

      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[85%] h-[60px] overflow-hidden pointer-events-none z-0">
        <div className="melt-panel w-full h-0 bg-[#db2777] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-x-[0.9] group-hover:h-[45px] group-hover:scale-x-100" 
             style={{
               WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0 0h200v15c0 8-8 25-25 25s-20-15-25-25-10-15-25-15-15 15-25 25-15 35-35 35-15-20-25-35S25 0 0 0z'/%3E%3C/svg%3E")`,
               maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M0 0h200v15c0 8-8 25-25 25s-20-15-25-25-10-15-25-15-15 15-25 25-15 35-35 35-15-20-25-35S25 0 0 0z'/%3E%3C/svg%3E")`,
               WebkitMaskSize: '100% 60px',
               maskSize: '100% 60px',
               WebkitMaskRepeat: 'no-repeat',
               maskRepeat: 'no-repeat'
             }} 
        />
      </div>
    </div>
  );
};

const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    const target = e.currentTarget as HTMLImageElement;
    target.onerror = null; 
    target.src = fallbackSrc;
};

// --- DATA ---
const SERVICES = [
    { 
        id: "workplace",
        title: "Workplace Staff Events", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/workspace5.webp", 
        price: "Vetted Supplier",
        description: "Boost team morale with affordable, fully tailored ice cream van hire. With clear communication and no hidden surprises, we handle everything! From setup to cleanup, you can relax and enjoy the event with your team." 
    },
    { 
        id: "schools",
        title: "School Events & Fundraising", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/blurred2.png", 
        price: "Fundraising Program",
        description: "We support school P&C with fundraising by donating back a percentage of sales—no pre-payment required! We offer balanced choices that kids love and parents feel confident serving, using eco-friendly packaging to care for the planet." 
    },
    { 
        id: "sports",
        title: "Community events & sport events", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/sports.webp", 
        price: "Custom Profit Plan",
        description: "Sports and ice cream are a winning combination! Whether it’s a match or a carnival, our truck adds excitement for players and spectators alike. We work with your club to generate revenue while treating your supporters." 
    }
];

const PackageCard: FC<{ pkg: typeof SERVICES[0] }> = ({ pkg }) => {
    const isWorkplace = pkg.id === "workplace";

    return (
        <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col bg-white rounded-[2.5rem] p-6 shadow-xl shadow-pink-100/20 border-2 border-pink-50 hover:border-pink-200 transition-all duration-500 group h-full"
        >
            <div className="relative h-60 w-full rounded-[2rem] mb-8 shrink-0">
                <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-md">
                    <img src={pkg.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={pkg.title} />
                </div>
                
                {isWorkplace && (
                    <div className="absolute -bottom-6 left-6 z-20 transition-transform duration-300 hover:scale-110">
                        <img
                            src={WORKPLACE_LOGO_URL}
                            alt="Vetted Supplier"
                            className="w-16 h-16 object-cover rounded-2xl border-4 border-white shadow-2xl"
                            onError={(e) => handleImageError(e, "https://placehold.co/80x80/1f4e79/ffffff?text=Corp")} 
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow text-left pt-2 px-2">
                <h3 className="font-fredoka text-2xl font-bold text-slate-800 mb-4">{pkg.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base mb-8 flex-grow">
                    {pkg.description}
                </p>
                <div className="pt-6 border-t border-pink-50">
                    <a href={`/events#${pkg.id}`} className="inline-flex items-center text-pink-500 font-fredoka font-bold hover:gap-3 transition-all">
                        Learn More <span className="ml-2">→</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default function App() {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check(); window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
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
        <section id="services" className="relative py-20 lg:py-32 bg-cream overflow-hidden">
            <style>{GlobalStyles}</style>
            
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <motion.h2
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ staggerChildren: 0.1 } as Transition} 
                        className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-[#E83E8C] mb-8"
                    >
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl">
                            OUR EVENT
                        </motion.span>
                        <motion.img 
                            src="/images/ice-cream-cone-About.png" 
                            variants={coneVariants}
                            className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain mx-4" 
                        />
                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl">
                            SERVICES
                        </motion.span>
                    </motion.h2>

                    <p className="text-[#1D2A3A] font-fredoka font-bold text-xl mb-4 tracking-wide uppercase">
                        Book Pinki’s: Professional Service, Sweet Fun
                    </p>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                       Our service covers everything from setup and serving to cleanup, so you can relax and enjoy your event.
                    </p>
                </div>

                <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ staggerChildren: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                >
                    {SERVICES.map((s, i) => <PackageCard key={i} pkg={s} />)}
                </motion.div>
                
                {/* CTAs matched with a consistent width class (w-72 or w-80) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-16">
                    <MeltButton 
                      text="Book Your Event Now! 🍦" 
                      href="/booking#booking-form" 
                      className="w-full sm:w-80" 
                    />
                    
                    <div className="group relative w-full sm:w-80">
                         <motion.a 
                            href="/events" 
                            whileHover={{ scale: 1.05 }} 
                            className="w-full bg-white text-[#E83E8C] border-2 border-[#E83E8C] font-fredoka font-bold py-4 rounded-full text-xl hover:bg-pink-50 transition-all text-center block relative z-10 shadow-lg shadow-pink-100/50"
                        >
                            View Events
                        </motion.a>
                    </div>
                </div>

            </div>
        </section>
    );
}