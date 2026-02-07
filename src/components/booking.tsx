"use client";

import { useState, useRef, type FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, Utensils, Send, CheckCircle, ChevronRight, ChevronLeft, 
    Loader2,  Building2, AlertCircle, Sparkles, Receipt
} from 'lucide-react';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykgkjjq";

const CustomStyles: FC = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
        .text-brand-primary { color: #db2777; }
        .bg-brand-primary { background-color: #db2777; }
        .shadow-3xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        .text-shadow-strong { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 1px rgba(0, 0, 0, 0.4); }
        #booking-form { scroll-margin-top: 100px; }
    `}</style>
);

const IMAGE_URLS = ['https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/van1.webp'];

const steps = [
    { id: 1, label: "Event Info", icon: Calendar },
    { id: 2, label: "Service Plan", icon: Utensils },
    { id: 3, label: "Confirm", icon: Send },
];

export default function BookingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [minDate, setMinDate] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleScroll = () => {
        const formElement = document.getElementById('booking-form');
        if (formElement) {
            const y = formElement.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const validateStep = (step: number) => {
        if (!formRef.current) return true;
        const currentStepContainer = formRef.current.querySelector(`[data-step-container="${step}"]`);
        if (!currentStepContainer) return true;

        const inputs = currentStepContainer.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        setError(null);

        inputs.forEach((input: any) => {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
            }
            if (step === 1 && input.name === "Date") {
                const selectedDate = new Date(input.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (input.value && selectedDate < today) {
                    setError("Whoops! Please choose a date in the future.");
                    isValid = false;
                }
            }
        });
        return isValid;
    };

    const nextStep = () => { if (validateStep(currentStep)) { setCurrentStep(prev => prev + 1); handleScroll(); } };
    const prevStep = () => { setCurrentStep(prev => prev - 1); setError(null); handleScroll(); };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep(3)) return;
        setIsSubmitted(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) { setIsConfirmed(true); handleScroll(); }
            else { setError("Submission failed. Please check your details."); }
        } catch (err) { setError("Network error. Please try again."); } 
        finally { setIsSubmitted(false); }
    };

    return (
        <section id="booking-form" className="w-full py-20 relative overflow-hidden min-h-screen">
            <CustomStyles />
            <div className="absolute inset-0 -z-10 bg-pink-900">
                <img src={IMAGE_URLS[0]} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="background" />
            </div>

            <div className="mx-auto max-w-4xl px-4 relative z-10 w-full">
                <div className="text-center mb-12">
                    <h2 className="flex flex-wrap items-center justify-center font-fredoka font-extrabold text-brand-primary mb-2 text-4xl sm:text-5xl lg:text-6xl text-shadow-strong uppercase">
                        <span>BOOK</span>
                        <img src="/images/ice-cream-cone-About.png" className="w-10 h-14 sm:w-12 sm:h-16 mx-2 object-contain" alt="cone" />
                        <span>PINKI'S</span>
                    </h2>
                    <p className="text-xl text-white text-shadow-strong">Professional Service for Professional Organizations.</p>
                </div>

                <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-6 md:p-12 shadow-3xl">
                    <AnimatePresence mode="wait">
                        {isConfirmed ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 font-fredoka">
                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Request Sent!</h3>
                                <p className="text-gray-600">We'll provide a formal quote within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8" noValidate>
                                
                                <div className="flex justify-between mb-10 border-b-2 border-pink-100 pb-6">
                                    {steps.map((step) => (
                                        <div key={step.id} className="relative flex flex-col items-center flex-1 mx-2">
                                            <div className={`p-3 rounded-full transition-all duration-300 ${currentStep === step.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-pink-50 text-pink-300'}`}>
                                                <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </div>
                                            <span className={`mt-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-brand-primary' : 'text-gray-400'}`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* STEP 1: EVENT DETAILS */}
                                <div className={currentStep === 1 ? "block space-y-6" : "hidden"} data-step-container="1">
                                    <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Building2 className="w-6 h-6 mr-2 text-pink-500" /> Organization Details</h3>
                                    {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Organization Name *</label><input type="text" name="Org_Name" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Event Type *</label><select name="Event_Type" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required><option value="">Select Category</option><option value="school">School</option><option value="corporate">Corporate</option><option value="community">Community</option></select></div>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label><input type="date" name="Date" min={minDate} className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Time *</label><input type="time" name="Time" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label><select name="Duration" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required><option value="1">1 Hour</option><option value="2">2 Hours</option><option value="3+">3+ Hours</option></select></div>
                                    </div>
                                    <div className="grid sm:grid-cols-4 gap-4">
                                        <div className="sm:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-1">Address *</label><input type="text" name="Address" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                        <div className="sm:col-span-1"><label className="block text-sm font-medium text-gray-700 mb-1">Postcode *</label><input type="text" name="Postcode" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                    </div>
                                </div>

                                {/* STEP 2: SERVICE PLAN (UPDATED WITH YOUR TEXT) */}
                                <div className={currentStep === 2 ? "block space-y-6" : "hidden"} data-step-container="2">
                                    <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Utensils className="w-6 h-6 mr-2 text-pink-500" /> Service Plan</h3>
                                    
                                    <div className="grid gap-4">
                                        <label className="relative flex flex-col md:flex-row items-start md:items-center p-6 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-200 transition-all has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 group">
                                            <input type="radio" name="Pricing_Plan" value="Upfront" className="sr-only" defaultChecked />
                                            <div className="p-3 rounded-xl bg-pink-100 text-pink-600 mr-4 mb-4 md:mb-0 group-has-[:checked]:bg-pink-500 group-has-[:checked]:text-white">
                                                <Receipt className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="font-fredoka font-bold text-gray-900 text-xl block mb-1">Option 1: Upfront Payment</span>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    Pay a fixed cost based on the number of ice creams you want. Simply share your event details, confirm your order, and the ice cream van will arrive on time, ready to serve your guests.
                                                </p>
                                            </div>
                                        </label>

                                        <label className="relative flex flex-col md:flex-row items-start md:items-center p-6 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-pink-200 transition-all has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 group">
                                            <input type="radio" name="Pricing_Plan" value="PAYG" className="sr-only" />
                                            <div className="p-3 rounded-xl bg-pink-100 text-pink-600 mr-4 mb-4 md:mb-0 group-has-[:checked]:bg-pink-500 group-has-[:checked]:text-white">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-fredoka font-bold text-gray-900 text-xl">Option 2: Pay-As-You-Go</span>
                                                    <span className="bg-pink-200 text-pink-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Popular</span>
                                                </div>
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    No upfront fees! The ice cream van sells directly to your guests at the event. Perfect for fundraisers, office events, or large gatherings. <span className="italic">(A minimum sale guarantee may apply.)</span>
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Expected Attendance *</label><select name="Attendance" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required><option value="">Select Range</option><option value="50-100">50-100</option><option value="100-250">100-250</option><option value="250+">250+</option></select></div>
                                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Dietary Notes</label><textarea name="Dietary" rows={2} className="w-full p-3 border border-gray-300 rounded-xl outline-none" placeholder="e.g. Gluten-free, Nut allergies..."></textarea></div>
                                </div>

                                {/* STEP 3: CONTACT INFO */}
                                <div className={currentStep === 3 ? "block space-y-6" : "hidden"} data-step-container="3">
                                    <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Send className="w-6 h-6 mr-2 text-pink-500" /> Contact Info</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input type="text" name="Contact_Name" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input type="tel" name="Phone" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" name="Email" className="w-full p-3 border border-gray-300 rounded-xl outline-none" required /></div>
                                    <button type="submit" disabled={isSubmitted} className="w-full py-4 bg-brand-primary text-white font-fredoka font-bold text-xl rounded-full shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 mt-4 flex justify-center">
                                        {isSubmitted ? <Loader2 className="animate-spin h-6 w-6" /> : "Send Booking Request"}
                                    </button>
                                </div>

                                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                    {currentStep > 1 && (
                                        <button type="button" onClick={prevStep} className="text-gray-500 font-bold flex items-center gap-2 hover:text-pink-600 transition-colors">
                                            <ChevronLeft className="w-5 h-5" /> Back
                                        </button>
                                    )}
                                    {currentStep < 3 && (
                                        <button type="button" onClick={nextStep} className="ml-auto px-10 py-3 bg-pink-600 text-white rounded-full font-fredoka font-bold shadow-lg hover:bg-pink-700 transition-all">
                                            Next Step <ChevronRight className="inline w-5 h-5 ml-1" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}