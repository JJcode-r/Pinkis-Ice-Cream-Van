import React, { useState, useEffect, useCallback, useRef } from "react";

// --- Utility Icons ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

// --- Types ---
interface Anchor { label: string; href: string; }
interface NavItemData { id: string; label: string; path: string; anchors: Anchor[]; }

// --- Config ---
const navConfig: NavItemData[] = [
  { id: "home", label: "Home", path: "/", anchors: [{ label: "The Pinki's Promise", href: "#promise" }, { label: "About Us", href: "#about-us-preview" }, { label: "Our Event Services", href: "#services" }, { label: "Our Gallery", href: "#gallery" }, { label: "Sweetest Feedback", href: "#testimonials" }] },
  { id: "about", label: "About", path: "/about", anchors: [{ label: "Our Family Story", href: "#full-story" }, { label: "The Pinki's Menu Core", href: "#menu-core" }, { label: "Meet the Dream Cream Team", href: "#our-team" }, { label: "Community Photo Album", href: "#photo-album" }] },
  { id: "menu", label: "Menu", path: "/menu", anchors: [{ label: "Our Full Menu", href: "#menu" }, { label: "Milkshakes & Sundaes", href: "#milkshake" }] },
];

const navItemsLeft = navConfig.slice(0, 2);
const navItemsRight = navConfig.slice(2);

// --- Sub-Components ---
function Dropdown({ items, handleNavLinkClick, parentPath }: { items: Anchor[], handleNavLinkClick: any, parentPath: string }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white rounded-xl shadow-2xl ring-2 ring-pink-100 z-50 animate-slide-down p-1 flex flex-col">
      {items.map((item) => (
        <a key={item.href} href={parentPath + item.href} onClick={(e) => handleNavLinkClick(e, item, parentPath)} className="block px-4 py-2 text-base rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors">
          {item.label}
        </a>
      ))}
    </div>
  );
}

const NavItem = React.memo(({ item, openDropdown, setOpenDropdown, activePath, handleNavLinkClick, delayIndex, primaryTextColor }: any) => {
  const isActive = activePath === item.path;
  const isDropdownOpen = openDropdown === item.id;
  const hoverColor = primaryTextColor.includes("white") ? "hover:text-pink-300" : "hover:text-pink-600";
  
  return (
    <div className="relative group animate-wave-in" onMouseEnter={() => setOpenDropdown(item.id)} onMouseLeave={() => setOpenDropdown(null)} style={{ animationDelay: `${(delayIndex + 1) * 0.1}s` }}>
      <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={`px-4 py-2 text-base font-semibold rounded-xl flex items-center transition-all ${primaryTextColor} ${hoverColor} ${isActive ? (primaryTextColor.includes("white") ? "bg-white/30" : "bg-pink-100 text-pink-700") : ""}`}>
        {item.label}
        {item.anchors.length > 0 && <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />}
      </a>
      {isDropdownOpen && <Dropdown items={item.anchors} handleNavLinkClick={handleNavLinkClick} parentPath={item.path} />}
    </div>
  );
});

// --- Main Navbar ---
export default function App() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const scrollToId = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setActivePath(window.location.pathname);
    if (window.location.hash) {
      setTimeout(() => scrollToId(window.location.hash), 500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollEffect(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const handleNavLinkClick = useCallback((e: React.MouseEvent, item: any, parentPath?: string) => {
    const href = item.href || item.path;
    const isAnchor = href?.startsWith("#");
    const targetPath = parentPath || item.path || "/";

    if (isAnchor && window.location.pathname === targetPath) {
      e.preventDefault();
      scrollToId(href);
      setMobileOpen(false);
      setOpenDropdown(null);
    } else if (isAnchor && window.location.pathname !== targetPath) {
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, []);

  const primaryTextColor = (mobileOpen || scrollEffect) ? "text-gray-800" : (activePath === "/" ? "text-white" : "text-gray-800");

  const renderLogo = (isCentered: boolean) => (
    <a href="/" className={`flex flex-col transition-transform hover:scale-105 ${isCentered ? 'items-center text-center w-60' : 'items-start pl-2 w-44 sm:w-52'}`}>
      <img src="/images/logo1.webp" alt="Logo" className="w-12 h-14 bg-white ring-4 ring-pink-200 rounded-full object-cover p-1 shadow-xl" />
      <span className={`font-fredoka text-lg lg:text-2xl font-extrabold mt-0.5 whitespace-nowrap ${primaryTextColor}`}>Pinki's Ice Cream Van</span>
    </a>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap');
        .font-fredoka { font-family: 'Fredoka', cursive; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { position: relative; overflow: hidden; }
        .animate-shimmer::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 2s infinite; }
        @keyframes wave-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-wave-in { animation: wave-in 0.4s ease-out forwards; opacity: 0; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${mobileOpen || scrollEffect ? "bg-white/95 shadow-lg" : "bg-transparent"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between relative">
          <div className="flex items-center space-x-8 flex-1">
            <div className="lg:hidden">{renderLogo(false)}</div>
            <div className="hidden lg:flex gap-4">
              {navItemsLeft.map((item, i) => <NavItem key={item.id} item={item} activePath={activePath} handleNavLinkClick={handleNavLinkClick} delayIndex={i} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />)}
            </div>
          </div>
          
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{renderLogo(true)}</div>
          
          <div className="flex items-center space-x-4 flex-1 justify-end pr-2">
            <div className="hidden lg:flex gap-4">
              {navItemsRight.map((item, i) => <NavItem key={item.id} item={item} activePath={activePath} handleNavLinkClick={handleNavLinkClick} delayIndex={navItemsLeft.length + i} primaryTextColor={primaryTextColor} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />)}
            </div>
            <a href="/booking#booking-form" className="hidden md:inline-flex px-6 py-3 bg-pink-600 text-white rounded-full font-extrabold animate-shimmer shadow-lg">Book Us Now!</a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-xl ${primaryTextColor.includes("white") ? "bg-white/20 text-white" : "bg-pink-100 text-pink-600"}`}>
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 transition-opacity ${mobileOpen ? "opacity-100 bg-black/50" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileOpen(false)}>
        <div className={`fixed right-0 top-[5rem] h-[calc(100vh-5rem)] w-72 bg-white flex flex-col transform transition-transform ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={e => e.stopPropagation()}>
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <h3 className="font-fredoka text-2xl text-pink-600 font-extrabold mb-4 border-b pb-2">Navigation</h3>
            {navConfig.map((item) => (
              <div key={item.id} className="mb-4">
                <a href={item.path} onClick={(e) => handleNavLinkClick(e, item)} className={`block px-3 py-2 font-bold text-lg rounded-xl ${activePath === item.path ? "text-pink-700 bg-pink-100" : "text-gray-800"}`}>{item.label}</a>
                <div className="pl-6 mt-1 space-y-1">
                  {item.anchors.map((a) => (
                    <a key={a.href} href={item.path + a.href} onClick={(e) => handleNavLinkClick(e, a, item.path)} className="block py-1 px-3 text-sm text-gray-700 hover:text-pink-600">— {a.label}</a>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-6 pb-20">
              <a href="/booking#booking-form" onClick={(e) => handleNavLinkClick(e, { path: "/booking" })} className="block w-full text-center py-4 bg-pink-600 text-white rounded-xl font-extrabold animate-shimmer shadow-xl">Book Us Now!</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}