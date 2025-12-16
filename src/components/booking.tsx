"use client";

import { useState, useEffect, useCallback, type SyntheticEvent, type FC } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { 
    Calendar, Utensils, Send, CheckCircle, ChevronRight, ChevronLeft, 
    Loader2, MapPin
} from 'lucide-react';

// ====================================================================
// 1. CONFIGURATION AND STYLES
// ====================================================================

// --- Custom Styles Component ---
const CustomStyles: FC = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
        .text-brand-primary { color: #db2777; }
        .bg-brand-primary { background-color: #db2777; }
        .submit-button-hover:hover { background-color: #c01e63; box-shadow: 0 12px 20px -5px rgba(219, 39, 119, 0.7) !important; }
        
        /* Custom Shadow for World-Class Depth */
        .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Text Shadow for Readability against the dynamic background */
        .text-shadow-strong {
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 1px rgba(0, 0, 0, 0.4);
        }

        /* CSS for smooth scroll to anchor link */
        #booking-form { scroll-margin-top: 100px; }
        @media (max-width: 1024px) {
            #booking-form { scroll-margin-top: 80px; }
        }
    `}</style>
);

// --- Background Image Configuration ---
const IMAGE_URLS = [
    'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo10.jpg',
    'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo9.jpg',
    'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/van.webp',
    'https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/photo5.jpg'
];
const TRANSITION_DELAY_MS = 10000; 
const FADE_DURATION_S = 2; 

// --- Animation Variants ---
const formContentVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } as Transition },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } as Transition },
};

// ====================================================================
// 2. FORM STEP COMPONENTS & HELPERS
// ====================================================================

// --- TYPES ---
interface ConeIconProps {
    variants: Variants;
}

// FIX: TS7031: isSubmitted, handleSubmit implicitly 'any'
interface Step3Props {
    isSubmitted: boolean;
    handleSubmit: (e: SyntheticEvent<HTMLButtonElement, Event>) => void; // Event type specific to button click
}

// --- Reusable Animated Heading Component ---
const splitTextVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } as Transition },
};
const coneVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: 0 },
    visible: { opacity: 1, scale: 1, rotateY: 360, transition: { type: "spring", stiffness: 50, damping: 10 } as Transition },
};

// FIX: TS7031: IceCreamConeIcon implicitly 'any'
const IceCreamConeIcon: FC<ConeIconProps> = ({ variants }) => (
    <motion.img
        src="/images/ice-cream-cone-About.png" 
        alt="Ice Cream Cone"
        loading="lazy"
        decoding="async"
        className="w-10 h-14 sm:w-12 sm:h-16 mx-2 object-contain"
        variants={variants}
    />
);

const AnimatedFormHeading: FC = () => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-12 relative z-20"
    >
        <motion.h2
            className="flex flex-wrap items-center justify-center text-center font-fredoka font-extrabold text-brand-primary mb-2 text-4xl sm:text-5xl lg:text-6xl text-shadow-strong"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } as Transition } }}
        >
            <motion.span variants={splitTextVariants} className="px-1 md:px-2">Book</motion.span>
            <IceCreamConeIcon variants={coneVariants} />
            <motion.span variants={splitTextVariants} className="px-1 md:px-2">Your Event</motion.span>
        </motion.h2>
        <motion.p
            className="text-xl text-white mt-2 text-shadow-strong" 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            Get a custom quote in 3 easy steps.
        </motion.p>
    </motion.div>
);

const steps = [
    { id: 1, label: "Event Details", icon: Calendar },
    { id: 2, label: "Menu Selection", icon: Utensils },
    { id: 3, label: "Contact & Confirm", icon: Send },
];

// --- STEP 1: Event Details ---
const Step1EventDetails: FC = () => (
    <motion.div key="step1" variants={formContentVariants} initial="initial" animate="animate" exit="exit" className="space-y-6" data-step="1">
        <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Calendar className="w-6 h-6 mr-2 text-pink-500" /> Event Details & Location</h3>
        <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="event-date">Date of Event *</label><input type="date" id="event-date" name="event-date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="event-time">Start Time *</label><input type="time" id="event-time" name="event-time" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service-length">Service Duration (Hrs) *</label><select id="service-length" name="service-length" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150 appearance-none bg-white" required><option value="">Select Duration</option><option value="1">1 Hour</option><option value="2">2 Hours</option><option value="3">3 Hours</option><option value="4">4+ Hours</option></select></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="event-size">Event Size *</label><select id="event-size" name="event-size" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150 appearance-none bg-white" required><option value="">Select Size Range</option><option value="50-100">50 - 100 people</option><option value="100-250">100 - 250 people</option><option value="250-500">250 - 500 people</option><option value="500+">500+ people</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="event-type">Event Type *</label><select id="event-type" name="event-type" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150 appearance-none bg-white" required><option value="">Select Type</option><option value="wedding">Wedding</option><option value="corporate">Corporate Party</option><option value="birthday">Birthday / Private</option><option value="community">Community / Public</option><option value="other">Other</option></select></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="guest-count">Number of Servings Required *</label><input type="number" id="guest-count" name="guest-count" placeholder="Minimum 50 servings required" min="50" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
        <div className="space-y-4 pt-4 border-t border-pink-100"><h4 className="flex items-center text-lg font-fredoka font-bold text-gray-800"><MapPin className="w-5 h-5 mr-2 text-pink-500" /> Event Location</h4><div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full-address">Full Event Address (Street, City, Postcode) *</label><textarea id="full-address" name="full-address" rows={3} placeholder="e.g., The Manor, 123 Event Lane, London, SW1A 0AA" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required></textarea></div></div>
    </motion.div>
);

// --- STEP 2: Menu Selection ---
const Step2MenuSelection: FC = () => (
    <motion.div key="step2" variants={formContentVariants} initial="initial" animate="animate" exit="exit" className="space-y-6" data-step="2">
        <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Utensils className="w-6 h-6 mr-2 text-pink-500" /> Menu & Dietary Needs</h3>
        <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-md">
            <h4 className="font-semibold text-lg mb-2 text-pink-600">Select Package Base *</h4>
            <div className="space-y-2">
                <label className="flex items-center space-x-3 text-gray-700"><input type="radio" name="package" value="classic" defaultChecked className="h-5 w-5 text-pink-600 focus:ring-pink-500" required /><span className="font-medium">Classic Package:</span> <span className="text-sm text-gray-500">Traditional Cones, Tubs, and Lollies.</span></label>
                <label className="flex items-center space-x-3 text-gray-700"><input type="radio" name="package" value="deluxe" className="h-5 w-5 text-pink-600 focus:ring-pink-500" required /><span className="font-medium">Deluxe Package:</span> <span className="text-sm text-gray-500">Includes Milkshakes, Sundaes & Toppings Bar.</span></label>
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dietary-notes">Dietary Requirements? (Optional)</label>
            <div className="p-3 bg-pink-50 rounded-lg mb-2 text-sm text-gray-600 border border-pink-200">
                <span className="font-bold text-pink-600">Note:</span> Our soft serve base is naturally **Gluten-Free**, **Lacto-Vegetarian Suitable**, and **Halal**. Please specify any other allergies or needs here.
            </div>
            <textarea id="dietary-notes" name="dietary-notes" rows={3} placeholder="e.g., We need 10 nut-free options and a separate scoop for a severe dairy allergy." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150"></textarea>
        </div>
    </motion.div>
);

// --- STEP 3: Contact & Confirmation ---
// FIX: TS7031: Added explicit type Step3Props
const Step3ContactConfirm: FC<Step3Props> = ({ isSubmitted, handleSubmit }) => (
    <motion.div key="step3" variants={formContentVariants} initial="initial" animate="animate" exit="exit" className="space-y-6" data-step="3">
        <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center"><Send className="w-6 h-6 mr-2 text-pink-500" /> Contact & Confirmation</h3>
        <div className="flex space-x-4">
            <div className="w-1/2"><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full-name">Full Name *</label><input type="text" id="full-name" name="full-name" placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
            <div className="w-1/2"><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number *</label><input type="tel" id="phone" name="phone" placeholder="e.g., 07700 900XXX" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address *</label><input type="email" id="email" name="email" placeholder="you@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition duration-150" required /></div>
        
        <button 
            type="submit" 
            disabled={isSubmitted} 
            onClick={handleSubmit} // Using typed handleSubmit
            className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-fredoka font-bold text-lg rounded-full shadow-xl shadow-pink-500/50 submit-button-hover transition-all duration-300 disabled:bg-pink-400 disabled:shadow-none"
        >
            {isSubmitted ? (
                <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Sending Request...
                </>
            ) : (
                <>
                    Send Booking Request
                    <ChevronRight className="h-5 w-5 ml-2" />
                </>
            )}
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-2">By submitting, you agree to receive a quote and availability check via email within 24 hours.</p>
    </motion.div>
);

// --- Confirmation Message ---
const ConfirmationMessage: FC = () => (
    <motion.div key="confirm" variants={formContentVariants} initial="initial" animate="animate" exit="exit" className="text-center py-12 px-6 bg-green-50 rounded-xl border-2 border-green-300 shadow-lg space-y-4">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
        <h3 className="text-3xl font-fredoka font-extrabold text-green-700">Request Sent Successfully!</h3>
        <p className="text-lg text-gray-700">Thank you for your interest! We've received your request and will check availability and prepare a custom quote for your event.</p>
        <p className="font-bold text-pink-600">Expect to hear from The Dream Cream Team within 24 hours. Check your inbox!</p>
    </motion.div>
);


// ====================================================================
// 3. MAIN BOOKING FORM COMPONENT
// ====================================================================

export default function BookingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // --- Local BG Slideshow Logic ---
    const nextImage = useCallback(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % IMAGE_URLS.length);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(nextImage, TRANSITION_DELAY_MS);
        return () => clearInterval(intervalId);
    }, [nextImage]);
    // --- End Local BG Slideshow Logic ---


    // FIX: TS7006: parameter 'step' implicitly 'any'
    const validateCurrentStep = (step: number): boolean => {
        const form = document.getElementById('booking-form-content');
        if (!form) return true;

        const currentStepContent = form.querySelector(`[data-step="${step}"]`);
        if (!currentStepContent) return true;

        // Query all required elements that can be validated
        const requiredElements = currentStepContent.querySelectorAll(
            'input[required], select[required], textarea[required]'
        );
        
        let isValid = true;

        requiredElements.forEach(element => {
            // FIX: TS2339: Cast element to HTMLInputElement or similar to access form properties
            const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

            // Check if the element is valid using the native checkValidity method
            if (input.checkValidity() === false) {
                // FIX: TS2339: Use reportValidity
                input.reportValidity();
                isValid = false;
            }

            // Specific check for radio buttons (since checkValidity might not work well on the group)
            if (input.type === 'radio' && input.name) {
                if (!form.querySelector(`input[name="${input.name}"]:checked`)) {
                    // Only report validity on one element of the radio group
                    if (isValid) { // Only report if validity hasn't failed yet
                        input.reportValidity();
                        isValid = false;
                    }
                }
            }
        });

        return isValid;
    };

    const nextStep = () => {
        if (validateCurrentStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
             // FIX: TS2531: Object is possibly 'null' check
            document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        // FIX: TS2531: Object is possibly 'null' check
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // FIX: TS7006: parameter 'e' implicitly 'any'
    const handleSubmit = (e: SyntheticEvent<HTMLButtonElement, Event>) => {
        e.preventDefault();
        
        // Final validation before submission
        if (validateCurrentStep(currentStep)) {
            setIsSubmitted(true);
            
            // Simulate API call delay
            setTimeout(() => {
                setIsSubmitted(false);
                setIsConfirmed(true); 
                // FIX: TS2531: Object is possibly 'null' check
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 2000); 
        }
    };

    const renderStepContent = () => {
        if (isConfirmed) return <ConfirmationMessage />;

        switch (currentStep) {
            case 1:
                return <Step1EventDetails />;
            case 2:
                return <Step2MenuSelection />;
            case 3:
                return <Step3ContactConfirm isSubmitted={isSubmitted} handleSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <section 
            id="booking-form" 
            className="w-full py-20 text-gray-800 relative overflow-hidden" 
        >
            <CustomStyles />
            
            {/* 1. Dynamic Background Images Container (STATIC/ABSOLUTE POSITION) */}
            <div 
                className="absolute inset-0 w-full h-full -z-10"
            >
                <AnimatePresence>
                    {IMAGE_URLS.map((url, index) => (
                        index === currentImageIndex && (
                            <motion.img
                                key={url}
                                src={url}
                                alt={`Background image ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover" 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.65 }} 
                                exit={{ opacity: 0 }}
                                transition={{ duration: FADE_DURATION_S, ease: "easeInOut" } as Transition} // Corrected Transition cast
                            />
                        )
                    ))}
                </AnimatePresence>
                {/* 2. Sophisticated Color Overlay */}
                <div className="absolute inset-0 bg-pink-900 opacity-75" /> 
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                
                <AnimatedFormHeading />

                {/* 3. The Booking Card (Glassmorphism/Depth Effect) */}
                <div 
                    className="max-w-3xl mx-auto bg-white/90 p-6 md:p-10 rounded-3xl shadow-3xl ring-4 ring-pink-100/70 backdrop-blur-md"
                >
                    
                    {/* Step Navigation Bar */}
                    {!isConfirmed && (
                        <div className="flex justify-between mb-8 border-b-2 border-pink-100 pb-4">
                            {steps.map((step, index) => (
                                <div key={step.id} className="relative flex flex-col items-center flex-1 mx-2 cursor-pointer">
                                    <div className={`p-3 rounded-full transition-all duration-300 ${
                                        currentStep === step.id 
                                            ? 'bg-brand-primary text-white shadow-lg' 
                                            : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                                    }`}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <span className={`mt-2 text-center text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                                        currentStep >= step.id ? 'text-brand-primary' : 'text-gray-500'
                                    }`}>
                                        {step.label}
                                    </span>
                                    {/* Connector Line */}
                                    {index < steps.length - 1 && (
                                        <div className={`absolute top-6 left-[60%] right-[60%] h-0.5 bg-gray-300 transition-colors duration-300 ${
                                            currentStep > step.id ? 'bg-brand-primary' : ''
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <form id="booking-form-content" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Dynamic Step Content */}
                        <AnimatePresence mode="wait">
                            {renderStepContent()}
                        </AnimatePresence>
                        
                        {/* Navigation Buttons */}
                        {!isConfirmed && (
                            <div className={`mt-8 pt-4 border-t border-pink-100 flex ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
                                
                                {currentStep > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={prevStep} 
                                        className="flex items-center px-4 py-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Back
                                    </button>
                                )}

                                {currentStep < steps.length ? (
                                    <button 
                                        type="button" 
                                        onClick={nextStep} 
                                        className="flex items-center px-6 py-3 bg-pink-600 text-white font-fredoka font-bold text-lg rounded-full shadow-lg hover:bg-pink-700 transition-colors duration-200"
                                    >
                                        Next Step
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </button>
                                ) : (
                                    // Empty div for alignment on Step 3
                                    // Note: Submit button is inside Step3ContactConfirm now
                                    currentStep === steps.length && <div /> 
                                )}
                            </div>
                        )}
                        
                    </form>
                </div>
            </div>
        </section>
    );
}