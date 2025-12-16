import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { X  } from 'lucide-react';

// --- Type Definitions for TypeScript compliance ---

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// NOTE: The new form uses category, name, email, and message.
interface FormData {
    name: string;
    email: string;
    category: string;
    message: string;
}

// --- Configuration Data for the new form ---
const INQUIRY_CATEGORIES: string[] = [
    'Select a Category',
    'Catering/Events',
    'Flavor Suggestions',
    'Location/Hours',
    'Wholesale/Partnership',
    'Other'
];

// !!! IMPORTANT: Placeholder for Formspree URL (not strictly needed for UI integration but good practice)
const FORMSPREE_URL: string = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT_HERE'; 

// --- Inquiry Modal Component ---
const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
    // State for the new inquiry form structure
    const [category, setCategory] = useState<string>(INQUIRY_CATEGORIES[0]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Initial state matching the form fields for controlled inputs (Name, Email, Message)
    const [formData, setFormData] = useState<Omit<FormData, 'category'>>({
        name: '', email: '', message: ''
    });

    // Reset state when the modal opens
    React.useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setCategory(INQUIRY_CATEGORIES[0]);
            setError(null);
            setFormData({ name: '', email: '', message: '' });
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        if (category === INQUIRY_CATEGORIES[0]) {
            setError("Please select a valid inquiry category.");
            return;
        }

        // Simulate network submission and formspree error checking
        if (FORMSPREE_URL.includes('YOUR_FORMSPREE_ENDPOINT_HERE')) {
             console.warn("Formspree URL is placeholder. Simulating success.");
             setTimeout(() => {
                 setIsSubmitted(true);
             }, 500);
             return;
        }

        const dataToSend = { ...formData, category };
        
        try {
            // Replace with your actual fetch call to Formspree
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                const responseData = await response.json();
                setError(responseData.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            setError("A network error occurred. Check your connection.");
        }
    };

    // --- SUCCESS CONTENT ---
    const SuccessContent = (
        <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-10 text-center"
        >
            {/* Ice Cream Icon (Star/Sparkle) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-pink-500 mb-6 animate-spin-slow" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l3.084 9.477c.187.575.617 1.05.996 1.345l.983.793a1 1 0 01-1.09 1.637l-1.996-.341c-.48-.082-.97.054-1.37.362L10 18.067l-2.652-3.834c-.4-.308-.89-.444-1.37-.362l-1.996.341a1 1 0 01-1.09-1.637l.983-.793c.379-.295.809-.77.996-1.345l3.084-9.477z" />
            </svg>
            <h4 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">
                Sprinkles on Top! Inquiry Received.
            </h4>
            <p className="text-lg text-gray-600 mb-6">
                Your message is chilling with us. We promise to get back to you faster than a melting cone!
            </p>

            {/* --- New CTAs --- */}
            <div className="space-y-4">
                <a 
                    href="#booking" 
                    onClick={onClose}
                    className="block w-full px-4 py-3 bg-teal-500 text-white font-bold rounded-full text-lg hover:bg-teal-600 transition-colors shadow-xl shadow-teal-300/50"
                >
                    <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Book Your Ice Cream Event Now!
                    </span>
                </a>
                <a 
                    href="#faq"
                    onClick={onClose}
                    className="block w-full px-4 py-2 bg-pink-100 text-pink-600 font-bold rounded-lg hover:bg-pink-200 transition-colors"
                >
                    Check Out Our FAQs
                </a>
            </div>
            {/* --- End New CTAs --- */}

        </motion.div>
    );

    // --- FORM CONTENT ---
    const FormContent = (
        <motion.div
            key="form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 } as Transition}
        >
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">
                    Select a category and fill out the details below.
                </p>
                
                {/* Category Select Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <div className="relative">
                        <select
                            required
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 appearance-none bg-white pr-10 cursor-pointer"
                        >
                            {INQUIRY_CATEGORIES.map((cat: string) => (
                                <option key={cat} value={cat} disabled={cat === INQUIRY_CATEGORIES[0]}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                
                {/* Name Input Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" 
                    />
                </div>
                
                {/* Email Input Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" 
                    />
                </div>
                
                {/* Message Textarea */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Message</label>
                    <textarea 
                        rows={3} 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    ></textarea>
                </div>
                
                {/* Error Message Display */}
                {error && (
                    <div className="p-3 bg-red-100 text-red-700 border-l-4 border-red-500 rounded-r-lg">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-3 bg-pink-500 text-white font-bold rounded-full text-lg hover:bg-pink-600 transition-colors shadow-lg shadow-pink-300/50"
                >
                    Send Question
                </button>
            </form>
        </motion.div>
    );

    if (!isOpen) return null;

    return (
        // Modal Overlay
        <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
            onClick={onClose}
        >
            {/* Modal Content */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative" 
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-pink-500 p-6 flex justify-between items-center sticky top-0 z-10 shadow-md rounded-t-xl">
                    <h3 className="text-2xl font-fredoka font-bold text-white">
                        {isSubmitted ? "Sweet Success!" : "Ask Us a Question!"}
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-white hover:text-pink-100 transition p-2 rounded-full hover:bg-pink-600"
                        aria-label="Close Modal"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <AnimatePresence mode="wait">
                    {isSubmitted ? SuccessContent : FormContent}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};


// --- Main App Component (renamed to MoreQuestionsSection) ---
const MoreQuestionsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Tailwind Fix Style
    const TailwindFixStyle = `
      .font-fredoka { font-family: Fredoka, sans-serif; }
    `;

    // Animation variants
    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            } 
        },
    };

    const itemVariants: Variants = { 
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };
    
    // Placeholder image URL
    const imageUrl = "https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/truck_proto1.png";

    return (
        <>
            <section 
                id="faq-promo"
                className="relative bg-white overflow-hidden py-20 lg:py-0"
            >
                {/* Custom Font style import (assuming Fredoka is loaded via CSS link or environment) */}
                <style>{TailwindFixStyle}</style>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={sectionVariants}
                    className="mx-auto max-w-7xl relative"
                >
                    <div className="lg:grid lg:grid-cols-2 lg:h-[700px]">
                        
                        {/* Left Content Area */}
                        <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-pink-50/70">
                            <div className="max-w-md w-full">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-extrabold text-slate-900 mb-6"
                                >
                                    Got Questions?
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl text-slate-700 mb-10 leading-relaxed"
                                >
                                    We'll give you the scoop on the most common questions we get asked.
                                    Ready to find out about pricing, minimums, and menu options?
                                </motion.p>
                                
                                {/* Two Responsive Buttons Implementation */}
                                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                                    {/* Secondary Button: Read Our FAQs (Links to anchor on booking page) */}
                                    <motion.a 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="/booking#faq" 
                                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-pink-600 bg-white hover:bg-pink-100 transition-all shadow-xl shadow-pink-200/50 ring-4 ring-pink-100 uppercase tracking-wide w-full sm:w-1/2"
                                    >
                                        Read Our FAQs
                                    </motion.a>

                                    {/* Primary Button: Make An Inquiry (Opens Modal) */}
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsModalOpen(true)}
                                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-xl shadow-pink-300/50 ring-4 ring-pink-300/50 uppercase tracking-wide w-full sm:w-1/2"
                                    >
                                        Make An Inquiry
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Image Area */}
                        <div className="relative h-96 lg:h-full overflow-hidden">
                            <motion.img
                              loading="lazy" 
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src={imageUrl}
                                alt="Ice cream van at a cheerful event"
                                className="w-full h-full object-cover lg:object-contain"
                                // Corrected: Explicitly cast 'e.target' to HTMLImageElement
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                                    (e.target as HTMLImageElement).onerror = null; 
                                    (e.target as HTMLImageElement).src="https://placehold.co/1000x600/94a3b8/1e293b?text=Ice+Cream+Event+Placeholder" 
                                }}
                            />
                            {/* Pink gradient overlay to match the design's fade effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/70 to-transparent lg:from-pink-50/70"></div>
                        </div>
                    </div>
                </motion.div>
            </section>
            
            {/* Inquiry Form Modal */}
            <InquiryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}

export default MoreQuestionsSection;