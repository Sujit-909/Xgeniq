
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Inquiry', href: '#inquiry' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-3' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tighter">XgenIq<span className="text-primary">.</span></span>
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
          <Button variant="default" size="sm" asChild className="rounded-full shadow-lg shadow-primary/20">
            <Link href="#inquiry">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
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
