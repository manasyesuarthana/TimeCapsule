
import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="w-12 h-12 border-4 border-soft-lavender border-t-retro-indigo rounded-full animate-spin"></div>
    <p className="text-cool-gray font-semibold">{text}</p>
  </div>
);
