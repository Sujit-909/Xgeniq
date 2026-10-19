"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowUpRight, Boxes } from 'lucide-react';
import Link from 'next/link';

export function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = () => {
      const stored = localStorage.getItem('xgeniq_products');
      if (stored) setProducts(JSON.parse(stored));
    };
    loadProducts();
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  return (
    <section id="products" className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Solutions Portfolio</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Ready-to-Deploy <span className="text-primary">Software</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-card/40 border border-white/5 group hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                <Boxes className="w-8 h-8 text-primary" />
                <Link href="#inquiry" className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <h4 className="text-2xl font-headline font-bold mb-4">{product.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.summary}</p>
              {product.imageUrl && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 mb-6">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
                </div>
              )}
              <Button variant="outline" size="sm" className="w-full rounded-full" asChild suppressHydrationWarning>
                <Link href="#inquiry">Request Demo</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
