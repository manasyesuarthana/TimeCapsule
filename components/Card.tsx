import React from 'react';
import { Icon } from './Icon';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}

const FakeWindowControls: React.FC = () => (
    <div className="flex space-x-1">
        <div className="w-4 h-4 bg-xp-gray border-2 border-r-xp-border-dark border-b-xp-border-dark border-l-xp-border-light border-t-xp-border-light flex items-center justify-center font-mono text-xs font-bold">_</div>
        <div className="w-4 h-4 bg-xp-gray border-2 border-r-xp-border-dark border-b-xp-border-dark border-l-xp-border-light border-t-xp-border-light flex items-center justify-center font-mono text-xs font-bold">[]</div>
        <div className="w-4 h-4 bg-xp-gray border-2 border-r-xp-border-dark border-b-xp-border-dark border-l-xp-border-light border-t-xp-border-light flex items-center justify-center font-mono text-xs font-bold">X</div>
    </div>
);

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, title }) => {
  const baseClasses = 'bg-xp-gray border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark border-2 shadow-window';
  const interactiveClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
       {title && (
        <div className="bg-gradient-to-r from-xp-blue-dark to-xp-blue text-white font-bold py-0.5 px-2 flex items-center justify-between select-none">
          <span>{title}</span>
          <FakeWindowControls />
        </div>
      )}
      {children}
    </div>
  );
};