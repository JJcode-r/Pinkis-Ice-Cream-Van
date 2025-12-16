import { lazy, Suspense, useEffect } from "react"; 
import { useSEO } from "../hooks/useSEO";

const AboutHero = lazy(() => import("../components/aboutHero"));
const InquiryFloatingWidget = lazy(() => import("../components/inquiry"));
const AboutPageContent = lazy(() => import("../components/ourStory"));
const TeamSection = lazy(() => import("../components/team"));
const CommunitySection = lazy(() => import("../components/communityPhotos"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));
const Footer = lazy(() => import("../components/footer"));

export default function AboutPage() {
    // ... (useSEO code remains the same)
    useSEO({
        title:
          "About Pinki’s Ice Cream Van | A Family-Run Ice Cream Van Business",
        description:
          "Learn about Pinki’s Ice Cream Van — a family-run ice cream business bringing joy to schools, communities, and events across Australia.",
        canonical: "https://www.pinkisicecreamvan.com.au/about",
        schema: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pinki’s Ice Cream Van",
            "url": "https://www.pinkisicecreamvan.com.au/",
            "description":
              "A family-run ice cream van business serving school events, fundraisers, private parties and community celebrations across Australia.",
            "foundingLocation": {
              "@type": "Country",
              "name": "Australia"
            },
            "knowsAbout": [
              "Ice cream van hire",
              "School fundraising events",
              "Community celebrations",
              "Corporate and workplace events"
            ]
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
    // --- END ENHANCED ANCHOR SCROLLING LOGIC ---

    return (
        <div>
            <Suspense fallback={null}>
                <AboutHero />
            </Suspense>

            <Suspense fallback={null}>
                <InquiryFloatingWidget />
            </Suspense>

            <Suspense fallback={null}>
                <AboutPageContent />
            </Suspense>

            <Suspense fallback={null}>
                {/* Ensure this component's root has id="team" if you link to #team */}
                <TeamSection />
            </Suspense>

            <Suspense fallback={null}>
                {/* Ensure this component's root has id="community" if you link to #community */}
                <CommunitySection />
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