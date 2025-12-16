import { useEffect } from "react";

// TS2353 Fix (based on previous error): Added 'keywords' if it's used elsewhere.
// If 'keywords' is *not* needed, you can remove 'keywords?: string[]'.
type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  schema?: object; // Renamed from 'schema' to follow convention, but kept 'schema' for hook usage
  keywords?: string[]; // Added this based on the error in MenuPage.tsx
};

export function useSEO({ title, description, canonical, schema }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // --- Meta description ---
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
    
    // --- Canonical link ---
    if (canonical) {
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // --- Structured data (JSON-LD) ---
    if (schema) {
      const scriptId = "seo-structured-data";
      let script = document.getElementById(scriptId);
      
      // If the script element already exists, cast it to HTMLScriptElement
      let scriptElement = script as HTMLScriptElement | null; 

      if (!scriptElement) {
        // Create the script element and cast it immediately
        scriptElement = document.createElement("script") as HTMLScriptElement;
        scriptElement.id = scriptId;
        
      scriptElement.type = "application/ld+json";
        
        document.head.appendChild(scriptElement);
      }

    
      scriptElement.textContent = JSON.stringify(schema);
    }
    
  
  }, [title, description, canonical, schema]);
}