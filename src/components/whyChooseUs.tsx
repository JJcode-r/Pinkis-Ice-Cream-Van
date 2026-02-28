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
    priority?: boolean;
    // --- CORRECTION: Added style prop to interface ---
    style?: React.CSSProperties; 
}

interface HighlightRowProps {
    feature: Feature;
    index: number;
}

// -----------------------------------------------------------------------------
// SUB-COMPONENT: MELT BUTTON
// -----------------------------------------------------------------------------
const MeltButton = () => {
  const buttonPulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const
  };

  return (
    <div className="group relative flex flex-col items-center">
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
        title: "Classic Soft Serve, Done Right", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/newFirstimage.png", 
        description: "At Pinki’s, we keep things simple and delicious. We serve classic vanilla soft serve with a fun selection of favourite toppings! Freshly swirled and ready to enjoy at every event. Classic, simple and always a crowd favorite." 
    },
    { 
        title: "Joyful, Professional Staff", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/KidCustomer.jpg", 
        description: "Our dedicated, friendly team ensures every guest leaves smiling. Enjoy a stress-free service that’s always professional and enjoyed by guests of all ages." 
    },
    { 
        title: "The Iconic Pinki's Van Aesthetic", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/pinkisVan.webp", 
        description: "Our beautifully restored, picture-perfect van creates an instant photo opportunity and brings feel good, classic charm to your event." 
    },
    { 
        title: "Fast Service, Happy Crowds", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/1000373256.jpg", 
        description: "High-capacity service designed for speed and efficiency. Our streamlined setup allows us to serve large crowds smoothly while keeping wait times to a minimum." 
    },
    { 
        title: "Backed by Genuine Family Care", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo4.jpg", 
        description: "As a family-run business, we bring a personal level of care and attention to every event." 
    },
    { 
        title: "The Unforgettable Moment", 
        imageUrl: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/Van_kids.jpg", 
        description: "We pride ourselves in creating those perfect, unexpected moments of pure delight. The smiles, laughter and joy your guests will remember long after the event ends."
    },
];

// --- CORRECTION: Destructured style and applied it to img ---
const LazyImage = ({ src, alt, className, fallback, style, priority = false }: LazyImageProps) => {
    const [isVisible, setIsVisible] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null); 

    useEffect(() => {
        if (isVisible || !imgRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { 
                rootMargin: '450px', // Loads images 450px before they enter the screen
                threshold: 0.01 
            }
        );
        observer.observe(imgRef.current);
        return () => { if (observer) observer.disconnect(); };
    }, [isVisible]);

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
            loading={priority ? "eager" : "lazy"}
            className={className}
            style={style} // Applied here
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
                priority={index < 1} 
                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03] ${
                    index === 0 ? '' : 'object-top' 
                }`}
                style={index === 0 ? { objectPosition: '50% 18%' } : {}}
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
                            <LazyImage 
                                src="/images/ice-cream-cone-About.png" 
                                alt="Ice Cream Cone Icon" 
                                className="w-full h-full object-contain" 
                                priority={true}
                                fallback="https://placehold.co/96x112/E83E8C/FFFFFF?text=🍦" 
                            />
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
                          More than dessert, Pinki’s brings unforgettable joy. The jingle everyone loves, nostalgic flavors and a polished, stress-free service.  </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left p-0 mb-6 list-none">
                            {['Full Health & Safety Compliance', 'Licensed, Insured & Qualified Professionals', 'Transparent Pricing &  Customised Packages', 'Smooth, Reliable and Professional Service'].map((item, i) => (
                                <li key={i} className="flex items-center text-deep-indigo font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RaspberryGlaze} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-lg text-gray-700">
                           From community spaces and workplace celebrations to school functions, we take care of everything so you and your guests can simply savour the moment.
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
                    <h3 className="text-2xl font-fredoka font-bold text-deep-indigo mb-8">
                        Ready to make your event unforgettable?
                    </h3>
                    <MeltButton />
                </motion.div>

               {/* Sweet Guarantee */}
<motion.div 
  initial={{ opacity: 0, y: 40 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true, amount: 0.5 }} 
  transition={{ duration: 0.8, ease: "circOut" }} 
  className="relative group mt-16 lg:mt-24"
>
  <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-raspberry-glaze to-pink-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

  <div className="relative bg-raspberry-glaze p-10 md:p-16 rounded-[2.2rem] text-white text-center overflow-hidden border border-white/10 shadow-2xl">
    
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-900/20 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 max-w-3xl mx-auto">
      
      <h3 className="text-3xl md:text-5xl font-fredoka font-extrabold tracking-tight mb-6 uppercase flex justify-center items-center gap-4">
        <motion.span 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl md:text-6xl"
        >
          🍦
        </motion.span>
        OUR SWEET GUARANTEE
        <motion.span 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="text-4xl md:text-6xl"
        >
          🍦
        </motion.span>
      </h3>
      
      <p className="text-2xl md:text-4xl font-fredoka font-bold mb-6 text-pink-50">
        Service You Can Count On.
      </p>
      
       <p className="text-xl md:text-2xl italic text-white font-fredoka font-medium">
          Because great service should feel just as good as great ice cream.
        </p>

         <div className="py-2 flex justify-center opacity-30">
            <svg width="40" height="2" viewBox="0 0 40 2" fill="none">
                <line x1="0" y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
            </svg>
        </div>

      <div className="space-y-4">
        <p className="text-lg md:text-xl text-pink-100 leading-relaxed font-medium">
          From setup to the final swirl, we show up prepared, organised and ready to make your event run smoothly.
        </p>
      </div>
    </div>
  </div>
</motion.div>
            </div>
        </section>
    );
}