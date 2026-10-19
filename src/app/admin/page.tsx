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
  Quote,
  BriefcaseBusiness,
  Lightbulb,
  Boxes
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

// Default Data Constants
const DEFAULT_TESTIMONIALS = [
  { id: 1, name: "Strategic Lead", company: "Bid Master", rating: "5", text: "The reverse auction system developed by XgenIq has completely transformed our procurement process. The transparency and efficiency gains were immediate.", imageUrl: null },
  { id: 2, name: "Operations Director", company: "Tiwari Propmart", rating: "5", text: "XgenIq delivered a custom software solution that perfectly aligned with our real estate operations. Their attention to detail is truly commendable.", imageUrl: null }
];

const DEFAULT_SERVICES = [
  { id: 1, title: "SAP Transformation", summary: "S/4HANA, BTP, Fiori, RAP, CAP, Integration, Functional Consulting and AMS.", category: "SAP" },
  { id: 2, title: "Software Engineering", summary: "Web, mobile, APIs, microservices and enterprise applications.", category: "Custom Dev" },
  { id: 3, title: "AI & GenAI", summary: "AI applications, GenAI, AI agents, copilots, automation and intelligent decision support.", category: "GenAI" }
];

const DEFAULT_BLOGS = [
  { id: 1, title: "Mastering SAP BTP: The Future of Extensions", category: "SAP BTP", author: "Tech Lead", date: "2024-03-01", summary: "An in-depth look at CAPM and RAP for modern enterprise scaling.", imageUrl: null }
];

const DEFAULT_CAREERS = [
  { id: 1, title: "Senior SAP BTP Consultant", department: "Enterprise Solutions", location: "Cuttack / Remote", type: "Full-time", postedDate: "2024-03-01", summary: "Lead high-impact digital transformations." }
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("services");

  // Database States
  const [services, setServices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [training, setTraining] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('xgeniq_auth_session');
    if (authStatus !== 'authenticated') {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);

    const loadData = () => {
      const getOrInit = (key: string, defaultData: any) => {
        const stored = localStorage.getItem(key);
        if (!stored) {
          localStorage.setItem(key, JSON.stringify(defaultData));
          return defaultData;
        }
        return JSON.parse(stored);
      };

      setServices(getOrInit('xgeniq_services', DEFAULT_SERVICES));
      setBlogs(getOrInit('xgeniq_blogs', DEFAULT_BLOGS));
      setTraining(getOrInit('xgeniq_training', []));
      setIndustries(getOrInit('xgeniq_industries', []));
      setCareers(getOrInit('xgeniq_careers', DEFAULT_CAREERS));
      setInquiries(getOrInit('xgeniq_inquiries', []));
      setApplications(getOrInit('xgeniq_career_apps', []));
      setTestimonials(getOrInit('xgeniq_testimonials', DEFAULT_TESTIMONIALS));
      setProducts(getOrInit('xgeniq_products', []));
      setCaseStudies(getOrInit('xgeniq_case_studies', []));
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [router]);

  const syncToLocalStorage = (key: string, data: any[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem('xgeniq_auth_session');
    router.push('/login');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    if (previewImage) data.imageUrl = previewImage;

    const keyMap: any = {
      services: { state: services, setter: setServices, storage: 'xgeniq_services' },
      blogs: { state: blogs, setter: setBlogs, storage: 'xgeniq_blogs' },
      training: { state: training, setter: setTraining, storage: 'xgeniq_training' },
      industries: { state: industries, setter: setIndustries, storage: 'xgeniq_industries' },
      careers: { state: careers, setter: setCareers, storage: 'xgeniq_careers' },
      testimonials: { state: testimonials, setter: setTestimonials, storage: 'xgeniq_testimonials' },
      products: { state: products, setter: setProducts, storage: 'xgeniq_products' },
      caseStudies: { state: caseStudies, setter: setCaseStudies, storage: 'xgeniq_case_studies' }
    };

    const target = keyMap[activeTab];
    if (!target) return;

    let newList;
    if (editingItem) {
      newList = target.state.map((item: any) => item.id === editingItem.id ? { ...item, ...data } : item);
    } else {
      newList = [{ id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] }, ...target.state];
    }

    target.setter(newList);
    syncToLocalStorage(target.storage, newList);
    toast({ title: "Success", description: "Database synchronized." });
    setIsModalOpen(false);
    setEditingItem(null);
    setPreviewImage(null);
  };

  const handleDelete = (id: number) => {
    const keyMap: any = {
      services: { state: services, setter: setServices, storage: 'xgeniq_services' },
      blogs: { state: blogs, setter: setBlogs, storage: 'xgeniq_blogs' },
      training: { state: training, setter: setTraining, storage: 'xgeniq_training' },
      industries: { state: industries, setter: setIndustries, storage: 'xgeniq_industries' },
      careers: { state: careers, setter: setCareers, storage: 'xgeniq_careers' },
      testimonials: { state: testimonials, setter: setTestimonials, storage: 'xgeniq_testimonials' },
      products: { state: products, setter: setProducts, storage: 'xgeniq_products' },
      caseStudies: { state: caseStudies, setter: setCaseStudies, storage: 'xgeniq_case_studies' },
      inquiries: { state: inquiries, setter: setInquiries, storage: 'xgeniq_inquiries' },
      applications: { state: applications, setter: setApplications, storage: 'xgeniq_career_apps' }
    };

    const target = keyMap[activeTab];
    const newList = target.state.filter((i: any) => i.id !== id);
    target.setter(newList);
    syncToLocalStorage(target.storage, newList);
    toast({ variant: "destructive", title: "Deleted", description: "Record removed." });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo className="scale-75 origin-left" /></Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <ShieldCheck className="w-3 h-3" /> Root Access
            </span>
            <Button variant="outline" size="sm" className="rounded-full border-white/10" onClick={handleLogout} suppressHydrationWarning>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-headline font-bold">Command <span className="text-primary">Center</span></h1>
          <p className="text-muted-foreground">Orchestrate your enterprise digital landscape.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-secondary/50 border border-white/5 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-1 h-auto">
            {[
              { id: "services", icon: Cpu, label: "Services" },
              { id: "products", icon: Boxes, label: "Products" },
              { id: "caseStudies", icon: Lightbulb, label: "Cases" },
              { id: "industries", icon: Building2, label: "Industries" },
              { id: "careers", icon: Briefcase, label: "Careers" },
              { id: "applications", icon: FileBadge, label: "Apps" },
              { id: "blogs", icon: FileText, label: "Insights" },
              { id: "inquiries", icon: Mail, label: "Inquiries" },
              { id: "testimonials", icon: Star, label: "Reviews" },
              { id: "training", icon: GraduationCap, label: "Training" }
            ].map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2 py-2 text-[10px] uppercase font-bold tracking-tighter" suppressHydrationWarning>
                <tab.icon className="w-3 h-3" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <Card className="glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/5">
              <div>
                <CardTitle className="text-xl font-bold capitalize">{activeTab} Management</CardTitle>
                <CardDescription>Real-time control for {activeTab}.</CardDescription>
              </div>
              {!['inquiries', 'applications'].includes(activeTab) && (
                <Dialog open={isModalOpen} onOpenChange={(o) => { setIsModalOpen(o); if(!o) { setEditingItem(null); setPreviewImage(null); } }}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="rounded-full shadow-lg" suppressHydrationWarning><Plus className="w-4 h-4 mr-2" /> Add {activeTab}</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-white/10 sm:max-w-xl" suppressHydrationWarning>
                    <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} {activeTab}</DialogTitle></DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title / Name</Label>
                          <Input name="title" defaultValue={editingItem?.title || editingItem?.name} required className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                        </div>
                        {activeTab === 'services' && (
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Input name="category" defaultValue={editingItem?.category} className="bg-secondary/50 border-white/5" suppressHydrationWarning />
                          </div>
                        )}
                        {['services', 'industries', 'training', 'blogs', 'products', 'caseStudies'].includes(activeTab) && (
                          <div className="space-y-2">
                            <Label>Summary / Body</Label>
                            <Textarea name="summary" defaultValue={editingItem?.summary || editingItem?.description} required className="bg-secondary/50 border-white/5 min-h-[100px]" suppressHydrationWarning />
                          </div>
                        )}
                        {activeTab === 'testimonials' && (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2"><Label>Company</Label><Input name="company" defaultValue={editingItem?.company} required suppressHydrationWarning /></div>
                              <div className="space-y-2"><Label>Rating</Label><Input name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating || 5} suppressHydrationWarning /></div>
                            </div>
                            <div className="space-y-2"><Label>Words</Label><Textarea name="text" defaultValue={editingItem?.text} required suppressHydrationWarning /></div>
                          </>
                        )}
                        {['blogs', 'caseStudies', 'products', 'industries', 'testimonials'].includes(activeTab) && (
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Upload className="w-4 h-4 text-primary" /> Feature Image</Label>
                            <div className="flex gap-4 items-center">
                              <div className="w-16 h-16 rounded border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                                {previewImage || editingItem?.imageUrl ? <Image src={previewImage || editingItem.imageUrl} alt="Preview" width={64} height={64} className="object-cover" /> : <ImageIcon className="w-6 h-6 opacity-20" />}
                              </div>
                              <Input type="file" onChange={handleImageChange} className="bg-secondary/50 border-white/5 flex-1" suppressHydrationWarning />
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter><Button type="submit" className="w-full" suppressHydrationWarning>Save Record</Button></DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <TableHead>Visual</TableHead>
                    <TableHead>Title</TableHead>
                    {activeTab === 'services' && <TableHead>Category</TableHead>}
                    {['inquiries', 'applications'].includes(activeTab) && <TableHead>Status</TableHead>}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {((activeTab === 'services' ? services : 
                    activeTab === 'blogs' ? blogs : 
                    activeTab === 'industries' ? industries : 
                    activeTab === 'careers' ? careers : 
                    activeTab === 'products' ? products : 
                    activeTab === 'caseStudies' ? caseStudies : 
                    activeTab === 'applications' ? applications : 
                    activeTab === 'testimonials' ? testimonials : 
                    activeTab === 'training' ? training : inquiries) || []).map((item: any) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02]">
                      <TableCell>
                        <div className="relative w-8 h-8 rounded border border-white/10 overflow-hidden bg-white/5">
                          {item.imageUrl ? <Image src={item.imageUrl} alt={item.title || item.name} fill className="object-cover" /> : <ImageIcon className="w-4 h-4 m-2 opacity-20" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-xs max-w-xs truncate">{item.title || item.name}</TableCell>
                      {activeTab === 'services' && <TableCell><Badge variant="secondary" className="text-[10px]">{item.category}</Badge></TableCell>}
                      {['inquiries', 'applications'].includes(activeTab) && <TableCell><Badge className="text-[10px]">{item.status}</Badge></TableCell>}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!['inquiries', 'applications'].includes(activeTab) && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary" onClick={() => { setEditingItem(item); setPreviewImage(item.imageUrl || null); setIsModalOpen(true); }} suppressHydrationWarning><Pencil className="w-3.5 h-3.5" /></Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive" onClick={() => handleDelete(item.id)} suppressHydrationWarning><Trash2 className="w-3.5 h-3.5" /></Button>
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
    </div>
  );
}
