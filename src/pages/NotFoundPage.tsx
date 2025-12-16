
// Removed: import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; 

const THEME_PRIMARY = "#EC4899"; // Bright Pink
const THEME_DARK = "#8B0040"; // Deep Berry
const THEME_BACKGROUND = "#FFF7FA"; // Soft Cream/Pink

// --- Custom Styles (Ensuring Fredoka font and button effects are available) ---
const CustomStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');

      .font-fredoka { font-family: 'Fredoka', sans-serif; }

      /* Button effect */
      .button-press-effect:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 0 rgba(0,0,0,0.1);
      }
    `}
  </style>
);


export default function NotFoundPage() {
  return (
    <>
      <CustomStyles />
      {/* Use the soft cream background for the whole page and ensure content is centered vertically */}
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 font-fredoka"
        style={{ backgroundColor: THEME_BACKGROUND }}
      >
        <div className="text-center p-8 md:p-12 bg-white rounded-3xl shadow-2xl border-4 border-dashed border-pink-200 max-w-lg w-full">
          
          {/* Sad Icon/Visual Element - Themed using the bright pink */}
          {/* The Frown icon gets a soft pink color and a gentle pulse animation */}
          <Frown className="mx-auto h-20 w-20 mb-6 text-pink-400 animate-pulse" />

          {/* 404 Header - Use the deep berry color and Fredoka font for impact */}
          <h1 
            className="text-7xl font-extrabold mb-4"
            style={{ color: THEME_DARK }}
          >
            404 Error
          </h1>
          
          {/* Themed Message */}
          <p 
            className="text-2xl mb-8 font-bold"
            style={{ color: THEME_DARK }}
          >
            Oh no! We're out of scoops here.
          </p>

          <p className="text-lg text-gray-600 mb-10">
            The page you were looking for seems to have melted away. Let's get you back to the menu.
          </p>
          
          {/* Home Button - Replaced <Link> with standard <a> tag to remove router dependency */}
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold rounded-full shadow-xl transition-all duration-300 uppercase tracking-wider button-press-effect"
            style={{ 
              backgroundColor: THEME_PRIMARY, 
              color: 'white',
              boxShadow: `0 10px 15px -3px ${THEME_PRIMARY}70, 0 4px 6px -2px ${THEME_PRIMARY}40`
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#DB2777'; }} // Darker pink on hover
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = THEME_PRIMARY; }}
          >
            Go Back for More Sweetness
          </a>
        </div>
      </div>
    </>
  );
}