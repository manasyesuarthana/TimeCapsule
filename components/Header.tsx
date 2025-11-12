import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { NAV_LINKS } from '../constants';
import { Page } from '../types';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  const { currentPage, navigateTo } = useAppContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Logo = () => (
    <h1 
      className="text-2xl font-sans font-bold text-xp-blue-dark cursor-pointer"
      onClick={() => navigateTo(Page.Landing)}
    >
      TimeCapsule
    </h1>
  );

  const NavLinks = ({isMobile = false}) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4 items-start' : 'items-center space-x-8'}`}>
      {NAV_LINKS.map((link) => (
        <a
          key={link.name}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateTo(link.page);
            if (isMobile) setMobileMenuOpen(false);
          }}
          className={`font-sans font-bold text-base leading-[22px] transition-colors duration-200 ${
            currentPage === link.page
              ? 'text-xp-blue'
              : 'text-xp-text hover:bg-gray-300 px-2'
          }`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="bg-xp-gray border-b-2 border-b-xp-border-dark sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <Icon name="user" className="text-xp-blue-dark cursor-pointer" onClick={() => navigateTo(Page.Profile)} />
          </div>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} className="h-6 w-6 text-xp-blue-dark" />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <NavLinks isMobile={true} />
          </div>
        )}
      </div>
    </header>
  );
};