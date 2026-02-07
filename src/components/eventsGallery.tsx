import { useState, useEffect, type FC } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

const CONE_ICON_URL = "/images/ice-cream-cone-About.png"; 

const GALLERY_IMAGES = [
    { url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/KidCustomers.jpg", alt: "Pinki's Ice Cream Van Event 1" },
    { url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/add.webp", alt: "Pinki's Ice Cream Van Event 2" },
    { url: "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/sportVan.webp", alt: "Pinki's Ice Cream Van Event 3" },
    // Add more images here - they will automatically align in the grid
];

const GallerySection : FC = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const splitTextVariants: Variants = {
        hidden: { opacity: 0, x: 0 },
        visible: (direction: 'left' | 'right') => ({ 
            opacity: 1, 
            x: isDesktop ? (direction === 'left' ? -40 : 40) : 0, 
            transition: { type: "spring", stiffness: 50, damping: 15 } as Transition 
        }),
    };

    const coneVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
        visible: { 
            opacity: 1, scale: 1, rotateY: 360, 
            transition: { type: "spring", stiffness: 50, damping: 10 } as Transition 
        },
    };

    return (
        <section id="gallery" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <header className="relative mb-16 text-center">
                    <motion.h2 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.5 }} 
                        className="flex flex-wrap justify-center items-center font-fredoka font-extrabold text-pink-600 mb-6"
                    >
                        <motion.span variants={splitTextVariants} custom="left" className="text-4xl md:text-5xl lg:text-6xl uppercase">
                            SEE US IN
                        </motion.span>
                        <motion.img 
                            src={CONE_ICON_URL} 
                            variants={coneVariants} 
                            className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain mx-4" 
                        />
                        <motion.span variants={splitTextVariants} custom="right" className="text-4xl md:text-5xl lg:text-6xl uppercase">
                            ACTION
                        </motion.span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-600 font-medium max-w-2xl mx-auto"
                    >
                        Spreading joy at school carnivals and corporate headquarters.
                    </motion.p>
                </header>

                {/* --- UNIFORM GRID (Fixed Height) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GALLERY_IMAGES.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full"
                        >
                            <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-200 border-4 border-white shadow-lg transition-all duration-500 hover:shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                                
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    loading="lazy" 
                                    className="w-full h-full object-cover transition-transform duration-[3000ms] ease-in-out group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 ease-in-out pointer-events-none" />
                                
                                <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-white/10 transition-all duration-500 rounded-[2.5rem] pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;