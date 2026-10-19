"use client";

import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const defaultTestimonials = [
  {
    id: 1,
    name: "Strategic Lead",
    company: "Bid Master",
    rating: 5,
    text: "The reverse auction system developed by XgenIq has completely transformed our procurement process. The transparency and efficiency gains were immediate. Exceptional technical execution.",
    imageUrl: null
  },
  {
    id: 2,
    name: "Operations Director",
    company: "Tiwari Propmart",
    rating: 5,
    text: "XgenIq delivered a custom software solution that perfectly aligned with our real estate operations. Their attention to detail and commitment to quality is truly commendable.",
    imageUrl: null
  },
  {
    id: 3,
    name: "Managing Partner",
    company: "Resorts India",
    rating: 5,
    text: "Working with XgenIq on our AI-driven guest engagement platform was a game changer. They are not just developers; they are strategic innovation partners who understand business goals.",
    imageUrl: null
  }
];

export function Testimonials() {
  const [displayTestimonials, setDisplayTestimonials] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadTestimonials = () => {
      const stored = localStorage.getItem('xgeniq_testimonials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setDisplayTestimonials(parsed);
          return;
        }
      }
      setDisplayTestimonials(defaultTestimonials);
    };
    
    loadTestimonials();
    
    // Listen for storage changes from the admin tab
    window.addEventListener('storage', loadTestimonials);
    return () => window.removeEventListener('storage', loadTestimonials);
  }, []);

  if (!isClient) return null;

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Client Success</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">What Our <span className="text-primary">Partners</span> Say</h2>
          <p className="text-lg text-muted-foreground">
            Trusted by industry leaders to deliver high-impact digital transformations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((item, idx) => (
            <Card key={item.id || idx} className="glass-card border-white/5 bg-card/20 relative group hover:bg-card/40 transition-all duration-300">
              <CardContent className="pt-12 pb-8 px-8 space-y-6">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                
                <div className="flex gap-1">
                  {[...Array(Number(item.rating || 5))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "{item.text}"
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                  {item.imageUrl && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-headline font-bold text-xl text-foreground">{item.name}</h4>
                    <p className="text-primary text-sm font-medium uppercase tracking-widest">{item.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}