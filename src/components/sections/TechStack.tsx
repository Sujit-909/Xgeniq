
"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';

const stack = [
  { category: "SAP Ecosystem", tools: ["SAP BTP", "ABAP RAP", "CAPM", "SAP Fiori", "CPI"] },
  { category: "Development", tools: ["Node.js", "React", ".NET MAUI", "Flutter", "Python"] },
  { category: "Cloud & Data", tools: ["AWS", "GCP", "Azure", "Power BI", "Snowflake"] },
  { category: "AI Frameworks", tools: ["PyTorch", "TensorFlow", "OpenAI", "LangChain", "Gemini"] }
];

export function TechStack() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stack.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{group.category}</h5>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool, tIdx) => (
                  <Badge key={tIdx} variant="secondary" className="bg-background border border-border/50 text-foreground/80">
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
