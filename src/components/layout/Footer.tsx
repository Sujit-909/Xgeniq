
"use client";

import React from 'react';
import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-headline font-bold tracking-tighter">XgenIq<span className="text-primary">.</span></span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Transforming businesses with smart AI and scalable software solutions. Leading the future of digital innovation from Cuttack, Odisha.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Why Choose Us', 'Inquiry'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Cuttack, Odisha, India</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@xgeniq.com" className="hover:text-primary transition-colors">info@xgeniq.com</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="hover:text-primary transition-colors">+91-XXXXXXXXXX</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to get the latest tech insights and company updates.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary/50 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <Separator className="mb-10 bg-border/50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} XgenIq Technologies Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
