
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Eye, Clock, TrendingUp, Cpu, Laptop } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

export function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const loadBlogs = () => {
      const stored = localStorage.getItem('xgeniq_blogs');
      if (stored) setBlogs(JSON.parse(stored));
    };
    loadBlogs();
    window.addEventListener('storage', loadBlogs);
    return () => window.removeEventListener('storage', loadBlogs);
  }, []);

  const renderPost = (post: any, idx: number) => {
    return (
      <Card key={idx} className="glass-card border-white/5 bg-card/20 group hover:bg-card/40 transition-all duration-500 overflow-hidden flex flex-col h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/450`}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary/90 text-primary-foreground border-none">
              {post.category || 'Tech'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-primary" />
              {post.author}
            </span>
          </div>
          <h4 className="text-xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {post.summary}
          </p>
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <Link href="#inquiry" className="inline-flex items-center text-primary text-sm font-bold gap-1 group/btn">
              Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="blog" className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl space-y-4">
            <Badge variant="outline" className="border-primary/30 text-primary">Insights & Resources</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
              Tech <span className="text-primary">Journal</span>
            </h2>
            <p className="text-lg text-muted-foreground">Stay updated with the latest trends in Enterprise IT and AI.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((post, idx) => renderPost(post, idx))
          ) : (
            <p className="text-muted-foreground col-span-3 text-center py-20 italic">No articles found in the journal.</p>
          )}
        </div>
      </div>
    </section>
  );
}
