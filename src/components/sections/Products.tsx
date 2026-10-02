"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    title: "XgenIq Supplier Portal",
    tag: "Supply Chain",
    features: ["Vendor Onboarding", "Real-time Communication", "PO Tracking"],
    description: "A centralized hub for managing supplier relationships and compliance."
  },
  {
    title: "XgenIq WMS",
    tag: "Logistics",
    features: ["Real-time Inventory", "Barcode Scanning", "Automated Dispatch"],
    description: "Streamline your warehouse operations with real-time stock tracking."
  },
  {
    title: "XgenIq Plant Maintenance",
    tag: "Industrial",
    features: ["Asset Management", "Predictive Maintenance", "Operational Analytics"],
    description: "Maximize uptime and efficiency for your manufacturing assets."
  },
  {
    title: "XgenIq Enterprise Workflow",
    tag: "Business Process",
    features: ["Digital Approvals", "Task Management", "Process Automation"],
    description: "Accelerate decision-making with streamlined digital workflows."
  },
  {
    title: "XgenIq AI Copilot",
    tag: "Intelligence",
    features: ["Enterprise Knowledge", "Business Q&A", "Intelligent Workflows"],
    description: "Unlock the potential of GenAI with a custom business assistant."
  }
];

export function Products() {
  const dashboardImg = PlaceHolderImages.find(img => img.id === 'product-dashboard');

  return (
    <section id="products" className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.05),transparent)] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/30 text-primary">XgenIq Products</Badge>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Ready-to-Deploy <span className="text-primary">Enterprise Solutions</span></h2>
              <p className="text-lg text-muted-foreground">
                Accelerate your ROI with our pre-built, SAP-integrated add-ons designed for critical business functions.
              </p>
            </div>

            <div className="space-y-6">
              {products.slice(0, 3).map((product, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-card/40 border border-white/5 hover:border-primary/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.tag}</span>
                      <h4 className="text-xl font-headline font-bold">{product.title}</h4>
                    </div>
                    <Link href="#inquiry" className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1 text-xs text-foreground/80">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-50" />
            <div className="relative glass-card rounded-2xl overflow-hidden border border-white/5 aspect-[4/3]">
              <Image 
                src={dashboardImg?.imageUrl || 'https://picsum.photos/seed/product/800/600'}
                alt="Product Dashboard"
                fill
                className="object-cover"
                data-ai-hint="enterprise dashboard"
              />
            </div>
            <div className="mt-8 text-center flex flex-col gap-4 items-center">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="#inquiry">Explore All Products</Link>
              </Button>
              <p className="text-sm text-muted-foreground">Request a custom demo tailored to your industry.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
