"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Factory, 
  Zap, 
  Droplets, 
  FlaskConical, 
  ShoppingBag, 
  Truck, 
  LayoutGrid,
  ChevronRight,
  CheckCircle2,
  Target,
  ArrowRight,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface IndustryDetail {
  id: string;
  title: string;
  shortDesc: string;
  overview: string;
  icon: any;
  howWeHelp: string[];
  benefits: string[];
}

const industries: IndustryDetail[] = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    shortDesc: "Smart manufacturing solutions that streamline production, supply chain, ERP operations, asset management, analytics, and automation.",
    overview: "Manufacturing organizations are under constant pressure to improve operational efficiency, reduce production costs, increase product quality, and respond quickly to changing customer demands. We help manufacturers modernize their business processes through SAP and digital technologies.",
    icon: Factory,
    howWeHelp: [
      "SAP ERP and S/4HANA implementation and modernization",
      "Production planning and shop-floor process optimization",
      "Supply chain and inventory management",
      "Plant maintenance and asset management",
      "SAP Fiori and business process applications",
      "Data analytics and operational reporting",
      "Workflow automation and digital transformation",
      "Integration between enterprise and manufacturing systems"
    ],
    benefits: [
      "Improved production visibility",
      "Better inventory and supply-chain control",
      "Reduced operational complexity",
      "Faster and data-driven decision-making",
      "Improved asset utilization",
      "Scalable digital manufacturing operations"
    ]
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    shortDesc: "Digital solutions for asset-intensive operations, field services, enterprise applications, analytics, and efficient resource management.",
    overview: "Energy and utility organizations manage complex assets, field operations, customer services, regulatory requirements, and large volumes of operational data. Our solutions help organizations connect enterprise processes with field operations and improve operational visibility.",
    icon: Zap,
    howWeHelp: [
      "SAP S/4HANA transformation",
      "Asset and maintenance management",
      "Field service and workforce processes",
      "Procurement and supply-chain management",
      "Enterprise application integration",
      "Business analytics and reporting",
      "Workflow and process automation",
      "Digital solutions for operational teams"
    ],
    benefits: [
      "Better asset performance and visibility",
      "Improved field-service efficiency",
      "Streamlined enterprise processes",
      "Better resource utilization",
      "Faster access to operational information",
      "Improved decision-making through analytics"
    ]
  },
  {
    id: "oilgas",
    title: "Oil & Gas",
    shortDesc: "Integrated SAP and digital solutions for upstream, midstream, and downstream operations, asset management, analytics, and process optimization.",
    overview: "The oil and gas industry requires strong asset management, supply-chain coordination, operational visibility, compliance, and efficient resource utilization. We provide SAP and digital solutions designed to support complex oil and gas business processes.",
    icon: Droplets,
    howWeHelp: [
      "SAP S/4HANA transformation",
      "Asset and maintenance management",
      "Procurement and supply-chain processes",
      "Operations and field-service applications",
      "SAP Fiori and user experience modernization",
      "Data integration and enterprise applications",
      "Analytics and management reporting",
      "Process automation"
    ],
    benefits: [
      "Improved asset visibility",
      "Better maintenance planning",
      "Streamlined business processes",
      "Improved supply-chain coordination",
      "Faster operational reporting",
      "Greater process transparency"
    ]
  },
  {
    id: "pharma",
    title: "Pharmaceuticals & Life Sciences",
    shortDesc: "Technology solutions supporting pharmaceutical operations, quality and compliance, supply chain, enterprise applications, and digital transformation.",
    overview: "Pharmaceutical and life sciences organizations operate in highly regulated environments where quality, compliance, traceability, supply-chain visibility, and operational efficiency are critical. Our technology solutions help organizations modernize processes while supporting their business and regulatory requirements.",
    icon: FlaskConical,
    howWeHelp: [
      "SAP S/4HANA transformation",
      "Enterprise and supply-chain applications",
      "Quality and compliance processes",
      "Inventory and batch management",
      "Procurement and supplier processes",
      "SAP Fiori applications",
      "Business analytics and reporting",
      "Workflow and process automation",
      "System integration"
    ],
    benefits: [
      "Improved process visibility",
      "Better batch and inventory traceability",
      "Streamlined compliance processes",
      "Improved supply-chain management",
      "Reduced manual activities",
      "Better operational decision-making"
    ]
  },
  {
    id: "retail",
    title: "Retail & Consumer",
    shortDesc: "Connected retail solutions for commerce, customer experience, supply chain, inventory, analytics, and enterprise business applications.",
    overview: "Retail and consumer businesses need to respond quickly to changing customer expectations, demand patterns, inventory requirements, and market conditions. We help organizations create connected digital operations across commerce, supply chain, customer processes, and enterprise systems.",
    icon: ShoppingBag,
    howWeHelp: [
      "SAP S/4HANA and enterprise solutions",
      "Retail and commerce applications",
      "Inventory and supply-chain management",
      "Customer-focused digital applications",
      "Procurement and supplier management",
      "Business analytics",
      "SAP Fiori applications",
      "Process automation and system integration"
    ],
    benefits: [
      "Improved customer experience",
      "Better inventory visibility",
      "Faster business decision-making",
      "Streamlined supply-chain operations",
      "Improved operational efficiency",
      "Connected enterprise processes"
    ]
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    shortDesc: "Digital solutions for logistics, warehouse management, transportation, procurement, supplier management, and end-to-end supply chain visibility.",
    overview: "Modern supply chains require real-time visibility across procurement, suppliers, warehouses, transportation, inventory, and delivery operations. We help organizations build connected and efficient supply-chain processes using SAP and digital technologies.",
    icon: Truck,
    howWeHelp: [
      "SAP S/4HANA supply-chain transformation",
      "Warehouse and inventory management",
      "Procurement and supplier management",
      "Transportation and logistics processes",
      "Supply-chain analytics",
      "SAP Fiori applications",
      "Enterprise system integration",
      "Workflow and process automation"
    ],
    benefits: [
      "End-to-end supply-chain visibility",
      "Better inventory control",
      "Improved warehouse efficiency",
      "Faster procurement processes",
      "Better supplier coordination",
      "Improved logistics performance"
    ]
  },
  {
    id: "other",
    title: "Other Industries",
    shortDesc: "Flexible technology and consulting solutions tailored to the unique processes, challenges, and digital transformation needs of different industries.",
    overview: "Every organization has unique processes, systems, and transformation requirements. We provide flexible SAP, cloud, application development, integration, and consulting services that can be adapted to organizations across different industries.",
    icon: LayoutGrid,
    howWeHelp: [
      "SAP consulting and implementation",
      "SAP S/4HANA transformation",
      "SAP Fiori and UI/UX solutions",
      "SAP BTP and cloud solutions",
      "Application development",
      "System integration",
      "Data and analytics solutions",
      "Business process automation",
      "Custom enterprise applications"
    ],
    benefits: [
      "Solutions aligned with business requirements",
      "Reduced process complexity",
      "Improved digital capabilities",
      "Better system integration",
      "Increased operational efficiency",
      "Scalable technology foundation"
    ]
  }
];

export function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDetail | null>(null);

  return (
    <section id="industries" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.02),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Industries We Serve</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">
            Tailored Solutions for <span className="text-primary">Diverse Sectors</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We bring deep domain expertise to help organizations across various industries navigate their digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((item, idx) => (
            <Card 
              key={idx} 
              className={cn(
                "glass-card border-white/5 bg-card/10 group hover:bg-card/30 transition-all duration-500",
                idx === industries.length - 1 && "md:col-span-2 lg:col-span-1 xl:col-span-2"
              )}
            >
              <CardContent className="p-8 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.shortDesc}
                    </p>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      onClick={() => setSelectedIndustry(item)}
                      className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all duration-300 group/btn outline-none"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[850px] bg-background border-white/10 text-foreground">
                    {selectedIndustry && (
                      <div className="flex flex-col gap-0 max-h-[85vh]">
                        <DialogHeader className="pb-6 border-b border-white/5">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <selectedIndustry.icon className="w-6 h-6 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-headline font-bold">
                              {selectedIndustry.title}
                            </DialogTitle>
                          </div>
                        </DialogHeader>

                        <ScrollArea className="flex-1 pr-4 mt-6">
                          <div className="space-y-10 pb-8">
                            <div className="space-y-4">
                              <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                <Target className="w-4 h-4" /> Industry Overview
                              </h4>
                              <p className="text-muted-foreground leading-relaxed text-base">
                                {selectedIndustry.overview}
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                  <Workflow className="w-4 h-4" /> How We Help
                                </h4>
                                <ul className="grid gap-3">
                                  {selectedIndustry.howWeHelp.map((help, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-tight">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                      {help}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4" /> Business Benefits
                                </h4>
                                <ul className="grid gap-3">
                                  {selectedIndustry.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-tight">
                                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                        
                        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <p className="text-xs text-muted-foreground">Ready to transform your {selectedIndustry.title.toLowerCase()} operations?</p>
                          <Button className="rounded-full shadow-lg shadow-primary/20 w-full sm:w-auto" asChild>
                            <a href="#inquiry">Talk to an Industry Expert <ArrowRight className="ml-2 w-4 h-4" /></a>
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