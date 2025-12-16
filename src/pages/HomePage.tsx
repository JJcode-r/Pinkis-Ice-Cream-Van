import { lazy, Suspense, useEffect } from "react"; // <-- Import useEffect
import { useSEO } from "../hooks/useSEO";

import HeroSection from "../components/HeroSection";
import WhyChooseUsSection from "../components/whyChooseUs";
import PackagesPreviewSection from "../components/events";
import AboutSection from "../components/aboutUs";
import FAQSection from "../components/moreQuestions";

const InquiryFloatingWidget = lazy(() => import("../components/inquiry"));
const GallerySection = lazy(() => import("../components/gallery"));
const TestimonialsSection = lazy(() => import("../components/testimonials"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));
const Footer = lazy(() => import("../components/footer"));

export default function HomePage() {
    useSEO({
        // ... (useSEO contents remain the same)
        title:
          "Pinki’s Ice Cream Van | Ice Cream Van Hire for Parties & Events in Australia",
        description:
          "Hire Pinki’s Ice Cream Van for school events, fundraisers, private parties, corporate functions, sports clubs and celebrations across Australia. Hassle-free, fun and unforgettable.",
        canonical: "https://www.pinkisicecreamvan.com.au/",
        schema: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Pinki’s Ice Cream Van",
          "description":
            "Ice cream van hire for school events, fundraising, private parties, corporate events and celebrations across Australia.",
          "areaServed": {
            "@type": "Country",
            "name": "Australia"
          },
          "serviceType": [
            "School Events & Fundraising",
            "Sports Events & Clubs",
            "Workplace Staff Events",
            "Private Parties & Celebrations",
            "Corporate Functions"
          ],
          "url": "https://www.pinkisicecreamvan.com.au/"
        }
    });

    // --- ANCHOR SCROLLING LOGIC ADDED HERE ---
    useEffect(() => {
        // 1. Get the hash fragment (e.g., "#about" or "#faq")
        const hash = window.location.hash; 

        if (hash) {
            const id = hash.substring(1); // Remove the '#'
            
            // 2. Define a scrolling function
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Smoothly scroll to the target element
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' // Scrolls the element to the top of the viewport
                    });

                    // Optional: Clear the hash from the URL after scrolling if you don't 
                    // want it to persist, but generally it's better to leave it.
                    // history.pushState(null, '', window.location.pathname);
                }
            };

            // 3. Use a slight delay for lazy-loaded components or navigation delays.
            //    A 100ms timeout is a safe bet to ensure the DOM is fully ready.
            const timeoutId = setTimeout(scrollToElement, 100);

            // Cleanup function
            return () => clearTimeout(timeoutId);
        }
    }, []); 
    // --- END ANCHOR SCROLLING LOGIC ---

    return (
        <>
            <main id="main-content">
                <HeroSection />
                <WhyChooseUsSection />
                <PackagesPreviewSection />
                <AboutSection />
                <FAQSection />

                <Suspense fallback={null}>
                    {/* These are lazy-loaded, so the 100ms timeout is essential for them */}
                    <TestimonialsSection /> 
                    <GallerySection />
                    <FinalCtaStrip />
                </Suspense>
            </main>

            <Suspense fallback={null}>
                <InquiryFloatingWidget />
                <Footer />
            </Suspense>
        </>
    );
}