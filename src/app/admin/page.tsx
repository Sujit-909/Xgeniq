
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Settings, 
  FileText, 
  Cpu, 
  MessageSquare,
  ImageIcon,
  GraduationCap,
  Building2,
  Briefcase,
  Mail,
  Upload,
  User,
  ShieldCheck,
  Phone,
  Layers,
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
  Boxes,
  Eye,
  Sparkles
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Default Data Constants
const DEFAULT_BLOGS = [
  { id: 1, title: "Mastering SAP BTP: The Future of Extensions", category: "SAP", author: "Tech Lead", date: "2024-03-01", summary: "An in-depth look at CAPM and RAP for modern enterprise scaling.", imageUrl: null }
];

const DEFAULT_CASES = [
  { id: 1, title: "Global Retail Transformation", industry: "Retail", summary: "Implementing S/4HANA for 500+ stores globally.", imageUrl: null }
];

const DEFAULT_INNOVATION = [
  { id: 1, title: "Generative AI for Bid Management", summary: "Automating reverse auction responses using LLMs.", imageUrl: null }
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs");

  // Database States
  const [services, setServices] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [innovation, setInnovation] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [training, setTraining] = useState<any[]>([]);

  // Selection States
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

      setServices(getOrInit('xgeniq_services', []));
      setBlogs(getOrInit('xgeniq_blogs', DEFAULT_BLOGS));
      setInnovation(getOrInit('xgeniq_innovation', DEFAULT_INNOVATION));
      setCaseStudies(getOrInit('xgeniq_case_studies', DEFAULT_CASES));
      setIndustries(getOrInit('xgeniq_industries', []));
      setCareers(getOrInit('xgeniq_careers', []));
      setInquiries(getOrInit('xgeniq_inquiries', []));
      setApplications(getOrInit('xgeniq_career_apps', []));
      setTestimonials(getOrInit('xgeniq_testimonials', []));
      setProducts(getOrInit('xgeniq_products', []));
      setTraining(getOrInit('xgeniq_training', []));
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
      innovation: { state: innovation, setter: setInnovation, storage: 'xgeniq_innovation' },
      caseStudies: { state: caseStudies, setter: setCaseStudies, storage: 'xgeniq_case_studies' },
      industries: { state: industries, setter: setIndustries, storage: 'xgeniq_industries' },
      careers: { state: careers, setter: setCareers, storage: 'xgeniq_careers' },
      testimonials: { state: testimonials, setter: setTestimonials, storage: 'xgeniq_testimonials' },
      products: { state: products, setter: setProducts, storage: 'xgeniq_products' },
      training: { state: training, setter: setTraining, storage: 'xgeniq_training' }
    };

    const target = keyMap[activeTab];
    if (!target) return;

    let newList;
    if (editingItem) {
      newList = target.state.map((item: any) => item.id === editingItem.id ? { ...item, ...data } : item);
    } else {
      newList = [{ id: Date.now(), ...data, date: new Date().toISOString().split('T')[0], status: 'Active' }, ...target.state];
    }

    target.setter(newList);
    syncToLocalStorage(target.storage, newList);
    toast({ title: "Success", description: `${activeTab} synchronized.` });
    setIsModalOpen(false);
    setEditingItem(null);
    setPreviewImage(null);
  };

  const handleDelete = (id: number) => {
    const keyMap: any = {
      services: { state: services, setter: setServices, storage: 'xgeniq_services' },
      blogs: { state: blogs, setter: setBlogs, storage: 'xgeniq_blogs' },
      innovation: { state: innovation, setter: setInnovation, storage: 'xgeniq_innovation' },
      caseStudies: { state: caseStudies, setter: setCaseStudies, storage: 'xgeniq_case_studies' },
      industries: { state: industries, setter: setIndustries, storage: 'xgeniq_industries' },
      careers: { state: careers, setter: setCareers, storage: 'xgeniq_careers' },
      testimonials: { state: testimonials, setter: setTestimonials, storage: 'xgeniq_testimonials' },
      products: { state: products, setter: setProducts, storage: 'xgeniq_products' },
      training: { state: training, setter: setTraining, storage: 'xgeniq_training' },
      inquiries: { state: inquiries, setter: setInquiries, storage: 'xgeniq_inquiries' },
      applications: { state: applications, setter: setApplications, storage: 'xgeniq_career_apps' }
    };

    const target = keyMap[activeTab];
    const newList = target.state.filter((i: any) => i.id !== id);
    target.setter(newList);
    syncToLocalStorage(target.storage, newList);
    toast({ variant: "destructive", title: "Deleted", description: "Record removed." });
  };

  const exportToCSV = () => {
    const data = activeTab === 'applications' ? applications : inquiries;
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
    const blob = new Blob([headers + "\n" + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTab}_export.csv`;
    link.click();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background font-body">
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo className="scale-75 origin-left" /></Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary/20 text-primary uppercase text-[10px] tracking-widest px-3">
              <ShieldCheck className="w-3 h-3 mr-1" /> Root Access
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-headline font-bold">Content <span className="text-primary">Manager</span></h1>
          <p className="text-muted-foreground mt-2">Manage the intelligent enterprise digital content.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-secondary/50 border border-white/5 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-1 h-auto">
            {[
              { id: "blogs", icon: FileText, label: "Blogs" },
              { id: "caseStudies", icon: Lightbulb, label: "Case Studies" },
              { id: "innovation", icon: Sparkles, label: "Innovation" },
              { id: "services", icon: Cpu, label: "Services" },
              { id: "products", icon: Boxes, label: "Products" },
              { id: "industries", icon: Building2, label: "Industries" },
              { id: "careers", icon: Briefcase, label: "Careers" },
              { id: "applications", icon: FileBadge, label: "Apps" },
              { id: "inquiries", icon: Mail, label: "Inquiries" },
              { id: "testimonials", icon: Star, label: "Reviews" },
              { id: "training", icon: GraduationCap, label: "Training" }
            ].map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2 py-2 text-[9px] uppercase font-bold tracking-tighter">
                <tab.icon className="w-3 h-3" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <Card className="glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
              <div>
                <CardTitle className="text-xl capitalize">{activeTab} Hub</CardTitle>
                <CardDescription>Manage your {activeTab} collection.</CardDescription>
              </div>
              <div className="flex gap-2">
                {['inquiries', 'applications'].includes(activeTab) && (
                  <Button variant="outline" size="sm" onClick={exportToCSV} className="rounded-full">
                    <FileSpreadsheet className="w-4 h-4 mr-2" /> Export
                  </Button>
                )}
                {!['inquiries', 'applications'].includes(activeTab) && (
                  <Dialog open={isModalOpen} onOpenChange={(o) => { setIsModalOpen(o); if(!o) { setEditingItem(null); setPreviewImage(null); } }}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="rounded-full shadow-lg"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background border-white/10 sm:max-w-xl">
                      <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} {activeTab}</DialogTitle></DialogHeader>
                      <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input name="title" defaultValue={editingItem?.title || editingItem?.name} required className="bg-secondary/50 border-white/5" />
                          </div>
                          {activeTab === 'blogs' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Category</Label>
                                <Input name="category" defaultValue={editingItem?.category} className="bg-secondary/50 border-white/5" />
                              </div>
                              <div className="space-y-2">
                                <Label>Author</Label>
                                <Input name="author" defaultValue={editingItem?.author} className="bg-secondary/50 border-white/5" />
                              </div>
                            </div>
                          )}
                          {activeTab === 'caseStudies' && (
                            <div className="space-y-2">
                              <Label>Industry</Label>
                              <Input name="industry" defaultValue={editingItem?.industry} className="bg-secondary/50 border-white/5" />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label>Summary / Body</Label>
                            <Textarea name="summary" defaultValue={editingItem?.summary || editingItem?.description} required className="bg-secondary/50 border-white/5 min-h-[120px]" />
                          </div>
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Upload className="w-4 h-4 text-primary" /> Feature Image</Label>
                            <div className="flex gap-4 items-center">
                              <div className="w-16 h-16 rounded border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                                {previewImage || editingItem?.imageUrl ? <Image src={previewImage || editingItem?.imageUrl} alt="Preview" width={64} height={64} className="object-cover" /> : <ImageIcon className="w-6 h-6 opacity-20" />}
                              </div>
                              <Input type="file" onChange={handleImageChange} className="bg-secondary/50 border-white/5 flex-1" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter><Button type="submit" className="w-full">Save Changes</Button></DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5">
                    <TableHead className="w-[100px]">Visual</TableHead>
                    <TableHead>Content Info</TableHead>
                    <TableHead>Status/Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {((activeTab === 'blogs' ? blogs : 
                     activeTab === 'innovation' ? innovation :
                     activeTab === 'caseStudies' ? caseStudies :
                     activeTab === 'services' ? services :
                     activeTab === 'products' ? products :
                     activeTab === 'industries' ? industries :
                     activeTab === 'careers' ? careers :
                     activeTab === 'testimonials' ? testimonials :
                     activeTab === 'training' ? training :
                     activeTab === 'applications' ? applications : inquiries) || []).map((item: any) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02]">
                      <TableCell>
                        <div className="w-10 h-10 rounded border border-white/10 overflow-hidden relative bg-white/5">
                          {item.imageUrl ? <Image src={item.imageUrl} alt={item.title} fill className="object-cover" /> : <ImageIcon className="w-4 h-4 m-3 opacity-20" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">{item.title || item.name}</span>
                          <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">{item.summary || item.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[9px] uppercase">{item.status || item.date || 'Active'}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {activeTab === 'applications' && (
                            <Button variant="ghost" size="icon" onClick={() => { setSelectedApp(item); }}><Eye className="w-3.5 h-3.5" /></Button>
                          )}
                          {!['inquiries', 'applications'].includes(activeTab) && (
                            <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setPreviewImage(item.imageUrl || null); setIsModalOpen(true); }}><Pencil className="w-3.5 h-3.5" /></Button>
                          )}
                          <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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
