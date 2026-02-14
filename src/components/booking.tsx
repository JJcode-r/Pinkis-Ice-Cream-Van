"use client";

import { useState, useRef, type FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, Send, CheckCircle, ChevronRight, ChevronLeft, 
    Loader2,  Building2, AlertCircle, Info, Users
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
        #booking-card { scroll-margin-top: 120px; }
    `}</style>
);

const IMAGE_URLS = ['https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/van1.webp'];

const steps = [
    { id: 1, label: "Event Details", icon: Calendar },
    { id: 2, label: "Get My Quote", icon: Send },
];

export default function BookingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [minDate, setMinDate] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleScrollToForm = () => {
        if (cardRef.current) {
            const yOffset = -100; 
            const y = cardRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
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

    const nextStep = () => { 
        if (validateStep(currentStep)) { 
            setCurrentStep(prev => prev + 1); 
            setTimeout(handleScrollToForm, 50);
        } 
    };
    const prevStep = () => { 
        setCurrentStep(prev => prev - 1); 
        setError(null); 
        setTimeout(handleScrollToForm, 50);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateStep(2)) return;
        setIsSubmitted(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) { setIsConfirmed(true); handleScrollToForm(); }
            else { setError("Submission failed. Please check your details."); }
        } catch (err) { setError("Network error. Please try again."); } 
        finally { setIsSubmitted(false); }
    };

    return (
        <section id="booking-form" className="w-full py-20 relative overflow-hidden min-h-screen font-fredoka">
            <CustomStyles />
            <div className="absolute inset-0 -z-10 bg-pink-900">
                <img src={IMAGE_URLS[0]} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="background" />
            </div>

            <div className="mx-auto max-w-4xl px-4 relative z-10 w-full">
                <div className="text-center mb-12">
                    <h2 className="flex flex-wrap items-center justify-center font-extrabold text-brand-primary mb-4 text-4xl sm:text-5xl lg:text-6xl text-shadow-strong uppercase leading-tight">
                        <span>SECURE YOUR</span>
                        <img src="/images/ice-cream-cone-About.png" className="w-10 h-14 sm:w-12 sm:h-16 mx-3 object-contain" alt="cone" />
                        <span>DATE TODAY</span>
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl text-white text-shadow-strong font-medium">
                            Fill out the form below to lock in your date. We’ll get back to you within 24 hours with a <span className="text-pink-300">custom, no-obligation quote</span>.
                        </p>
                    </div>
                </div>

                <div ref={cardRef} id="booking-card" className="bg-white/95 backdrop-blur-md rounded-[3rem] p-6 md:p-12 shadow-3xl transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {isConfirmed ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">Request Received!</h3>
                                <p className="text-gray-600 text-lg mb-8">We've got your details. Our team will manually review your requirements and email your custom quote within 24 hours.</p>
                                <button onClick={() => window.location.href='/'} className="px-10 py-3 bg-pink-600 text-white rounded-full font-bold shadow-lg hover:bg-pink-700 active:scale-95 transition-all">Return Home</button>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8" noValidate>
                                
                                {/* PROGRESS BAR */}
                                <div className="flex justify-center mb-10 border-b-2 border-pink-100 pb-6">
                                    {steps.map((step) => (
                                        <div key={step.id} className="relative flex flex-col items-center flex-1 max-w-[200px] mx-2">
                                            <div className={`p-3 rounded-full transition-all duration-300 ${currentStep === step.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-pink-50 text-pink-300'}`}>
                                                <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </div>
                                            <span className={`mt-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-brand-primary' : 'text-gray-400'}`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* STEP 1: EVENT DETAILS */}
                                <div className={currentStep === 1 ? "block space-y-6" : "hidden"} data-step-container="1">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center"><Building2 className="w-6 h-6 mr-2 text-pink-500" /> Event Basics</h3>
                                    {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Organization Name *</label><input type="text" name="Org_Name" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500 transition-colors" placeholder="e.g. Acme Corp" required /></div>
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Event Type *</label><select name="Event_Type" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required><option value="">Select Category</option><option value="school">School</option><option value="corporate">Corporate</option><option value="community">Community</option></select></div>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Date *</label><input type="date" name="Date" min={minDate} className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500 font-sans" required /></div>
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Time *</label><input type="time" name="Time" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500 font-sans" required /></div>
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Approx. Duration *</label><select name="Duration" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required><option value="1">1 Hour</option><option value="2">2 Hours</option><option value="3+">3+ Hours</option></select></div>
                                    </div>
                                    <div className="grid sm:grid-cols-4 gap-4">
                                        <div className="sm:col-span-3"><label className="block text-sm font-bold text-gray-700 mb-1">Address *</label><input type="text" name="Address" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required /></div>
                                        <div className="sm:col-span-1"><label className="block text-sm font-bold text-gray-700 mb-1">Postcode *</label><input type="text" name="Postcode" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required /></div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-pink-500" /> Approx. Expected Guests *</label>
                                        <select name="Attendance" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required>
                                            <option value="">Select Range</option>
                                            <option value="50-100">50-100 guests</option>
                                            <option value="100-250">100-250 guests</option>
                                            <option value="250+">250+ guests</option>
                                        </select>
                                    </div>
                                </div>

                                {/* STEP 2: CONTACT INFO & SUBMIT */}
                                <div className={currentStep === 2 ? "block space-y-6" : "hidden"} data-step-container="2">
                                    <h3 className="text-2xl font-bold text-gray-800 flex items-center"><Send className="w-6 h-6 mr-2 text-pink-500" /> Confirm your email for your custom quote</h3>
                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                                        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-blue-700">Submit your details and our team will prepare a custom quote tailored to your event requirements.</p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Contact Name *</label><input type="text" name="Contact_Name" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" required /></div>
                                        <div><label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label><input type="tel" name="Phone" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500 font-sans" required /></div>
                                    </div>
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label><input type="email" name="Email" className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500 font-sans" required /></div>
                                    
                                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Dietary Notes / Special Requests</label><textarea name="Dietary" rows={2} className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-pink-500" placeholder="e.g. Gluten-free options needed..."></textarea></div>

                                    {/* UPDATED SUBMIT BUTTON WITH PADDING */}
                                    <button type="submit" disabled={isSubmitted} className="w-full px-6 py-4 bg-brand-primary text-white font-bold text-xl rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4 flex flex-col items-center">
                                        {isSubmitted ? <Loader2 className="animate-spin h-6 w-6" /> : (
                                            <>
                                                <span>Request My Custom Quote</span>
                                                <span className="text-[10px] uppercase tracking-widest opacity-80 font-normal mt-1">Free & No-Obligation</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                {/* NAVIGATION BUTTONS */}
                                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                    {currentStep > 1 && (
                                        <button type="button" onClick={prevStep} className="text-gray-500 font-bold flex items-center gap-2 hover:text-pink-600 active:scale-90 transition-all">
                                            <ChevronLeft className="w-5 h-5" /> Back
                                        </button>
                                    )}
                                    {currentStep < 2 && (
                                        <button type="button" onClick={nextStep} className="ml-auto px-10 py-3 bg-pink-600 text-white rounded-full font-bold shadow-lg hover:bg-pink-700 active:scale-95 transition-all">
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