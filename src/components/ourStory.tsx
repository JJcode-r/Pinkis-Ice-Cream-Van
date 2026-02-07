// FIX 2: Remove unused 'React' import.
import { useState, useEffect } from 'react';
// FIX 1: Remove unused type 'CustomDomComponent'.
import { motion, type Variants, type Transition } from 'framer-motion';

// --- Global Styles ---
const StoryStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    
    .text-brand-purple { color: #431C5D; }
    .bg-brand-cream { background-color: #FDF8EE; }
    .font-fredoka { font-family: 'Fredoka', sans-serif; }

    .story-number {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10rem;
        line-height: 1;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.1);
        z-index: 0;
        font-family: 'Fredoka', sans-serif;
    }

    @media (min-width: 1024px) {
        .story-number {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20rem; 
        }
    }
`;

// --- Framer Motion Variants (Now correctly typed) ---

const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


// Define component props interface for type safety
interface IceCreamConeHeaderImageProps {
    variants: Variants;
}

// --- Component Definition ---

// Renaming App to OurStorySection for clarity and assuming it's the intended component name
export default function OurStorySection() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Animation variants for splitting text (Now correctly typed using Custom as a string or number)
    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        // 'direction' is passed via the 'custom' prop and must be typed as 'any' for the function signature
        show: (direction: "left" | "right") => ({ 
            opacity: 1,
            // Only apply horizontal slide animation on desktop screens
            x: isDesktop ? (direction === 'left' ? -70 : direction === 'right' ? 70 : 0) : 0,
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition, // Explicitly cast transition
        }),
    };

    // Animation variants for the center image
    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        show: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 360, 
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition
        },
    };

    // Ice Cream Cone for Header (Now correctly typed)
    const IceCreamConeHeaderImage: React.FC<IceCreamConeHeaderImageProps> = ({ variants }) => {
        const imageUrl = "/images/ice-cream-cone-About.png"; 
        return (
            <motion.img
                src={imageUrl}
                alt="Ice Cream Icon"
                variants={variants}
                className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 object-contain mx-2 md:mx-4"
                // Correctly typed onError handler
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                    (e.currentTarget as HTMLImageElement).onerror = null; 
                    (e.currentTarget as HTMLImageElement).src="https://placehold.co/80x100/ff99c8/431C5D?text=🍦" 
                }}
            />
        );
    };


    const storySteps = [
        {
            number: 1,
            title: "The Hand-Written Start",
            description: "It all began with Grandma Pinki’s recipe book, stained with vanilla and love. We took her classic churn method and committed to only using whole, natural ingredients, turning a family tradition into a community obsession.",
            image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/menu.png",
            bgColor: "bg-pink-100",
        },
        {
            number: 2,
            title: "The Pink Truck Transformation",
            description: "In 2015, we bought a beat-up old delivery van and gave it a vibrant coat of Pinki's signature color. This wasn't just a vehicle; it was our mobile kitchen and community hub, bringing joy right to your curbside.",
            image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/van1.webp",
            bgColor: "bg-orange-100",
        },
        {
            number: 3,
            title: "From Local Farms to Flavor",
            description: "Our flavor philosophy centers on freshness. We established deep partnerships with local farmers for our dairy and seasonal fruits, drastically cutting transport time and ensuring the best possible taste in every pint.",
            image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo11.jpg",
            bgColor: "bg-green-100",
        },
    ];

    return (
        <section id="full-story" className="pt-10 pb-20 bg-brand-cream text-brand-purple min-h-screen">
            <style>{StoryStyles}</style>

            <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20">

                {/* 1. EMOTIONAL STORY HEADER */}
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="show"
                    variants={container} // Typed Variant
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2
                        variants={item} // Typed Variant
                        className="flex flex-col lg:flex-row items-center justify-center font-fredoka font-extrabold text-pink-600 mb-4"
                        transition={{ staggerChildren: 0.1 } as Transition} // Added Transition cast for completeness
                    >
                        {/* Text Part 1 - Uses custom prop */}
                        <motion.span variants={splitTextVariants} custom="left" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center lg:text-right w-full lg:w-auto min-w-0">
                            Our Family
                        </motion.span>

                        {/* Icon Container */}
                        <div className="my-2 lg:my-0 flex justify-center w-full lg:w-auto">
                            <IceCreamConeHeaderImage variants={coneVariants} /> {/* Passed typed props */}
                        </div>

                        {/* Text Part 2 - Uses custom prop */}
                        <motion.span variants={splitTextVariants} custom="right" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center lg:text-left w-full lg:w-auto min-w-0">
                            Story
                        </motion.span>
                    </motion.h2>
                    <motion.p className="text-xl italic font-semibold text-pink-600 max-w-4xl mx-auto" variants={item}>
                        From a single recipe to a trusted, professional partner for every event.
                    </motion.p>
                </motion.div>

                {/* 2. FAMILY STORY STEPS */}
                <div className="space-y-20 lg:space-y-28">
                    {storySteps.map((step, index) => {
                        const isTextLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={step.number}
                                className={`relative flex flex-col lg:flex-row items-center p-8 md:p-12 rounded-[2.5rem] shadow-xl overflow-hidden ${step.bgColor}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 } as Transition} // Explicitly cast transition
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <span className="story-number select-none pointer-events-none">
                                    {step.number}
                                </span>

                                <div className={`relative z-10 grid grid-cols-1 gap-10 items-center w-full ${isTextLeft ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-[1fr_2fr]'}`}>
                                    
                                    <div className={`p-4 lg:p-0 ${isTextLeft ? 'order-1' : 'order-2'}`}>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-fredoka font-extrabold text-brand-purple mb-4 relative">
                                            <span className="text-pink-600 mr-2">{step.number}.</span> 
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className={`flex justify-center ${isTextLeft ? 'order-2 lg:justify-end' : 'order-1 lg:justify-start'}`}>
                                        <motion.img
                                            src={step.image}
                                            alt={step.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full max-w-sm h-64 object-cover rounded-2xl shadow-2xl border-4 border-white"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 } as Transition} // Explicitly cast transition
                                            // Correctly typed onError handler
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                (e.currentTarget as HTMLImageElement).onerror = null;
                                                (e.currentTarget as HTMLImageElement).src =
                                                    "https://placehold.co/400x300/ff99c8/431C5D?text=Image";
                                            }}
                                        />
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                
                {/* 3. MENU CORE SECTION */}
                <div className="mt-28 md:mt-36">
                    {/* MENU CORE ANIMATED HEADING */}
                    <motion.h2
                        variants={item} // Typed Variant
                        className="flex flex-col lg:flex-row items-center justify-center font-fredoka font-extrabold text-pink-600 mb-12" 
                        initial="hidden"
                        whileInView="show"
                        id= "#menu-core"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ staggerChildren: 0.1 } as Transition} // Added Transition cast for completeness
                    >
                        {/* Text Part 1 - Uses custom prop */}
                        <motion.span variants={splitTextVariants} custom="left" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center lg:text-right w-full lg:w-auto min-w-0">
                            The Pinki's
                        </motion.span>

                        {/* Icon Container */}
                        <div className="my-2 lg:my-0 flex justify-center w-full lg:w-auto">
                            <IceCreamConeHeaderImage variants={coneVariants} /> {/* Passed typed props */}
                        </div>

                        {/* Text Part 2 - Uses custom prop */}
                        <motion.span variants={splitTextVariants} custom="right" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center lg:text-left w-full lg:w-auto min-w-0">
                            Menu Core
                        </motion.span>
                    </motion.h2>

                    {/* MENU / PRODUCT DETAILS BLOCK */}
                    <motion.div 
                        className="bg-orange-50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-b-8 border-pink-600"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 } as Transition} // Explicitly cast transition
                    >
                        <p className="text-xl font-semibold text-pink-600 text-center mb-6 max-w-2xl mx-auto">
                            It all starts with our delicious creamy, traditional vanilla soft serve ice cream.
                        </p>
                        
                        <div className="max-w-3xl mx-auto">
                            <h4 className="text-2xl font-fredoka font-bold text-brand-purple mb-3 text-center border-b-2 pb-2 border-brand-purple/20">
                                Perfect Toppings Selection
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xl text-gray-700 list-none mt-4">
                                <li className="flex items-center font-bold"><span className="text-brand-purple text-3xl mr-2 leading-none">🍨</span> Rich Chocolate Coating</li>
                                <li className="flex items-center font-bold"><span className="text-brand-purple text-3xl mr-2 leading-none">🥜</span> Australian Crushed Peanuts</li>
                                <li className="flex items-center font-bold"><span className="text-brand-purple text-3xl mr-2 leading-none">🌈</span> Rainbow Sprinkles (100’s & 1000’s)</li>
                                <li className="flex items-center font-bold"><span className="text-brand-purple text-3xl mr-2 leading-none">🍋</span> Traditional Tasting Sherbet Coating</li>
                            </ul>
                        </div>
                        
                        {/* DUAL CTA BUTTONS - Unchanged */}
                        <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            {/* Primary Button: Booking */}
                            <a
                                href="/booking"
                                className="inline-flex items-center justify-center px-8 py-4 text-xl rounded-full bg-pink-600 text-white font-extrabold shadow-2xl hover:bg-pink-700 transition duration-300 transform hover:scale-[1.05] ring-4 ring-pink-300"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                BOOK Us for Your Event NOW!
                            </a>

                            {/* Secondary Button: Full Menu */}
                            <a
                                href="/menu"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-full border-2 border-brand-purple text-brand-purple font-bold bg-transparent hover:bg-brand-purple hover:text-white transition duration-300 transform hover:scale-[1.02]"
                            >
                                View Our Full Menu <span className="ml-2">→</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}