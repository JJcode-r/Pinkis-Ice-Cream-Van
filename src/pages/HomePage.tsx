import { lazy, Suspense, useEffect } from "react"; // <-- Import useEffect
import { useSEO } from "../hooks/useSEO";

import HeroSection from "../components/HeroSection";
import WhyChooseUsSection from "../components/whyChooseUs";
import ServicesPreview from "../components/services";
import AboutSection from "../components/aboutUs";
import FAQSection from "../components/moreQuestions";

// const InquiryFloatingWidget = lazy(() => import("../components/inquiry"));
const GallerySection = lazy(() => import("../components/gallery"));
const TestimonialsSection = lazy(() => import("../components/testimonials"));
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));
// const Footer = lazy(() => import("../components/footer"));

export default function HomePage() {
   useSEO({
    title: "Pinki’s Ice Cream Van | Australia's Leading School & Event Catering",
    description: "Book Pinki’s Ice Cream Van for school fundraisers (donations back!), sports clubs, and corporate events across Australia. Hassle-free, zero-setup, and 100% fun.",
    canonical: "https://www.pinkisicecreamvan.com.au/",
    schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Pinki’s Ice Cream Van",
        "priceRange": "$$", // Indicates affordable but professional
        "description": "Specialist ice cream van hire for community fundraising and corporate celebrations.",
        "image": "https://www.pinkisicecreamvan.com.au/images/logo1.webp",
        "areaServed": {
            "@type": "Country",
            "name": "Australia"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ice Cream Catering Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "School Fundraising Programs" }},
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Staff Appreciation" }},
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sports Club Carnivals" }}
            ]
        }
    }
});

    // --- ANCHOR SCROLLING LOGIC ADDED HERE ---
    useEffect(() => {
        // 1. Get the hash fragment (e.g., "#about" or "#faq")
        const hash = window.location.hash; 

        if (hash) {
            const id = hash.substring(1); 
            
            // 2. Define a scrolling function
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Smoothly scroll to the target element
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'  });
     
                }
            };

            const timeoutId = setTimeout(scrollToElement, 100);

            return () => clearTimeout(timeoutId);
        }
    }, []); 

    return (
        <>
            <main id="main-content">
                <HeroSection />
                <WhyChooseUsSection />
                <ServicesPreview />
                <AboutSection />
                <FAQSection />

                <Suspense fallback={null}>
                     <TestimonialsSection /> 
                    <GallerySection />
                    <FinalCtaStrip />
                </Suspense>
            </main>

         
        </>
    );
}