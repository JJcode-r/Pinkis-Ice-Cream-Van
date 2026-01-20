import { useState, useEffect, useRef, type RefObject } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

interface Feature {
    title: string;
    imageUrl: string;
    description: string;
}

interface LazyImageProps {
    src: string;
    alt: string;
    className: string;
    fallback: string;
}

interface HighlightRowProps {
    feature: Feature;
    index: number;
}

// -----------------------------------------------------------------------------
// SUB-COMPONENT: MELT BUTTON (Same as Navbar)
// -----------------------------------------------------------------------------
const MeltButton = () => {
  const buttonPulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const // FIX: Added as const
  };

  return (
    <div className="group relative flex flex-col items-center">
      {/* CTA Button */}
      <motion.a
        href="/booking"
        role="button"
        className="relative z-10 px-12 py-4 text-xl rounded-full bg-pink-600 text-white font-bold shadow-xl shadow-pink-500/40 hover:bg-pink-700 transition duration-300"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: [1, 1.02, 1],
          transition: buttonPulseTransition,
        }}
      >
        Book Your Date
      </motion.a>

      {/* Melt Panel - Positioned to blend into the button base */}
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

// -----------------------------------------------------------------------------
// FEATURE CONTENT ARRAY
// -----------------------------------------------------------------------------
const FEATURES: Feature[] = [
    { 
        title: "Gourmet, Small-Batch Quality", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo1.jpg", 
        description: "Every scoop uses locally sourced dairy and fresh ingredients, guaranteeing a richer, authentic taste—zero artificial flavor. That’s the Pinki's difference." 
    },
    { 
        title: "Joyful, Professional Staff", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo2.jpg", 
        description: "Our dedicated, friendly team ensures every guest leaves smiling. Experience stress-free service that is always professional and delights children and adults alike." 
    },
    { 
        title: "The Iconic Pinki Van Aesthetic", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/van.webp", 
        description: "Our beautifully restored, picture-perfect van creates an instant photo opportunity and floods your event with feel-good, classic nostalgia." 
    },
    { 
        title: "Zero Wait Time, Max Happiness", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo3.jpg", 
        description: "High-capacity service designed for speed and efficiency. We can effortlessly serve 100+ guests per hour without the long lines or hassle." 
    },
    { 
        title: "Backed by Genuine Family Care", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo4.jpg", 
        description: "As a trusted family-run business, your event gets our personal commitment to excellence and genuine care that big franchises simply can't offer." 
    },
    { 
        title: "The Unforgettable Moment", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/Van_kids.jpg", 
        description: "We specialize in creating those perfect, unexpected moments of pure delight—the giggles and happy dances that your guests will talk about long after the party ends." 
    },
];

const LazyImage = ({ src, alt, className, fallback }: LazyImageProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null); 

    useEffect(() => {
        if (!imgRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(imgRef.current);
        return () => { if (observer) observer.disconnect(); };
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; 
        target.src = fallback || "";
    };

    return (
        <img
            ref={imgRef as RefObject<HTMLImageElement>}
            src={isVisible ? src : (fallback || "")}
            alt={alt}
            className={className}
            onError={handleImageError}
        />
    );
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 80, damping: 12 } as Transition
    },
};

const HighlightRow = ({ feature, index }: HighlightRowProps) => {
    const isImageRight = index % 2 === 0;

    const content = (
        <motion.div 
            className="flex flex-col justify-center space-y-4 lg:space-y-6"
            variants={itemVariants}
        >
            <h3 className="font-fredoka text-3xl md:text-4xl font-bold text-deep-indigo">
                {feature.title}
            </h3>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );

    const image = (
        <motion.div 
            className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl"
            variants={itemVariants}
        >
            <LazyImage
                src={feature.imageUrl}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                fallback="https://placehold.co/800x600/d1d5db/374151?text=Visual+Placeholder"
            />
            <div className="absolute inset-0 bg-pink-500/10 mix-blend-multiply pointer-events-none rounded-3xl" />
        </motion.div>
    );

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 lg:mb-24 ${index === 0 ? 'pt-0' : 'pt-16 lg:pt-0'}`}>
            {isImageRight ? (
                <>
                    <div className="order-2 lg:order-1">{content}</div>
                    <div className="order-1 lg:order-2">{image}</div>
                </>
            ) : (
                <>
                    <div className="order-1 lg:order-1">{image}</div>
                    <div className="order-2 lg:order-2">{content}</div>
                </>
            )}
        </div>
    );
};

export default function App() {
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
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
      .text-raspberry-glaze { color: ${RaspberryGlaze}; }
      .bg-raspberry-glaze { background-color: ${RaspberryGlaze}; }
      .text-deep-indigo { color: ${DeepIndigo}; }
      .bg-cream { background-color: ${CanvasCream}; } 
      .font-fredoka { font-family: Fredoka, sans-serif; }
      .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
      .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    `;

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
            opacity: 1, 
            scale: 1, 
            rotateY: 360, 
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition
        },
    };

    return (
        <section id="promise" className="relative py-20 lg:pt-32 lg:pb-32 bg-cream overflow-hidden">
            <style>{TailwindFixStyle}</style>
            
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20 relative z-10">
                
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ staggerChildren: 0.1 } as Transition}
                        className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-raspberry-glaze mb-6"
                    >
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl text-center md:text-right">
                            THE PINKI'S
                        </motion.span>

                        <motion.div variants={coneVariants} className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 my-2 mx-auto md:my-0 md:mx-4">
                            <LazyImage src="/images/ice-cream-cone-About.png" alt="Ice Cream Cone Icon" className="w-full h-full object-contain" fallback="https://placehold.co/96x112/E83E8C/FFFFFF?text=🍦" />
                        </motion.div>

                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl text-center md:text-left">
                            PROMISE
                        </motion.span>
                    </motion.h2>

                    <p className="text-2xl md:text-3xl font-fredoka font-semibold text-deep-indigo">
                        The Sweet Advantage: Why Choose Pinki's?
                    </p>
                    <div className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
                        <p className="mb-6 font-medium text-xl text-gray-800">
                            More than dessert, Pinki's delivers pure, unforgettable joy—the sound of the jingle, the taste of nostalgia, and a touch of professional polish.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left p-0 mb-6 list-none">
                            {['Full Health & Safety Compliance', 'Licensed, Insured, & Qualified Professionals', 'Transparent Pricing & Custom Packages', 'Smooth, Reliable, and Professional Service'].map((item, i) => (
                                <li key={i} className="flex items-center text-deep-indigo font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RaspberryGlaze} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-lg text-gray-700">
                            From workplace celebrations to school fairs, we handle all the logistics so you and your guests can simply savor the moment.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-16">
                    {FEATURES.map((feature, index) => (
                        <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                            <HighlightRow feature={feature} index={index} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA - NOW USING MELTBUTTON ATTRIBUTES AND TEXT */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.2, duration: 0.6 } as Transition} className="text-center my-16 lg:my-20">
                    <h3 className="text-2xl font-fredoka font-bold text-deep-indigo mb-8">
                        Ready to make your event unforgettable?
                    </h3>
                    <MeltButton />
                </motion.div>

                {/* Sweet Guarantee */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, type: "spring", stiffness: 50 } as Transition} className="bg-raspberry-glaze p-8 md:p-12 rounded-3xl shadow-2xl shadow-pink-500/50 text-white text-center border-4 border-pink-300 mt-10 lg:mt-20">
                    <h3 className="text-3xl md:text-4xl font-fredoka font-extrabold mb-3 flex justify-center items-center flex-wrap gap-2">
                        <span className="text-4xl md:text-5xl leading-none">🔥</span>
                        OUR SWEET GUARANTEE
                        <span className="text-4xl md:text-5xl leading-none">🔥</span>
                    </h3>
                    <p className="text-2xl md:text-3xl font-bold mb-4">
                        Always On-Time or Your First Scoop Is Free.
                    </p>
                    <p className="text-lg italic text-pink-100">
                        Because great service should feel just as good as great ice cream.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}