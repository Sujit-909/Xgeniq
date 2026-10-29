import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  withTagline?: boolean;
}

export function Logo({ className, iconOnly = false, withTagline = false }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div className="flex items-center gap-3 group">
        <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(234,179,8,0.3)] transition-transform duration-500 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#A16207" />
              </linearGradient>
              <linearGradient id="logo-silver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5E7EB" />
                <stop offset="50%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
              <filter id="shadow-inner">
                <feOffset dx="0" dy="1" />
                <feGaussianBlur stdDeviation="1" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="0.5" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>
            
            {/* The Stylized 'X' - Main Gold Stroke */}
            <path 
              d="M20 20 L45 50 L20 80" 
              stroke="url(#logo-gold)" 
              strokeWidth="14" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#shadow-inner)"
            />
            
            {/* The Stylized 'X' - Black/Silver Dynamic Stroke */}
            <path 
              d="M80 20 L55 50 L80 80" 
              stroke="#1F2937" 
              strokeWidth="14" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Central Swoosh - Silver Accent */}
            <path 
              d="M40 50 Q60 40 85 30" 
              stroke="url(#logo-silver)" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <path 
              d="M40 50 Q60 60 85 70" 
              stroke="url(#logo-gold)" 
              strokeWidth="4" 
              strokeLinecap="round"
            />

            {/* Flying Pixels / Cubes */}
            <rect x="75" y="10" width="6" height="6" fill="url(#logo-gold)" rx="1" />
            <rect x="85" y="5" width="4" height="4" fill="url(#logo-gold)" rx="1" />
            <rect x="88" y="15" width="5" height="5" fill="url(#logo-gold)" rx="1" />
            <rect x="78" y="1" width="3" height="3" fill="url(#logo-gold)" rx="1" />
          </svg>
        </div>
        {!iconOnly && (
          <div className="flex flex-col -space-y-1">
            <span className="text-3xl md:text-4xl font-sans font-black tracking-[calc(-0.05em)] text-foreground flex items-center">
              XGEN<span className="text-primary">IQ</span>
            </span>
            {withTagline && (
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase flex items-center gap-1">
                Innovate <span className="text-primary">■</span> Integrate <span className="text-primary">■</span> Transform
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
