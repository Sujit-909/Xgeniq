"use client";

import React, { useState } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  Database, 
  Workflow, 
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Settings,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

interface ServiceDetail {
  title: string;
  summary: string;
  icon: any;
  sections: {
    title: string;
    items: string[];
  }[];
  cta: string;
}

const mainServices: ServiceDetail[] = [
  {
    title: "SAP Transformation",
    summary: "S/4HANA, BTP, Fiori, RAP, CAP, Integration, Functional Consulting and AMS.",
    icon: Cpu,
    sections: [
      {
        title: "SAP Technical",
        items: ["SAP BTP", "ABAP / RAP", "SAP CAP", "SAP Fiori / UI5", "SAP Integration Suite / CPI", "SAP Basis & Security", "SAP Analytics / SAC", "SAP Datasphere", "SAP Extensions"]
      },
      {
        title: "SAP Functional",
        items: ["SAP FICO", "SAP MM", "SAP SD", "SAP PM", "SAP PP", "SAP QM", "SAP EWM / WM", "SAP PS", "SAP MDM / MDG"]
      },
      {
        title: "SAP Transformation",
        items: ["S/4HANA Implementation", "S/4HANA Upgrade & Migration", "Rollouts", "Clean Core Strategy", "SAP Application Modernization", "SAP AMS Support"]
      }
    ],
    cta: "Explore SAP Services"
  },
  {
    title: "Software Engineering",
    summary: "Web, mobile, APIs, microservices and enterprise applications.",
    icon: Code2,
    sections: [
      {
        title: "Web & Mobile",
        items: ["React / Node.js", ".NET / PHP", "Flutter", ".NET MAUI", "React Native"]
      },
      {
        title: "Backend Engineering",
        items: ["Node.js / Python / .NET", "REST APIs / Microservices", "Enterprise Architecture"]
      },
      {
        title: "Enterprise Applications",
        items: ["Customer & Supplier Portals", "Workflow & Process Apps", "Enterprise Mobility", "Legacy Modernization", "API Modernization", "Cloud-native Transformation"]
      }
    ],
    cta: "Explore Software Engineering"
  },
  {
    title: "Cloud & DevOps",
    summary: "Cloud architecture, migration, modernization and DevOps across leading cloud platforms.",
    icon: Cloud,
    sections: [
      {
        title: "Cloud Platforms",
        items: ["AWS", "Microsoft Azure", "Google Cloud"]
      },
      {
        title: "Services",
        items: ["Cloud Architecture & Migration", "Cloud Modernization", "Cloud-Native Development", "DevOps & CI/CD", "Kubernetes & Containers", "Infrastructure Automation", "Cloud Security", "Monitoring & Optimization"]
      }
    ],
    cta: "Explore Cloud Solutions"
  },
  {
    title: "Data & Analytics",
    summary: "Data engineering, BI, analytics, visualization and enterprise data platforms.",
    icon: Database,
    sections: [
      {
        title: "Data Engineering",
        items: ["Data pipelines", "Data integration", "Data platforms", "Data transformation"]
      },
      {
        title: "Business Intelligence",
        items: ["Microsoft Power BI", "Tableau", "SAP Analytics Cloud"]
      },
      {
        title: "Advanced Analytics",
        items: ["Predictive Analytics", "Data warehouse / Data lake", "KPI Dashboards", "SAP Datasphere"]
      }
    ],
    cta: "Explore Data Services"
  },
  {
    title: "AI & GenAI",
    summary: "AI applications, GenAI, AI agents, copilots, automation and intelligent decision support.",
    icon: BrainCircuit,
    sections: [
      {
        title: "AI Solutions",
        items: ["AI Agents & Copilots", "Generative AI Applications", "RAG & Enterprise Knowledge", "Document Intelligence", "Predictive Analytics", "Intelligent Automation", "Machine Learning"]
      },
      {
        title: "AI Ecosystem",
        items: ["OpenAI / Gemini", "LangChain / Python", "PyTorch / TensorFlow"]
      }
    ],
    cta: "Explore AI Solutions"
  },
  {
    title: "Managed Services",
    summary: "Application support, SAP AMS, non-SAP AMS, staffing and continuous optimization.",
    icon: Settings,
    sections: [
      {
        title: "Support Operations",
        items: ["SAP AMS Support", "Application AMS (Web/Mobile)", "Cloud Managed Services", "Data & Analytics Support", "AI Operations Monitoring"]
      },
      {
        title: "Talent & Strategy",
        items: ["Expert Staffing", "Dedicated Teams", "Corporate Training", "Strategic Project Partnership"]
      }
    ],
    cta: "Explore Managed Services"
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary">What We Do</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
            Engineering <span className="text-primary">Digital Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From enterprise transformation to custom software development, XgenIq combines consulting, engineering and technology expertise to deliver solutions built around your business objectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, idx) => (
            <Card key={idx} className="glass-card hover:bg-card/60 transition-all duration-500 group border-primary/5 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.summary}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary font-bold flex items-center gap-2 w-fit hover:gap-3 transition-all"
                      onClick={() => setSelectedService(service)}
                    >
                      Explore {service.title} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[850px] bg-background border-white/10 text-foreground">
                    {selectedService && (
                      <div className="flex flex-col gap-0 max-h-[85vh]">
                        <DialogHeader className="pb-6 border-b border-white/5">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <selectedService.icon className="w-6 h-6 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-headline font-bold">
                              {selectedService.title}
                            </DialogTitle>
                          </div>
                        </DialogHeader>

                        <ScrollArea className="flex-1 pr-4 mt-6">
                          <div className="grid md:grid-cols-2 gap-8 pb-8">
                            {selectedService.sections.map((section, sIdx) => (
                              <div key={sIdx} className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                  <Layers className="w-4 h-4" /> {section.title}
                                </h4>
                                <ul className="grid gap-2">
                                  {section.items.map((item, iIdx) => (
                                    <li key={iIdx} className="flex items-center gap-2 text-muted-foreground text-sm">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        <div className="pt-6 border-t border-white/5 flex justify-end">
                          <Button className="rounded-full shadow-lg shadow-primary/20" asChild>
                            <a href="#inquiry">Talk to an Expert</a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
