
"use client";

import React, { useState, useRef } from 'react';
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
  ImageIcon,
  GraduationCap,
  Building2,
  Briefcase,
  Mail,
  Upload,
  User,
  ExternalLink,
  ShieldCheck,
  Clock,
  Globe,
  Phone,
  Layers,
  Info,
  CheckCircle2
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
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Initial Mock Data
const INITIAL_SERVICES = [
  { id: 1, title: "SAP Transformation", summary: "S/4HANA, BTP, Fiori, RAP, CAP, Integration, Functional Consulting.", category: "SAP" },
  { id: 2, title: "Software Engineering", summary: "Web, mobile, APIs, microservices and enterprise applications.", category: "Engineering" }
];

const INITIAL_BLOGS = [
  { id: 1, title: "Mastering SAP BTP", category: "SAP", author: "Debananda Behera", date: "2024-02-15", imageUrl: "https://picsum.photos/seed/sap/800/450" }
];

const INITIAL_TRAINING = [
  { id: 1, title: "SAP BTP Excellence", description: "Deep dive into CAP and RAP models.", imageUrl: "https://picsum.photos/seed/training1/800/450" },
  { id: 2, title: "Modern Web Stack", description: "Next.js 15 and Tailwind mastery.", imageUrl: "https://picsum.photos/seed/training2/800/450" }
];

const INITIAL_INDUSTRIES = [
  { id: 1, title: "Manufacturing", summary: "Smart manufacturing and ERP operations.", imageUrl: "https://picsum.photos/seed/ind1/800/450" },
  { id: 2, title: "Energy & Utilities", summary: "Asset-intensive digital solutions.", imageUrl: "https://picsum.photos/seed/ind2/800/450" }
];

const INITIAL_CAREERS = [
  { id: 1, title: "Senior SAP Consultant", department: "SAP Solutions", type: "Full-time", location: "Cuttack / Remote" },
  { id: 2, title: "AI/ML Engineer", department: "Innovation Lab", type: "Full-time", location: "Odisha" }
];

const INITIAL_INQUIRIES = [
  { 
    id: 1, 
    name: "John Doe", 
    company: "Global Tech Inc", 
    email: "john@tech.com", 
    service: "SAP BTP", 
    date: "2024-03-01", 
    status: "Pending",
    industry: "Technology",
    jobTitle: "CTO",
    phone: "+1 (555) 123-4567",
    country: "USA",
    requirement: "We are looking to modernize our SAP ECC landscape to S/4HANA and want to build custom extensions using SAP BTP and CAPM.",
    stage: "Planning",
    timeline: "3–6 Months",
    technologies: ["SAP ECC", "AWS", "Custom Apps"],
    sapEnv: "SAP ECC"
  },
  { 
    id: 2, 
    name: "Sarah Smith", 
    company: "Energy Corp", 
    email: "sarah@energy.com", 
    service: "Cloud & DevOps", 
    date: "2024-03-02", 
    status: "Contacted",
    industry: "Energy & Utilities",
    jobTitle: "IT Director",
    phone: "+44 20 7946 0958",
    country: "UK",
    requirement: "Need expert assistance in setting up a robust CI/CD pipeline on Azure for our legacy .NET applications.",
    stage: "Requirement Definition",
    timeline: "Immediate",
    technologies: ["Microsoft", "Azure"],
    sapEnv: "Not Applicable"
  }
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [training, setTraining] = useState(INITIAL_TRAINING);
  const [industries, setIndustries] = useState(INITIAL_INDUSTRIES);
  const [careers, setCareers] = useState(INITIAL_CAREERS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  
  // States for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated Image Upload from Local Device
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    
    if (previewImage) data.imageUrl = previewImage;

    const saveActions: any = {
      services: () => {
        if (editingItem) {
          setServices(prev => prev.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
        } else {
          setServices(prev => [...prev, { id: Date.now(), ...data }]);
        }
      },
      blogs: () => {
        if (editingItem) {
          setBlogs(prev => prev.map(b => b.id === editingItem.id ? { ...b, ...data } : b));
        } else {
          setBlogs(prev => [...prev, { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] }]);
        }
      },
      training: () => {
        if (editingItem) {
          setTraining(prev => prev.map(t => t.id === editingItem.id ? { ...t, ...data } : t));
        } else {
          setTraining(prev => [...prev, { id: Date.now(), ...data }]);
        }
      },
      industries: () => {
        if (editingItem) {
          setIndustries(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...data } : i));
        } else {
          setIndustries(prev => [...prev, { id: Date.now(), ...data }]);
        }
      },
      careers: () => {
        if (editingItem) {
          setCareers(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...data } : c));
        } else {
          setCareers(prev => [...prev, { id: Date.now(), ...data }]);
        }
      }
    };

    saveActions[activeTab]();
    toast({ title: "Success", description: "Record updated successfully." });
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number, type: string) => {
    const setters: any = {
      services: setServices,
      blogs: setBlogs,
      training: setTraining,
      industries: setIndustries,
      careers: setCareers,
      inquiries: setInquiries
    };
    setters[type]( (prev: any[]) => prev.filter(item => item.id !== id));
    toast({ variant: "destructive", title: "Deleted", description: "Item removed from system." });
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
              <ShieldCheck className="w-4 h-4" /> Admin Command Hub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="rounded-full" suppressHydrationWarning>
              <Link href="/"><ChevronLeft className="w-4 h-4 mr-2" /> Live Site</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-headline font-bold">Dashboard <span className="text-primary">Overview</span></h1>
          <p className="text-muted-foreground">Manage your global platform assets and enterprise content strategy.</p>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); resetForm(); }} className="space-y-8">
          <TabsList className="bg-secondary/50 border border-white/5 p-1 rounded-xl w-full flex flex-wrap justify-start h-auto gap-1">
            {[
              { id: "services", icon: Cpu, label: "Services" },
              { id: "training", icon: GraduationCap, label: "Training" },
              { id: "industries", icon: Building2, label: "Industries" },
              { id: "careers", icon: Briefcase, label: "Careers" },
              { id: "blogs", icon: FileText, label: "Insights" },
              { id: "inquiries", icon: Mail, label: "Inquiries" }
            ].map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex-1 min-w-[120px] gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                suppressHydrationWarning
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Section Render Logic */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="glass-card border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/5">
                <div>
                  <CardTitle className="text-2xl font-bold capitalize">{activeTab} Management</CardTitle>
                  <CardDescription>Manage the records displayed in the {activeTab} section.</CardDescription>
                </div>
                {activeTab !== 'inquiries' && (
                  <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) resetForm(); }}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full shadow-lg shadow-primary/20" suppressHydrationWarning>
                        <Plus className="w-4 h-4 mr-2" /> Add Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-white/10 text-foreground sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Record" : "Add New Record"}</DialogTitle>
                        <DialogDescription>Fill in the details for the {activeTab} section.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSave} className="space-y-6 py-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title / Name</Label>
                            <Input id="title" name="title" defaultValue={editingItem?.title || editingItem?.name} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          </div>
                          
                          {activeTab === 'blogs' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" name="category" defaultValue={editingItem?.category} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" name="author" defaultValue={editingItem?.author} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                              </div>
                            </div>
                          )}

                          {activeTab === 'careers' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input id="department" name="department" defaultValue={editingItem?.department} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" defaultValue={editingItem?.location} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                              </div>
                            </div>
                          )}

                          {(activeTab === 'services' || activeTab === 'industries' || activeTab === 'training') && (
                            <div className="space-y-2">
                              <Label htmlFor="summary">Brief Summary / Description</Label>
                              <Textarea id="summary" name={activeTab === 'training' ? 'description' : 'summary'} defaultValue={editingItem?.summary || editingItem?.description} required className="bg-secondary/50 border-white/5 min-h-[100px]" suppressHydrationWarning />
                            </div>
                          )}

                          {['blogs', 'training', 'industries'].includes(activeTab) && (
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-primary" /> Feature Image (Local Device)
                              </Label>
                              <div className="flex gap-4 items-center">
                                <div className="relative w-24 h-24 rounded-lg border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                                  {previewImage || editingItem?.imageUrl ? (
                                    <Image src={previewImage || editingItem.imageUrl} alt="Preview" fill className="object-cover" />
                                  ) : (
                                    <ImageIcon className="w-8 h-8 text-muted-foreground opacity-20" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <Input 
                                    type="file" 
                                    accept="image/*" 
                                    ref={fileInputRef} 
                                    onChange={handleImageChange}
                                    className="bg-secondary/50 border-white/5 file:bg-primary file:text-primary-foreground file:border-none file:rounded file:px-2 file:py-1 file:text-xs file:mr-2"
                                    suppressHydrationWarning
                                  />
                                  <p className="text-[10px] text-muted-foreground mt-2">Recommended: 800x450px or 16:9 ratio.</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full" suppressHydrationWarning>
                            {editingItem ? "Update Changes" : "Create Record"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardHeader>
              <CardContent className="pt-6 px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent text-xs uppercase tracking-widest text-muted-foreground">
                      {['blogs', 'training', 'industries'].includes(activeTab) && <TableHead className="pl-6 w-24">Visual</TableHead>}
                      <TableHead className={cn(!['blogs', 'training', 'industries'].includes(activeTab) ? "pl-6" : "")}>Title</TableHead>
                      {activeTab === 'services' && <TableHead>Category</TableHead>}
                      {activeTab === 'careers' && <TableHead>Dept / Location</TableHead>}
                      {activeTab === 'inquiries' && <TableHead>Company / Service</TableHead>}
                      {activeTab === 'inquiries' && <TableHead>Status</TableHead>}
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(activeTab === 'services' ? services : 
                      activeTab === 'blogs' ? blogs : 
                      activeTab === 'training' ? training : 
                      activeTab === 'industries' ? industries : 
                      activeTab === 'careers' ? careers : inquiries).map((item: any) => (
                      <TableRow key={item.id} className="border-white/5 group transition-colors hover:bg-white/[0.02]">
                        {['blogs', 'training', 'industries'].includes(activeTab) && (
                          <TableCell className="pl-6">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                              <Image 
                                src={item.imageUrl || "https://placehold.co/100x100/121212/EAB308?text=X"} 
                                alt={item.title || item.name} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                        )}
                        <TableCell className={cn("font-medium max-w-xs truncate", !['blogs', 'training', 'industries'].includes(activeTab) && "pl-6")}>
                          {item.title || item.name}
                        </TableCell>
                        
                        {activeTab === 'services' && <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>}
                        {activeTab === 'careers' && <TableCell className="text-xs">{item.department} • {item.location}</TableCell>}
                        {activeTab === 'inquiries' && <TableCell className="text-xs font-mono">{item.company} <br/> <span className="text-primary">{item.service}</span></TableCell>}
                        {activeTab === 'inquiries' && (
                          <TableCell>
                            <Badge className={item.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}>
                              {item.status}
                            </Badge>
                          </TableCell>
                        )}

                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            {activeTab !== 'inquiries' ? (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                                  onClick={() => { setEditingItem(item); setPreviewImage(item.imageUrl || null); setIsModalOpen(true); }}
                                  suppressHydrationWarning
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(item.id, activeTab)}
                                  suppressHydrationWarning
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <Dialog open={isInquiryModalOpen && selectedInquiry?.id === item.id} onOpenChange={(open) => { setIsInquiryModalOpen(open); if(!open) setSelectedInquiry(null); }}>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs hover:text-primary" 
                                    onClick={() => setSelectedInquiry(item)}
                                    suppressHydrationWarning
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" /> Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-background border-white/10 text-foreground sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
                                  <DialogHeader className="p-6 border-b border-white/5">
                                    <div className="flex items-center justify-between">
                                      <div className="space-y-1">
                                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">Inquiry ID: #{selectedInquiry?.id}</Badge>
                                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                          <Mail className="w-5 h-5 text-primary" /> {selectedInquiry?.name}
                                        </DialogTitle>
                                        <DialogDescription className="text-muted-foreground">{selectedInquiry?.date} • {selectedInquiry?.company}</DialogDescription>
                                      </div>
                                      <Badge className={selectedInquiry?.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}>
                                        {selectedInquiry?.status}
                                      </Badge>
                                    </div>
                                  </DialogHeader>

                                  <ScrollArea className="flex-1 p-6">
                                    <div className="space-y-8">
                                      {/* Business Context Section */}
                                      <section className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                          <MessageSquare className="w-4 h-4" /> Business Requirement
                                        </h4>
                                        <div className="p-4 rounded-xl bg-secondary/30 border border-white/5 italic text-muted-foreground leading-relaxed">
                                          "{selectedInquiry?.requirement || 'No detailed requirement provided.'}"
                                        </div>
                                      </section>

                                      {/* Project Details Grid */}
                                      <div className="grid md:grid-cols-2 gap-8">
                                        <section className="space-y-4">
                                          <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                            <Layers className="w-4 h-4" /> Project Intel
                                          </h4>
                                          <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                              <span className="text-sm text-muted-foreground flex items-center gap-2"><Target className="w-3 h-3" /> Requested Service</span>
                                              <span className="text-sm font-medium text-primary">{selectedInquiry?.service}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                              <span className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3" /> Expected Timeline</span>
                                              <span className="text-sm font-medium">{selectedInquiry?.timeline || 'Not Specified'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                              <span className="text-sm text-muted-foreground flex items-center gap-2"><Info className="w-3 h-3" /> Current Stage</span>
                                              <span className="text-sm font-medium">{selectedInquiry?.stage || 'Researching'}</span>
                                            </div>
                                          </div>
                                        </section>

                                        <section className="space-y-4">
                                          <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                            <Cpu className="w-4 h-4" /> Tech Landscape
                                          </h4>
                                          <div className="space-y-3">
                                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                              <span className="text-sm text-muted-foreground">SAP Environment</span>
                                              <Badge variant="outline" className="border-white/10">{selectedInquiry?.sapEnv || 'None'}</Badge>
                                            </div>
                                            <div className="space-y-2">
                                              <span className="text-sm text-muted-foreground">Current Ecosystem</span>
                                              <div className="flex flex-wrap gap-2">
                                                {selectedInquiry?.technologies?.length ? selectedInquiry.technologies.map((t: string) => (
                                                  <Badge key={t} variant="secondary" className="text-[10px] bg-white/5">{t}</Badge>
                                                )) : <span className="text-xs italic text-muted-foreground">None listed</span>}
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                      </div>

                                      <Separator className="bg-white/5" />

                                      {/* Contact Information */}
                                      <section className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                          <User className="w-4 h-4" /> Contact Information
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-6 p-6 rounded-xl bg-primary/5 border border-primary/10">
                                          <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                              <div className="p-2 rounded-lg bg-background border border-white/5">
                                                <Mail className="w-4 h-4 text-primary" />
                                              </div>
                                              <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Email Address</p>
                                                <a href={`mailto:${selectedInquiry?.email}`} className="text-sm font-medium hover:text-primary transition-colors">{selectedInquiry?.email}</a>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              <div className="p-2 rounded-lg bg-background border border-white/5">
                                                <Phone className="w-4 h-4 text-primary" />
                                              </div>
                                              <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Phone Number</p>
                                                <span className="text-sm font-medium">{selectedInquiry?.phone || 'N/A'}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                              <div className="p-2 rounded-lg bg-background border border-white/5">
                                                <Building2 className="w-4 h-4 text-primary" />
                                              </div>
                                              <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Job Title / Company</p>
                                                <span className="text-sm font-medium">{selectedInquiry?.jobTitle || 'Lead'} @ {selectedInquiry?.company}</span>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              <div className="p-2 rounded-lg bg-background border border-white/5">
                                                <Globe className="w-4 h-4 text-primary" />
                                              </div>
                                              <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Location / Industry</p>
                                                <span className="text-sm font-medium">{selectedInquiry?.country} ({selectedInquiry?.industry})</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                  </ScrollArea>

                                  <DialogFooter className="p-6 border-t border-white/5 bg-white/5">
                                    <div className="flex items-center justify-between w-full">
                                      <p className="text-xs text-muted-foreground">Inquiry received via Matchmaker Hub on {selectedInquiry?.date}</p>
                                      <div className="flex gap-3">
                                        <Button variant="outline" size="sm" className="rounded-full border-white/10" onClick={() => setIsInquiryModalOpen(false)}>Close</Button>
                                        <Button size="sm" className="rounded-full shadow-lg shadow-primary/20" onClick={() => {
                                          setInquiries(prev => prev.map(inq => inq.id === selectedInquiry.id ? { ...inq, status: 'Contacted' } : inq));
                                          toast({ title: "Inquiry Updated", description: "Status marked as Contacted." });
                                          setIsInquiryModalOpen(false);
                                        }}>
                                          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Contacted
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
    </div>
  );
}
