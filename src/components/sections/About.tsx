
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export function About() {
  const officeImage = PlaceHolderImages.find(img => img.id === 'office-modern');

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/5">
              <Image 
                src={officeImage?.imageUrl || 'https://picsum.photos/seed/office/800/800'}
                alt="XgenIq Office"
                fill
                className="object-cover"
                data-ai-hint="modern technology office"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl shadow-2xl">
              <p className="text-3xl font-bold text-primary">5+</p>
              <p className="text-sm text-muted-foreground">Years of Tech Excellence</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/30 text-primary">About XgenIq</雀>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Forward-Thinking <span className="text-primary">Digital Transformation</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                XgenIq Technologies is a premier software development house based in Cuttack, Odisha. We are focused on delivering innovative and scalable technology solutions that empower modern enterprises.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in building intelligent systems that enhance operational efficiency, streamline business processes, and create sustainable competitive advantages for our global clients.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <div className="p-6 rounded-xl bg-background/50 border border-border">
                <h4 className="font-headline font-bold text-xl mb-1">Dbasmita Behera</h4>
                <p className="text-primary text-sm font-medium uppercase tracking-wider">Owner</p>
              </div>
              <div className="p-6 rounded-xl bg-background/50 border border-border">
                <h4 className="font-headline font-bold text-xl mb-1">Debananda Behera</h4>
                <p className="text-primary text-sm font-medium uppercase tracking-wider">Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
