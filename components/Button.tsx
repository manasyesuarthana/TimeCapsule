import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = 'px-6 py-2 font-sans text-xp-text border-2 active:border-t-xp-border-dark active:border-l-xp-border-dark active:border-b-xp-border-light active:border-r-xp-border-light focus:outline-dotted focus:outline-1 focus:outline-offset-2 focus:outline-xp-text';

  const variantClasses = {
    primary: 'bg-xp-gray border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark hover:bg-gray-200',
    secondary: 'bg-xp-gray border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark hover:bg-gray-200',
    accent: 'bg-xp-blue text-white border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark w-12 h-12 flex items-center justify-center hover:bg-blue-600',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};