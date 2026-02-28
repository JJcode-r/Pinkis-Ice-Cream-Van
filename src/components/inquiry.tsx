// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- Type Definitions ---
// interface InquiryModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// interface StickyButtonProps {
//     onOpen: () => void;
//     isVisible: boolean;
// }

// const FORMSPREE_URL: string = 'https://formspree.io/f/mykgkjjq'; 

// // --- InquiryModal Component ---
// const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
//     const INQUIRY_CATEGORIES: string[] = [
//         'How can we help you?',
//         'Book the Truck (Events)',
//         'Find the Truck (Location)',
//         'New Flavor Suggestions',
//         'Wholesale & Partnerships',
//         'General Question'
//     ];
    
//     const [category, setCategory] = useState<string>(INQUIRY_CATEGORIES[0]);
//     const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
    
//     useEffect(() => {
//         if (isOpen) {
//             setIsSubmitted(false);
//             setCategory(INQUIRY_CATEGORIES[0]);
//             setError(null);
//         }
//     }, [isOpen]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();
//         setError(null);

//         const form = e.currentTarget;
//         const formData = new FormData(form);
//         const data = Object.fromEntries(formData.entries());

//         if (data.category === INQUIRY_CATEGORIES[0]) {
//             setError("Please let us know what you're interested in.");
//             return;
//         }

//         try {
//             const response = await fetch(FORMSPREE_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 setIsSubmitted(true);
//             } else {
//                 setError("Oops! Something went wrong. Please try again.");
//             }
//         } catch (err) {
//             setError("Network error. Please check your connection.");
//         }
//     };

//     const SuccessContent = (
//         <motion.div 
//             key="success"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="p-10 text-center"
//         >
//             <motion.div
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 className="mb-6 flex justify-center"
//             >
//                 <img 
//                     src="/images/ice-cream-cone-About.png" 
//                     alt="Success" 
//                     className="h-24 w-auto drop-shadow-lg"
//                 />
//             </motion.div>

//             <h4 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">
//                 Sprinkles on Top!
//             </h4>
//             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                 Your inquiry has been received. Our team is already scooping up an answer for you!
//             </p>

//             <div className="space-y-3">
//                 <a 
//                     href="/booking" 
//                     onClick={onClose}
//                     className="block w-full px-4 py-4 bg-teal-500 text-white font-bold rounded-full text-lg hover:bg-teal-600 transition-all shadow-lg shadow-teal-200 text-center"
//                 >
//                     View Pricing & Packages
//                 </a>
//                 <button 
//                     onClick={onClose}
//                     className="w-full text-pink-600 font-bold hover:underline"
//                 >
//                     Back to Browsing
//                 </button>
//             </div>
//         </motion.div>
//     );

//     const FormContent = (
//         <motion.div
//             key="form"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="p-8"
//         >
//             <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                     <label className="block text-gray-700 font-bold font-fredoka mb-2">Inquiry Type</label>
//                     <select
//                         required
//                         name="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="w-full p-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-pink-50/30"
//                     >
//                         {INQUIRY_CATEGORIES.map((cat) => (
//                             <option key={cat} value={cat} disabled={cat === INQUIRY_CATEGORIES[0]}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-gray-700 font-bold font-fredoka mb-2">Your Name</label>
//                         <input type="text" name="name" required className="w-full p-3 border-2 border-pink-100 rounded-xl focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" />
//                     </div>
//                     <div>
//                         <label className="block text-gray-700 font-bold font-fredoka mb-2">Email Address</label>
//                         <input type="email" name="email" required className="w-full p-3 border-2 border-pink-100 rounded-xl focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" />
//                     </div>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-bold font-fredoka mb-2">Message</label>
//                     <textarea rows={4} name="message" placeholder="Tell us more about your event..." required className="w-full p-3 border-2 border-pink-100 rounded-xl focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" />
//                 </div>
                
//                 {error && (
//                     <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
//                         {error}
//                     </div>
//                 )}

//                 <button
//                     type="submit"
//                     className="w-full px-4 py-4 bg-pink-600 text-white font-bold rounded-full text-lg hover:bg-pink-700 transition-all shadow-xl shadow-pink-200"
//                 >
//                     Send Scoop Request
//                 </button>
//             </form>
//         </motion.div>
//     );

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div 
//                     className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={onClose} 
//                 >
//                     <motion.div
//                         className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden relative"
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: 50, opacity: 0 }}
//                         onClick={(e) => e.stopPropagation()} 
//                     >
//                         <div className="bg-pink-600 p-6 flex justify-between items-center text-white">
//                             <h3 className="text-2xl font-fredoka font-bold">
//                                 {isSubmitted ? "Sweet Success!" : "Get in Touch"}
//                             </h3>
//                             <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>
                        
//                         <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
//                             <AnimatePresence mode="wait">
//                                 {isSubmitted ? SuccessContent : FormContent}
//                             </AnimatePresence>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// // --- StickyInquiryButton Component ---
// const StickyInquiryButton: React.FC<StickyButtonProps> = ({ onOpen, isVisible }) => {
//     return (
//         <AnimatePresence>
//             {isVisible && (
//                 <motion.button
//                     className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full shadow-2xl 
//                                bg-pink-600 text-white font-bold text-lg font-fredoka 
//                                hover:bg-pink-700 transition-all flex items-center gap-2"
//                     onClick={onOpen}
//                     initial={{ y: 100, opacity: 0 }}
//                     animate={{ 
//                         y: 0, 
//                         opacity: 1,
//                         scale: [1, 1.05, 1], // Subtle breathing pulse
//                     }}
//                     exit={{ y: 100, opacity: 0 }}
//                     transition={{
//                         scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
//                         default: { duration: 0.4 }
//                     }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                 >
//                     <span>Ask a Question</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                     </svg>
//                 </motion.button>
//             )}
//         </AnimatePresence>
//     );
// };

// const InquiryFloatingWidget: React.FC = () => {
//     const [isModalOpen, setIsModal] = useState<boolean>(false);
//     const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
    
//     const handleScroll = useCallback((): void => {
//         const scrollPosition = window.scrollY;
//         const windowHeight = window.innerHeight;
//         const fullHeight = document.documentElement.scrollHeight;
        
//         const hasScrolledEnough = scrollPosition > windowHeight * 0.5;
//         const isNearBottom = (scrollPosition + windowHeight) > (fullHeight - 300);

//         setIsButtonVisible(hasScrolledEnough && !isNearBottom);
//     }, []);

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         handleScroll();
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [handleScroll]);

//     return (
//         <>
//             <StickyInquiryButton onOpen={() => setIsModal(true)} isVisible={isButtonVisible} />
//             <InquiryModal isOpen={isModalOpen} onClose={() => setIsModal(false)} />
//         </>
//     );
// };

// export default InquiryFloatingWidget;

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_EMAIL = "Pinkisicecream@outlook.com";

const StickyInquiryButton: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleAction = () => {
        // 1. Attempt to open email
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=Inquiry for the Pinki's Team&body=Hello Team,`;
        
        // 2. Show the backup info popup
        setShowTooltip(true);
        
        // Hide popup after 6 seconds
        setTimeout(() => setShowTooltip(false), 6000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* --- Backup Information Popup --- */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-xl max-w-[240px] text-center"
                    >
                        <p className="text-gray-600 font-fredoka text-sm mb-2">
                            Opening your mail app...
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                            Or copy our email:
                        </p>
                        <button 
                            onClick={() => navigator.clipboard.writeText(CONTACT_EMAIL)}
                            className="text-pink-600 font-bold font-fredoka text-sm hover:underline break-all"
                        >
                            {CONTACT_EMAIL}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Main Sticky Button --- */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        className="px-6 py-4 rounded-full shadow-2xl bg-pink-600 text-white font-bold text-lg font-fredoka 
                                   hover:bg-pink-700 transition-all flex items-center gap-2"
                        onClick={handleAction}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, scale: [1, 1.05, 1] }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            default: { duration: 0.4 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span>Contact the Team</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

const InquiryFloatingWidget: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    const handleScroll = useCallback((): void => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        setIsVisible(scrollPosition > windowHeight * 0.5 && (scrollPosition + windowHeight) < (fullHeight - 300));
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return <StickyInquiryButton isVisible={isVisible} />;
};

export default InquiryFloatingWidget;