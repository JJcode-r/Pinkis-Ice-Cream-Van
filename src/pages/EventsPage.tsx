import { lazy, Suspense, useEffect } from "react";
import { useSEO } from "../hooks/useSEO";

// Core Layout Components
import EventsHero from "../components/eventsHero"; 
import EventsSection from "../components/eventsPage"; 
import PricingSection from "../components/pricing";
import GallerySection from "../components/eventsGallery";

// Lazy Loaded UI Elements
const FinalCtaStrip = lazy(() => import("../components/HomeCTA"));

export default function EventsPage() {
    useSEO({
        title: "Events & Fundraising | Pinki’s Ice Cream Van Hire Australia",
        description: "Professional ice cream van hire for school carnivals, corporate events, and sports clubs. Featuring our famous 'Donation Back' fundraising model and hassle-free service.",
        canonical: "https://www.pinkisicecreamvan.com.au/events",
        schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Event Catering & Fundraising",
            "description": "Specialist ice cream van hire for schools, corporate functions, and community events with flexible payment models.",
            "areaServed": {
                "@type": "Country",
                "name": "Australia"
            },
            "provider": {
                "@type": "LocalBusiness",
                "name": "Pinki’s Ice Cream Van"
            }
        }
    });

    // --- ENHANCED ANCHOR SCROLLING ---
    useEffect(() => {
        const hash = window.location.hash; 
        if (hash) {
            const id = hash.substring(1);
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
            const timeoutId = setTimeout(scrollToElement, 150); // Slightly longer for heavy event assets
            return () => clearTimeout(timeoutId);
        }
    }, []);

    return (
        <>
            <main id="main-content" className="overflow-x-hidden">
                {/* 1. Impactful Entrance */}
                <EventsHero />

                {/* 3. Deep dive into School/Corp/Sports logic */}
                <EventsSection />

                {/* 4. Transparency (The trust builder) */}
                <PricingSection />

                <GallerySection />

                <Suspense fallback={<div className="h-20" />}>
                    <FinalCtaStrip />
                </Suspense>
            </main>

            {/* <Suspense fallback={null}>
                <InquiryFloatingWidget />
                <Footer />
            </Suspense> */}
        </>
    );
}