
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl border border-primary/20 shadow-lg shadow-primary/5">
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 md:w-7 md:h-7 text-primary"
        >
          <path 
            d="M10 10L30 30M30 10L10 30" 
            stroke="currentColor" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <path 
            d="M5 5L12 5M5 5L5 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M35 35L28 35M35 35L35 28" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-2xl md:text-3xl font-sans font-bold tracking-tighter text-foreground">
          Xgen<span className="text-primary">Iq</span>
        </span>
      )}
    </div>
  );
}
