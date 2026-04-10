"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Autoplay from 'embla-carousel-autoplay';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Quote, 
  Heart, 
  Zap,
  Lock,
  ChevronRight,
  Upload,
  User,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Info,
  Building2,
  Globe,
  Users,
  Search,
  ChevronLeft,
  CalendarDays,
  Trophy,
  Milestone,
  Smile,
  Rocket
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const openRoles = [
  {
    jobId: "XG-ENT-2024-01",
    title: "Senior SAP BTP Consultant",
    department: "Enterprise Solutions",
    location: "Cuttack / Remote",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "5+ Years",
    experienceValue: 5,
    postedDate: "2024-02-15",
    skills: ["CAPM", "ABAP RAP", "SAP Fiori", "OData"],
    summary: "Architecting scalable extensions using CAPM and RAP for global Fortune 500 clients.",
    jd: "As a Senior SAP BTP Consultant at XgenIq, you will be at the forefront of digital transformation. You will architect and implement cloud-native applications and side-by-side extensions, ensuring our clients leverage the full potential of the SAP Business Technology Platform.",
    responsibilities: [
      "Design and develop cloud-native applications on SAP BTP using CAPM and RAP.",
      "Implement side-by-side extensions for SAP S/4HANA systems.",
      "Lead technical workshops and define architectural patterns for international clients.",
      "Mentor junior consultants and drive best practices in code quality and DevOps."
    ]
  },
  {
    jobId: "XG-AI-2024-02",
    title: "AI/ML Engineer (GenAI)",
    department: "AI Innovation Lab",
    location: "Cuttack, Odisha",
    workMode: "Office",
    type: "Full-time",
    experience: "3+ Years",
    experienceValue: 3,
    postedDate: "2024-02-20",
    skills: ["Python", "LangChain", "Vector DBs", "LLMs"],
    summary: "Developing RAG-based applications and autonomous agents for enterprise automation.",
    jd: "Join our AI Innovation Lab to build the next generation of enterprise intelligence. You will work on cutting-edge Generative AI projects, from RAG pipelines to autonomous agents that solve complex business challenges.",
    responsibilities: [
      "Build and optimize RAG pipelines for enterprise knowledge management.",
      "Develop custom autonomous agents using frameworks like LangChain or AutoGen.",
      "Integrate LLMs into existing enterprise software ecosystems securely.",
      "Collaborate with data engineers to build robust data ingestion and processing pipelines."
    ]
  },
  {
    jobId: "XG-WEB-2024-03",
    title: "Senior React Developer",
    department: "Digital Delivery",
    location: "Global",
    workMode: "Remote",
    type: "Contract",
    experience: "4+ Years",
    experienceValue: 4,
    postedDate: "2024-02-10",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    summary: "Building complex, performant web dashboards and accessible design systems.",
    jd: "We are looking for a Senior React Developer who is passionate about performance and UX. You will lead the development of high-impact web applications, ensuring they are scalable, accessible, and fast.",
    responsibilities: [
      "Develop high-performance frontends for data-intensive enterprise applications.",
      "Collaborate with UI/UX designers to implement pixel-perfect, responsive interfaces.",
      "Implement robust state management and optimize application performance.",
      "Drive the adoption of modern frontend practices like Server Components and advanced testing."
    ]
  },
  {
    jobId: "XG-SAP-2024-04",
    title: "Fiori/UI5 Developer",
    department: "Enterprise Solutions",
    location: "Cuttack",
    workMode: "Office",
    type: "Full-time",
    experience: "2+ Years",
    experienceValue: 2,
    postedDate: "2024-01-05",
    skills: ["SAPUI5", "JavaScript", "XML", "CSS"],
    summary: "Creating intuitive user interfaces for enterprise applications.",
    jd: "Work on building high-quality Fiori applications.",
    responsibilities: ["Develop UI5 apps", "Integrate with OData", "Maintain design standards"]
  }
];

const closedRoles = [
  {
    title: "Junior Web Developer",
    department: "Digital Delivery",
    closedDate: "2023-10-15"
  },
  {
    title: "SAP ABAP Intern",
    department: "Enterprise Solutions",
    closedDate: "2023-11-20"
  },
  {
    title: "Project Manager",
    department: "Operations",
    closedDate: "2023-12-01"
  },
  {
    title: "HR Specialist",
    department: "Human Resources",
    closedDate: "2024-01-10"
  }
];

const employeeTestimonials = [
  {
    name: "Rajesh Kumar",
    role: "Lead SAP Consultant",
    text: "At XgenIq, I've had the chance to work on cutting-edge SAP BTP projects that truly challenge my technical boundaries.",
    journey: "I started as an Associate Consultant 5 years ago. XgenIq provided the perfect platform to transition from legacy ABAP to modern cloud-native BTP architectures.",
    achievements: ["Certified SAP BTP Architect", "Led 5+ S/4HANA Public Cloud Migrations", "Technical Excellence Award 2023"],
    imageId: "emp-1"
  },
  {
    name: "Anita Sharma",
    role: "Senior AI Architect",
    text: "Building RAG-based applications for global enterprises at XgenIq has been an incredible journey. We don't just follow trends; we set them.",
    journey: "Joined XgenIq with a background in traditional ML. Within two years, I spearheaded our GenAI research initiative and now lead a team of 10+ AI engineers.",
    achievements: ["Published 3 AI Research Papers", "Developed XgenIq's Core RAG Framework", "Speaker at Global AI Summits"],
    imageId: "emp-2"
  },
  {
    name: "Sanjay Mohanty",
    role: "Digital Solutions Lead",
    text: "The ownership and flexibility provided here allow me to deliver high-impact solutions while maintaining a great work-life balance.",
    journey: "Came from a large MNC looking for more ownership. At XgenIq, I managed full-lifecycle delivery of complex portals within my first year.",
    achievements: ["100% Client Satisfaction Score", "Optimized Deployment Cycles by 40%", "Mentor of the Year 2023"],
    imageId: "emp-1"
  },
  {
    name: "Priyanka Dash",
    role: "UI/UX Specialist",
    text: "Design is at the heart of everything we build. Working here gives me the creative freedom to redefine enterprise interfaces.",
    journey: "Started as a Graphic Designer and evolved into a UI/UX Lead, focusing on how design can simplify complex SAP workflows.",
    achievements: ["Redesigned 20+ Enterprise Dashboards", "Winner of Best App Design Award", "Created XgenIq's Internal Design System"],
    imageId: "emp-2"
  }
];

const lifeAtXgenIq = [
  { id: "culture-1", title: "Collaborative Spirit" },
  { id: "culture-2", title: "Celebrating Success" },
  { id: "office-modern", title: "Modern Workspaces" }
];

const ITEMS_PER_PAGE = 3;

export function Careers() {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<typeof openRoles[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [openPage, setOpenPage] = useState(1);
  const [closedPage, setClosedPage] = useState(1);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const filteredOpenRoles = useMemo(() => {
    let roles = [...openRoles];
    
    // Search filter
    if (searchTerm) {
      roles = roles.filter(role => 
        role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    roles.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === "oldest") return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      if (sortBy === "experience-asc") return a.experienceValue - b.experienceValue;
      if (sortBy === "experience-desc") return b.experienceValue - a.experienceValue;
      return 0;
    });

    return roles;
  }, [searchTerm, sortBy]);

  const paginatedOpenRoles = useMemo(() => {
    const start = (openPage - 1) * ITEMS_PER_PAGE;
    return filteredOpenRoles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOpenRoles, openPage]);

  const paginatedClosedRoles = useMemo(() => {
    const start = (closedPage - 1) * ITEMS_PER_PAGE;
    return closedRoles.slice(start, start + ITEMS_PER_PAGE);
  }, [closedPage]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: `Your application for ${selectedJob?.title} has been received.`,
    });
    setSelectedJob(null);
  };

  const getWorkModeIcon = (mode: string) => {
    switch (mode) {
      case 'Remote': return <Globe className="w-3.5 h-3.5" />;
      case 'Office': return <Building2 className="w-3.5 h-3.5" />;
      case 'Hybrid': return <MapPin className="w-3.5 h-3.5" />;
      default: return <Briefcase className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="careers" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.03),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Join Our Team</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Build the Future of <span className="text-primary">Enterprise Tech</span></h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're looking for visionary thinkers and strategic consultants to join our global mission of digital transformation.
          </p>
        </div>

        {/* Career Opportunities */}
        <div className="max-w-5xl mx-auto space-y-12 mb-32">
          <Tabs defaultValue="open" className="w-full">
            <div className="flex flex-col gap-8 mb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h3 className="text-3xl font-headline font-bold">Career <span className="text-primary">Opportunities</span></h3>
                <TabsList className="bg-card/20 border border-white/5 p-1">
                  <TabsTrigger value="open" className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Open Roles</TabsTrigger>
                  <TabsTrigger value="closed" className="px-6 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground transition-all">Recently Closed</TabsTrigger>
                </TabsList>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group col-span-1 md:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search by role, department or skill..." 
                    className="pl-10 bg-secondary/30 border-white/5 focus:ring-primary/50"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setOpenPage(1);
                    }}
                  />
                </div>
                <Select value={sortBy} onValueChange={(val) => {
                  setSortBy(val);
                  setOpenPage(1);
                }}>
                  <SelectTrigger className="bg-secondary/30 border-white/5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="experience-asc">Experience: Low to High</SelectItem>
                    <SelectItem value="experience-desc">Experience: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="open" className="space-y-6 mt-0">
              {paginatedOpenRoles.length > 0 ? (
                <>
                  <div className="space-y-6">
                    {paginatedOpenRoles.map((role, idx) => (
                      <Card key={idx} className="glass-card border-white/5 bg-card/10 hover:bg-card/30 transition-all group overflow-hidden">
                        <CardContent className="p-8">
                          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                            <div className="flex-1 space-y-6">
                              <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{role.title}</h4>
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{role.jobId}</span>
                                      <span>{role.department}</span>
                                      <span className="flex items-center gap-1 text-accent font-bold"><CalendarDays className="w-3 h-3" /> Posted {new Date(role.postedDate).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="bg-white/5 border-white/10 flex items-center gap-1.5 py-1 px-3 rounded-full">
                                      {getWorkModeIcon(role.workMode)} {role.workMode}
                                    </Badge>
                                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary flex items-center gap-1.5 py-1 px-3 rounded-full">
                                      <Users className="w-3.5 h-3.5" /> {role.experience}
                                    </Badge>
                                    <Badge variant="outline" className="bg-white/5 border-white/10 flex items-center gap-1.5 py-1 px-3 rounded-full">
                                      <Clock className="w-3.5 h-3.5" /> {role.type}
                                    </Badge>
                                  </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                  {role.summary}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {role.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="bg-white/5 text-foreground/70 text-[10px] uppercase tracking-wider">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-row sm:flex-col lg:flex-row gap-3 min-w-fit">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:bg-primary/10 flex-1 sm:flex-none">
                                    <Info className="w-4 h-4 mr-2" /> View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px] bg-background border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
                                  <DialogHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge className="bg-primary text-primary-foreground">{role.jobId}</Badge>
                                      <Badge variant="outline" className="border-white/20">{role.department}</Badge>
                                    </div>
                                    <DialogTitle className="text-3xl font-headline font-bold">
                                      {role.title}
                                    </DialogTitle>
                                    <div className="flex flex-wrap items-center gap-4 mt-3">
                                      <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
                                        {getWorkModeIcon(role.workMode)} {role.location} ({role.workMode})
                                      </span>
                                      <span className="text-muted-foreground">•</span>
                                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Briefcase className="w-4 h-4" /> {role.type}
                                      </span>
                                      <span className="text-muted-foreground">•</span>
                                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <ChevronRight className="w-4 h-4" /> {role.experience}
                                      </span>
                                    </div>
                                  </DialogHeader>
                                  
                                  <div className="space-y-8 py-8 border-t border-white/5 mt-6">
                                    <div className="space-y-3">
                                      <h5 className="text-lg font-bold flex items-center gap-2 text-primary">
                                        <FileText className="w-5 h-5" /> Detailed Description
                                      </h5>
                                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                        {role.jd}
                                      </p>
                                    </div>

                                    <div className="space-y-4">
                                      <h5 className="text-lg font-bold flex items-center gap-2 text-primary">
                                        <Zap className="w-5 h-5" /> Core Responsibilities
                                      </h5>
                                      <ul className="grid gap-3">
                                        {role.responsibilities.map((item, i) => (
                                          <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="space-y-4">
                                      <h5 className="text-lg font-bold flex items-center gap-2 text-primary">
                                        <Briefcase className="w-5 h-5" /> Preferred Tech Stack
                                      </h5>
                                      <div className="flex flex-wrap gap-2">
                                        {role.skills.map((skill) => (
                                          <Badge key={skill} className="bg-secondary/50 text-foreground border border-white/5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <DialogFooter className="border-t border-white/5 pt-6 flex-col sm:flex-row gap-4">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button className="w-full rounded-full py-6 font-bold text-lg shadow-xl shadow-primary/20">
                                          Apply Now
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[600px] bg-background border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
                                        <DialogHeader>
                                          <DialogTitle className="text-2xl font-headline font-bold">
                                            Application: <span className="text-primary">{role.title}</span>
                                          </DialogTitle>
                                          <DialogDescription className="text-muted-foreground">
                                            Join the XgenIq innovation hub. Complete the form below.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleApplySubmit} className="space-y-6 py-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                              <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Full Name</Label>
                                              <Input id="name" placeholder="John Doe" required className="bg-secondary/50 border-white/10" />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> Email Address</Label>
                                              <Input id="email" type="email" placeholder="john@example.com" required className="bg-secondary/50 border-white/10" />
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                              <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Phone Number</Label>
                                              <Input id="phone" placeholder="+1 (555) 000-0000" required className="bg-secondary/50 border-white/10" />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="linkedin" className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-primary" /> LinkedIn Profile</Label>
                                              <Input id="linkedin" placeholder="linkedin.com/in/johndoe" required className="bg-secondary/50 border-white/10" />
                                            </div>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="cover" className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Brief Intro</Label>
                                            <Textarea id="cover" placeholder="What makes you a great fit?" className="min-h-[100px] bg-secondary/50 border-white/10" />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="cv" className="flex items-center gap-2"><Upload className="w-4 h-4 text-primary" /> Upload CV (PDF)</Label>
                                            <div className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group">
                                              <Input id="cv" type="file" accept=".pdf" className="hidden" />
                                              <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                                              <p className="text-sm font-medium">Click to upload CV</p>
                                              <p className="text-xs text-muted-foreground mt-1">PDF format preferred</p>
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="submit" className="w-full rounded-full py-6 font-bold text-lg shadow-xl shadow-primary/20">
                                              Submit Application
                                            </Button>
                                          </DialogFooter>
                                        </form>
                                      </DialogContent>
                                    </Dialog>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm"
                                    className="rounded-full px-6 flex-1 sm:flex-none shadow-lg shadow-primary/20"
                                    onClick={() => setSelectedJob(role)}
                                  >
                                    Apply Now
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] bg-background border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl font-headline font-bold">
                                      Application: <span className="text-primary">{selectedJob?.title}</span>
                                    </DialogTitle>
                                    <DialogDescription className="text-muted-foreground">
                                      Ready to join XgenIq? Tell us more about yourself.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleApplySubmit} className="space-y-6 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                        <Label htmlFor="name-quick" className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Full Name</Label>
                                        <Input id="name-quick" placeholder="John Doe" required className="bg-secondary/50 border-white/10" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="email-quick" className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> Email Address</Label>
                                        <Input id="email-quick" type="email" placeholder="john@example.com" required className="bg-secondary/50 border-white/10" />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-2">
                                        <Label htmlFor="phone-quick" className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Phone Number</Label>
                                        <Input id="phone-quick" placeholder="+1 (555) 000-0000" required className="bg-secondary/50 border-white/10" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="linkedin-quick" className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-primary" /> LinkedIn Profile</Label>
                                        <Input id="linkedin-quick" placeholder="linkedin.com/in/johndoe" required className="bg-secondary/50 border-white/10" />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="cover-quick" className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Brief Intro</Label>
                                      <Textarea id="cover-quick" placeholder="Tell us why you're a great fit..." className="min-h-[100px] bg-secondary/50 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="cv-quick" className="flex items-center gap-2"><Upload className="w-4 h-4 text-primary" /> Upload CV (PDF)</Label>
                                      <div className="border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group">
                                        <Input id="cv-quick" type="file" accept=".pdf" className="hidden" />
                                        <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                                        <p className="text-sm font-medium">Click to upload CV</p>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit" className="w-full rounded-full py-6 font-bold text-lg shadow-xl shadow-primary/20">
                                        Submit Application
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination Open Roles */}
                  {filteredOpenRoles.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full border-white/10 hover:bg-primary/10"
                        disabled={openPage === 1}
                        onClick={() => setOpenPage(p => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(filteredOpenRoles.length / ITEMS_PER_PAGE) }).map((_, i) => (
                          <Button 
                            key={i} 
                            variant={openPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            className="w-10 h-10 rounded-full border-white/10"
                            onClick={() => setOpenPage(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full border-white/10 hover:bg-primary/10"
                        disabled={openPage === Math.ceil(filteredOpenRoles.length / ITEMS_PER_PAGE)}
                        onClick={() => setOpenPage(p => p + 1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center space-y-4 bg-secondary/10 rounded-2xl border border-dashed border-white/10">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                  <p className="text-muted-foreground text-lg italic">No roles found matching your search criteria.</p>
                  <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-bold">Clear all filters</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4 mt-0">
              {paginatedClosedRoles.map((role, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-dashed border-white/10 bg-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-60">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold line-through text-muted-foreground">{role.title}</h4>
                    <p className="text-xs text-muted-foreground">{role.department}</p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-muted-foreground">
                    <Lock className="w-3 h-3" /> Filled {new Date(role.closedDate).toLocaleDateString()}
                  </Badge>
                </div>
              ))}

              {/* Pagination Closed Roles */}
              {closedRoles.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-white/10"
                    disabled={closedPage === 1}
                    onClick={() => setClosedPage(p => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: Math.ceil(closedRoles.length / ITEMS_PER_PAGE) }).map((_, i) => (
                      <Button 
                        key={i} 
                        variant={closedPage === i + 1 ? "secondary" : "outline"}
                        size="sm"
                        className="w-10 h-10 rounded-full border-white/10"
                        onClick={() => setClosedPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-white/10"
                    disabled={closedPage === Math.ceil(closedRoles.length / ITEMS_PER_PAGE)}
                    onClick={() => setClosedPage(p => p + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Employee Stories - Detailed Card with Achievements and Journey */}
        <div className="space-y-12 mb-32">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-headline font-bold">Employee <span className="text-primary">Stories</span></h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hear directly from our team leads and consultants about their growth journey, achievements, and technical milestones at XgenIq.</p>
          </div>
          
          <Carousel 
            plugins={[plugin.current]}
            className="w-full max-w-7xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {employeeTestimonials.map((emp, idx) => {
                const image = PlaceHolderImages.find(img => img.id === emp.imageId);
                return (
                  <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-white/5 bg-card/20 glass-card group hover:bg-card/40 transition-all duration-500 flex flex-col">
                      <CardContent className="p-8 flex flex-col h-full space-y-6">
                        <Quote className="w-10 h-10 text-primary/20 mb-2" />
                        
                        <div className="flex-1 space-y-6">
                          {/* Testimonial Text */}
                          <p className="text-lg text-foreground/90 italic font-medium leading-relaxed">
                            "{emp.text}"
                          </p>

                          {/* Journey Section */}
                          <div className="space-y-3">
                            <h5 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-widest">
                              <Milestone className="w-4 h-4" /> My Journey
                            </h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {emp.journey}
                            </p>
                          </div>

                          {/* Achievements Section */}
                          <div className="space-y-3">
                            <h5 className="text-sm font-bold flex items-center gap-2 text-accent uppercase tracking-widest">
                              <Trophy className="w-4 h-4" /> Top Achievements
                            </h5>
                            <div className="flex flex-col gap-2">
                              {emp.achievements.map((ach, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-foreground/80 bg-white/5 p-2 rounded border border-white/5">
                                  <ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                  <span>{ach}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Employee Bio Footer */}
                        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                            <Image 
                              src={image?.imageUrl || 'https://picsum.photos/seed/emp/100/100'}
                              alt={emp.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground text-lg">{emp.name}</h4>
                            <p className="text-xs text-primary font-bold uppercase tracking-wider">{emp.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 border-white/10 hover:bg-primary/10" />
              <CarouselNext className="static translate-y-0 border-white/10 hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>

        {/* Life at XgenIq Section */}
        <div className="pt-16 space-y-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-accent/30 text-accent uppercase tracking-tighter">Experience Our Culture</Badge>
              <h3 className="text-4xl md:text-5xl font-headline font-bold">Life at <span className="text-primary">XgenIq</span></h3>
            </div>
            
            <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full -ml-16 -mb-16 blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10 space-y-6">
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                  "We believe that the growth of our company is driven by the growth of its people."
                </p>
                <div className="space-y-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed text-base md:text-lg">
                  <p>
                    We foster an environment that offers continuous opportunities for self-development, empowering each member of our team to thrive. We don't believe in monotony.
                  </p>
                  <p>
                    Life at XgenIq is a blend of hard work and fun, with a focus on creativity and camaraderie. From cracking jokes to battling boredom, we ensure every day is filled with energy and excitement, making our workplace not just a job, but a journey.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 pt-8">
                  {[
                    { icon: Heart, title: "Wellness First", color: "text-red-400" },
                    { icon: Zap, title: "Learning Fund", color: "text-primary" },
                    { icon: Users, title: "Global Team", color: "text-blue-400" },
                    { icon: Smile, title: "Fun Culture", color: "text-accent" },
                    { icon: Rocket, title: "Rapid Growth", color: "text-purple-400" }
                  ].map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-background/50 border border-white/5 px-4 py-2 rounded-full hover:border-primary/30 transition-colors">
                      <perk.icon className={`w-4 h-4 ${perk.color}`} />
                      <span className="text-sm font-bold whitespace-nowrap">{perk.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lifeAtXgenIq.map((item, idx) => {
              const image = PlaceHolderImages.find(img => img.id === item.id);
              return (
                <div key={idx} className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <Image 
                    src={image?.imageUrl || `https://picsum.photos/seed/culture${idx}/600/600`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint={image?.imageHint || "office culture"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Culture & Fun</span>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}