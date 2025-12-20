import { type FC, type SyntheticEvent, useState } from 'react';
import { motion, type Variants, type Transition, type TargetAndTransition } from 'framer-motion';

// --- TYPES & DATA ---
interface GalleryImage { id: number; title: string; src: string; tags: string; }
interface GalleryItemProps { image: GalleryImage; priority?: boolean; }

const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, title: "Wedding Bliss", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/couples_ice2.webp", tags: "Events, Pinki's Truck" },
    { id: 2, title: "Mint Chip Madness", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/elderly_ice_cream1.jpg", tags: "Flavors, Close-Up" },
    { id: 3, title: "Happy Customers", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/child_licking_ice_cream.jpg", tags: "Customers, Joy" },
    { id: 4, title: "Truck Vibe", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/aboutUs4.jpg", tags: "Truck, Branding" },
    { id: 5, title: "Sundaes", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/elderly_ice_cream2.jpg", tags: "Flavors, Specials" },
    { id: 6, title: "Corporate Event", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/cortney.webp", tags: "Events, Professional" },
    { id: 7, title: "Kid's Party", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream.webp", tags: "Events, Family" },
    { id: 8, title: "Cone Stack", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/couple_ice5.jpg", tags: "Flavors, Detail" },
    { id: 9, title: "Menu Board", src: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream2.jpg", tags: "Details, Truck" },
];

// --- HELPERS ---
const getPlaceholderUrl = ( width: number = 400): string => {
    return `https://placehold.co/${width}x300/FBCFE8/881337?text=Scooping...`;
};

// Fixed TS6133 by removing the unused width parameter
const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = getPlaceholderUrl();
};

// --- VARIANTS ---
const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.15 } as Transition },
};

const textPartVariants: Variants = {
    hidden: (xOffset: number) => ({ x: xOffset, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } as Transition },
};

// --- COMPONENTS ---

const GalleryItem: FC<GalleryItemProps> = ({ image, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            className="w-full relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group bg-pink-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 } as Transition}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(219, 39, 119, 0.3)" } as TargetAndTransition}
        >
            <img 
                src={image.src} 
                alt={image.title} 
                loading={priority ? "eager" : "lazy"}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-auto min-h-[250px] object-cover transition-all duration-700 group-hover:scale-110 
                ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"}`}
                onError={(e) => handleImageError(e)}
            />
            {/* Dark gradient background restored; text removed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

export default function GallerySection() {
    const xOffset = 30;

    return (
        <section id="gallery" className="py-20 lg:py-32 bg-white overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
                
                {/* Header Section */}
                <motion.header
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center text-center gap-2 md:gap-6 mb-8"
                >
                    <motion.h2 custom={xOffset} variants={textPartVariants}
                        className="text-4xl sm:text-5xl lg:text-7xl font-fredoka font-bold text-pink-600">
                        OUR
                    </motion.h2>

                    <motion.img
                        src="/images/ice-cream-cone-About.png"
                        alt="Cone"
                        initial={{ rotate: -20, scale: 0.8 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        className="w-12 h-16 sm:w-20 sm:h-28 object-contain"
                    />

                    <motion.h2 custom={-xOffset} variants={textPartVariants}
                        className="text-4xl sm:text-5xl lg:text-7xl font-fredoka font-bold text-pink-600">
                        GALLERY
                    </motion.h2>
                </motion.header>

                {/* Paragraph spacing fixed */}
                <div className="text-center mb-16 px-4">
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Real smiles. Real joy. Real moments from the events we’ve had the pleasure of serving.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
                    {GALLERY_IMAGES.slice(0, 2).map((image) => (
                        <GalleryItem key={image.id} image={image} priority={true} />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {GALLERY_IMAGES.slice(2).map((image) => (
                        <GalleryItem key={image.id} image={image} />
                    ))}
                </div>

                <div className="text-center mt-20">
                    <motion.a
                        whileHover={{ scale: 1.05 } as TargetAndTransition}
                        whileTap={{ scale: 0.95 } as TargetAndTransition}
                        href="/booking"
                        className="inline-flex items-center px-12 py-4 text-lg font-bold rounded-full text-white bg-pink-600 shadow-xl shadow-pink-200 hover:bg-pink-700 transition-colors"
                    >
                        Book Your Event
                    </motion.a>
                </div>
            </div>
        </section>
    );
}