
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function CaseStudies() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const loadCases = () => {
      const stored = localStorage.getItem('xgeniq_case_studies');
      if (stored) setCases(JSON.parse(stored));
    };
    loadCases();
    window.addEventListener('storage', loadCases);
    return () => window.removeEventListener('storage', loadCases);
  }, []);

  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Delivering <span className="text-primary">Real Results</span></h2>
            <p className="text-lg text-muted-foreground">Specialized technology implementations and strategic innovation outcomes.</p>
          </div>
          <Link href="#inquiry" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Cases <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <Card key={idx} className="glass-card border-white/5 bg-card/10 group hover:bg-card/30 transition-all overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={c.imageUrl || `https://picsum.photos/seed/case-${c.id}/800/450`}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground">{c.industry || 'Enterprise'}</Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h4 className="text-xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                  {c.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {c.summary}
                </p>
                <Link href="#inquiry" className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-widest gap-2">
                  Learn Details <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
