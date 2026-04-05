
"use client";

import React from 'react';
import { 
  Code2, 
  Smartphone, 
  BrainCircuit, 
  Building2, 
  Boxes, 
  Gavel, 
  Users 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored software solutions designed to solve your unique business challenges with precision.",
    icon: Code2,
  },
  {
    title: "Web & Mobile App Development",
    description: "Modern, high-performance web and mobile applications with exceptional user experiences.",
    icon: Smartphone,
  },
  {
    title: "AI & Machine Learning Solutions",
    description: "Integrating intelligent algorithms and data models to automate and optimize your workflows.",
    icon: BrainCircuit,
  },
  {
    title: "Enterprise Application Development",
    description: "Robust, scalable software ecosystems for complex corporate environments and large-scale operations.",
    icon: Building2,
  },
  {
    title: "SAP Consulting & Integration",
    description: "Expert guidance on SAP ecosystems to maximize your business efficiency and data insights.",
    icon: Boxes,
  },
  {
    title: "Bid & Reverse Auction Systems",
    description: "Our strong USP: Advanced digital platforms for transparent and efficient procurement processes.",
    icon: Gavel,
  },
  {
    title: "Vendor Management Portals",
    description: "Centralized hubs for managing supplier relationships, compliance, and performance tracking.",
    icon: Users,
  }
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Our <span className="text-primary">Comprehensive</span> Services</h2>
          <p className="text-lg text-muted-foreground">
            We provide a wide range of cutting-edge technology services designed to propel your business into the digital future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover:bg-card/60 transition-all duration-300 group hover:-translate-y-2 border-primary/5">
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
    </section>
  );
}
