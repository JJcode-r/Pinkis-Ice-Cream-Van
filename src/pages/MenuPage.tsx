import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const MenuHero = lazy(() => import("../components/menuHero"));
const MenuPreviewSection = lazy(() => import("../components/menuPreview"));
const InquiryFloatingWidget = lazy(() => import("../components/inquiry"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));
const Footer = lazy(() => import("../components/footer"));

export default function MenuPage() {
    useSEO({
        title: "Ice Cream Menu | Classic & Premium Treats | Pinki’s Ice Cream Van",
        description:
          "Explore Pinki’s Ice Cream Van menu featuring classic favorites and premium frozen treats. Perfect for parties, events, and celebrations of all sizes.",
        // This 'keywords' property is now valid because we updated SEOProps in useSEO.ts
        keywords: [
          "ice cream menu",
          "ice cream van menu",
          "party ice cream options",
          "event ice cream treats",
          "kids party ice cream",
        ],
    });

    // --- ENHANCED ANCHOR SCROLLING LOGIC ---
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
        <div>
            <Suspense fallback={null}>
                <MenuHero />
            </Suspense>

            <Suspense fallback={null}>
                {/* CRITICAL: Ensure MenuPreviewSection's root element has an ID, e.g., id="menu" */}
                <MenuPreviewSection />
            </Suspense>

            <Suspense fallback={null}>
                <InquiryFloatingWidget />
            </Suspense>

            <Suspense fallback={null}>
                <FinalCtaStrip />
            </Suspense>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    );
}