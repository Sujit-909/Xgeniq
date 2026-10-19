"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function Leadership() {
  return (
    <section id="leadership" className="py-24 bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/30 text-primary">Leadership & Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Experience That Turns Technology Into <span className="text-primary">Business Value</span></h2>
          <p className="text-lg text-muted-foreground">
            Our leadership and senior professionals work closely with customers, architects, consultants and engineering teams to translate business objectives into practical technology solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative glass-card rounded-3xl overflow-hidden border border-white/5 bg-card/20 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-1">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-primary/20 bg-primary/10 flex items-center justify-center">
                   <div className="text-primary font-bold text-4xl">DB</div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-headline font-bold">Debasmita Behera</h3>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">Founder & Proprietor</p>
                </div>
                <p className="text-muted-foreground leading-relaxed italic text-lg">
                  "Responsible for XgenIq's strategic direction, customer relationships, technology vision and business growth. With experience across enterprise technology and digital transformation, she works closely with customers and delivery teams to shape solutions that align technology investments with business objectives."
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Focus Areas</p>
                    <p className="text-sm font-medium">Business Strategy · Technology Strategy</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Expertise</p>
                    <p className="text-sm font-medium">Enterprise Solutions · Digital Transformation</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Link href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="mailto:admin@xgeniq.com" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-headline font-bold italic">Leadership With a Hands-On Approach</h3>
            <p className="text-muted-foreground">We believe strategy is valuable only when it can be translated into successful delivery.</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { name: "Listen", desc: "Understand the customer's business and objectives." },
              { name: "Challenge", desc: "Question assumptions and identify better approaches." },
              { name: "Architect", desc: "Translate requirements into scalable strategies." },
              { name: "Enable", desc: "Empower our teams with the right platforms." },
              { name: "Deliver", desc: "Remain accountable for quality and outcomes." },
              { name: "Evolve", desc: "Identify opportunities for innovation." }
            ].map((principle, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border-white/5 bg-card/10 text-center space-y-3 hover:bg-card/30 transition-all">
                <h4 className="font-bold text-primary uppercase text-xs tracking-widest">{principle.name}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-16 border-t border-white/5 text-center space-y-8">
             <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <span>Business Objectives</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span>Strategic Direction</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span>Solution Architecture</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span>Engineering & Delivery</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span>Business Outcome</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span>Continuous Improvement</span>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Business Before Technology", desc: "We start with the business problem, not a predetermined technology." },
              { title: "Think Long Term", desc: "We design solutions with scalability, maintainability and future transformation in mind." },
              { title: "Stay Close to Execution", desc: "Leadership stays engaged from solution design through long-term evolution." },
              { title: "Build Strong Teams", desc: "We bring together the right combination of domain, functional and technical expertise." },
              { title: "Earn Trust Through Delivery", desc: "We build long-term relationships through transparency and consistent execution." },
              { title: "Innovate With Purpose", desc: "We adopt emerging tech when it solves a meaningful problem—not just because it's new." }
            ].map((principle, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-secondary/20 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 pt-8">
            <Button variant="link" className="text-primary font-bold" asChild suppressHydrationWarning>
              <Link href="#careers">Join Our Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
