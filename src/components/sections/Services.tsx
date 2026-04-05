
"use client";

import React from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  Database, 
  LineChart, 
  Workflow, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const serviceCategories = [
  {
    category: "SAP & Enterprise Solutions",
    items: [
      {
        title: "SAP BTP Consulting",
        description: "Full-cycle BTP implementation, Fiori, CAPM, and RAP development.",
        icon: Database,
      },
      {
        title: "SAP Integration (CPI)",
        description: "Seamless connectivity between SAP and non-SAP enterprise systems.",
        icon: Workflow,
      },
      {
        title: "SAP Analytics Cloud",
        description: "Advanced visualization and predictive forecasting with SAC.",
        icon: LineChart,
      }
    ]
  },
  {
    category: "AI & Machine Learning",
    items: [
      {
        title: "LLM & RAG Solutions",
        description: "Custom generative AI apps and intelligent document extraction.",
        icon: BrainCircuit,
      },
      {
        title: "Conversational AI",
        description: "Enterprise-grade chatbots and automated SQL data agents.",
        icon: Code2,
      },
      {
        title: "Predictive Analytics",
        description: "ML models for maintenance, churn, and business forecasting.",
        icon: LineChart,
      }
    ]
  },
  {
    category: "Digital & Cloud",
    items: [
      {
        title: "Custom App Dev",
        description: "Modern web and mobile apps (Flutter, .NET MAUI) with offline support.",
        icon: Smartphone,
      },
      {
        title: "Multi-Cloud Strategy",
        description: "Scalable architecture across AWS, Azure, and Google Cloud.",
        icon: Cloud,
      },
      {
        title: "Cybersecurity & DevOps",
        description: "High availability, disaster recovery, and automated pipelines.",
        icon: ShieldCheck,
      }
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Core Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Next-Gen <span className="text-primary">IT Services</span></h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From SAP BTP modernization to advanced Generative AI agents, we provide end-to-end digital transformation.
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="text-2xl font-headline font-bold border-l-4 border-primary pl-4">{cat.category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.items.map((service, sIdx) => (
                  <Card key={sIdx} className="glass-card hover:bg-card/60 transition-all duration-300 group hover:-translate-y-1 border-primary/5">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-headline font-bold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
