
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Eye, Clock, TrendingUp, Cpu, Laptop } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

const sapPosts = [
  {
    title: "Mastering SAP BTP: The Future of Enterprise Extensions",
    category: "SAP BTP",
    date: "Oct 24, 2023",
    author: "Debananda Behera",
    excerpt: "Explore how SAP BTP is revolutionizing the way enterprises build and deploy side-by-side extensions using CAPM and RAP.",
    imageId: "blog-sap",
    views: "1.2k",
    readTime: "8 min",
    isNew: true
  },
  {
    title: "Optimizing SAP Fiori for Mobile Workforces",
    category: "Fiori/UI5",
    date: "Nov 02, 2023",
    author: "SAP Specialist",
    excerpt: "Best practices for designing high-performance Fiori applications that work seamlessly across tablets and smartphones.",
    imageId: "case-study-retail",
    views: "940",
    readTime: "6 min",
    isNew: false
  },
  {
    title: "Real-time Insights with SAP Analytics Cloud (SAC)",
    category: "Analytics",
    date: "Nov 15, 2023",
    author: "Data Architect",
    excerpt: "How to leverage SAC to create predictive dashboards that drive faster business decisions in the retail sector.",
    imageId: "product-dashboard",
    views: "2.5k",
    readTime: "10 min",
    isNew: false
  },
  {
    title: "Seamless Integration with SAP CPI & Event Mesh",
    category: "Integration",
    date: "Dec 01, 2023",
    author: "Integration Lead",
    excerpt: "Connecting SAP S/4HANA with non-SAP systems using modern, event-driven architectures and Cloud Integration.",
    imageId: "blog-sap",
    views: "1.8k",
    readTime: "12 min",
    isNew: false
  },
  {
    title: "Clean Core Strategy with SAP CAPM",
    category: "Strategy",
    date: "Jan 10, 2024",
    author: "Debananda Behera",
    excerpt: "Maintaining a clean core while extending your ERP capabilities using the Cloud Application Programming Model.",
    imageId: "hero-tech",
    views: "3.1k",
    readTime: "9 min",
    isNew: true
  }
];

const modernTechPosts = [
  {
    title: "Scaling React Apps: From Architecture to Performance",
    category: "Frontend",
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
    category: "Backend",
    date: "Dec 05, 2023",
    author: "Senior Architect",
    excerpt: "A guide to migrating monoliths to .NET 8 microservices while maintaining high availability and developer velocity.",
    imageId: "blog-dotnet",
    views: "2.1k",
    readTime: "10 min",
    isNew: false
  },
  {
    title: "Flutter for Enterprise: Why It's Ready for Prime Time",
    category: "Mobile",
    date: "Dec 20, 2023",
    author: "Mobile Lead",
    excerpt: "How Flutter is enabling multi-platform development without compromising on native performance or security.",
    imageId: "ai-visual",
    views: "1.4k",
    readTime: "7 min",
    isNew: false
  },
  {
    title: "AI Integration in Modern SaaS Platforms",
    category: "GenAI",
    date: "Jan 05, 2024",
    author: "AI Specialist",
    excerpt: "Using LLMs and RAG architectures to add intelligent search and automation to your custom software products.",
    imageId: "hero-tech",
    views: "4.2k",
    readTime: "15 min",
    isNew: true
  }
];

export function Blog() {
  const renderPost = (post: typeof sapPosts[0], idx: number) => {
    const image = PlaceHolderImages.find(img => img.id === post.imageId);
    return (
      <Card key={idx} className="glass-card border-white/5 bg-card/20 group hover:bg-card/40 transition-all duration-500 overflow-hidden flex flex-col h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={image?.imageUrl || `https://picsum.photos/seed/${post.title}/800/450`}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint={image?.imageHint || "technology innovation"}
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
              {post.views}
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
  };

  return (
    <section id="blog" className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
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

        <Tabs defaultValue="sap" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-12 bg-card/20 border border-white/5">
            <TabsTrigger value="sap" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cpu className="w-4 h-4" />
              SAP Ecosystem
            </TabsTrigger>
            <TabsTrigger value="modern" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Laptop className="w-4 h-4" />
              Modern Tech
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sap" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sapPosts.map((post, idx) => renderPost(post, idx))}
            </div>
          </TabsContent>
          
          <TabsContent value="modern" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modernTechPosts.map((post, idx) => renderPost(post, idx))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
