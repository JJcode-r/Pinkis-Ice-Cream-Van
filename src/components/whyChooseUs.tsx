import { useState, useEffect, useRef, type FC, type SyntheticEvent, type RefObject } from 'react';
import { motion, type Variants, type Transition, type TargetAndTransition } from 'framer-motion';

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
// FEATURE CONTENT ARRAY
// -----------------------------------------------------------------------------
const FEATURES: Feature[] = [ // Added explicit type
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
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo5.jpg", 
        description: "We specialize in creating those perfect, unexpected moments of pure delight—the giggles and happy dances that your guests will talk about long after the party ends." 
    },
];

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

// TS7006 Fix: Added types for props, ref, and event handler
const LazyImage: FC<LazyImageProps> = ({ src, alt, className, fallback }) => {
    const [isVisible, setIsVisible] = useState(false);
    // Ref type: Use RefObject<HTMLImageElement>
    const imgRef = useRef<HTMLImageElement>(null); 

    useEffect(() => {
        // Check if the ref has a current value before observing
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

        return () => {
            // Check if observer exists before disconnecting
            if (observer) observer.disconnect();
        };
    }, []);

    // TS2339 Fix: Explicitly type the event and target
    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; 
        target.src = fallback || "";
    };

    return (
        <img
            ref={imgRef as RefObject<HTMLImageElement>} // Cast ref for use in component
            src={isVisible ? src : (fallback || "")}
            alt={alt}
            className={className}
            onError={handleImageError}
        />
    );
};

// TS2322 Fix: Cast transition to Transition
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 80, damping: 12 } as Transition // Cast to Transition
    },
};

// TS7006 Fix: Added explicit types for props
const HighlightRow: FC<HighlightRowProps> = ({ feature, index }) => {
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
            <div className="absolute inset-0 bg-raspberry-glaze/10 mix-blend-multiply pointer-events-none rounded-3xl" />
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

export default function PinkisPromiseSection() {
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

    // TS2322 & TS7006 Fix: Explicitly type custom parameter 'direction' and cast transition
    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        visible: (direction: 'left' | 'right') => ({ // Fix 1: Type custom parameter
            opacity: 1, 
            x: isDesktop ? (direction === 'left' ? -70 : 70) : 0, 
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition // Fix 2: Cast transition
        }),
    };

    // TS2322 Fix: Cast transition to Transition
    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 360, 
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition // Cast to Transition
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
                        transition={{ staggerChildren: 0.1 } as Transition} // Cast transition
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

                    {/* Text content & guarantee list remain unchanged */}
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

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: 0.2, duration: 0.6 } as Transition} className="text-center my-16 lg:my-20">
                    <h3 className="text-2xl font-fredoka font-bold text-deep-indigo mb-6">
                        Ready to make your event unforgettable?
                    </h3>
                    <motion.a 
                        href="/booking" 
                        role="button" 
                        className="inline-flex items-center justify-center px-12 py-4 text-xl rounded-full bg-raspberry-glaze text-white font-extrabold shadow-xl shadow-pink-500/50 hover:opacity-90 transition duration-300 transform hover:scale-[1.03] active:scale-95" 
                        whileHover={{ scale: 1.05 } as TargetAndTransition} 
                        whileTap={{ scale: 0.95 } as TargetAndTransition}
                    >
                        Book us Now!
                    </motion.a>
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