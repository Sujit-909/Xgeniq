"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  Settings, 
  FileText, 
  Layout, 
  Cpu, 
  MessageSquare,
  Search,
  Check,
  X,
  ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Logo } from '@/components/brand/Logo';
import { useToast } from '@/hooks/use-toast';

// Initial Mock Data
const INITIAL_SERVICES = [
  { id: 1, title: "SAP Transformation", summary: "S/4HANA, BTP, Fiori, RAP, CAP, Integration, Functional Consulting.", category: "SAP" },
  { id: 2, title: "Software Engineering", summary: "Web, mobile, APIs, microservices and enterprise applications.", category: "Engineering" },
  { id: 3, title: "Cloud & DevOps", summary: "Cloud architecture, migration, modernization and DevOps.", category: "Cloud" },
  { id: 4, title: "Data & Analytics", summary: "Data engineering, BI, analytics, visualization and enterprise platforms.", category: "Data" },
  { id: 5, title: "AI & GenAI", summary: "AI applications, GenAI, AI agents, copilots, automation.", category: "AI" },
  { id: 6, title: "Managed Services", summary: "Application support, SAP AMS, non-SAP AMS, staffing.", category: "Operations" }
];

const INITIAL_BLOGS = [
  { 
    id: 1, 
    title: "Mastering SAP BTP: The Future of Enterprise Extensions", 
    category: "SAP BTP", 
    author: "Debananda Behera", 
    date: "2024-02-15",
    imageUrl: "https://t3.ftcdn.net/jpg/03/63/94/88/240_F_363948837_OnJOJupnRdr15fOryrTF0zrnIFQ6nUp1.jpg"
  },
  { 
    id: 2, 
    title: "Optimizing SAP Fiori for Mobile Workforces", 
    category: "Fiori/UI5", 
    author: "SAP Specialist", 
    date: "2024-01-10",
    imageUrl: "https://picsum.photos/seed/sap-mobile/800/450"
  },
  { 
    id: 3, 
    title: "AI Integration in Modern SaaS Platforms", 
    category: "GenAI", 
    author: "AI Specialist", 
    date: "2024-03-05",
    imageUrl: "https://picsum.photos/seed/ai-tech/800/450"
  }
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  
  // State for forms
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  // Service CRUD
  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const category = formData.get('category') as string;

    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, title, summary, category } : s));
      toast({ title: "Service Updated", description: `${title} has been successfully updated.` });
    } else {
      const newService = { id: Date.now(), title, summary, category };
      setServices(prev => [...prev, newService]);
      toast({ title: "Service Added", description: `${title} has been added to the catalog.` });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast({ variant: "destructive", title: "Service Deleted", description: "The service has been removed from the platform." });
  };

  // Blog CRUD
  const handleSaveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (editingBlog) {
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...b, title, author, category, imageUrl } : b));
      toast({ title: "Blog Updated", description: "The article and its visuals have been updated." });
    } else {
      const newBlog = { 
        id: Date.now(), 
        title, 
        author, 
        category, 
        imageUrl: imageUrl || "https://picsum.photos/seed/default/800/450",
        date: new Date().toISOString().split('T')[0] 
      };
      setBlogs(prev => [...prev, newBlog]);
      toast({ title: "Blog Published", description: "New content with visuals is now live." });
    }
    setIsBlogModalOpen(false);
    setEditingBlog(null);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    toast({ variant: "destructive", title: "Content Removed", description: "The blog post has been deleted." });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Top Navbar */}
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo className="scale-75 origin-left" />
            </Link>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <span className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
              <Settings className="w-4 h-4" /> Admin Control Hub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="rounded-full" suppressHydrationWarning>
              <Link href="/"><ChevronLeft className="w-4 h-4 mr-2" /> View Site</Link>
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-headline font-bold">Dashboard <span className="text-primary">Overview</span></h1>
          <p className="text-muted-foreground">Manage your enterprise platform content, services, and visual resources.</p>
        </div>

        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="bg-secondary/50 border border-white/5 p-1 rounded-xl w-full max-w-md">
            <TabsTrigger value="services" className="flex-1 gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all" suppressHydrationWarning>
              <Cpu className="w-4 h-4" /> Services
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex-1 gap-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all" suppressHydrationWarning>
              <FileText className="w-4 h-4" /> Blogs & Resources
            </TabsTrigger>
          </TabsList>

          {/* Services Content */}
          <TabsContent value="services" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="glass-card border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/5">
                <div>
                  <CardTitle className="text-2xl font-bold">Service Offerings</CardTitle>
                  <CardDescription>Manage the service cards shown on the homepage.</CardDescription>
                </div>
                <Dialog open={isServiceModalOpen} onOpenChange={(open) => { setIsServiceModalOpen(open); if(!open) setEditingService(null); }}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full shadow-lg shadow-primary/20" suppressHydrationWarning>
                      <Plus className="w-4 h-4 mr-2" /> Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-white/10 text-foreground">
                    <DialogHeader>
                      <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
                      <DialogDescription>Define the service title, category, and summary for the public catalog.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSaveService} className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Service Title</Label>
                          <Input id="title" name="title" defaultValue={editingService?.title} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category (e.g. SAP, AI, Cloud)</Label>
                          <Input id="category" name="category" defaultValue={editingService?.category} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="summary">Brief Summary</Label>
                          <Textarea id="summary" name="summary" defaultValue={editingService?.summary} required className="bg-secondary/50 border-white/5 min-h-[100px]" suppressHydrationWarning />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="w-full" suppressHydrationWarning>
                          {editingService ? "Save Changes" : "Create Service"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="pt-6 px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="pl-6">Service Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="hidden md:table-cell">Summary</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id} className="border-white/5 group transition-colors hover:bg-white/[0.02]">
                        <TableCell className="font-bold pl-6">{service.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {service.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-xs truncate hidden md:table-cell">
                          {service.summary}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                              onClick={() => { setEditingService(service); setIsServiceModalOpen(true); }}
                              suppressHydrationWarning
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteService(service.id)}
                              suppressHydrationWarning
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blogs Content */}
          <TabsContent value="blogs" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="glass-card border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/5">
                <div>
                  <CardTitle className="text-2xl font-bold">Resources & Blog</CardTitle>
                  <CardDescription>Manage industry insights, technical resources, and featured visuals.</CardDescription>
                </div>
                <Dialog open={isBlogModalOpen} onOpenChange={(open) => { setIsBlogModalOpen(open); if(!open) setEditingBlog(null); }}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full shadow-lg shadow-primary/20" suppressHydrationWarning>
                      <Plus className="w-4 h-4 mr-2" /> New Content
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-white/10 text-foreground sm:max-w-xl">
                    <DialogHeader>
                      <DialogTitle>{editingBlog ? "Edit Content" : "Publish New Article"}</DialogTitle>
                      <DialogDescription>Fill in the article details and provide a high-quality image URL.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSaveBlog} className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="btitle">Article Title</Label>
                          <Input id="btitle" name="title" defaultValue={editingBlog?.title} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bimg" className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-primary" /> Feature Image URL
                          </Label>
                          <Input id="bimg" name="imageUrl" defaultValue={editingBlog?.imageUrl} placeholder="https://picsum.photos/seed/..." className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          <p className="text-[10px] text-muted-foreground italic">Tip: Use Unsplash or Picsum URLs for the demo.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bcat">Category</Label>
                            <Input id="bcat" name="category" defaultValue={editingBlog?.category} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bauth">Author</Label>
                            <Input id="bauth" name="author" defaultValue={editingBlog?.author} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="w-full" suppressHydrationWarning>
                          {editingBlog ? "Update Resource" : "Publish Content"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="pt-6 px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="pl-6 w-24">Visual</TableHead>
                      <TableHead>Article Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="hidden sm:table-cell">Author</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog) => (
                      <TableRow key={blog.id} className="border-white/5 group transition-colors hover:bg-white/[0.02]">
                        <TableCell className="pl-6">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <Image 
                              src={blog.imageUrl} 
                              alt={blog.title} 
                              fill 
                              className="object-cover"
                              unoptimized={blog.imageUrl.includes('placeholder.co')}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium max-w-xs truncate">{blog.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-white/5 text-foreground/70">
                            {blog.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{blog.author}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{blog.date}</TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                              onClick={() => { setEditingBlog(blog); setIsBlogModalOpen(true); }}
                              suppressHydrationWarning
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteBlog(blog.id)}
                              suppressHydrationWarning
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
    </div>
  );
}
