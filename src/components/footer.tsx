"use client";

import { motion, type Transition, type TargetAndTransition } from 'framer-motion';
import { Mail, Phone, Facebook, Instagram, Twitter, type LucideIcon } from 'lucide-react';
import React from 'react';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

interface NavLink {
    title: string;
    href: string;
}

interface SocialLink {
    icon: LucideIcon;
    href: string;
}

// -----------------------------------------------------------------------------
// CONFIGURATION DATA
// -----------------------------------------------------------------------------

const navLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Our Menu", href: "/menu" },
    { title: "Book Now", href: "/booking#booking-form" },
    { title: "Our Events", href: "/events" },
    { title: "FAQs", href: "/booking#faq" },
];

const socialLinks: SocialLink[] = [
    { icon: Facebook, href: "https://facebook.com/pinkisicecream" },
    { icon: Instagram, href: "https://instagram.com/pinkisicecream" },
    { icon: Twitter, href: "https://twitter.com/pinkisicecream" },
];

// --- FRAMER MOTION VARIANTS ---

const socialHover: TargetAndTransition = { 
    scale: 1.2, 
    rotate: 5, 
    transition: { type: 'spring', stiffness: 300, damping: 15 } as Transition 
};
const socialTap: TargetAndTransition = { scale: 0.9 };


// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#562A77] text-pink-100 py-16 px-6 sm:px-8 md:px-10 lg:px-20 border-t-8 border-pink-400">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 } as Transition}
                className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            >
                {/* Column 1: Branding */}
                <div className="lg:col-span-2">
                    <a href="/" aria-label="Pinki's Ice Cream Home" className="inline-flex items-center mb-6">
                        <img
                            src="/images/logo1.webp" 
                            alt="Pinki's Ice Cream Official Logo"
                            className="h-14 sm:h-16 w-auto object-contain mr-4" 
                            loading="lazy"
                        />
                        <h3 className="text-3xl sm:text-4xl font-fredoka font-extrabold text-white">
                            Pinki's Ice Cream
                        </h3>
                    </a>
                    
                    <p className="text-pink-200 mb-6 text-base sm:text-lg leading-relaxed mt-4">
                        Serving joy, one perfect scoop at a time. Bringing nostalgic sweetness to every celebration.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-6 mt-6">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={socialHover}
                                whileTap={socialTap}
                                className="text-pink-300 hover:text-pink-400 transition"
                            >
                                <link.icon size={26} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="sm:mt-4 lg:mt-0">
                    <h4 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 font-fredoka uppercase tracking-widest">
                        Quick Links
                    </h4>
                    <ul className="space-y-3 text-base sm:text-lg">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <a 
                                    href={link.href} 
                                    className="text-pink-100 hover:text-pink-400 transition"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="sm:mt-4 lg:mt-0">
                    <h4 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 font-fredoka uppercase tracking-widest">
                        Get In Touch
                    </h4>
                    <ul className="space-y-4 text-base sm:text-lg">
                        <li className="flex items-center gap-4">
                            <Mail className="w-6 h-6 text-pink-400" />
                            <a href="mailto:hello@pinkisicecream.com" className="hover:text-pink-400 transition break-all">
                                hello@pinkisicecream.com
                            </a>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="w-6 h-6 text-pink-400" />
                            <a href="tel:+15551234567" className="hover:text-pink-400 transition">
                                (555) 123-4567
                            </a>
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* Copyright Strip & Dev Credit */}
            <div className="mt-16 pt-8 border-t border-pink-300/30 text-center">
                <p className="text-xs sm:text-sm text-pink-300/70">
                    &copy; {new Date().getFullYear()} Pinki's Ice Cream. All rights reserved.
                </p>
                
                <p className="text-[10px] sm:text-xs text-pink-300/50 mt-2">
                    Made with joy and a little bit of sugar.
                </p>

                {/* Developer Credit Line */}
                <div className="mt-6">
                    <motion.a 
                        href="https://globethedev.netlify.app/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(255,255,255)" }}
                        className="text-xs sm:text-sm font-medium text-white transition-all duration-300 inline-block"
                    >
                        Made by <span className="font-bold underline decoration-pink-400 underline-offset-4">Globe The Dev</span>
                    </motion.a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;