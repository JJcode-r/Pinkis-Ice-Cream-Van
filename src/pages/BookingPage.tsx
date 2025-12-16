import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const BookingHero = lazy(() => import("../components/bookingHero"));
const IceCreamBookingForm = lazy(() => import("../components/booking"));
const FAQ = lazy(() => import("../components/faq"));
const InquiryFloatingWidget = lazy(() => import("../components/inquiry"));
const Footer = lazy(() => import("../components/footer"));

export default function BookingPage() {
    useSEO({
        // ... (useSEO contents remain the same)
        title:
          "Book Pinki’s Ice Cream Van | Flexible Ice Cream Van Hire for Events",
        description:
          "Book Pinki’s Ice Cream Van for school events, fundraisers, workplace functions and private parties. Choose upfront pricing or pay-as-you-go options.",
        canonical: "https://www.pinkisicecreamvan.com.au/booking",
        schema: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
             // ... (mainEntity array contents remain the same)
             {
              "@type": "Question",
              "name": "Do you offer upfront and pay-as-you-go options?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Yes. You can choose upfront payment based on the number of ice creams required, or a pay-as-you-go option where guests purchase directly from the van."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a booking fee for the ice cream van?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "There is no booking fee for pay-as-you-go events. For upfront bookings, pricing is based on your event size and requirements."
              }
            },
            {
              "@type": "Question",
              "name": "What events can I book the ice cream van for?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Pinki’s Ice Cream Van is available for school events, fundraisers, corporate functions, workplace staff events, sports clubs and private celebrations."
              }
            },
            {
              "@type": "Question",
              "name": "Do you cater for dietary requirements?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Yes. We offer gluten-free, vegetarian, halal and kosher-friendly ice cream options, with additional dietary accommodations available upon request."
              }
            }
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

            <Suspense fallback={null}>
                <InquiryFloatingWidget />
            </Suspense>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
}