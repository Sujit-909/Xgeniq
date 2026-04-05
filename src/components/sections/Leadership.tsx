"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const leaders = [
  {
    name: "Debasmita Behera",
    role: "Chief Executive Officer",
    description: "A visionary leader with deep expertise in enterprise strategy and digital innovation. Debasmita drives the long-term growth and technological roadmap of XgenIq.",
    imageId: "ceo-portrait",
    linkedin: "#"
  },
  {
    name: "Debananda Behera",
    role: "Managing Director",
    description: "Expert in operational excellence and large-scale project execution. Debananda ensures that every client solution is delivered with the highest standards of quality and efficiency.",
    imageId: "md-portrait",
    linkedin: "#"
  }
];

export function Leadership() {
  return (
    <section id="leadership" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Our Leadership</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">The Visionaries Behind <span className="text-primary">XgenIq</span></h2>
          <p className="text-lg text-muted-foreground">
            Meet the driving force behind our innovation and commitment to excellence in the technology landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => {
            const image = PlaceHolderImages.find(img => img.id === leader.imageId);
            return (
              <div key={idx} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glass-card rounded-2xl overflow-hidden border border-white/5 bg-card/20 hover:bg-card/40 transition-all duration-300">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image 
                      src={image?.imageUrl || 'https://picsum.photos/seed/leader/600/800'}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={image?.imageHint || "professional portrait"}
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-headline font-bold text-foreground">{leader.name}</h3>
                      <p className="text-primary font-medium tracking-wide uppercase text-sm">{leader.role}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {leader.description}
                    </p>
                    <div className="flex gap-4 pt-2">
                      <Link href={leader.linkedin} className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                        <Linkedin className="w-4 h-4" />
                      </Link>
                      <Link href="mailto:info@xgeniq.com" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                        <Mail className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}