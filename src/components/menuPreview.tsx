"use client";

import React, { useState, useEffect, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { Star, Milk, CupSoda, Nut, Package, Droplets, type LucideIcon } from 'lucide-react';

// -----------------------------------------------------------------------------
// TYPES & DATA
// -----------------------------------------------------------------------------

interface Product {
    id: number;
    category: 'Twin Cone' | 'Regular Cone' | 'Custom Cone';
    name: string;
    color: string; 
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

const PRODUCTS: Product[] = [
    { id: 0, category: "Twin Cone", name: "Twin Choc Dip", color: "bg-amber-800/15", accent: "text-amber-900", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice1.png" },
    { id: 1, category: "Twin Cone", name: "Twin Nut", color: "bg-yellow-100", accent: "text-yellow-700", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice2.png" },
    { id: 2, category: "Twin Cone", name: "Twin Plain", color: "bg-pink-100", accent: "text-pink-600", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/twin_plain.png" },
    { id: 3, category: "Twin Cone", name: "Twin Sprinkle", color: "bg-fuchsia-100", accent: "text-fuchsia-700", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/Twin_Sprinkle.png" },
    { id: 4, category: "Twin Cone", name: "Twin Sherbert", color: "bg-purple-100", accent: "text-purple-600", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/twin_sherbert.png" },
    { id: 5, category: "Regular Cone", name: "Plain Cone", color: "bg-white", accent: "text-pink-600", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/plain_cone.png" },
    { id: 6, category: "Regular Cone", name: "Choc Dip Cone", color: "bg-amber-900/20", accent: "text-amber-900", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice6.png" },
    { id: 7, category: "Regular Cone", name: "Sprinkle Cone", color: "bg-fuchsia-100", accent: "text-fuchsia-700", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice8.png" },
    { id: 8, category: "Regular Cone", name: "Nut Cone", color: "bg-yellow-200", accent: "text-yellow-800", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/nut_cone.png" },
    { id: 9, category: "Regular Cone", name: "Sherbert Cone", color: "bg-purple-100", accent: "text-purple-600", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/sherbert_cone.png" },
    { id: 10, category: "Custom Cone", name: "Choc Dip w/ Kit Kat", color: "bg-amber-800/15", accent: "text-amber-900", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice7.png" },
    { id: 11, category: "Custom Cone", name: "Choc Dip w/ Nuts", color: "bg-amber-800/15", accent: "text-amber-900", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/choc_dip_cone.png" },
    { id: 12, category: "Custom Cone", name: "Kit‑Kat Cone", color: "bg-white", accent: "text-pink-600", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice_cream_menu2/Kit%E2%80%91Kat_Cone.png" },
    { id: 13, category: "Custom Cone", name: "Add KitKat", color: "bg-red-50", accent: "text-red-700", image: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/ice-cream-images/ice14.png" },
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
// SUB-COMPONENTS
// -----------------------------------------------------------------------------

const OptimizedIceCreamImage: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className="relative w-full h-52 flex items-end justify-center">
            <motion.img
                src={product.image}
                alt={product.name}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                className={`max-h-full w-auto object-contain object-bottom drop-shadow-2xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                width={300}
                height={400}
                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = '/images/menu/cones/fallback.webp';
                }}
            />
        </div>
    );
};

const ProductCard: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isKitKatAddon = product.name === "Add KitKat";
    const archStyle = { borderTopLeftRadius: 130, borderTopRightRadius: 130, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 };

    return (
        <motion.div layout className="relative">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`relative p-8 pt-32 pb-10 shadow-xl border min-h-[390px] bg-white flex flex-col items-center text-center transition-all duration-300 ${isKitKatAddon ? 'border-red-100' : 'border-pink-100'}`}
                style={archStyle}
            >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className={`absolute inset-0 z-0 ${product.color}`} style={archStyle} />
                <motion.div className="absolute -top-20 left-0 right-0 z-10" animate={isHovered ? { y: -12, scale: 1.05, rotate: 3 } : { y: 0, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <OptimizedIceCreamImage product={product} index={index} />
                </motion.div>
                <div className="relative z-20 mt-4 flex flex-col items-center flex-grow">
                    <span className={`mb-4 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${isKitKatAddon ? 'bg-red-600' : 'bg-pink-500'}`}>
                        {product.category}
                    </span>
                    <h3 className={`font-fredoka text-2xl font-bold leading-tight ${product.accent}`}>{product.name}</h3>
                    <div className="mt-auto pt-6 flex items-center justify-center gap-2 font-extrabold text-xs">
                        {isKitKatAddon ? (
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 border border-red-200">
                                <Package className="h-4 w-4" />
                                <span>Add for $1 Dollar</span>
                            </div>
                        ) : (
                            <><Star className="h-4 w-4 text-pink-500" fill="currentColor" /><span className="text-gray-800">Daily Specials</span></>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const MilkshakesAndSundaes: React.FC = () => (
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-40 bg-pink-50 p-8 md:p-12 rounded-[60px] shadow-2xl border-4 border-pink-100">
        <h3 id='milkshake' className="text-4xl font-fredoka font-extrabold text-pink-800 mb-10 flex items-center justify-center lg:justify-start">
            <Milk className="h-10 w-10 mr-4 text-pink-600" /> Milkshakes & Sundaes
        </h3>
        <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100">
                <h4 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><CupSoda className="h-6 w-6 mr-3 text-pink-500" /> Thick Milkshakes</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                    {MILKSHAKES_SUNDAES.MILKSHAKES.map((s) => (
                        <motion.div key={s.name} whileHover={{ scale: 1.05 }} className={`p-4 rounded-2xl ${s.bg} border border-white flex items-center gap-4 shadow-sm hover:shadow-md transition-all cursor-default`}>
                            <div className={`p-2 rounded-full bg-white ${s.color}`}><s.icon className="h-5 w-5" /></div>
                            <span className="font-bold text-gray-700">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="grid gap-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100 flex flex-wrap items-center justify-between gap-4">
                    <div><h4 className="text-2xl font-bold text-gray-800">Sundae Sizes</h4><p className="text-gray-500 text-sm font-medium">Classic Soft Serve Sundaes</p></div>
                    <div className="flex items-center bg-pink-500 px-8 py-3 rounded-2xl shadow-inner"><span className="text-xl font-black text-white tracking-widest">{MILKSHAKES_SUNDAES.SUNDAES.join(' / ')}</span></div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100">
                    <h4 className="text-2xl font-bold mb-6 text-gray-800">Extra Toppings</h4>
                    <div className="grid grid-cols-2 gap-6">
                        {MILKSHAKES_SUNDAES.ADD_ONS.map((a) => (
                            <div key={a.name} className="p-4 bg-yellow-50 rounded-2xl text-center border-2 border-dashed border-yellow-200 group transition-all hover:bg-yellow-100">
                                <a.icon className="h-8 w-8 mx-auto mb-2 text-amber-600 group-hover:scale-110 transition-transform" />
                                <p className="font-black text-amber-900 uppercase text-xs tracking-tighter">{a.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

// -----------------------------------------------------------------------------
// MAIN SECTION
// -----------------------------------------------------------------------------

export default function MenuPreviewSection() {
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
        <section id="menu" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center mb-24 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-pink-600 text-4xl sm:text-7xl">
                        <span>Our Full</span>
                        <motion.img src="/images/ice-cream-cone-About.png" alt="Ice cream" className="w-14 sm:w-20 mx-3 object-contain" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: 'spring' }} />
                        <span>Menu</span>
                    </motion.h2>
                    <p className="mt-6 text-gray-500 max-w-2xl text-lg font-medium">From crunchy toppings to classic scoops, customize your treat exactly how you like it.</p>
                </div>

                <div className="flex justify-end mb-20">
                    <select value={sortType} onChange={(e) => setSortType(e.target.value as keyof typeof SORT_OPTIONS)} className="appearance-none rounded-full border-2 border-pink-100 bg-white px-10 py-3 pr-14 text-pink-600 font-black shadow-sm focus:border-pink-300 outline-none cursor-pointer transition-all hover:shadow-md">
                        {Object.entries(SORT_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>

                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-36">
                    {sorted.map((p, idx) => <ProductCard key={p.id} product={p} index={idx} />)}
                </motion.div>

                <MilkshakesAndSundaes />
            </div>
        </section>
    );
}