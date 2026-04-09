
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
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Quote, 
  Heart, 
  Users, 
  Zap,
  Lock
} from 'lucide-react';
import Link from 'next/link';

const openRoles = [
  {
    title: "Senior SAP BTP Consultant",
    department: "Enterprise Solutions",
    location: "Remote / Cuttack",
    type: "Full-time",
    experience: "5+ Years"
  },
  {
    title: "AI/ML Engineer (GenAI)",
    department: "AI Innovation Lab",
    location: "Cuttack, Odisha",
    type: "Full-time",
    experience: "3+ Years"
  },
  {
    title: "Senior React Developer",
    department: "Digital Delivery",
    location: "Remote",
    type: "Contract",
    experience: "4+ Years"
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
  }
];

const lifeAtXgenIq = [
  { id: "culture-1", title: "Collaborative Spirit" },
  { id: "culture-2", title: "Celebrating Success" },
  { id: "office-modern", title: "Modern Workspaces" }
];

export function Careers() {
  return (
    <section id="careers" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.03),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Join Our Team</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Build the Future of <span className="text-primary">Enterprise Tech</span></h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're looking for visionary thinkers, skilled developers, and strategic consultants to join our global mission of digital transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Job Openings Column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="open" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h3 className="text-2xl font-headline font-bold">Career <span className="text-primary">Opportunities</span></h3>
                <TabsList className="bg-card/20 border border-white/5">
                  <TabsTrigger value="open" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Open Roles</TabsTrigger>
                  <TabsTrigger value="closed" className="data-[state=active]:bg-secondary data-[state=active]:text-foreground">Recently Closed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="open" className="space-y-4 mt-0">
                {openRoles.map((role, idx) => (
                  <Card key={idx} className="glass-card border-white/5 bg-card/10 hover:bg-card/30 transition-all group">
                    <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <h4 className="text-xl font-bold">{role.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {role.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {role.type}</span>
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">{role.experience}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
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
                <p className="text-center text-sm text-muted-foreground pt-4 italic">
                  Follow our LinkedIn for real-time updates on new openings.
                </p>
              </TabsContent>
            </Tabs>

            {/* Life at XgenIq Gallery */}
            <div className="pt-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-bold">Life at <span className="text-primary">XgenIq</span></h3>
                <p className="text-muted-foreground">Beyond the code: building a community of excellence and fun.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lifeAtXgenIq.map((item, idx) => {
                  const image = PlaceHolderImages.find(img => img.id === item.id);
                  return (
                    <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-white/5">
                      <Image 
                        src={image?.imageUrl || `https://picsum.photos/seed/culture${idx}/600/600`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={image?.imageHint || "office culture"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-sm font-bold text-primary">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Heart, title: "Wellness First", desc: "Comprehensive health benefits." },
                  { icon: Zap, title: "Learning Fund", desc: "Annual budget for certifications." },
                  { icon: Users, title: "Global Team", desc: "Work with talent from 5+ countries." }
                ].map((perk, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <perk.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{perk.title}</h5>
                      <p className="text-xs text-muted-foreground">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Carousel Column */}
          <div className="space-y-8 sticky top-24">
            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold text-center lg:text-left">Employee <span className="text-primary">Stories</span></h3>
              <p className="text-muted-foreground text-center lg:text-left">Hear directly from our leads and consultants about their journey.</p>
            </div>
            
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {employeeTestimonials.map((emp, idx) => {
                  const image = PlaceHolderImages.find(img => img.id === emp.imageId);
                  return (
                    <CarouselItem key={idx}>
                      <Card className="border-white/5 bg-card/20 glass-card">
                        <CardContent className="p-8 space-y-6">
                          <Quote className="w-10 h-10 text-primary/20" />
                          <p className="text-lg text-foreground/90 italic leading-relaxed">
                            "{emp.text}"
                          </p>
                          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                              <Image 
                                src={image?.imageUrl || 'https://picsum.photos/seed/emp/100/100'}
                                alt={emp.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground">{emp.name}</h4>
                              <p className="text-xs text-primary font-medium uppercase tracking-wider">{emp.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static translate-y-0 border-white/10 hover:bg-primary/10" />
                <CarouselNext className="static translate-y-0 border-white/10 hover:bg-primary/10" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
