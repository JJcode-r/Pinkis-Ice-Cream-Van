import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";

// --- ICONS ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

// --- TYPES & CONFIG ---
interface Anchor { label: string; href: string; }
interface NavItemData { id: string; label: string; path: string; anchors: Anchor[]; }

const navConfig: NavItemData[] = [
  { id: "home", label: "Home", path: "/", anchors: [{ label: "The Pinki's Promise", href: "#promise" }, { label: "About Us", href: "#about-us-preview" }, { label: "Our Event Services", href: "#services" }, { label: "Our Gallery", href: "#gallery" }, { label: "Sweetest Feedback", href: "#testimonials" }] },
  { id: "about", label: "About", path: "/about", anchors: [{ label: "Our Family Story", href: "#full-story" }, { label: "The Pinki's Menu Core", href: "#menu-core" }, { label: "Meet the Dream Cream Team", href: "#our-team" }, { label: "Community Photo Album", href: "#photo-album" }] },
  { id: "events", label: "Events", path: "/events", anchors: [{ label: "Workplace Staff Events", href: "#workplace" }, { label: "School Events", href: "#schools" },{label: "Sports Events", href: "#sports"}, { label: "Event Pricing", href: "#pricing" }] },
  { id: "menu", label: "Menu", path: "/menu", anchors: [{ label: "Our Full Menu", href: "#menu" }, { label: "Milkshakes & Sundaes", href: "#milkshake" }] },
];

const navItemsLeft = navConfig.slice(0, 2);
const navItemsRight = navConfig.slice(2);

// --- SUB-COMPONENTS ---
function Dropdown({ items, handleNavLinkClick, parentPath, activeSection }: { items: Anchor[], handleNavLinkClick: any, parentPath: string, activeSection: string }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-xl shadow-2xl ring-2 ring-pink-100 z-50 p-1 flex flex-col">
      {items.map((item) => (
        <a 
          key={item.href} 
          href={parentPath + item.href} 
          onClick={(e) => handleNavLinkClick(e, item, parentPath)} 
          className={`block px-4 py-2 text-base rounded-lg transition-all duration-200 ${
            activeSection === item.href 
              ? "bg-pink-100 text-pink-700 font-bold scale-[1.02]" 
              : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
          }`}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

const NavItem = React.memo(({ item, openDropdown, setOpenDropdown, activePath, handleNavLinkClick, delayIndex, primaryTextColor, activeSection }: any) => {
  const isActive = activePath === item.path;
  const isDropdownOpen = openDropdown === item.id;
  const hasActiveAnchor = item.anchors.some((a: any) => a.href === activeSection);
  const hoverColor = primaryTextColor.includes("white") ? "hover:text-pink-300" : "hover:text-pink-600";
  
  return (
    <div className="relative group animate-wave-in" onMouseEnter={() => setOpenDropdown(item.id)} onMouseLeave={() => setOpenDropdown(null)} style={{ animationDelay: `${(delayIndex + 1) * 0.1}s` }}>
      <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={`px-4 py-2 text-base font-semibold rounded-xl flex items-center transition-all ${primaryTextColor} ${hoverColor} ${(isActive || hasActiveAnchor) ? (primaryTextColor.includes("white") ? "bg-white/30" : "bg-pink-100 text-pink-700") : ""}`}>
        {item.label}
        {item.anchors.length > 0 && <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />}
      </a>
      {isDropdownOpen && <Dropdown items={item.anchors} handleNavLinkClick={handleNavLinkClick} parentPath={item.path} activeSection={activeSection} />}
    </div>
  );
});

// --- MAIN NAVBAR ---
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [activeSection, setActiveSection] = useState("");

  const scrollToId = (id: string) => {
    const targetId = id.includes('#') ? id.split('#').pop() : id;
    const element = document.getElementById(targetId || "");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const handleScrollUpdate = useCallback(() => {
    setScrollEffect(window.scrollY > 50);

    const scrollPosition = window.scrollY + 150; 
    const allPossibleAnchors = navConfig.flatMap(nav => nav.anchors);
    
    let currentSection = "";
    for (const anchor of allPossibleAnchors) {
      const id = anchor.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          currentSection = anchor.href;
        }
      }
    }
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  useLayoutEffect(() => {
    setActivePath(window.location.pathname);
    handleScrollUpdate();
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
  }, [handleScrollUpdate]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollUpdate, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollUpdate);
  }, [handleScrollUpdate]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
  }, [mobileOpen]);

  const handleNavLinkClick = useCallback((e: React.MouseEvent, item: any, parentPath?: string) => {
    const hashValue = item.href || "";
    const isAnchor = hashValue.includes("#");
    const targetPath = parentPath || item.path || "/";
    const currentPath = window.location.pathname;

    if (isAnchor && currentPath.replace(/\/$/, "") === targetPath.replace(/\/$/, "")) {
      e.preventDefault();
      scrollToId(hashValue);
      setMobileOpen(false);
      setOpenDropdown(null);
      window.history.pushState(null, "", hashValue);
    } else {
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, []);

  const primaryTextColor = (mobileOpen || scrollEffect) ? "text-gray-800" : (activePath === "/" ? "text-white" : "text-gray-800");

  const renderLogo = (isCentered: boolean) => (
    <a href="/" className={`flex flex-col transition-transform hover:scale-105 ${isCentered ? 'items-center text-center w-60 translate-y-3' : 'items-start pl-2 w-44 sm:w-52'}`}>
      <img src="/images/logo1.webp" alt="Logo" className="w-12 h-14 bg-white ring-4 ring-pink-200 rounded-full object-cover p-1 shadow-xl" />
      <span className={`font-fredoka text-lg lg:text-2xl font-extrabold mt-0.5 whitespace-nowrap ${primaryTextColor}`}>Pinki's Ice Cream Van</span>
    </a>
  );

  return (
    <>
      <style>{`
        html, body { max-width: 100vw; overflow-x: hidden; margin: 0; padding: 0; }
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap');
        .font-fredoka { font-family: 'Fredoka', cursive; }
        @keyframes wave-in { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-wave-in { animation: wave-in 0.3s ease-out forwards; opacity: 0; }
      `}</style>

      <header className={`w-full fixed top-0 z-50 transition-all duration-500 ease-in-out ${mobileOpen || scrollEffect ? "bg-white/95 shadow-lg" : "bg-transparent"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between relative">
          {/* Left Nav */}
          <div className="flex items-center space-x-8 flex-1">
            <div className="lg:hidden">{renderLogo(false)}</div>
            <div className="hidden lg:flex gap-4">
              {navItemsLeft.map((item, i) => (
                <NavItem key={item.id} item={item} activePath={activePath} activeSection={activeSection} handleNavLinkClick={handleNavLinkClick} delayIndex={i} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
              ))}
            </div>
          </div>
          
          {/* Centered Logo */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {renderLogo(true)}
          </div>
          
          {/* Right Nav */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 justify-end pr-2">
            <div className="hidden lg:flex gap-4">
              {navItemsRight.map((item, i) => (
                <NavItem key={item.id} item={item} activePath={activePath} activeSection={activeSection} handleNavLinkClick={handleNavLinkClick} delayIndex={navItemsLeft.length + i} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
              ))}
            </div>
            
            {/* CTA Button - Hidden only on smallest screens to make room for hamburger */}
            <a href="/booking#booking-form" className="hidden sm:inline-flex px-4 sm:px-6 py-2 sm:py-3 bg-pink-600 text-white rounded-full text-sm sm:text-base font-extrabold shadow-lg hover:bg-pink-700 transition-all active:scale-95 whitespace-nowrap">Book Now!</a>
            
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-xl transition-colors ${primaryTextColor.includes("white") ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600"}`}>
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen ? "opacity-100 bg-black/50 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileOpen(false)}>
        <div className={`fixed right-0 top-0 h-full w-[280px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={e => e.stopPropagation()}>
          <div className="pt-24 flex-1 overflow-y-auto p-6">
            <h3 className="font-fredoka text-2xl text-pink-600 font-extrabold mb-6 border-b pb-2">Navigation</h3>
            {navConfig.map((item) => (
              <div key={item.id} className="mb-4">
                <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={`block px-3 py-2 font-bold text-lg rounded-xl ${activePath === item.path ? "text-pink-700 bg-pink-100" : "text-gray-800"}`}>{item.label}</a>
                <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100 ml-3">
                  {item.anchors.map((a) => (
                    <a 
                      key={a.href} 
                      href={item.path + a.href} 
                      onClick={(e) => handleNavLinkClick(e, a, item.path)} 
                      className={`block py-1.5 px-3 text-sm transition-colors ${activeSection === a.href ? "text-pink-600 font-bold border-l-2 border-pink-600 -ml-[2px] pl-3" : "text-gray-700"}`}
                    >
                      {a.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Added CTA for Mobile Drawer */}
          <div className="p-6 border-t border-gray-100 bg-pink-50">
             <a href="/booking#booking-form" onClick={() => setMobileOpen(false)} className="block w-full text-center px-6 py-4 bg-pink-600 text-white rounded-2xl font-extrabold shadow-lg hover:bg-pink-700 transition-all">Book Us Now!</a>
          </div>
        </div>
      </div>
    </>
  );
}