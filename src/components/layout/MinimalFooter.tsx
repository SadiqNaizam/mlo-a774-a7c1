import React from 'react';

const MinimalFooter: React.FC = () => {
  console.log('MinimalFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-2 md:mb-0">
          &copy; {currentYear} AppLogo. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default MinimalFooter;