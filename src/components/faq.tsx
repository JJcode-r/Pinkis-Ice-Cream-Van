import React, { useState, useEffect, useRef, type FC } from 'react';
import { motion, type Transition } from 'framer-motion';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

type Color = 'pink' | 'cyan';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
    color: Color;
}

interface ChevronProps {
    isOpen: boolean;
    color: Color;
}

// -----------------------------------------------------------------------------
// FAQ DATA (Typed)
// -----------------------------------------------------------------------------
const FAQ_DATA: FAQItem[] = [
    {
        question: "What areas do you service for ice cream van hire in Australia?",
        answer:
          "Pinki’s Ice Cream Van provides ice cream van hire across Australia, including events in Sydney, Melbourne, Brisbane, Perth and surrounding areas. For regional or longer-distance events, travel fees may apply — just let us know your location when booking.",
        color: 'pink',
    },
    {
        question: "What payment options do you offer for ice cream van hire?",
        answer: (
            <div className="space-y-3">
                <p>
                    We offer flexible payment options to suit different event types and budgets:
                </p>
                <p>
                    <strong>Option 1: Upfront Payment</strong><br />
                    Pay a fixed cost based on the number of ice creams you need. Once your event details are confirmed, our ice cream van arrives ready to serve your guests with no on-the-day selling.
                </p>
                <p>
                    <strong>Option 2: Pay-As-You-Go</strong><br />
                    No upfront booking fees. Our ice cream van sells directly to guests at your event, making this option ideal for school fundraisers, workplace events, and large gatherings. A minimum sales guarantee may apply.
                </p>
            </div>
        ),
        color: 'pink',
    },
    {
        question: "Can an ice cream van be used for school events and fundraising?",
        answer:
          "Yes! Our ice cream van is perfect for school events, fetes, carnivals and fundraising days. We work with schools to provide fast service, crowd-friendly options, and fundraising-friendly setups that keep students, parents and teachers happy.",
        color: 'cyan',
    },
    {
        question: "Do you cater for dietary requirements and food allergies?",
        answer:
          "Absolutely. Our ice cream van menu includes gluten-free, vegetarian, halal and kosher-friendly vanilla soft serve, along with dairy-free and vegan sorbet options. Nut-free packaged treats are also available, and we can prepare sealed servings for allergy-sensitive events upon request.",
        color: 'pink',
    },
    {
        question: "How much does it cost to hire an ice cream van for an event?",
        answer:
          "The cost to hire an ice cream van depends on your event size, duration, and location. A 25% non-refundable deposit secures your booking, with the remaining balance due 7 days before your event. Contact us for a fast, personalised quote.",
        color: 'cyan',
    },
    {
        question: "How long does the ice cream van stay at events like parties or workplace functions?",
        answer:
          "Our standard ice cream van hire includes 1 hour of service, which suits most private parties, workplace staff events and school functions. Additional time can be added in 30-minute increments to comfortably serve larger crowds.",
        color: 'pink',
    },
    {
        question: "How many guests can your ice cream van serve at sports or corporate events?",
        answer:
          "Our ice cream vans are designed to serve hundreds of guests efficiently, making them ideal for sports events, club days and corporate functions. Let us know your expected guest numbers so we can ensure smooth, fast service with no long queues.",
        color: 'cyan',
    },
];

// -----------------------------------------------------------------------------
// CHILD COMPONENTS (Typed and Fixed)
// -----------------------------------------------------------------------------

// TS7006 Fix: Explicitly typing isOpen and color
const ChevronDown: FC<ChevronProps> = ({ isOpen, color }) => (
    <svg
        // Template literal classnames fixed for Tailwind JIT compatibility
        className={`w-6 h-6 text-${color}-500 transform transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

// TS2322 Fix: Casting transition object
const IceCreamIcon: FC = () => (
    <motion.img
        src="/images/ice-cream-cone-About.png"
        alt="Ice Cream Icon"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 } as Transition} // Explicit Transition type
        className="w-12 h-16 object-contain mx-3"
    />
);

// -----------------------------------------------------------------------------
// MAIN FAQ SECTION (Typed and Fixed)
// -----------------------------------------------------------------------------
export default function FAQSection() {
    // State Typing Fix: null | number
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    // Ref Typing Fix: HTMLImageElement
    const truckRef = useRef<HTMLImageElement>(null);

    // TS7006 Fix: Explicitly typing 'i' as number
    const toggleItem = (i: number) => setOpenIndex(openIndex === i ? null : i);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (truckRef.current) {
                // Using clientRect for accurate element positioning relative to viewport
                const rect = truckRef.current.getBoundingClientRect();
                // Parallax is calculated based on how far the element is from the bottom of the viewport (window.innerHeight)
                const scrollProgress = Math.min(
                    Math.max((window.innerHeight - rect.top) / 600, 0), 
                    1
                );
                // Apply a small translation for the parallax effect
                truckRef.current.style.transform = `translateY(calc(-50% + ${scrollProgress * 40}px))`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="faq" className="relative bg-[#FFF7FA] py-20 lg:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT TRUCK — WITH REVISED PARALLAX AND STICKY POSITION */}
                <div className="hidden lg:flex items-center justify-center min-h-[500px]">
                    {/* The truck image is positioned sticky relative to its parent div, 
                    and the parent div ensures enough vertical space. The -translate-y-1/2 
                    is now applied *inside* the useEffect to allow for relative parallax movement. */}
                    <img
                        ref={truckRef as React.LegacyRef<HTMLImageElement>}
                        src="https://pub-50495ccf59c94ae4aaaa6dc2651bb7a7.r2.dev/truck_proto1.png"
                        alt="Ice Cream Truck"
                        // Initial sticky position, transform is handled by useEffect
                        className="w-full max-w-sm sticky top-1/2 drop-shadow-xl" 
                    />
                </div>

                {/* RIGHT FAQ CONTENT */}
                <div className="w-full flex flex-col justify-center">

                    {/* HEADING */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" } as Transition} // Explicit Transition type
                        className="flex flex-wrap justify-center items-center gap-3 mb-6"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600">
                            Frequently
                        </h2>
                        <IceCreamIcon />
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-pink-600">
                            Asked
                        </h2>
                    </motion.div>

                    <p className="text-center text-gray-600 mb-12 text-lg md:text-xl leading-relaxed">
                        Everything you need to know before booking your sweet celebration.
                    </p>

                    {/* FAQ LIST */}
                    <div className="space-y-5">
                        {FAQ_DATA.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 } as Transition} // Explicit Transition type
                                    // WARNING: Tailwind JIT doesn't support dynamic class names like border-${item.color}-400 
                                    // unless they are fully present in the source code (e.g., border-pink-400, border-cyan-400).
                                    // This warning remains but the fix is beyond simple type correction.
                                    className={`bg-white rounded-2xl shadow-md border-t-4 border-${item.color}-400 overflow-hidden`}
                                >
                                    <button
                                        className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-pink-400/50 rounded-2xl"
                                        onClick={() => toggleItem(index)}
                                    >
                                        <span className="text-lg font-semibold text-gray-800">
                                            {item.question}
                                        </span>
                                        <ChevronDown isOpen={isOpen} color={item.color} />
                                    </button>

                                    {/* Using max-height for smooth height transition */}
                                    <div
                                        className="overflow-hidden transition-all duration-500 ease-in-out"
                                        style={{ maxHeight: isOpen ? '500px' : '0' }}
                                    >
                                        {/* WARNING: Same Tailwind JIT warning applies here for bg-${item.color}-50 */}
                                        <div className={`px-6 py-5 bg-${item.color}-50 text-gray-700`}>
                                            {item.answer}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}