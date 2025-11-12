import React from 'react';

export const Footer: React.FC = () => {
  const footerLinks = ['About', 'Terms', 'Privacy', 'Contact'];
  
  return (
    <footer className="bg-xp-gray text-xp-text border-t-2 border-xp-border-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} TimeCapsule. All rights reserved.</p>
          <nav className="flex space-x-4">
            {footerLinks.map(link => (
              <a key={link} href="#" className="text-sm text-xp-text hover:underline">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};