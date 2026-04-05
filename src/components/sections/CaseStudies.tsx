
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    title: "SAP BTP Migration for Global Retailer",
    industry: "Retail",
    result: "40% cost reduction in maintenance.",
    imageId: "case-study-retail"
  },
  {
    title: "AI-Powered Predictive Maintenance for Plant",
    industry: "FMCG",
    result: "Reduced downtime by 25%.",
    imageId: "hero-tech"
  },
  {
    title: "Cross-Platform Mobile App for Field Services",
    industry: "Enterprise",
    result: "Real-time sync with offline support.",
    imageId: "product-dashboard"
  }
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Delivering <span className="text-primary">Real Results</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore how XgenIq empowers industries with specialized technology implementations and strategic innovation.
            </p>
          </div>
          <Link href="#inquiry" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Case Studies <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, idx) => {
            const image = PlaceHolderImages.find(img => img.id === c.imageId);
            return (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/5">
                  <Image 
                    src={image?.imageUrl || 'https://picsum.photos/seed/case/800/450'}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={image?.imageHint || "technology solution"}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">{c.industry}</Badge>
                  </div>
                </div>
                <h4 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{c.title}</h4>
                <p className="text-primary text-sm font-bold">{c.result}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
