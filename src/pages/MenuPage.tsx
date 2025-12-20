import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const MenuHero = lazy(() => import("../components/menuHero"));
const MenuPreviewSection = lazy(() => import("../components/menuPreview"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));

export default function MenuPage() {
   useSEO({
    title: "Ice Cream Menu & Packages | Pinki’s Ice Cream Van Australia",
    description: "Browse our delicious menu! From classic soft serve to premium gluten-free and vegan options. Perfect catering packages for schools, sports clubs, and parties.",
    keywords: [
        "ice cream van menu Australia",
        "dairy-free event ice cream",
        "gluten-free ice cream van",
        "soft serve catering packages",
        "vegan frozen treats",
        "fundraising menu options"
    ],
    schema: {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Pinki’s Ice Cream Event Menu",
        "description": "A wide range of classic and premium ice cream treats suitable for large-scale events and private parties.",
        "hasMenuItem": [
            {
                "@type": "MenuItem",
                "name": "Classic Soft Serve",
                "description": "Creamy classic vanilla soft serve with a variety of toppings."
            },
            {
                "@type": "MenuItem",
                "name": "Premium Frozen Treats",
                "description": "Hand-picked premium bars and specialty cones."
            },
            {
                "@type": "MenuItem",
                "name": "Dietary Friendly Options",
                "description": "Vegan, Dairy-Free, and Gluten-Free options available for all events."
            }
        ]
    }
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
                <FinalCtaStrip />
            </Suspense>

        </div>
    );
}