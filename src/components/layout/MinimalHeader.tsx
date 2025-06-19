import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react'; // Using LogIn as a generic app icon for auth pages

const MinimalHeader: React.FC = () => {
  console.log('MinimalHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between h-10">
        <Link to="/" className="flex items-center gap-2">
          <LogIn className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">AppLogo</span>
        </Link>
        {/* Optional: Link to main marketing site could be added here if needed */}
        {/* e.g. <a href="https://marketing.example.com" className="text-sm text-muted-foreground hover:text-primary">Main Site</a> */}
      </div>
    </header>
  );
};

export default MinimalHeader;