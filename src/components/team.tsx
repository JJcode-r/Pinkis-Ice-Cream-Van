import React from 'react';
import { motion, type Variants, type Transition, type TargetAndTransition } from 'framer-motion';

// --- DATA TYPES & DATA ---
interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Grandma Pinki",
        role: "Chief Flavor Curator (CFC)",
        description: "The legend, the muse, and the reason we exist. Pinki perfected the original churn recipe decades ago. She still tastes every batch before it leaves the kitchen. If it's not Pinki-approved, it's not served!",
        image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/owner.jpg",
    },
    {
        name: "Leo 'Scoop' Sanchez",
        role: "The Logistics Wizard (CEO)",
        description: "Leo ensures the pink truck is always running, the inventory is stocked with local cream, and the cones are crunchy. He's a master planner with a single goal: happiness on demand.",
        image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/staff1.jpeg",
    },
    {
        name: "Mia 'Sprinkles' Chen",
        role: "The Brand Spark (CMO)",
        description: "From our vibrant pink livery to our social media buzz, Mia handles everything sweet and visual. She ensures our aesthetic is as fun as our flavors, constantly dreaming up new promotions and events.",
        image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/staff2.webp",
    },
];

// --- STYLES ---
const TeamStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    
    .text-brand-purple { color: #431C5D; }
    .bg-brand-light { background-color: #E6E1F0; }
    .font-fredoka { font-family: 'Fredoka', sans-serif; }

    .fun-shadow {
        box-shadow: 6px 6px 0px 0px #FDF8EE;
    }
`;

// --- FRAMER MOTION VARIANTS ---

// Header text animation variants
const splitTextVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        // Cast to Transition is necessary for complex objects
        transition: { type: "spring", stiffness: 100, damping: 15 } as Transition 
    },
};

// Ice cream icon animation
const coneVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        rotateY: 360, 
        // Cast to Transition is necessary for complex objects
        transition: { type: "spring", stiffness: 50, damping: 10 } as Transition 
    },
};

// Card hover animation 
// FIX: Remove unnecessary 'as Target' and 'as Transition' casts from internal properties.
// Define as TargetAndTransition, and let string CSS property be a simple string.
const hoverEffect: TargetAndTransition = {
    scale: 1.02,
    y: -5,
    // FIX: Removed 'as Target' - the string value is acceptable here structurally
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    // FIX: Removed 'as Transition' - the transition object is accepted here structurally
    transition: { type: "spring", stiffness: 300, damping: 15 },
};

// Card stagger animation
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } as Transition } };
const cardVariants: Variants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } as Transition } };


// --- ICE CREAM ICON COMPONENT ---
interface IceCreamConeIconProps {
    variants: Variants;
}

// Added React.FC for typing the component
const IceCreamConeIcon: React.FC<IceCreamConeIconProps> = ({ variants }) => (
    <motion.img
        src="/images/ice-cream-cone-About.png"
        alt="Ice Cream Cone"
        loading="lazy"
        decoding="async"
        className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 mx-2 md:mx-4 object-contain"
        variants={variants}
    />
);

// --- COMPONENT ---
export default function TeamSection() {
    return (
        <section id="our-team" className="py-20 bg-brand-light text-brand-purple">
            <style>{TeamStyles}</style>

            <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20">

                {/* Header with ice cream icon */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.h2
                        className="flex items-center justify-center font-fredoka font-extrabold text-pink-600 mb-4 text-4xl sm:text-5xl lg:text-6xl"
                        // Inline transition for staggerChildren is cast to Transition
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } as Transition } }}
                    >
                        <motion.span variants={splitTextVariants} className="mr-2">Meet the</motion.span>
                        <IceCreamConeIcon variants={coneVariants} />
                        <motion.span variants={splitTextVariants} className="ml-2">Dream Cream Team</motion.span>
                    </motion.h2>
                    <motion.p
                        className="text-xl italic font-semibold text-pink-600 max-w-3xl mx-auto"
                        variants={splitTextVariants}
                    >
                        We're fueled by sugar, joy, and Grandma Pinki's original secret recipe.
                    </motion.p>
                </motion.div>

                {/* Team Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {teamMembers.map((member) => ( 
                        <motion.div
                            key={member.name} 
                            className="p-6 md:p-8 bg-white rounded-[2rem] fun-shadow transition-all duration-300 ring-4 ring-pink-300/50 shadow-md"
                            variants={cardVariants}
                            // whileHover={hoverEffect} is now correct because hoverEffect is typed as TargetAndTransition
                            whileHover={hoverEffect} 
                        >
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white ring-4 ring-pink-400/70 shadow-xl"
                                    // Corrected event typing for the onError handler
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://placehold.co/120x120/ff99c8/431C5D?text=${member.name.split(' ')[0]}`
                                    }}
                                />
                                <h3 className="text-3xl font-fredoka font-bold mb-1 text-brand-purple">{member.name}</h3>
                                <p className="text-pink-600 text-lg italic font-semibold mb-4">{member.role}</p>
                                <p className="text-gray-700 text-base leading-relaxed">{member.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}