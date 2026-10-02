"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Factory, 
  Zap, 
  Droplets, 
  FlaskConical, 
  ShoppingBag, 
  Truck, 
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const industries = [
  {
    title: "Manufacturing",
    desc: "Digital manufacturing, ERP, supply chain, analytics and automation.",
    icon: Factory,
  },
  {
    title: "Energy & Utilities",
    desc: "Enterprise applications, field operations, asset-intensive processes and analytics.",
    icon: Zap,
  },
  {
    title: "Oil & Gas",
    desc: "SAP, enterprise applications, integration, analytics and digital operations.",
    icon: Droplets,
  },
  {
    title: "Pharmaceuticals & Life Sciences",
    desc: "Business applications, compliance, analytics and digital transformation.",
    icon: FlaskConical,
  },
  {
    title: "Retail & Consumer",
    desc: "Commerce, supply chain, analytics and customer applications.",
    icon: ShoppingBag,
  },
  {
    title: "Logistics & Supply Chain",
    desc: "Warehouse, logistics, supplier and enterprise applications.",
    icon: Truck,
  },
  {
    title: "Other Industries",
    desc: "Technology solutions tailored to specific business requirements.",
    icon: LayoutGrid,
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.02),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Industries We Serve</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">
            Tailored Solutions for <span className="text-primary">Diverse Sectors</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We bring deep domain expertise to help organizations across various industries navigate their digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((item, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "glass-card border-white/5 bg-card/10 group hover:bg-card/30 transition-all duration-500",
                idx === industries.length - 1 && "md:col-span-2 lg:col-span-1 xl:col-span-2"
              )}
            >
              <CardContent className="p-8 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
