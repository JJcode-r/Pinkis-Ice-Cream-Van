import { type FC, type SyntheticEvent } from 'react';
import { motion, type Variants, type Transition, type TargetAndTransition } from 'framer-motion';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

interface GalleryImage {
    id: number;
    title: string;
    src: string;
    tags: string;
}

interface GalleryItemProps {
    image: GalleryImage;
}

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// UTILITY FUNCTIONS (Fixed TS7006 implicit any)
// -----------------------------------------------------------------------------

// TS7006 Fix: Added types for 'id' and 'width'
const getPlaceholderUrl = (id: number, width: number = 400): string => {
    let height = 300;
    if (id === 1 || id === 2) height = 420;
    else if (id % 3 === 0) height = 450;
    else if (id % 3 === 2) height = 350;
    else height = 280;
    return `https://placehold.co/${width}x${height}/FBCFE8/881337?text=Placeholder+${id}`;
};

// TS2339 Fix: Handler to ensure the image element is correctly typed
const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>, id: number, width?: number) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = getPlaceholderUrl(id, width);
};

// -----------------------------------------------------------------------------
// ANIMATION VARIANTS (Fixed TS2322 framer-motion transition typing)
// -----------------------------------------------------------------------------

// TS2322 Fix: Cast transition to Transition
const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        // Cast transition to Transition
        transition: { duration: 0.8, ease: "easeInOut", delayChildren: 0.2, staggerChildren: 0.15 } as Transition,
    },
};

// TS2322 Fix: Cast transition to Transition and correctly type custom prop
const textPartVariants: Variants = {
    // TS7006 Fix: Type 'xOffset' as number
    hidden: (xOffset: number) => ({ x: xOffset, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 } as Transition },
};


// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

// TS7031 Fix: Added explicit type for component props
const GalleryItem: FC<GalleryItemProps> = ({ image }) => (
    <motion.div
        className="w-full relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        // TS2322 Fix: Cast transition to Transition
        transition={{ duration: 0.5, ease: "easeOut" } as Transition}
        // TS2322 Fix: whileHover target properties are correctly typed
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(219, 39, 119, 0.5)" } as TargetAndTransition}
    >
        <img 
            src={image.src} 
            alt={image.title} 
            loading="lazy"
            className="w-full h-auto min-h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
            // TS2339 Fix: Use typed error handler
            onError={(e) => handleImageError(e, image.id)}
        />
        <div className="absolute inset-0 bg-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-2xl">
            <div className="text-white">
                <h3 className="text-xl font-bold font-fredoka">{image.title}</h3>
                <p className="text-sm opacity-90">{image.tags}</p>
            </div>
        </div>
    </motion.div>
);

const IceCreamConeImage = () => {
    const imageUrl = "/images/ice-cream-cone-About.png";
    return (
        <motion.img
            src={imageUrl}
            alt="Ice Cream Cone Icon"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 360 }}
            viewport={{ once: true }}
            // TS2322 Fix: Cast transition to Transition
            transition={{ type: "spring", stiffness: 50, damping: 10 } as Transition}
            className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 object-contain mx-2 md:mx-4"
        />
    );
};

// TS6133 Fix: Removed unused 'React' import from the main component scope
export default function GallerySection() {
    const xOffset = 50;

    return (
        <section id="gallery" className="py-20 lg:py-32 bg-pink-50">
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
                
                {/* Header with Ice Cream Cone */}
                <motion.header
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex items-center justify-center gap-2 md:gap-4 mb-10 md:mb-16 lg:mb-24"
                >
                    <motion.h2
                        custom={xOffset} 
                        variants={textPartVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600"
                    >
                        OUR
                    </motion.h2>

                    <IceCreamConeImage />

                    <motion.h2
                        custom={-xOffset} 
                        variants={textPartVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600"
                    >
                        GALLERY
                    </motion.h2>
                </motion.header>

                <div className="text-center mb-16 -mt-16">
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Real smiles. Real joy. Real moments from the events we’ve had the pleasure of serving.
                    </p>
                </div>

                {/* HERO IMAGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {GALLERY_IMAGES.slice(0, 2).map((image) => (
                        <motion.div
                            key={image.id}
                            className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 } as Transition}
                            whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(219, 39, 119, 0.5)" } as TargetAndTransition}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                loading="lazy"
                                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
                                // TS2339 Fix: Use typed error handler
                                onError={(e) => handleImageError(e, image.id, 600)}
                            />
                            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold font-fredoka">{image.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* REMAINING IMAGES GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {GALLERY_IMAGES.slice(2).map((image) => (
                        <GalleryItem key={image.id} image={image} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <motion.a
                        whileHover={{ scale: 1.05 } as TargetAndTransition}
                        whileTap={{ scale: 0.95 } as TargetAndTransition}
                        href="/booking"
                        className="inline-flex items-center px-10 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-lg shadow-pink-400/50"
                    >
                        Book Us for Your Event
                        <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 10l4 4m0 0l-4 4m4-4H5" />
                        </svg>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}