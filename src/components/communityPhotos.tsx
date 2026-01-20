// FIX: Removed unused 'React' import.
import { type FC, type SyntheticEvent } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

interface PhotoItem {
    location: string;
    image: string;
}

interface ConeIconProps {
    variants: Variants;
}

// -----------------------------------------------------------------------------
// DATA: Mock Photo Album Entries
// -----------------------------------------------------------------------------
const photoAlbum: PhotoItem[] = [
    { location: "Town Square Park", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/Van_kids.jpg" },
    { location: "Central High Field", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/elderly_ice_cream1.jpg" },
    { location: "Tech Startup HQ", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/1000373256.jpg" },
    { location: "Local Farmer's Market", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/KidCustomers.jpg" },
    { location: "Oakwood Neighborhood Block Party", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/couple_ice3.webp" },
    { location: "Blue Heron Lakefront", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo5.jpg" },
];

// --- STYLES (Unchanged) ---
const CommunityStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .text-brand-purple { color: #431C5D; }
    .bg-brand-soft-pink { background-color: #FFF0F5; }
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
`;

// -----------------------------------------------------------------------------
// ANIMATIONS (Fixed TS2322 framer-motion transition typing)
// -----------------------------------------------------------------------------

// TS2322 Fix: Cast transition to Transition
const hoverEffect = {
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(219, 39, 119, 0.5)",
    transition: { type: "tween", duration: 0.3 } as Transition,
};

// TS2322 Fix: Add Transition casting for nested transitions
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// TS2322 Fix: Type 'ease' property correctly (it should be an array or standard keyword)
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    // Corrected 'ease: "easeOut"' to the recommended 'ease: "easeInOut"' or specified array/preset
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } as Transition }, 
};

// TS2322 Fix: Cast transition to Transition and ensure 'type' is compatible
const splitTextVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } as Transition },
};

// TS2322 Fix: Cast transition to Transition and ensure 'type' is compatible
const coneVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
    visible: { opacity: 1, scale: 1, rotateY: 360, transition: { type: "spring", stiffness: 50, damping: 10 } as Transition },
};

// -----------------------------------------------------------------------------
// IMAGE ERROR HANDLER (Fixed TS2339)
// -----------------------------------------------------------------------------
const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    // Cast e.target to HTMLImageElement to access src and onerror
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = fallbackSrc;
};


// -----------------------------------------------------------------------------
// ICE CREAM ICON COMPONENT (Fixed TS7031 implicit any)
// -----------------------------------------------------------------------------
const IceCreamConeIcon: FC<ConeIconProps> = ({ variants }) => (
    <motion.img
        src="/images/ice-cream-cone-About.png"
        alt="Ice Cream Cone"
        loading="lazy"
        decoding="async"
        className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 mx-2 md:mx-4 object-contain"
        variants={variants}
    />
);

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function CommunitySection() {
    return (
        <section id="photo-album" className="py-20 bg-brand-soft-pink text-brand-purple overflow-hidden">
            <style>{CommunityStyles}</style>

            <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20">

                {/* Header with ice cream icon */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.h2
                        className="flex flex-wrap items-center justify-center text-center font-fredoka font-extrabold text-pink-600 mb-4 text-4xl sm:text-5xl lg:text-6xl"
                        // TS2322 Fix: Add Transition casting to staggerChildren transition
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } as Transition } }}
                    >
                        <motion.span variants={splitTextVariants} className="px-1 md:px-2">Community</motion.span>
                        <IceCreamConeIcon variants={coneVariants} />
                        <motion.span variants={splitTextVariants} className="px-1 md:px-2">Photo Album</motion.span>
                    </motion.h2>
                    <motion.p
                        className="text-xl italic font-semibold text-gray-700 max-w-4xl mx-auto"
                        variants={splitTextVariants}
                    >
                        Snapshots of the Pink Truck spreading joy across the neighborhood!
                    </motion.p>
                </motion.div>

                {/* Photo Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {photoAlbum.map((photo, index) => (
                        <motion.div
                            key={index}
                            className="w-full relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
                            variants={cardVariants}
                            // TS2322 Fix: whileHover is compatible because hoverEffect is now correctly cast to TargetAndTransition inside the variants object
                            whileHover={hoverEffect} 
                        >
                            <img
                                src={photo.image}
                                alt={photo.location}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-700 group-hover:scale-110"
                                // TS2339 Fix: Using the typed handleImageError function
                                onError={(e) => handleImageError(e, `https://placehold.co/600x400/FBCFE8/881337?text=Photo+Error`)}
                            />
                            <div className="absolute inset-0 bg-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}