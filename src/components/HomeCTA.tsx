import { motion } from 'framer-motion';
import { Handshake, BookOpen } from 'lucide-react';

const FinalCtaStrip = () => {
    const iceCreamImageUrl = "/images/ice-cream-cone-About.png";

    return (
        <section className="bg-[#431C5D] py-20 px-6 md:px-10 lg:px-20 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300/10 rounded-full opacity-20 pointer-events-none" />

            {/* Decorative Ice Cream Cone Image */}
            <motion.img
                src={iceCreamImageUrl}
                alt="Signature Ice Cream Cone"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                        'https://placehold.co/220x280/431C5D/FFC0CB?text=Cone';
                }}
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[280px] object-cover rounded-3xl shadow-2xl shadow-pink-500/30 z-0 rotate-3"
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-10 relative z-10 p-8 rounded-3xl"
            >
                
                {/* Text Content */}
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-grow">
                    <Handshake className="w-14 h-14 text-pink-300 flex-shrink-0 p-2 border-2 border-pink-300 rounded-xl" />
                    <div>
                        <h3 className="text-3xl md:text-5xl font-fredoka font-extrabold text-white mb-2 leading-snug">
                            Ready to make it official?
                        </h3>
                        <p className="text-xl text-pink-100">
                            Secure the date for your unforgettable sweet event today!
                        </p>
                    </div>
                </div>

                {/* Buttons - Fixed widths applied here */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end flex-shrink-0">
                    
                    <motion.a 
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        whileTap={{ scale: 0.95 }}
                        href="/booking"
                        className="inline-flex items-center px-8 py-4 text-lg font-extrabold rounded-full text-[#431C5D] bg-pink-400 hover:bg-pink-300 transition-all shadow-2xl shadow-pink-500/50 uppercase tracking-widest ring-4 ring-pink-200/50 min-w-[280px] justify-center"
                    >
                        Book Your Date Now!
                    </motion.a>

                    <motion.a 
                        whileHover={{ scale: 1.05, rotate: -1, backgroundColor: '#EC4899', color: '#431C5D' }}
                        whileTap={{ scale: 0.95 }}
                        href="/menu"
                        className="inline-flex items-center px-8 py-4 text-lg font-extrabold rounded-full bg-transparent text-pink-400 border-4 border-pink-400 transition-all shadow-md shadow-pink-500/10 uppercase tracking-widest min-w-[280px] justify-center"
                    >
                        <BookOpen className="w-5 h-5 mr-2" />
                        View Menu
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
};

export default FinalCtaStrip;