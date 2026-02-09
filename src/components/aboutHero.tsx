"use client";

import { motion } from "framer-motion";

const TailwindFixStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    .font-fredoka { font-family: 'Fredoka', sans-serif; }
    .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
`;

export default function AboutHero() {
    return (
        /* REMOVED: overflow-hidden 
           ADDED: overflow-x-hidden (This keeps the bottom open while preventing side-scrolling)
        */
        <section className="relative w-full min-h-[100dvh] overflow-x-hidden flex items-center bg-pink-50">
            <style>{TailwindFixStyle}</style>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 z-0"></div>

            <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6 lg:px-20 pt-32 pb-24 lg:py-24 relative z-20">
                
                {/* Left Text */}
                <motion.div
                    className="lg:w-1/2 text-center lg:text-left relative z-20"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-fredoka text-pink-600 leading-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        The Sweetest Story Since 2015
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        We're not just serving ice cream; we're serving nostalgia, crafted with Grandma Pinki's secret recipes.
                    </motion.p>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/KidCustomer.jpg"
                        alt="Pinki's ice cream joy"
                        className="w-full max-w-md object-cover rounded-3xl shadow-2xl border-8 border-white"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>
            </div>

            {/* Van Image 
                - Pushed down with bottom-[-60px] to sit AFTER the paragraph.
                - It will now bleed over into the next section instead of disappearing.
            */}
            <motion.img
                src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/newVan.png"
                alt="Ice Cream Van"
                className="absolute bottom-[-60px] lg:bottom-0 right-0 w-72 sm:w-96 md:w-[500px] lg:w-[600px] z-10 opacity-100"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                    delay: 0.3,
                }}
            />
        </section>
    );
}