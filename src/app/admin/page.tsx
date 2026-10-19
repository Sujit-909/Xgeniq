"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  CheckCircle2,
  Target,
  FileBadge,
  Linkedin,
  Download,
  FileSpreadsheet,
  LogOut,
  Star,
  Quote
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  
  // Auth Check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Local Database States
  const [services, setServices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [training, setTraining] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  // Modal & UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load "Database" and check auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('xgeniq_auth_session');
    if (authStatus !== 'authenticated') {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);

    const loadData = () => {
      setServices(JSON.parse(localStorage.getItem('xgeniq_services') || '[]'));
      setBlogs(JSON.parse(localStorage.getItem('xgeniq_blogs') || '[]'));
      setTraining(JSON.parse(localStorage.getItem('xgeniq_training') || '[]'));
      setIndustries(JSON.parse(localStorage.getItem('xgeniq_industries') || '[]'));
      setCareers(JSON.parse(localStorage.getItem('xgeniq_careers') || '[]'));
      setInquiries(JSON.parse(localStorage.getItem('xgeniq_inquiries') || '[]'));
      setApplications(JSON.parse(localStorage.getItem('xgeniq_career_apps') || '[]'));
      setTestimonials(JSON.parse(localStorage.getItem('xgeniq_testimonials') || '[]'));
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('xgeniq_auth_session');
    toast({ title: "Logged Out", description: "You have been securely signed out." });
    router.push('/login');
  };

  const syncToLocalStorage = (key: string, data: any[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

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
        let newList;
        if (editingItem) {
          newList = services.map(s => s.id === editingItem.id ? { ...s, ...data } : s);
        } else {
          newList = [...services, { id: Date.now(), ...data }];
        }
        setServices(newList);
        syncToLocalStorage('xgeniq_services', newList);
      },
      blogs: () => {
        let newList;
        if (editingItem) {
          newList = blogs.map(b => b.id === editingItem.id ? { ...b, ...data } : b);
        } else {
          newList = [...blogs, { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] }];
        }
        setBlogs(newList);
        syncToLocalStorage('xgeniq_blogs', newList);
      },
      training: () => {
        let newList;
        if (editingItem) {
          newList = training.map(t => t.id === editingItem.id ? { ...t, ...data } : t);
        } else {
          newList = [...training, { id: Date.now(), ...data }];
        }
        setTraining(newList);
        syncToLocalStorage('xgeniq_training', newList);
      },
      industries: () => {
        let newList;
        if (editingItem) {
          newList = industries.map(i => i.id === editingItem.id ? { ...i, ...data } : i);
        } else {
          newList = [...industries, { id: Date.now(), ...data }];
        }
        setIndustries(newList);
        syncToLocalStorage('xgeniq_industries', newList);
      },
      careers: () => {
        let newList;
        if (editingItem) {
          newList = careers.map(c => c.id === editingItem.id ? { ...c, ...data } : c);
        } else {
          newList = [...careers, { id: Date.now(), ...data, postedDate: new Date().toISOString().split('T')[0] }];
        }
        setCareers(newList);
        syncToLocalStorage('xgeniq_careers', newList);
      },
      testimonials: () => {
        let newList;
        if (editingItem) {
          newList = testimonials.map(t => t.id === editingItem.id ? { ...t, ...data } : t);
        } else {
          newList = [...testimonials, { id: Date.now(), ...data }];
        }
        setTestimonials(newList);
        syncToLocalStorage('xgeniq_testimonials', newList);
      }
    };

    saveActions[activeTab]();
    toast({ title: "Success", description: "Demo Database updated." });
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number, type: string) => {
    const tableKeys: any = {
      services: 'xgeniq_services',
      blogs: 'xgeniq_blogs',
      training: 'xgeniq_training',
      industries: 'xgeniq_industries',
      careers: 'xgeniq_careers',
      inquiries: 'xgeniq_inquiries',
      applications: 'xgeniq_career_apps',
      testimonials: 'xgeniq_testimonials'
    };
    
    const stateSetters: any = {
      services: setServices,
      blogs: setBlogs,
      training: setTraining,
      industries: setIndustries,
      careers: setCareers,
      inquiries: setInquiries,
      applications: setApplications,
      testimonials: setTestimonials
    };

    const currentList = JSON.parse(localStorage.getItem(tableKeys[type]) || '[]');
    const newList = currentList.filter((item: any) => item.id !== id);
    
    stateSetters[type](newList);
    syncToLocalStorage(tableKeys[type], newList);
    
    toast({ variant: "destructive", title: "Deleted", description: "Record removed from demo database." });
  };

  const exportApplicationsToCSV = () => {
    if (applications.length === 0) {
      toast({ title: "No Data", description: "No applications available to export." });
      return;
    }
    const headers = ["ID", "Name", "Email", "Phone", "LinkedIn", "Job Title", "Date", "Status"];
    const rows = applications.map(app => [
      app.id,
      app.name,
      app.email,
      app.phone,
      app.linkedin,
      app.jobTitle,
      app.date,
      app.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `XgenIq_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo className="scale-75 origin-left" />
            </Link>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <span className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
              <ShieldCheck className="w-4 h-4" /> Command Hub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="rounded-full" suppressHydrationWarning>
              <Link href="/"><ChevronLeft className="w-4 h-4 mr-2" /> Live Site</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-white/10 text-muted-foreground hover:text-destructive" onClick={handleLogout} suppressHydrationWarning>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-headline font-bold">Dashboard <span className="text-primary">Overview</span></h1>
          <p className="text-muted-foreground">Manage your simulated enterprise database in real-time.</p>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); resetForm(); }} className="space-y-8">
          <TabsList className="bg-secondary/50 border border-white/5 p-1 rounded-xl w-full flex flex-wrap justify-start h-auto gap-1">
            {[
              { id: "services", icon: Cpu, label: "Services" },
              { id: "training", icon: GraduationCap, label: "Training" },
              { id: "industries", icon: Building2, label: "Industries" },
              { id: "careers", icon: Briefcase, label: "Job Postings" },
              { id: "applications", icon: FileBadge, label: "Job Apps" },
              { id: "blogs", icon: FileText, label: "Insights" },
              { id: "inquiries", icon: Mail, label: "Inquiries" },
              { id: "testimonials", icon: Star, label: "Partners Say" }
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

          <Card className="glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/5">
              <div>
                <CardTitle className="text-2xl font-bold capitalize">{activeTab === 'testimonials' ? 'Partner Testimonials' : activeTab} Management</CardTitle>
                <CardDescription>Simulated records for the {activeTab} collection.</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {activeTab === 'applications' && (
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 hidden sm:flex" onClick={exportApplicationsToCSV} suppressHydrationWarning>
                    <FileSpreadsheet className="w-4 h-4 mr-2" /> Export to CSV
                  </Button>
                )}
                {!['inquiries', 'applications'].includes(activeTab) && (
                  <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) resetForm(); }}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full shadow-lg shadow-primary/20" suppressHydrationWarning>
                        <Plus className="w-4 h-4 mr-2" /> Add Record
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-white/10 text-foreground sm:max-w-xl" suppressHydrationWarning>
                      <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Record" : "Add New Record"}</DialogTitle>
                        <DialogDescription>Syncing data to LocalStorage collection.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSave} className="space-y-6 py-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{activeTab === 'testimonials' ? 'Client Name' : 'Title / Name'}</Label>
                            <Input id="name" name="name" defaultValue={editingItem?.name || editingItem?.title} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          </div>
                          
                          {activeTab === 'testimonials' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="company">Company</Label>
                                  <Input id="company" name="company" defaultValue={editingItem?.company} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="rating">Rating (1-5)</Label>
                                  <Select name="rating" defaultValue={editingItem?.rating?.toString() || "5"}>
                                    <SelectTrigger className="bg-secondary/50 border-white/5">
                                      <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[5, 4, 3, 2, 1].map(r => (
                                        <SelectItem key={r} value={r.toString()}>{r} Stars</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="text">Testimonial Words</Label>
                                <Textarea id="text" name="text" defaultValue={editingItem?.text} required className="bg-secondary/50 border-white/5 min-h-[100px]" suppressHydrationWarning />
                              </div>
                            </>
                          )}

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

                          {['blogs', 'training', 'industries', 'testimonials'].includes(activeTab) && (
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-primary" /> Feature Image (Local)
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
                                    className="bg-secondary/50 border-white/5 file:bg-primary file:text-primary-foreground"
                                    suppressHydrationWarning
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full" suppressHydrationWarning>Save to DB</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 px-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent text-xs uppercase tracking-widest text-muted-foreground">
                    {['blogs', 'training', 'industries', 'testimonials'].includes(activeTab) && <TableHead className="pl-6 w-24">Visual</TableHead>}
                    <TableHead className={cn(!['blogs', 'training', 'industries', 'testimonials'].includes(activeTab) ? "pl-6" : "")}>Title / Candidate</TableHead>
                    {activeTab === 'services' && <TableHead>Category</TableHead>}
                    {activeTab === 'careers' && <TableHead>Dept / Location</TableHead>}
                    {activeTab === 'testimonials' && <TableHead>Company & Rating</TableHead>}
                    {activeTab === 'applications' && <TableHead>Applied For</TableHead>}
                    {activeTab === 'inquiries' && <TableHead>Company / Service</TableHead>}
                    {['inquiries', 'applications'].includes(activeTab) && <TableHead>Status</TableHead>}
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(activeTab === 'services' ? services : 
                    activeTab === 'blogs' ? blogs : 
                    activeTab === 'training' ? training : 
                    activeTab === 'industries' ? industries : 
                    activeTab === 'careers' ? careers : 
                    activeTab === 'applications' ? applications : 
                    activeTab === 'testimonials' ? testimonials : inquiries).map((item: any) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02]">
                      {['blogs', 'training', 'industries', 'testimonials'].includes(activeTab) && (
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
                      <TableCell className={cn("font-medium max-w-xs truncate", !['blogs', 'training', 'industries', 'testimonials'].includes(activeTab) && "pl-6")}>
                        {item.title || item.name}
                      </TableCell>
                      
                      {activeTab === 'services' && <TableCell><Badge variant="secondary">{item.category}</Badge></TableCell>}
                      {activeTab === 'careers' && <TableCell className="text-xs">{item.department} • {item.location}</TableCell>}
                      {activeTab === 'testimonials' && (
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-primary">{item.company}</span>
                            <div className="flex gap-0.5">
                              {[...Array(Number(item.rating || 5))].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      )}
                      {activeTab === 'applications' && <TableCell className="text-xs text-primary">{item.jobTitle}</TableCell>}
                      {activeTab === 'inquiries' && <TableCell className="text-xs font-mono">{item.company} <br/> <span className="text-primary">{item.service}</span></TableCell>}
                      
                      {['inquiries', 'applications'].includes(activeTab) && (
                        <TableCell>
                          <Badge className={item.status === 'New' || item.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      )}

                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {['services', 'blogs', 'training', 'industries', 'careers', 'testimonials'].includes(activeTab) ? (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:text-primary"
                                onClick={() => { setEditingItem(item); setPreviewImage(item.imageUrl || null); setIsModalOpen(true); }}
                                suppressHydrationWarning
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:text-destructive"
                                onClick={() => handleDelete(item.id, activeTab)}
                                suppressHydrationWarning
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          ) : activeTab === 'inquiries' ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs hover:text-primary" 
                              onClick={() => { setSelectedInquiry(item); setIsInquiryModalOpen(true); }}
                              suppressHydrationWarning
                            >
                              <ExternalLink className="w-3 h-3 mr-1" /> View
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs hover:text-primary" 
                              onClick={() => { setSelectedApp(item); setIsAppModalOpen(true); }}
                              suppressHydrationWarning
                            >
                              <ExternalLink className="w-3 h-3 mr-1" /> View
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Tabs>
      </main>

      {/* Inquiry Detail Modal */}
      <Dialog open={isInquiryModalOpen} onOpenChange={setIsInquiryModalOpen}>
        <DialogContent className="sm:max-w-3xl bg-background border-white/10 text-foreground" suppressHydrationWarning>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" /> {selectedInquiry?.name}
            </DialogTitle>
            <DialogDescription>{selectedInquiry?.company} • {selectedInquiry?.date}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              <section className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Requirement</h4>
                <div className="p-4 rounded-xl bg-secondary/30 border border-white/5 italic">
                  "{selectedInquiry?.requirement || 'No detail provided.'}"
                </div>
              </section>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Requested Service</h4>
                  <p className="font-medium text-primary">{selectedInquiry?.service}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Timeline</h4>
                  <p>{selectedInquiry?.timeline}</p>
                </div>
              </div>
              <Separator className="bg-white/5" />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Email</h4>
                  <p>{selectedInquiry?.email}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Location</h4>
                  <p>{selectedInquiry?.country}</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button className="rounded-full" onClick={() => {
              const newList = inquiries.map(i => i.id === selectedInquiry.id ? { ...i, status: 'Contacted' } : i);
              setInquiries(newList);
              syncToLocalStorage('xgeniq_inquiries', newList);
              setIsInquiryModalOpen(false);
              toast({ title: "Updated", description: "Inquiry marked as Contacted." });
            }} suppressHydrationWarning>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Contacted
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* App Detail Modal */}
      <Dialog open={isAppModalOpen} onOpenChange={setIsAppModalOpen}>
        <DialogContent className="sm:max-w-3xl bg-background border-white/10 text-foreground" suppressHydrationWarning>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> {selectedApp?.name}
            </DialogTitle>
            <DialogDescription>Applied for {selectedApp?.jobTitle} on {selectedApp?.date}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              <section className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Cover Letter / Intro</h4>
                <div className="p-4 rounded-xl bg-secondary/30 border border-white/5 italic whitespace-pre-wrap">
                  "{selectedApp?.intro || 'No intro provided.'}"
                </div>
              </section>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Contact Information</h4>
                  <p>{selectedApp?.email}</p>
                  <p>{selectedApp?.phone}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-widest">Social / Resume</h4>
                  <a href={selectedApp?.linkedin} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                    <Linkedin className="w-3 h-3" /> LinkedIn
                  </a>
                  <p className="text-xs text-muted-foreground italic">CV File Uploaded (Simulated)</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex-col sm:flex-row gap-3">
            <Button variant="ghost" className="text-destructive" onClick={() => {
               handleDelete(selectedApp.id, 'applications');
               setIsAppModalOpen(false);
            }} suppressHydrationWarning>Delete Application</Button>
            <Button className="rounded-full" onClick={() => {
              const newList = applications.map(a => a.id === selectedApp.id ? { ...a, status: 'Reviewed' } : a);
              setApplications(newList);
              syncToLocalStorage('xgeniq_career_apps', newList);
              setIsAppModalOpen(false);
              toast({ title: "Updated", description: "Marked as Reviewed." });
            }} suppressHydrationWarning>
              Mark as Reviewed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
