
"use client";

import React from 'react';
import { CheckCircle2, Zap, Shield, Target, Clock } from 'lucide-react';

const highlights = [
  {
    title: "AI-Driven Solutions",
    description: "We embed intelligence into every solution we build, ensuring your systems learn and adapt.",
    icon: Zap
  },
  {
    title: "Scalable & Secure",
    description: "Architectures built for growth without compromising on the highest standards of digital security.",
    icon: Shield
  },
  {
    title: "Domain Expertise",
    description: "Deep knowledge in SAP, enterprise systems, and auction platforms to guide your strategy.",
    icon: Target
  },
  {
    title: "Client-Centric Approach",
    description: "No off-the-shelf software. Every line of code is written with your specific goals in mind.",
    icon: CheckCircle2
  },
  {
    title: "Agile Delivery",
    description: "Fast-paced development cycles with continuous support to keep your business running smoothly.",
    icon: Clock
  }
];

export function USP() {
  return (
    <section id="why-us" className="py-24 bg-secondary/20 relative">
      <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Why <span className="text-primary">XgenIq</span>?</h2>
          <p className="text-lg text-muted-foreground">
            What sets us apart is our commitment to merging deep technical expertise with visionary AI integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start group">
              <div className="shrink-0 p-3 rounded-xl bg-background border border-border group-hover:border-primary/50 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-headline font-bold">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
