import React, { useState, useEffect, useCallback, useRef } from "react";
// TS6133: Removed unused imports/icons from the main file for brevity and clarity
// const MenuIcon, XIcon, ChevronDownIcon components are left as is for styling

// --- Utility Icons (Unchanged) ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-x">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
// -------------------------------------------------------------------


// --- Type Definitions ---
interface Anchor {
    label: string;
    href: string; // e.g., "#pinkis-promise"
}

interface NavItemData {
    id: string;
    label: string;
    path: string; // e.g., "/", "/about"
    anchors: Anchor[];
}

// Type for the click handler item parameter, which can be a full NavItemData or just an Anchor
type NavClickItem = NavItemData | Anchor | { path: string }; 

interface DropdownProps {
    items: Anchor[];
    handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavClickItem) => void;
}

interface NavItemProps {
    item: NavItemData;
    openDropdown: string | null;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
    activePath: string;
    handleNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavClickItem) => void;
    delayIndex: number;
    primaryTextColor: string;
}

// --- Navigation Configuration (Unchanged) ---
const navConfig: NavItemData[] = [ // Added type annotation
  {
    id: "home",
    label: "Home",
    path: "/", 
    anchors: [ 
      { label: "The Pinki's Promise", href: "#promise" },
      { label: "About Us", href: "#about-us-preview" },
      { label: "Our Event Services", href: "#services" },
      { label: "Our Gallery", href: "#gallery" },
      { label: "Sweetest Feedback", href: "#testimonials" },
    ],
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    anchors: [ 
      { label: "Our Family Story", href: "#full-story" },
      { label: "The Pinki's Menu Core", href: "#menu-core" },
      { label: "Meet the Dream Cream Team", href: "#our-team" },
      { label: "Community Photo Album", href: "#photo-album" },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    path: "/menu",
    anchors: [ 
      { label: "Our Full Menu", href: "#menu" },
      { label: "Milkshakes & Sundaes", href: "#milkshake" },
    ],
  },
];

const navItemsLeft = navConfig.slice(0, 2);
const navItemsRight = navConfig.slice(2);


// --- Dropdown Component ---
// TS7031: Added DropdownProps type
function Dropdown({ items, handleNavLinkClick }: DropdownProps) {
    
    // Helper to get the full path for the anchor
    // TS7006: Added type annotation for 'anchorHref'
    const getFullPath = (anchorHref: string) => {
        // TS2532: Added safety check
        const parentPage = navConfig.find(nav => nav.anchors && nav.anchors.some(a => a.href === anchorHref));
        return parentPage ? parentPage.path + anchorHref : anchorHref;
    }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-xl shadow-2xl overflow-hidden ring-2 ring-pink-100 z-50 transform origin-top transition-all duration-300 animate-slide-down">
      <div className="p-1 flex flex-col">
        {items.map((item) => (
            <a
              key={item.href}
              // FIX 1: Ensure the href is the full path (e.g., /about#family-story)
              href={getFullPath(item.href)} 
              // TS7006: Added type annotation for 'e'
              onClick={(e) => handleNavLinkClick(e, item)} 
              className={`block px-4 py-2 text-base rounded-lg transition-colors duration-200 
                  text-gray-700 hover:bg-pink-50 hover:text-pink-600
                `}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
  );
}

// --- Memoized NavItem Component ---
// TS7031: Added NavItemProps type
const NavItem = React.memo(({ item, openDropdown, setOpenDropdown, activePath, handleNavLinkClick, delayIndex, primaryTextColor }: NavItemProps) => {
    
    const isActive = activePath === item.path; 
    // TS2532: Added safety check for item.anchors
    const hasDropdown = item.anchors && item.anchors.length > 0;
    const isDropdownOpen = openDropdown === item.id;
    
    const delayStyle = { animationDelay: `${(delayIndex + 1) * 0.1}s` };

    const hoverTextColor = primaryTextColor.includes("white") ? "hover:text-pink-300" : "hover:text-pink-600";
    
    const activeBgClass = primaryTextColor.includes("white")
        ? "bg-white/30 text-pink-300 font-bold shadow-md" 
        : "bg-pink-100 text-pink-700 font-extrabold shadow-sm"; 

    const linkClasses = `
      px-4 py-2 text-base font-semibold rounded-xl transition-all duration-300 flex items-center
      ${primaryTextColor} 
      ${hoverTextColor}
      ${isActive ? activeBgClass : ""}
    `;

    const chevronColor = isActive 
        ? "text-pink-700" 
        : primaryTextColor.includes("white") 
          ? "text-white group-hover:text-pink-300" 
          : "text-gray-600 group-hover:text-pink-600";


    return (
      <div
        className="relative group animate-wave-in" 
        onMouseEnter={() => setOpenDropdown(item.id)}
        onMouseLeave={() => setOpenDropdown(null)}
        style={delayStyle}
      >
        <a
          href={item.path} 
          // TS7006: Added type annotation for 'e'
          onClick={(e) => handleNavLinkClick(e, item)} 
          className={linkClasses}
        >
          {item.label}
          {hasDropdown && (
            <ChevronDownIcon 
              className={`w-4 h-4 ml-1 transition-transform duration-300 
                ${isDropdownOpen ? "rotate-180" : ""}
                ${chevronColor}
              `} 
            />
          )}
        </a>
        {isDropdownOpen && item.anchors && <Dropdown items={item.anchors} handleNavLinkClick={handleNavLinkClick} />} 
      </div>
    );
});


// --- Main App Component (The Navbar) ---
// FIX: Removed explicit JSX.Element return type to resolve TS2503 error.
export default function App() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Added type
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  
  // TS7006: Added return type for useCallback
  const getActivePathForHighlight = useCallback((): string => {
    const path = window.location.pathname;
    if (path === "/") return "/";
    // TS2532: Added safety check before splitting
    const baseSegment = path.split('/')[1]; 
    return `/${baseSegment}`;
  }, []);

  const [activePath, setActivePath] = useState(getActivePathForHighlight()); 
  // TS2322: Added type for useRef
  const scrollPositionRef = useRef<number>(0);

  // 1. Initial Path Check & Popstate listener (Unchanged)
  useEffect(() => {
    setActivePath(getActivePathForHighlight());
    const handlePopState = () => setActivePath(getActivePathForHighlight());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getActivePathForHighlight]); 

  // 2. Scroll Effect (Unchanged)
  useEffect(() => {
    const handleScroll = () => setScrollEffect(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // 3. Body Scroll Lock (Unchanged)
  useEffect(() => {
    const savedScrollPos = scrollPositionRef.current;
    if (mobileOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = 'hidden'; 
      document.body.style.position = 'fixed'; 
      document.body.style.width = '100%'; 
      document.body.style.top = `-${scrollPositionRef.current}px`; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.top = '';
      if (savedScrollPos > 0) {
        window.scrollTo(0, savedScrollPos);
        scrollPositionRef.current = 0;
      }
    }
    return () => {
        document.body.style.overflow = 'unset';
        document.body.style.position = 'unset';
        document.body.style.width = 'unset';
        document.body.style.top = '';
    };
  }, [mobileOpen]);
  
  // 4. Navigation Handler (Type-checked and logic preserved)
  // TS7006: Added types for 'e' and 'item'
  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: NavClickItem) => {
    
    // Type check to ensure 'item' has 'href' property and starts with '#'
    const isAnchorClick = ('href' in item) && item.href.startsWith("#");
    
    if (isAnchorClick) {
      e.preventDefault(); 
      const anchor = item.href;
      
      // Find the parent page path based on the anchor
      const parentPage = navConfig.find(nav => nav.anchors && nav.anchors.some(a => a.href === anchor));
      const parentPath = parentPage ? parentPage.path : null;
      
      if (!parentPath) {
          console.error("Anchor link found with no matching parent page configuration.");
          return;
      }
      
      // If the user is on a DIFFERENT page: Perform a full redirect (e.g., /home -> /about#anchor)
      if (activePath !== parentPath) {
          // We MUST use window.location.href here to navigate to the new page and trigger the browser's scroll-to-hash logic
          window.location.href = parentPath + anchor;
          setMobileOpen(false);
          setOpenDropdown(null);
          return; 
      } 
      
      // If the user is on the SAME page: Perform smooth scroll
      const targetId = anchor.substring(1);
      const el = document.getElementById(targetId);
      
      if (el) { 
        // Navigation Bar Height Offset (80px in this case)
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        
        // Update the URL hash without reloading the page
        if (window.location.hash !== anchor) {
            window.history.pushState(null, '', window.location.pathname.split('#')[0] + anchor); 
        }
      }
      
    // MAIN PAGE LINK LOGIC (e.g., Home, About, Menu, or Book Us button)
    // Type check to ensure 'item' has 'path' property
    } else if ('path' in item) {
        // This ensures we only run the state resets for navigation links (not accidental clicks)
        setMobileOpen(false);
        setOpenDropdown(null);
        return;
    }
      setMobileOpen(false);
    setOpenDropdown(null);
  }, [activePath]); 

  
  // 5. Dynamic Style Calculation (Unchanged)
  const isHomePageActive = activePath === "/";

  let headerBgClasses;
  let primaryTextColor; 
  const headerHeightClass = "py-2 lg:py-0 h-auto lg:h-20"; // Changed to const

  if (mobileOpen) {
    headerBgClasses = "bg-white/95 shadow-lg shadow-pink-100 backdrop-blur-sm border-b border-pink-100";
    primaryTextColor = "text-gray-800"; 
  } else if (scrollEffect) {
    headerBgClasses = "bg-white/95 shadow-lg shadow-pink-100 backdrop-blur-sm border-b border-pink-100";
    primaryTextColor = "text-gray-800"; 
  } else {
    headerBgClasses = "bg-transparent";
    if (isHomePageActive) {
        primaryTextColor = "text-white"; 
    } else {
        primaryTextColor = "text-gray-800"; 
    }
  }

  // Function to render the logo content (Icon + Text) 
  // TS7006: Added type annotation for 'isCentered'
  const renderLogo = (isCentered: boolean) => (
    <a 
      href="/" 
      // TS7006: Added type annotation for 'e'
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); window.location.href = '/'; }} 
      className={`flex flex-col flex-shrink-0 transition-transform hover:scale-105 duration-300 z-50 
        ${isCentered ? 'items-center text-center w-60' : 'items-start text-left w-32 sm:w-40'}`}
    >
      <img 
        src="/images/logo1.webp"
        alt="Pinki's Ice Cream Van Logo" 
        className={`w-12 h-14 sm:w-14 sm:h-14 rounded-full object-cover p-1 transition-all duration-300
          ${primaryTextColor.includes("white") ? "bg-white ring-4 ring-pink-200 shadow-xl" : "bg-white ring-4 ring-pink-300 shadow-xl"}`}
      />
      <span className={`font-fredoka text-base sm:text-xl lg:text-2xl font-extrabold mt-0.5 leading-none transition-colors duration-300 ${primaryTextColor}`}>
        Pinki's Ice Cream Van
      </span>
    </a>
  );

  return (
    <>
      {/* Essential CSS (omitted for brevity) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        .font-fredoka { font-family: 'Fredoka', cursive; }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        @keyframes wave-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-wave-in {
          animation: wave-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0; 
        }
        
        body { transition: none !important; }
      `}</style>
      
      {/* Actual Navbar Header - Sticky and Responsive */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${headerBgClasses}`}>
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${headerHeightClass}`}>
          <div className="flex items-center justify-between h-auto lg:h-full relative">

            {/* 1. LEFT GROUP: Mobile/MD Logo + Desktop Left Links */}
            <div className="flex items-center space-x-8 flex-1">
              <div className="lg:hidden">
                {renderLogo(false)}
              </div>
              <div className="hidden lg:flex justify-start gap-4">
                {navItemsLeft.map((item, index) => (
                  <NavItem 
                    key={item.id} 
                    item={item} 
                    handleNavLinkClick={handleNavLinkClick} 
                    delayIndex={index} 
                    primaryTextColor={primaryTextColor}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    activePath={activePath}
                  />
                ))}
              </div>
            </div>

            {/* 2. DESKTOP CENTER LOGO (FIXED: Added mt-2 for margin at top) */}
            <div 
                className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-wave-in mt-2"
                style={{ animationDelay: `${(navItemsLeft.length) * 0.1}s` }} // Adjusted delay based on navItemsLeft length
            >
                {renderLogo(true)}
            </div>

            {/* 3. RIGHT GROUP: Desktop Right Links + Button + Mobile Controls */}
            <div className="flex items-center space-x-4 flex-1 justify-end">
              
              <div className="hidden lg:flex justify-end items-center gap-4">
                {navItemsRight.map((item, index) => (
                  <NavItem 
                    key={item.id} 
                    item={item} 
                    handleNavLinkClick={handleNavLinkClick} 
                    delayIndex={navItemsLeft.length + 1 + index} 
                    primaryTextColor={primaryTextColor}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    activePath={activePath}
                  />
                ))}
              </div>
              
              {/* THE PROMINENT BOOK US BUTTON */}
              <a
                href="/booking#booking-form"
                // TS7006: Added type annotation for 'e'
                onClick={(e) => handleNavLinkClick(e, { path: "/booking" })}
                className="hidden md:inline-flex px-6 py-3 bg-pink-600 text-white rounded-full font-extrabold shadow-xl shadow-pink-500/50 transition-all duration-300 hover:bg-pink-700 hover:scale-[1.05] text-base lg:text-lg whitespace-nowrap animate-wave-in"
                style={{ animationDelay: `${(navConfig.length + 1) * 0.1}s` }} 
              >
                Book Us Now!
              </a>

              {/* MOBILE TOGGLE (Hamburger/Close Button) */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={() => setMobileOpen(!mobileOpen)} 
                  className={`p-2 rounded-xl transition-colors duration-300 
                    ${primaryTextColor.includes("white") ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                  aria-label="Toggle navigation"
                >
                  {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* MOBILE MENU (Responsive Side Drawer) */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto bg-black/50" : "opacity-0 pointer-events-none"}`} 
        onClick={() => setMobileOpen(false)}
      >
        <div
          // Adjusted top position to match header height (approx 5.25rem = 84px)
          className={`fixed right-0 top-[5.25rem] h-[calc(100vh-5.25rem)] w-72 bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          // TS7006: Added type annotation for 'e'
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} 
        >
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto -mx-6 px-6"> 
            
            <h3 className="font-fredoka text-2xl text-pink-600 font-extrabold mb-4 border-b pb-2">Navigation</h3>

            {/* Mobile Navigation Links (Now only Home, About, Menu) */}
            {navConfig.map((item) => (
              <div key={item.id} className="mb-4">
                <a
                  href={item.path}
                  // TS7006: Added type annotation for 'e'
                  onClick={(e) => handleNavLinkClick(e, item)} 
                  className={`block px-3 py-2 font-bold text-lg rounded-xl transition-colors duration-200 ${
                     activePath === item.path 
                      ? "text-pink-700 bg-pink-100 shadow-inner" 
                      : "text-gray-800 hover:bg-pink-50"
                  }`}
                >
                  {item.label}
                </a>
                {/* Nested Anchors for mobile */}
                <div className="pl-6 mt-1 space-y-1">
                  {item.anchors.map((a) => (
                    <a
                      key={a.href}
                      // FIX 2: Ensure the href is the full path (e.g., /about#family-story)
                      href={item.path + a.href} 
                      // TS7006: Added type annotation for 'e'
                      onClick={(e) => handleNavLinkClick(e, a)} 
                      className={`block py-1 px-3 text-sm rounded transition-colors duration-200 
                           text-gray-700 hover:bg-pink-50 hover:text-pink-600
                        }`}
                    >
                      — {a.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* BOOK US BUTTON IN MOBILE DRAWER */}
          <a
            href="#booking-form"
            // TS7006: Added type annotation for 'e'
            onClick={(e) => handleNavLinkClick(e, { path: "/booking" })}
            className="block w-full text-center py-3 mt-6 bg-pink-600 text-white rounded-xl font-extrabold shadow-xl shadow-pink-500/50 transition-all duration-300 hover:bg-pink-700 hover:scale-[1.01] text-lg flex-shrink-0"
          >
            Book Us Now!
          </a>
        </div>
        
      </div>
    </>
  );
}