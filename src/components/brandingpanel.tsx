import React from 'react';
import { Shield } from 'lucide-react'; // Using Shield as a placeholder logo icon

interface BrandingPanelProps {
  /** URL for the company logo. If not provided, a placeholder icon will be used. */
  logoUrl?: string;
  /** URL for the main brand imagery (e.g., background image). */
  brandImageUrl?: string;
  /** Main title for the welcome message. */
  welcomeTitle?: string;
  /** Detailed welcome message or tagline. */
  welcomeMessage?: string;
  /** Additional CSS classes for the main container. */
  className?: string;
}

const BrandingPanel: React.FC<BrandingPanelProps> = ({
  logoUrl,
  brandImageUrl = "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // A more appealing placeholder
  welcomeTitle = "Welcome to Our Platform",
  welcomeMessage = "Enhancing your digital experience with security and innovation.",
  className = "",
}) => {
  console.log('BrandingPanel loaded');

  return (
    <div
      className={`
        hidden lg:flex flex-col items-center justify-center 
        text-white p-8 md:p-12 
        relative overflow-hidden 
        bg-gray-900 
        ${className}
      `}
      // The main container itself could have a simple background color,
      // and the brandImageUrl could be an <img> element if a more complex layout is needed.
      // For this version, brandImageUrl is used as a background for the entire panel.
    >
      {/* Background Image Layer */}
      {brandImageUrl && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${brandImageUrl})` }}
          aria-hidden="true"
        />
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60 z-10" aria-hidden="true" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-md">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt="Company Logo" 
            className="h-14 w-auto mb-6" // Adjusted logo size
          />
        ) : (
          <Shield 
            className="h-14 w-14 mb-6 text-blue-400" // Adjusted icon size
            aria-label="Company Logo Placeholder" 
          />
        )}
        
        <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">
          {welcomeTitle}
        </h1>
        
        <p className="text-base xl:text-lg text-slate-200">
          {welcomeMessage}
        </p>
        
        {/* Optional: Placeholder for product/service highlights if needed later */}
        {/* <div className="mt-8 space-y-2">
          <p className="text-sm text-slate-300">Highlight 1: Feature X</p>
          <p className="text-sm text-slate-300">Highlight 2: Benefit Y</p>
        </div> */}
      </div>
    </div>
  );
};

export default BrandingPanel;