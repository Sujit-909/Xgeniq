"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, ChevronDown, Youtube, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

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

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-2' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group transition-transform hover:scale-105 active:scale-95">
          <Logo iconOnly className="md:hidden" />
          <Logo className="hidden md:flex" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          
          {/* SAP Solutions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none"
              suppressHydrationWarning
            >
              SAP Solutions <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 border-border backdrop-blur-lg">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:text-primary">SAP S/4HANA</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background/95 border-border backdrop-blur-lg">
                    <DropdownMenuItem>
                      <Link href="#inquiry" className="w-full">RISE with SAP</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#inquiry" className="w-full">GROW with SAP</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Link href="#services" className="w-full">SAP BTP</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#services" className="w-full">SAP Integration Suite</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#technology" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Training</Link>
          <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Industries</Link>

          {/* Blog / Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none"
              suppressHydrationWarning
            >
              Blog / Resources <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 border-border backdrop-blur-lg">
              <DropdownMenuItem>
                <Link href="#blog" className="w-full">Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#case-studies" className="w-full">Case Studies</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#blog" className="w-full">Innovation</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#inquiry" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>

          <div className="flex items-center gap-3 ml-4">
            <div className="hidden xl:flex items-center gap-2 mr-2 border-r border-border pr-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-4 h-4" /></Link>
            </div>
            <Button variant="default" size="sm" asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link href="#inquiry">Talk to an Expert</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Section */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="#inquiry" title="Contact Us">
              <Mail className="w-5 h-5 text-primary" />
            </Link>
          </Button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            suppressHydrationWarning
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 animate-in slide-in-from-top duration-300 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {['Home', 'About Us', 'Training', 'Services', 'Industries', 'Contact Us'].map((name) => (
              <Link 
                key={name} 
                href={`#${name.toLowerCase().replace(' ', '')}`}
                className="text-lg font-medium py-3 border-b border-border/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <div className="py-3 border-b border-border/50">
              <p className="text-xs font-bold text-primary uppercase mb-2">SAP Solutions</p>
              <div className="pl-4 flex flex-col gap-3">
                <Link href="#inquiry" className="text-sm" onClick={() => setIsMobileMenuOpen(false)}>RISE with SAP</Link>
                <Link href="#inquiry" className="text-sm" onClick={() => setIsMobileMenuOpen(false)}>GROW with SAP</Link>
              </div>
            </div>
            <div className="py-3 border-b border-border/50">
              <p className="text-xs font-bold text-primary uppercase mb-2">Blog / Resources</p>
              <div className="pl-4 flex flex-col gap-3">
                <Link href="#blog" className="text-sm" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                <Link href="#case-studies" className="text-sm" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
                <Link href="#blog" className="text-sm" onClick={() => setIsMobileMenuOpen(false)}>Innovation</Link>
              </div>
            </div>
            <Button className="w-full mt-4 rounded-full py-6 text-lg" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="#inquiry">Talk to an Expert</Link>
            </Button>
            <div className="flex justify-center gap-6 pt-4">
              <Youtube className="w-5 h-5 text-muted-foreground" />
              <Instagram className="w-5 h-5 text-muted-foreground" />
              <Linkedin className="w-5 h-5 text-muted-foreground" />
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
