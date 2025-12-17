import React, { useState, useEffect, useCallback, useRef } from "react";

// --- Utility Icons ---
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

// --- Type Definitions ---
interface Anchor {
    label: string;
    href: string;
}

interface NavItemData {
    id: string;
    label: string;
    path: string;
    anchors: Anchor[];
}

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

// --- Navigation Configuration ---
const navConfig: NavItemData[] = [
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
function Dropdown({ items, handleNavLinkClick }: DropdownProps) {
    const getFullPath = (anchorHref: string) => {
        const parentPage = navConfig.find(nav => nav.anchors && nav.anchors.some(a => a.href === anchorHref));
        return parentPage ? parentPage.path + anchorHref : anchorHref;
    }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-xl shadow-2xl overflow-hidden ring-2 ring-pink-100 z-50 transform origin-top transition-all duration-300 animate-slide-down">
      <div className="p-1 flex flex-col">
        {items.map((item) => (
            <a
              key={item.href}
              href={getFullPath(item.href)} 
              onClick={(e) => handleNavLinkClick(e, item)} 
              className="block px-4 py-2 text-base rounded-lg transition-colors duration-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
  );
}

// --- Memoized NavItem Component ---
const NavItem = React.memo(({ item, openDropdown, setOpenDropdown, activePath, handleNavLinkClick, delayIndex, primaryTextColor }: NavItemProps) => {
    const isActive = activePath === item.path; 
    const hasDropdown = item.anchors && item.anchors.length > 0;
    const isDropdownOpen = openDropdown === item.id;
    const delayStyle = { animationDelay: `${(delayIndex + 1) * 0.1}s` };
    const hoverTextColor = primaryTextColor.includes("white") ? "hover:text-pink-300" : "hover:text-pink-600";
    
    const activeBgClass = primaryTextColor.includes("white")
        ? "bg-white/30 text-pink-300 font-bold shadow-md" 
        : "bg-pink-100 text-pink-700 font-extrabold shadow-sm"; 

    const linkClasses = `px-4 py-2 text-base font-semibold rounded-xl transition-all duration-300 flex items-center ${primaryTextColor} ${hoverTextColor} ${isActive ? activeBgClass : ""}`;

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
        <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={linkClasses}>
          {item.label}
          {hasDropdown && (
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""} ${chevronColor}`} />
          )}
        </a>
        {isDropdownOpen && item.anchors && <Dropdown items={item.anchors} handleNavLinkClick={handleNavLinkClick} />} 
      </div>
    );
});

// --- Main App Component ---
export default function App() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  
  const getActivePathForHighlight = useCallback((): string => {
    const path = window.location.pathname;
    if (path === "/") return "/";
    const baseSegment = path.split('/')[1]; 
    return `/${baseSegment}`;
  }, []);

  const [activePath, setActivePath] = useState(getActivePathForHighlight()); 
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    setActivePath(getActivePathForHighlight());
    const handlePopState = () => setActivePath(getActivePathForHighlight());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getActivePathForHighlight]); 

  useEffect(() => {
    const handleScroll = () => setScrollEffect(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    if (mobileOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = 'hidden'; 
      document.body.style.position = 'fixed'; 
      document.body.style.width = '100%'; 
      document.body.style.top = `-${scrollPositionRef.current}px`; 
    } else {
      const savedScrollPos = scrollPositionRef.current;
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.top = '';
      if (savedScrollPos > 0) {
        window.scrollTo(0, savedScrollPos);
        scrollPositionRef.current = 0;
      }
    }
  }, [mobileOpen]);
  
  const handleNavLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: NavClickItem) => {
    const isAnchorClick = ('href' in item) && item.href.startsWith("#");
    
    if (isAnchorClick) {
      e.preventDefault(); 
      const anchor = item.href;
      const parentPage = navConfig.find(nav => nav.anchors && nav.anchors.some(a => a.href === anchor));
      const parentPath = parentPage ? parentPage.path : null;
      
      if (!parentPath) return;
      
      if (activePath !== parentPath) {
          window.location.href = parentPath + anchor;
          setMobileOpen(false);
          return; 
      } 
      
      const targetId = anchor.substring(1);
      const el = document.getElementById(targetId);
      if (el) { 
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        window.history.pushState(null, '', window.location.pathname.split('#')[0] + anchor); 
      }
    } else if ('path' in item) {
        setMobileOpen(false);
        setOpenDropdown(null);
        return;
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [activePath]); 

  const isHomePageActive = activePath === "/";
  let headerBgClasses;
  let primaryTextColor; 

  if (mobileOpen || scrollEffect) {
    headerBgClasses = "bg-white/95 shadow-lg shadow-pink-100 backdrop-blur-sm border-b border-pink-100";
    primaryTextColor = "text-gray-800"; 
  } else {
    headerBgClasses = "bg-transparent";
    primaryTextColor = isHomePageActive ? "text-white" : "text-gray-800"; 
  }

  const renderLogo = (isCentered: boolean) => (
    <a 
      href="/" 
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); window.location.href = '/'; }} 
      className={`flex flex-col flex-shrink-0 transition-transform hover:scale-105 duration-300 z-50 
        ${isCentered ? 'items-center text-center w-60' : 'items-start text-left w-32 sm:w-40'}`}
    >
      <img 
        src="/images/logo1.webp"
        alt="Pinki's Logo" 
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
        .font-fredoka { font-family: 'Fredoka', cursive; }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }
        .animate-shimmer::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes wave-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-wave-in { animation: wave-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
      `}</style>
      
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${headerBgClasses}`}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex items-center justify-between h-full relative">
            <div className="flex items-center space-x-8 flex-1">
              <div className="lg:hidden">{renderLogo(false)}</div>
              <div className="hidden lg:flex justify-start gap-4">
                {navItemsLeft.map((item, index) => (
                  <NavItem key={item.id} item={item} handleNavLinkClick={handleNavLinkClick} delayIndex={index} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} activePath={activePath} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-wave-in mt-2">
                {renderLogo(true)}
            </div>

            <div className="flex items-center space-x-4 flex-1 justify-end">
              <div className="hidden lg:flex justify-end items-center gap-4">
                {navItemsRight.map((item, index) => (
                  <NavItem key={item.id} item={item} handleNavLinkClick={handleNavLinkClick} delayIndex={navItemsLeft.length + 1 + index} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} activePath={activePath} />
                ))}
              </div>
              
              <a href="/booking#booking-form" onClick={(e) => handleNavLinkClick(e, { path: "/booking" })} className="hidden md:inline-flex px-6 py-3 bg-pink-600 text-white rounded-full font-extrabold shadow-xl animate-shimmer hover:bg-pink-700 transition-all">
                Book Us Now!
              </a>

              <div className="lg:hidden flex items-center">
                <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 rounded-xl ${primaryTextColor.includes("white") ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600"}`}>
                  {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${mobileOpen ? "opacity-100 bg-black/50" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileOpen(false)}>
        <div className={`fixed right-0 top-[5rem] h-[calc(100vh-5rem)] w-72 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide"> 
            <h3 className="font-fredoka text-2xl text-pink-600 font-extrabold mb-4 border-b pb-2">Navigation</h3>
            {navConfig.map((item) => (
              <div key={item.id} className="mb-4">
                <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={`block px-3 py-2 font-bold text-lg rounded-xl ${activePath === item.path ? "text-pink-700 bg-pink-100" : "text-gray-800"}`}>
                  {item.label}
                </a>
                <div className="pl-6 mt-1 space-y-1">
                  {item.anchors.map((a) => (
                    <a key={a.href} href={item.path + a.href} onClick={(e) => handleNavLinkClick(e, a)} className="block py-1 px-3 text-sm text-gray-700 hover:text-pink-600">— {a.label}</a>
                  ))}
                </div>
              </div>
            ))}
            
            {/* The Pro-Fix: CTA Inside scroll area with a generous bottom margin */}
            <div className="pt-6 pb-20">
                <a
                    href="#booking-form"
                    onClick={(e) => handleNavLinkClick(e, { path: "/booking" })}
                    className="block w-full text-center py-4 bg-pink-600 text-white rounded-xl font-extrabold shadow-xl animate-shimmer active:scale-95"
                >
                    Book Us Now!
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}