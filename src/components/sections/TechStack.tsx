"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';

const ecosystem = [
  { category: "Enterprise Platforms", tools: ["SAP", "Microsoft", "Oracle", "Salesforce"] },
  { category: "SAP Ecosystem", tools: ["BTP", "S/4HANA", "RAP", "CAP", "Fiori", "Integration Suite", "ABAP"] },
  { category: "Software Engineering", tools: ["React", "Node.js", ".NET", "Flutter", ".NET MAUI", "Python", "Microservices"] },
  { category: "Cloud Infrastructure", tools: ["AWS", "Microsoft Azure", "Google Cloud"] },
  { category: "Data & Analytics", tools: ["Power BI", "Tableau", "SAC", "Datasphere", "Snowflake"] },
  { category: "AI & GenAI", tools: ["OpenAI", "Gemini", "LangChain", "PyTorch", "TensorFlow", "RAG"] }
];

export function TechStack() {
  return (
    <section id="technology" className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.02),transparent)] pointer-events-none" />
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Technology Ecosystem</Badge>
          <h2 className="text-4xl font-headline font-bold">Built with Best-in-Class <span className="text-primary">Technologies</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Technology is an enabler. We select the right architecture and technology based on the business requirement—not the other way around.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystem.map((group, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl border-white/5 bg-card/10 space-y-6">
              <h5 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">{group.category}</h5>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool, tIdx) => (
                  <Badge key={tIdx} variant="secondary" className="bg-background border border-border/50 text-foreground/80 py-1 px-3">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
