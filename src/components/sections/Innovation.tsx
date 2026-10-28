
"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Cpu, BrainCircuit, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export function Innovation() {
  const [innovation, setInnovation] = useState<any[]>([]);

  useEffect(() => {
    const loadInnovation = () => {
      const stored = localStorage.getItem('xgeniq_innovation');
      if (stored) setInnovation(JSON.parse(stored));
    };
    loadInnovation();
    window.addEventListener('storage', loadInnovation);
    return () => window.removeEventListener('storage', loadInnovation);
  }, []);

  return (
    <section id="innovation" className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-widest">Innovation Lab</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">The Next <span className="text-primary">Generation</span></h2>
          <p className="text-lg text-muted-foreground">Exploring the boundaries of GenAI, SAP BTP, and Autonomous Agents.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovation.map((item, idx) => (
            <Card key={idx} className="glass-card border-white/5 bg-card/20 group hover:bg-card/40 transition-all duration-500 overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={item.imageUrl || `https://picsum.photos/seed/inn-${item.id}/800/600`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardContent className="p-8 space-y-4 flex-1 flex flex-col">
                <h4 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.summary}
                </p>
                <div className="pt-4">
                  <Link href="#inquiry" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                    Explore R&D <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
