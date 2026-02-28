import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- Type Definitions ---
interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    category: string;
    message: string;
}

// Updated Categories to align with the vision
const INQUIRY_CATEGORIES: string[] = [
    'How can we help you?',
    'Book the Truck (Events)',
    'Find the Truck (Location)',
    'New Flavor Suggestions',
    'Wholesale & Partnerships',
    'General Question'
];

const FORMSPREE_URL: string = 'https://formspree.io/f/mykgkjjq'; 

// --- Inquiry Modal Component ---
const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
    const [category, setCategory] = useState<string>(INQUIRY_CATEGORIES[0]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<FormData, 'category'>>({
        name: '', email: '', message: ''
    });

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
            setError("Please select an inquiry category.");
            return;
        }

        const dataToSend = { ...formData, category };
        
        try {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-10 text-center"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 flex justify-center"
            >
                <img 
                    src="/images/ice-cream-cone-About.png" 
                    alt="Success" 
                    className="h-24 w-auto drop-shadow-lg"
                />
            </motion.div>
            <h4 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">
                Sprinkles on Top!
            </h4>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Your inquiry has been received. Our team is already scooping up an answer for you!
            </p>

            <div className="space-y-4">
                <a 
                    href="#booking" 
                    onClick={onClose}
                    className="block w-full px-4 py-3 bg-teal-500 text-white font-bold rounded-full text-lg hover:bg-teal-600 transition-all shadow-xl shadow-teal-300/50"
                >
                    Book Your Event Now
                </a>
                <button 
                    onClick={onClose}
                    className="text-pink-600 font-bold hover:underline"
                >
                    Back to Browsing
                </button>
            </div>
        </motion.div>
    );

    // --- FORM CONTENT ---
    const FormContent = (
        <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-bold font-fredoka mb-2">How can we help?</label>
                    <div className="relative">
                        <select
                            required
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 appearance-none bg-pink-50/30 cursor-pointer outline-none"
                        >
                            {INQUIRY_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat} disabled={cat === INQUIRY_CATEGORIES[0]}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-pink-500">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-bold font-fredoka mb-2">Name</label>
                        <input 
                            type="text" name="name" value={formData.name} onChange={handleChange} required 
                            className="w-full p-3 border-2 border-pink-100 rounded-xl focus:border-pink-500 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold font-fredoka mb-2">Email</label>
                        <input 
                            type="email" name="email" value={formData.email} onChange={handleChange} required 
                            className="w-full p-3 border-2 border-pink-100 rounded-xl focus:border-pink-500 outline-none" 
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-gray-700 font-bold font-fredoka mb-2">Your Message</label>
                    <textarea 
                        rows={3} name="message" value={formData.message} onChange={handleChange} required 
                        className="w-full p-3 border-2 border-pink-100 rounded-xl focus:border-pink-500 outline-none"
                    ></textarea>
                </div>
                
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full px-4 py-4 bg-pink-600 text-white font-bold rounded-full text-lg hover:bg-pink-700 transition-all shadow-xl shadow-pink-200"
                >
                    Send Scoop Request
                </button>
            </form>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden relative" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="bg-pink-600 p-6 flex justify-between items-center text-white">
                            <h3 className="text-2xl font-fredoka font-bold">
                                {isSubmitted ? "Sweet Success!" : "Get the Scoop"}
                            </h3>
                            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? SuccessContent : FormContent}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const MoreQuestionsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section id="faq-promo" className="relative bg-white overflow-hidden py-20 lg:py-0">
                <div className="mx-auto max-w-7xl relative">
                    <div className="lg:grid lg:grid-cols-2 lg:h-[700px]">
                        
                        {/* Left Content Area */}
                        <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-pink-50/70">
                            <div className="max-w-md w-full">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-extrabold text-slate-900 mb-6">
                                    Got Questions?
                                </h2>
                                <p className="text-xl text-slate-700 mb-10 leading-relaxed">
                                    We'll give you the scoop on the most common questions we get asked.
                                    Ready to find out about pricing, minimums, and menu options?
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.a 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="/booking#faq" 
                                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-pink-600 bg-white hover:bg-pink-100 transition-all shadow-xl shadow-pink-200/50 ring-4 ring-pink-100 uppercase tracking-wide w-full sm:w-1/2"
                                    >
                                        Read Our FAQs
                                    </motion.a>

                                    {/* UPDATED: LINK TO EMAIL INSTEAD OF MODAL */}
                                    <motion.a 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="mailto:contact@pinkisicecream.com?subject=Inquiry for the Pinki's Team&body=Hello Team,"
                                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-xl shadow-pink-300/50 ring-4 ring-pink-300/50 uppercase tracking-wide w-full sm:w-1/2"
                                    >
                                        Make An Inquiry
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Right Image Area */}
                        <div className="relative h-96 lg:h-full overflow-hidden">
                            <img
                                loading="lazy" 
                                src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/newVan.png"
                                alt="Ice cream truck"
                                className="w-full h-full object-cover object-right"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/70 to-transparent lg:from-pink-50/70"></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default MoreQuestionsSection;