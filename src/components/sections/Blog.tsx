
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Eye, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const posts = [
  {
    title: "Mastering SAP BTP: The Future of Enterprise Extensions",
    category: "SAP Ecosystem",
    date: "Oct 24, 2023",
    author: "Debananda Behera",
    excerpt: "Explore how SAP BTP is revolutionizing the way enterprises build and deploy side-by-side extensions using CAPM and RAP.",
    imageId: "blog-sap",
    views: "1.2k",
    readTime: "8 min",
    isNew: true
  },
  {
    title: "Scaling React Apps: From Architecture to Performance",
    category: "Modern Web",
    date: "Nov 12, 2023",
    author: "XgenIq Tech Lead",
    excerpt: "Deep dive into state management, micro-frontends, and server components to build resilient and fast React applications.",
    imageId: "blog-react",
    views: "850",
    readTime: "12 min",
    isNew: false
  },
  {
    title: "Modernizing Legacy with .NET 8 and Microservices",
    category: "Enterprise Dev",
    date: "Dec 05, 2023",
    author: "Senior Architect",
    excerpt: "A guide to migrating monoliths to .NET 8 microservices while maintaining high availability and developer velocity.",
    imageId: "blog-dotnet",
    views: "2.1k",
    readTime: "10 min",
    isNew: false
  }
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary flex items-center gap-2 w-fit">
              <TrendingUp className="w-3 h-3" />
              Insights & Innovation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
              Tech <span className="text-primary">Journal</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay updated with the latest trends in SAP BTP, Cloud Architecture, and Modern Web Development. Our experts share deep-dives and industry best practices.
            </p>
          </div>
          <Link href="#inquiry" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Read All Articles <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            const image = PlaceHolderImages.find(img => img.id === post.imageId);
            return (
              <Card key={idx} className="glass-card border-white/5 bg-card/20 group hover:bg-card/40 transition-all duration-500 overflow-hidden flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={image?.imageUrl || 'https://picsum.photos/seed/blog/800/450'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={image?.imageHint || "technology blog"}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 text-primary-foreground border-none">
                      {post.category}
                    </Badge>
                    {post.isNew && (
                      <Badge className="bg-accent text-accent-foreground border-none animate-pulse">
                        NEW
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-primary" />
                      {post.views} views
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground/80">{post.author}</span>
                    </div>
                    <Link href="#inquiry" className="inline-flex items-center text-primary text-sm font-bold gap-1 group/btn">
                      Read <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
