import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const AboutHero = lazy(() => import("../components/aboutHero"));
const AboutPageContent = lazy(() => import("../components/ourStory"));
const TeamSection = lazy(() => import("../components/team"));
const CommunitySection = lazy(() => import("../components/communityPhotos"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));

export default function AboutPage() {
    // ... (useSEO code remains the same)
 useSEO({
    title: "Our Story | Pinki’s Ice Cream Van - Australia’s Community Partner",
    description: "Discover the heart behind Pinki’s Ice Cream Van. A family-run business dedicated to supporting Australian schools and charities through hassle-free event catering.",
    canonical: "https://www.pinkisicecreamvan.com.au/about",
    schema: {
        "@context": "https://schema.org",
        "@type": "Organization", // "Organization" is perfect for the About page
        "name": "Pinki’s Ice Cream Van",
        "url": "https://www.pinkisicecreamvan.com.au/",
        "logo": "https://www.pinkisicecreamvan.com.au/images/logo1.webp",
        "description": "Australia's premier family-run ice cream van service specializing in community fundraising and school carnivals.",
        "foundingLocation": {
            "@type": "Country",
            "name": "Australia"
        },
        // "knowsAbout" tells Google your niche expertise
        "knowsAbout": [
            "School Fundraising Strategies",
            "Community Event Catering",
            "Hassle-Free Event Planning",
            "Non-Profit Support"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "areaServed": "AU",
          "availableLanguage": "English"
        }
    }
});

    // --- ENHANCED ANCHOR SCROLLING LOGIC ---
    useEffect(() => {
        const hash = window.location.hash; 

        if (hash) {
            const id = hash.substring(1); 
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

    return (
        <div>
            <Suspense fallback={null}>
                <AboutHero />
            </Suspense>

            <Suspense fallback={null}>
                <AboutPageContent />
            </Suspense>

            <Suspense fallback={null}>
                 <TeamSection />
            </Suspense>

            <Suspense fallback={null}>
                <CommunitySection />
            </Suspense>

            <Suspense fallback={null}>
                <FinalCtaStrip />
            </Suspense>

           
        </div>
    );
}