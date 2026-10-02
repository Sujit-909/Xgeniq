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
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Engineering Digital Transformation. Accelerating Business Growth.</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] animate-fade-in animate-delay-100">
            End-to-End <span className="gradient-text">Enterprise Technology</span> Solutions
          </h1>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-primary font-sans font-bold text-lg md:text-xl animate-fade-in animate-delay-200">
            <span>SAP</span>
            <span className="text-white/20">|</span>
            <span>Software Engineering</span>
            <span className="text-white/20">|</span>
            <span>Cloud</span>
            <span className="text-white/20">|</span>
            <span>Data</span>
            <span className="text-white/20">|</span>
            <span>AI</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
            XgenIq delivers end-to-end technology solutions that help organizations transform business processes, modernize applications, leverage cloud and data, and unlock the potential of AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in animate-delay-300">
            <Button size="lg" className="h-14 px-8 rounded-full text-base group shadow-xl shadow-primary/25" asChild>
              <Link href="#services">
                Explore Our Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base" asChild>
              <Link href="#inquiry">Talk to Our Experts</Link>
            </Button>
          </div>

          <div className="pt-12 text-muted-foreground text-sm font-medium flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-300">
            <span>Consulting</span>
            <span>•</span>
            <span>Design</span>
            <span>•</span>
            <span>Development</span>
            <span>•</span>
            <span>Integration</span>
            <span>•</span>
            <span>Modernization</span>
            <span>•</span>
            <span>Managed Services</span>
          </div>
        </div>
      </div>
    </section>
  );
}
