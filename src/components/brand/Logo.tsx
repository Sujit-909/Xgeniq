
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl border border-primary/20 shadow-xl overflow-hidden group">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>
          </defs>
          {/* Main X Structure */}
          <path 
            d="M25 25L75 75M75 25L25 80" 
            stroke="url(#gold-gradient)" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Tech Pixel Accents */}
          <rect x="20" y="20" width="6" height="6" fill="#FDE047" className="animate-pulse" />
          <rect x="74" y="74" width="6" height="6" fill="#A16207" />
          <rect x="74" y="20" width="6" height="6" fill="#EAB308" />
          <rect x="20" y="74" width="6" height="6" fill="#EAB308" />
          
          {/* Center Point */}
          <circle cx="50" cy="50" r="4" fill="white" className="opacity-50" />
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
