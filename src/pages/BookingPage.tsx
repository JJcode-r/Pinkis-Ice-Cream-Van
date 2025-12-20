import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const BookingHero = lazy(() => import("../components/bookingHero"));
const IceCreamBookingForm = lazy(() => import("../components/booking"));
const FAQ = lazy(() => import("../components/faq"));

export default function BookingPage() {
   useSEO({
    title: "Book Pinki’s Ice Cream Van | Easy Event Hire Australia",
    description: "Book Pinki’s Ice Cream Van for your next event. Offering flexible upfront or pay-as-you-go pricing. We cater to all dietary needs including GF, Halal, and Vegan.",
    canonical: "https://www.pinkisicecreamvan.com.au/booking",
    schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            // Your existing questions are excellent. 
            // I recommend adding one specific to "Availability" or "Location"
            {
                "@type": "Question",
                "name": "How far in advance should I book the ice cream van?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We recommend booking as early as possible, especially for peak seasons like summer and school term ends, to ensure your preferred date is available."
                }
            }
            // ... (rest of your entities)
        ]
    }
});

    // --- ENHANCED ANCHOR SCROLLING LOGIC APPLIED ---
    useEffect(() => {
        const hash = window.location.hash; 

        if (hash) {
            const id = hash.substring(1); // Remove the '#'
            let attempts = 0;
            const maxAttempts = 20; // Try for up to 2 seconds (20 * 100ms)

            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Success: Scroll smoothly and stop polling
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                    return true; // Indicate success
                }
                return false; // Indicate failure (element not found yet)
            };

            // Start polling
            const pollForElement = () => {
                attempts++;
                
                // If the element is found OR we've run out of attempts, stop
                if (scrollToElement() || attempts >= maxAttempts) {
                    // Stop polling if successful or max attempts reached
                    clearInterval(intervalId);
                }
            };
            
            // Set up an interval to check for the element every 100ms
            const intervalId = setInterval(pollForElement, 100);

            // Set an ultimate timeout just in case the component never renders
            const timeoutId = setTimeout(() => {
                clearInterval(intervalId);
            }, maxAttempts * 100 + 50); // Stop after the maximum polling window

            // Cleanup function to clear the interval/timeout when the component unmounts
            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }
    }, []); 
    // --- END ENHANCED ANCHOR SCROLLING LOGIC ---

    return (
        <div id="booking-page-root"> 
            <Suspense fallback={null}>
                <BookingHero />
            </Suspense>

            <Suspense fallback={null}>
                <IceCreamBookingForm />
            </Suspense>

            <Suspense fallback={null}>
                {/* Ensure your FAQ component renders a root element with the ID="faq" */}
                <FAQ /> 
            </Suspense>

           
        </div>
    );
}