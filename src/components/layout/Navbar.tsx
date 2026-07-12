
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logo = PlaceHolderImages.find(img => img.id === 'app-logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Success Stories', href: '#case-studies' },
    { name: 'Insights', href: '#blog' },
    { name: 'Careers', href: '#careers' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-2' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center">
          {logo ? (
            <div className="relative w-40 h-12 md:w-56 md:h-16 group-hover:scale-105 transition-transform duration-300">
              <Image 
                src={logo.imageUrl} 
                alt="XgenIq Technologies Logo" 
                fill 
                priority
                className="object-contain"
                sizes="(max-width: 768px) 160px, 224px"
                data-ai-hint="gold tech logo"
              />
            </div>
          ) : (
            <span className="text-2xl font-sans font-bold tracking-tighter text-foreground group-hover:scale-105 transition-transform">
              Xgen<span className="text-primary">Iq</span>
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10 group/contact">
              <Link href="#inquiry" title="Contact Us">
                <Mail className="w-5 h-5 text-muted-foreground group-hover/contact:text-primary transition-colors" />
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link href="#inquiry">Get a Quote</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Section */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="#inquiry" title="Contact Us">
              <Mail className="w-5 h-5 text-primary" />
            </Link>
          </Button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium py-2 border-b border-border/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-4 rounded-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="#inquiry">Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
