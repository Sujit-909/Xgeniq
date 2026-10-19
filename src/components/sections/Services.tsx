"use client";

import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  Database, 
  Cpu,
  Settings,
  ArrowRight,
  CheckCircle2,
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

const iconMap: any = {
  "SAP": Cpu,
  "Custom Dev": Code2,
  "Cloud": Cloud,
  "Data": Database,
  "GenAI": BrainCircuit,
  "Managed": Settings
};

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const loadServices = () => {
      const stored = localStorage.getItem('xgeniq_services');
      if (stored) setServices(JSON.parse(stored));
    };
    loadServices();
    window.addEventListener('storage', loadServices);
    return () => window.removeEventListener('storage', loadServices);
  }, []);

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary">What We Do</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
            Engineering <span className="text-primary">Digital Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Scalable solutions built around your enterprise objectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = iconMap[service.category] || Cpu;
            return (
              <Card key={idx} className="glass-card hover:bg-card/60 transition-all group flex flex-col h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.summary}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 text-primary font-bold flex items-center gap-2" onClick={() => setSelectedService(service)} suppressHydrationWarning>
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-background border-white/10">
                      <DialogHeader className="pb-6 border-b border-white/5">
                        <DialogTitle className="text-3xl font-bold">{service.title}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh] pr-4 py-6">
                        <p className="text-muted-foreground leading-relaxed">{service.summary}</p>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
