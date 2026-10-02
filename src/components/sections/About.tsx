"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  Workflow,
  Search,
  Layout,
  Code2,
  Rocket,
  Settings,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const processSteps = [
  { id: "01", name: "Understand", icon: Search, desc: "Objectives, challenges, processes, and landscape." },
  { id: "02", name: "Discover", icon: Target, desc: "Assess current state and define priorities." },
  { id: "03", name: "Design", icon: Layout, desc: "Architecture, roadmap, and strategy." },
  { id: "04", name: "Build", icon: Code2, desc: "Develop, configure, integrate, and test." },
  { id: "05", name: "Transform", icon: Rocket, desc: "Deploy, migrate, and enable organization." },
  { id: "06", name: "Operate", icon: Settings, desc: "Managed services, support, and optimization." },
  { id: "07", name: "Evolve", icon: Zap, desc: "Identify opportunities for AI and modernization." }
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary">About XgenIq</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Technology. Expertise. <span className="text-primary">Execution.</span></h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            XgenIq is an end-to-end technology and digital transformation company helping organizations transform ideas, business challenges and technology landscapes into scalable digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          <div className="space-y-8">
            <h3 className="text-3xl font-headline font-bold">A Technology Partner Built Around <span className="text-primary">Business Outcomes</span></h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combine business understanding, technology expertise and engineering capabilities to deliver practical solutions for complex enterprise challenges.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "SAP Transformation",
                "Software Engineering",
                "Cloud & DevOps",
                "Data & Analytics",
                "AI & GenAI",
                "Integration"
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {cap}
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="italic text-foreground/90">
                "Understand the business problem → Design the right solution → Build it well → Integrate it effectively → Support it continuously."
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <Card className="glass-card border-white/5 bg-card/20">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-primary">
                  <Target className="w-6 h-6" />
                  <h4 className="text-xl font-bold uppercase tracking-wider">Our Mission</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To help organizations use technology to solve meaningful business problems, improve productivity and create sustainable digital capabilities.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/5 bg-card/20">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-accent">
                  <Lightbulb className="w-6 h-6" />
                  <h4 className="text-xl font-bold uppercase tracking-wider">Our Vision</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be a trusted technology partner for the intelligent enterprise, where fragmented systems move toward integrated, data-driven ecosystems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-16 mb-32">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-headline font-bold">From Business Challenge to <span className="text-primary">Business Outcome</span></h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our structured delivery model ensures every implementation creates a foundation for the next improvement.</p>
          </div>
          
          <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="relative group">
                <div className="glass-card p-6 rounded-2xl border-white/5 bg-card/10 h-full flex flex-col items-center text-center space-y-4 hover:bg-card/30 transition-all">
                  <span className="text-xs font-mono text-primary font-bold">{step.id}</span>
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">{step.name}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 z-20" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-24 border-t border-white/5">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-headline font-bold">Why Organizations <span className="text-primary">Choose XgenIq</span></h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "End-to-End Capability", desc: "From consulting and architecture to engineering, implementation, integration and managed services." },
              { title: "Business + Tech Expertise", desc: "We combine technology skills with an understanding of business processes and operational requirements." },
              { title: "Multi-Platform Expertise", desc: "SAP, cloud, data, AI and modern software engineering under one technology ecosystem." },
              { title: "Engineering-Led Delivery", desc: "Solutions designed with scalability, security, maintainability and long-term operation in mind." },
              { title: "Flexible Engagement Models", desc: "Consulting, project-based delivery, dedicated teams, staffing and managed services." },
              { title: "Built for the Enterprise", desc: "Focus on enterprise-grade architecture, integration, governance, security and operational readiness." }
            ].map((usp, idx) => (
              <div key={idx} className="space-y-3 p-6 rounded-2xl bg-secondary/20 border border-white/5 hover:border-primary/30 transition-all">
                <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> {usp.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
