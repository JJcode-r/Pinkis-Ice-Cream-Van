"use client";

import React, { useState, useEffect, type SyntheticEvent } from 'react';
// Import necessary types from framer-motion
import { motion, type Variants, type Transition } from 'framer-motion';
import { Star, Milk, CupSoda, Nut, Package, Ruler, Droplets, type LucideIcon } from 'lucide-react';

// -----------------------------------------------------------------------------
// TYPES (No change needed)
// -----------------------------------------------------------------------------

interface Product {
    id: number;
    category: 'Twin Cone' | 'Regular Cone' | 'Custom Cone';
    name: string;
    color: string; // Tailwind class for the BG color, now used on hover
    accent: string;
    image: string;
}

interface MilkshakeOption {
    name: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface AddOnOption {
    name: string;
    icon: LucideIcon;
}

interface MilkshakesSundaesConfig {
    MILKSHAKES: MilkshakeOption[];
    SUNDAES: string[];
    ADD_ONS: AddOnOption[];
}

// -----------------------------------------------------------------------------
// CONFIGURATION DATA (No change needed)
// -----------------------------------------------------------------------------

const PRODUCTS: Product[] = [
    { id: 0, category: "Twin Cone", name: "Twin Choc Dip", color: "bg-amber-800/15", accent: "text-amber-900", image: "/images/ice-cream-cone-About.png" },
    { id: 1, category: "Twin Cone", name: "Twin Nut", color: "bg-yellow-100", accent: "text-yellow-700", image: "/images/ice-cream-cone-About.png" },
    { id: 2, category: "Twin Cone", name: "Twin Plain", color: "bg-pink-100", accent: "text-pink-600", image: "/images/ice-cream-cone-About.png" },
    { id: 3, category: "Twin Cone", name: "Twin Sprinkle", color: "bg-fuchsia-100", accent: "text-fuchsia-700", image: "/images/ice-cream-cone-About.png" },
    { id: 4, category: "Twin Cone", name: "Twin Sherbert", color: "bg-purple-100", accent: "text-purple-600", image: "/images/ice-cream-cone-About.png" },
    { id: 5, category: "Regular Cone", name: "Plain Cone", color: "bg-white", accent: "text-pink-600", image: "/images/ice-cream-cone-About.png" },
    { id: 6, category: "Regular Cone", name: "Choc Dip Cone", color: "bg-amber-900/20", accent: "text-amber-900", image: "/images/ice-cream-cone-About.png" },
    { id: 7, category: "Regular Cone", name: "Sprinkle Cone", color: "bg-fuchsia-100", accent: "text-fuchsia-700", image: "/images/ice-cream-cone-About.png" },
    { id: 8, category: "Regular Cone", name: "Nut Cone", color: "bg-yellow-200", accent: "text-yellow-800", image: "/images/ice-cream-cone-About.png" },
    { id: 9, category: "Regular Cone", name: "Sherbert Cone", color: "bg-purple-100", accent: "text-purple-600", image: "/images/ice-cream-cone-About.png" },
    { id: 10, category: "Custom Cone", name: "Choc Dip w/ Kit Kat", color: "bg-amber-800/15", accent: "text-amber-900", image: "/images/ice-cream-cone-About.png" },
    { id: 11, category: "Custom Cone", name: "Choc Dip w/ Nuts", color: "bg-amber-800/15", accent: "text-amber-900", image: "/images/ice-cream-cone-About.png" },
    { id: 12, category: "Custom Cone", name: "Kit‑Kat Cone", color: "bg-white", accent: "text-pink-600", image: "/images/ice-cream-cone-About.png" },
];

const MILKSHAKES_SUNDAES: MilkshakesSundaesConfig = {
    MILKSHAKES: [
        { name: "Vanilla", icon: Droplets, color: "text-yellow-500", bg: "bg-yellow-50" },
        { name: "Caramel", icon: Droplets, color: "text-amber-700", bg: "bg-amber-50" },
        { name: "Strawberry", icon: Droplets, color: "text-pink-600", bg: "bg-pink-50" },
        { name: "Chocolate", icon: Droplets, color: "text-amber-900", bg: "bg-amber-900/5" },
    ],
    SUNDAES: ["Small", "Large"],
    ADD_ONS: [
        { name: "Sprinkles", icon: Package },
        { name: "Nuts", icon: Nut },
    ],
};

const SORT_OPTIONS = {
    DEFAULT: 'Our Picks',
    NAME_ASC: 'Name (A‑Z)',
    NAME_DESC: 'Name (Z‑A)',
    CATEGORY: 'Type',
};

// -----------------------------------------------------------------------------
// SUB‑COMPONENTS 
// -----------------------------------------------------------------------------

interface IceCreamConeHeaderImageProps {
    variants: Variants;
}

const IceCreamConeHeaderImage: React.FC<IceCreamConeHeaderImageProps> = ({ variants }) => (
    <motion.img
        src="/images/ice-cream-cone-About.png"
        alt="Ice cream cone"
        variants={variants}
        className="w-14 sm:w-20 mx-3 object-contain"
        loading="lazy"
        decoding="async"
        width={80}
        height={80}
    />
);

interface IceCreamConeImageProps {
    product: Product;
}

const IceCreamConeImage: React.FC<IceCreamConeImageProps> = ({ product }) => (
    <motion.img
        src={product.image}
        alt={product.name}
        // Use initial/animate/transition for the hover effects on the card,
        // but keep the image responsive and positioned absolutely.
        className="w-28 h-36 object-contain drop-shadow-2xl"
        loading="lazy"
        decoding="async"
        width={112}
        height={144}
        // Correctly typed onError handler
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = '/images/menu/cones/fallback.webp')}
    />
);

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    
    // State to manage hover, crucial for controlling the image and background animations
    const [isHovered, setIsHovered] = useState(false);

    // Variants for the background color element
    const bgVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } as Transition },
    };

    // Variants for the image float effect
    const imageVariants: Variants = {
        rest: { scale: 1, rotate: 0, y: 0 },
        hover: { scale: 1.15, rotate: 6, y: -10, transition: { type: 'spring', stiffness: 300, damping: 12 } as Transition },
    };
    
    return (
        <motion.div layout>
            {/* Use motion.div as the main wrapper for hover state control and layout transition. 
              The initial/whileInView setup is kept here for entrance animation.
            */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`relative p-6 pt-28 pb-10 rounded-3xl shadow-xl border border-pink-200 min-h-[350px] bg-white`} // **CRITICAL: Set background to white/transparent**
                style={{ borderTopLeftRadius: 120, borderTopRightRadius: 120 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 } as Transition}
            >
                {/* 1. HOVER BACKGROUND ELEMENT (Sits behind everything, controlled by hover state) */}
                <motion.div
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                    variants={bgVariants}
                    className={`absolute inset-0 rounded-3xl z-0 ${product.color} shadow-inner-xl`} // Z-0 is lowest layer
                    style={{ borderTopLeftRadius: 120, borderTopRightRadius: 120 }}
                />

                {/* 2. ICE CREAM IMAGE (Sits behind text/content, Z-index 10) */}
                <motion.div
                    className="absolute -top-14 left-1/2 -translate-x-1/2 z-10" // **Z-10: Behind text, in front of BG**
                    variants={imageVariants}
                    animate={isHovered ? "hover" : "rest"}
                >
                    <IceCreamConeImage product={product} />
                </motion.div>

                {/* 3. CARD CONTENT (Sits in front of everything, Z-index 20) */}
                <div className="relative z-20"> {/* **Z-20: Highest layer for text/buttons** */}
                    <span className="absolute top-[-100px] left-0 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold"> {/* Adjusted position due to new z-index context */}
                        {product.category}
                    </span>

                    <div className="text-center mt-6">
                        <h3 className={`font-fredoka text-2xl font-bold ${product.accent}`}>{product.name}</h3>
                        <p className="mt-4 flex justify-center items-center text-gray-800 font-extrabold">
                            <Star className="h-4 w-4 text-pink-500 mr-1" fill="currentColor" />
                            Ask for today’s price
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ... (MilkshakesAndSundaes component remains UNCHANGED) ...
const MilkshakesAndSundaes: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-28 bg-pink-100 p-8 md:p-12 rounded-[40px] shadow-2xl border-4 border-pink-300"
    >
        <h3 id='milkshake' className="text-4xl font-fredoka font-extrabold text-pink-800 mb-10 flex items-center">
            <Milk className="h-8 w-8 mr-3 text-pink-600" />
            Milkshakes & Sundaes
        </h3>

        <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-200">
                <h4 className="text-2xl font-bold mb-4 flex items-center">
                    <CupSoda className="h-6 w-6 mr-2 text-pink-500" /> Milkshakes
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    {MILKSHAKES_SUNDAES.MILKSHAKES.map((s, i) => (
                        <motion.div
                            key={s.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 } as Transition} // Explicitly cast transition
                            className={`p-4 rounded-xl ${s.bg} border border-pink-100 flex items-center gap-3`}
                        >
                            {/* s.icon is a LucideIcon type, correctly rendered */}
                            <s.icon className={`h-5 w-5 ${s.color}`} />
                            <span className="font-semibold">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-200">
                    <h4 className="text-2xl font-bold mb-4">Sundae Sizes</h4>
                    <div className="flex items-center justify-between bg-pink-50 p-4 rounded-xl">
                        <Ruler className="h-6 w-6 text-pink-500" />
                        <span className="text-xl font-extrabold text-pink-600">{MILKSHAKES_SUNDAES.SUNDAES.join(' / ')}</span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-200">
                    <h4 className="text-2xl font-bold mb-4">Add‑ons</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {MILKSHAKES_SUNDAES.ADD_ONS.map((a) => (
                            <div key={a.name} className="p-4 bg-yellow-50 rounded-xl text-center border border-yellow-200">
                                {/* a.icon is a LucideIcon type, correctly rendered */}
                                <a.icon className="h-6 w-6 mx-auto mb-1 text-amber-700" />
                                <p className="font-bold">{a.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

// -----------------------------------------------------------------------------
// MAIN SECTION (Only ProductCard usage changes)
// -----------------------------------------------------------------------------

export default function MenuPreviewSection() {
    // Explicitly typed useState
    const [sortType, setSortType] = useState<keyof typeof SORT_OPTIONS>('DEFAULT');
    const [sorted, setSorted] = useState<Product[]>(PRODUCTS);

    useEffect(() => {
        let p = [...PRODUCTS];
        if (sortType === 'NAME_ASC') p.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortType === 'NAME_DESC') p.sort((a, b) => b.name.localeCompare(a.name));
        else if (sortType === 'CATEGORY') {
            const order: Product['category'][] = ['Twin Cone', 'Regular Cone', 'Custom Cone'];
            p.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
        }
        setSorted(p);
    }, [sortType]);

    return (
        <section id="menu" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    // Inline variants are structurally correct
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.18 } },
                    }}
                    className="flex flex-col items-center mb-14"
                >
                    <motion.h2
                        // Inline variants are structurally correct and Transitions are cast
                        variants={{
                            hidden: { opacity: 0, y: 40, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 14 } as Transition },
                        }}
                        className="flex justify-center items-center font-fredoka font-extrabold text-pink-600 text-4xl sm:text-6xl"
                    >
                        <motion.span variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}>
                            Our Full
                        </motion.span>

                        <IceCreamConeHeaderImage
                            variants={{
                                hidden: { opacity: 0, scale: 0.3, rotate: -180 },
                                visible: { opacity: 1, scale: 1, rotate: 360, transition: { type: 'spring', stiffness: 80, damping: 12 } as Transition },
                            }}
                        />

                        <motion.span variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}>
                            Menu
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        // Inline variants are structurally correct and Transitions are cast
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } as Transition } }}
                        className="mt-4 max-w-3xl text-center text-lg text-gray-600"
                    >
                        From classic soft-serve cones to rich milkshakes and indulgent sundaes, every treat is freshly made,
                        joyfully served, and crafted to turn simple moments into unforgettable smiles.
                    </motion.p>
                </motion.div>

                <div className="flex justify-end mb-14">
                    <select
                        value={sortType}
                        // Correctly typed onChange handler
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortType(e.target.value as keyof typeof SORT_OPTIONS)}
                        className="rounded-full border border-pink-300 px-4 py-2 text-pink-600 shadow"
                    >
                        {/* k is typed as keyof typeof SORT_OPTIONS */}
                        {Object.entries(SORT_OPTIONS).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                        ))}
                    </select>
                </div>

                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
                    {/* p is strongly typed as Product */}
                    {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
                </motion.div>

                <MilkshakesAndSundaes />
            </div>
        </section>
    );
}