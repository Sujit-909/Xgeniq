
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[96px] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Leading the Future with AI & Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] animate-fade-in animate-delay-100">
            Empowering Businesses with <span className="gradient-text">AI-Driven Innovation</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
            XgenIq Technologies delivers cutting-edge digital solutions including AI, enterprise software, and modern web applications to help businesses grow faster and smarter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in animate-delay-300">
            <Button size="lg" className="h-14 px-8 rounded-full text-base group shadow-xl shadow-primary/25" asChild>
              <Link href="#inquiry">
                Get a Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base" asChild>
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
