
"use client";

import React from 'react';
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
import Autoplay from 'embla-carousel-autoplay';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Quote, 
  Heart, 
  Users, 
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const openRoles = [
  {
    title: "Senior SAP BTP Consultant",
    department: "Enterprise Solutions",
    location: "Remote / Cuttack",
    type: "Full-time",
    experience: "5+ Years",
    jd: "Architecting scalable extensions using CAPM and RAP. Leading side-by-side extensibility projects for global Fortune 500 clients."
  },
  {
    title: "AI/ML Engineer (GenAI)",
    department: "AI Innovation Lab",
    location: "Cuttack, Odisha",
    type: "Full-time",
    experience: "3+ Years",
    jd: "Developing RAG-based applications and autonomous SQL agents. Implementing state-of-the-art LLM solutions for enterprise automation."
  },
  {
    title: "Senior React Developer",
    department: "Digital Delivery",
    location: "Remote",
    type: "Contract",
    experience: "4+ Years",
    jd: "Building complex, performant web dashboards with Next.js and TypeScript. Ensuring pixel-perfect UI/UX and accessible design systems."
  }
];

const closedRoles = [
  {
    title: "Junior Web Developer",
    department: "Digital Delivery",
    closedDate: "Oct 2023"
  },
  {
    title: "SAP ABAP Intern",
    department: "Enterprise Solutions",
    closedDate: "Nov 2023"
  }
];

const employeeTestimonials = [
  {
    name: "Rajesh Kumar",
    role: "Lead SAP Consultant",
    text: "At XgenIq, I've had the chance to work on cutting-edge SAP BTP projects that truly challenge my technical boundaries. The culture of innovation is unmatched.",
    imageId: "emp-1"
  },
  {
    name: "Anita Sharma",
    role: "Senior AI Architect",
    text: "Building RAG-based applications for global enterprises at XgenIq has been an incredible journey. We don't just follow trends; we set them.",
    imageId: "emp-2"
  },
  {
    name: "Sanjay Mohanty",
    role: "Digital Solutions Lead",
    text: "The ownership and flexibility provided here allow me to deliver high-impact solutions while maintaining a great work-life balance.",
    imageId: "emp-1"
  },
  {
    name: "Priyanka Dash",
    role: "UI/UX Specialist",
    text: "Design is at the heart of everything we build. Working here gives me the creative freedom to redefine enterprise interfaces.",
    imageId: "emp-2"
  }
];

const lifeAtXgenIq = [
  { id: "culture-1", title: "Collaborative Spirit" },
  { id: "culture-2", title: "Celebrating Success" },
  { id: "office-modern", title: "Modern Workspaces" }
];

export function Careers() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="careers" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.03),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Join Our Team</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Build the Future of <span className="text-primary">Enterprise Tech</span></h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're looking for visionary thinkers and strategic consultants to join our global mission of digital transformation.
          </p>
        </div>

        {/* Section 1: Job Opportunities */}
        <div className="max-w-5xl mx-auto space-y-12 mb-24">
          <Tabs defaultValue="open" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <h3 className="text-3xl font-headline font-bold">Career <span className="text-primary">Opportunities</span></h3>
              <TabsList className="bg-card/20 border border-white/5 p-1">
                <TabsTrigger value="open" className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Open Roles</TabsTrigger>
                <TabsTrigger value="closed" className="px-6 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground transition-all">Recently Closed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="open" className="space-y-6 mt-0">
              {openRoles.map((role, idx) => (
                <Card key={idx} className="glass-card border-white/5 bg-card/10 hover:bg-card/30 transition-all group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-8 flex-1 space-y-4 border-r border-white/5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-primary/20">
                              <Briefcase className="w-4 h-4 text-primary" />
                            </div>
                            <h4 className="text-2xl font-bold text-foreground">{role.title}</h4>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {role.location}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {role.type}</span>
                            <span className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-primary" /> {role.experience}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {role.jd}
                        </p>
                      </div>
                      <div className="p-8 bg-white/5 flex items-center justify-center min-w-[200px]">
                        <Button className="rounded-full px-8 py-6 h-auto text-lg font-bold group shadow-lg shadow-primary/20">
                          Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4 mt-0">
              {closedRoles.map((role, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-dashed border-white/10 bg-white/5 flex justify-between items-center opacity-60">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold line-through text-muted-foreground">{role.title}</h4>
                    <p className="text-xs text-muted-foreground">{role.department}</p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 border-white/10 text-muted-foreground">
                    <Lock className="w-3 h-3" /> Filled {role.closedDate}
                  </Badge>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Section 2: Employee Stories Carousel */}
        <div className="space-y-12 mb-24">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-headline font-bold">Employee <span className="text-primary">Stories</span></h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hear directly from our team leads and consultants about their growth journey at XgenIq.</p>
          </div>
          
          <Carousel 
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
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
                    <Card className="h-full border-white/5 bg-card/20 glass-card group hover:bg-card/40 transition-all duration-500">
                      <CardContent className="p-8 flex flex-col h-full space-y-6">
                        <Quote className="w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                        <p className="text-lg text-foreground/90 italic leading-relaxed flex-1">
                          "{emp.text}"
                        </p>
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

        {/* Section 3: Life at XgenIq & Culture */}
        <div className="pt-12 space-y-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">Life at <span className="text-primary">XgenIq</span></h3>
              <p className="text-muted-foreground">Beyond the code: building a community of excellence and fun.</p>
            </div>
            <div className="flex gap-8">
              {[
                { icon: Heart, title: "Wellness First" },
                { icon: Zap, title: "Learning Fund" },
                { icon: Users, title: "Global Team" }
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <perk.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">{perk.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifeAtXgenIq.map((item, idx) => {
              const image = PlaceHolderImages.find(img => img.id === item.id);
              return (
                <div key={idx} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <Image 
                    src={image?.imageUrl || `https://picsum.photos/seed/culture${idx}/600/600`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={image?.imageHint || "office culture"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-lg font-bold text-primary">{item.title}</span>
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
