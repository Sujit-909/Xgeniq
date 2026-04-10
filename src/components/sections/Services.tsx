
"use client";

import React, { useState } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Cloud, 
  Database, 
  LineChart, 
  Workflow, 
  Smartphone,
  ShieldCheck,
  GraduationCap,
  Users,
  Factory,
  Layers,
  Search,
  CheckCircle2,
  Info,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

interface ServiceDetail {
  title: string;
  description: string;
  icon: any;
  whatIsIt: string;
  whyNeeded: string;
  whyChooseXgen: string;
  ourRole: string;
  howWeWork: string;
}

const serviceCategories = [
  {
    category: "Enterprise SAP Solutions",
    items: [
      {
        title: "SAP Fiori Application Development",
        description: "Modern, intuitive, and role-based user experiences for SAP applications.",
        icon: Smartphone,
        whatIsIt: "SAP Fiori enables organizations to deliver a modern, intuitive, and role-based user experience for SAP applications. It simplifies complex transactions with user-friendly interfaces, enables mobile-ready applications for field users, improves productivity through role-based dashboards, and enhances adoption of SAP systems.",
        whyNeeded: "Traditional SAP GUI interfaces are complex for business users. Organizations require mobile and responsive applications to enable faster process execution and simplified workflows in a modern digital landscape.",
        whyChooseXgen: "Strong expertise in SAP UI5, Fiori, and S/4HANA environments with a deep understanding of EAM, Supply Chain, and enterprise processes. We have a proven track record of building custom enterprise Fiori applications that users love.",
        ourRole: "Fiori application design and UX optimization, SAP UI5 development and customization, backend integration with SAP S/4HANA and ECC, Fiori Launchpad configuration, and end-to-end testing and deployment.",
        howWeWork: "Requirement discovery -> UX prototype design -> Application development -> Backend integration -> Testing and deployment."
      },
      {
        title: "SAP BTP Expertise",
        description: "Building, extending, and integrating SAP applications in the cloud.",
        icon: Database,
        whatIsIt: "SAP Business Technology Platform (BTP) allows organizations to build, extend, and integrate SAP applications in the cloud while maintaining a clean core architecture. It enables cloud-native applications, seamless integration of SAP and non-SAP systems, and advanced AI/analytics capabilities.",
        whyNeeded: "Businesses need scalable cloud platforms for innovation and a way to maintain a clean core architecture in S/4HANA. There is an increasing need for system integration across complex enterprise landscapes.",
        whyChooseXgen: "Expertise in SAP BTP architecture and development with strong experience in integration and extensibility frameworks. Our skilled team excels in CAP (Cloud Application Programming Model), UI5, and various SAP cloud services.",
        ourRole: "SAP BTP architecture design, extension development using BTP services, integration using SAP Integration Suite, application deployment, lifecycle management, and performance monitoring.",
        howWeWork: "Use case assessment -> Solution architecture design -> Development and integration -> Testing and validation -> Deployment and support."
      },
      {
        title: "SAP Application Factory",
        description: "Scalable model to rapidly build and deliver SAP solutions across business units.",
        icon: Factory,
        whatIsIt: "SAP Application Factory provides a scalable model to rapidly build and deliver SAP solutions. It accelerates development, standardizes delivery frameworks, reduces cycle time, and improves governance and quality control across business functions.",
        whyNeeded: "Enterprises require rapid development of SAP solutions and standardized practices to manage large enhancement pipelines effectively across multiple business units.",
        whyChooseXgen: "Strong experience in SAP solution architecture and delivery models. We utilize an agile development methodology and have the ability to scale teams quickly for large enterprise programs.",
        ourRole: "Application design and architecture, development factory setup, code governance and standards, quality assurance, testing, and continuous enhancement support.",
        howWeWork: "Requirement intake -> Solution design -> Rapid development cycles -> Quality validation -> Deployment and improvement."
      },
      {
        title: "SAP Integration (CPI)",
        description: "Seamless communication between SAP and non-SAP systems.",
        icon: Workflow,
        whatIsIt: "SAP Integration enables seamless communication between SAP and non-SAP systems, ensuring smooth data exchange and supporting enterprise-wide process automation while improving overall operational efficiency.",
        whyNeeded: "Organizations operate multiple enterprise systems, and integration is critical for digital transformation. Data consistency across these systems is essential for accurate reporting and business operations.",
        whyChooseXgen: "Expertise in SAP CPI and integration architecture with extensive experience integrating complex enterprise landscapes using proven frameworks.",
        ourRole: "Integration architecture design, CPI interface development, API management, monitoring, error handling, and performance optimization.",
        howWeWork: "Integration assessment -> Interface design -> Development and testing -> Deployment -> Monitoring and support."
      },
      {
        title: "SAP AMS Support",
        description: "Continuous performance, stability, and optimization of SAP environments.",
        icon: ShieldCheck,
        whatIsIt: "SAP Application Management Services (AMS) ensure the continuous performance, stability, and optimization of SAP environments. It provides ongoing support, ensures reliability, and enables continuous improvement.",
        whyNeeded: "Organizations require 24/7 system support and continuous monitoring of SAP enhancements to ensure business continuity in a cost-effective manner.",
        whyChooseXgen: "Strong SAP functional and technical expertise combined with a proven AMS delivery model that ensures quick response and resolution times.",
        ourRole: "Incident and problem management, system monitoring, change/enhancement management, user support, training, and continuous improvement initiatives.",
        howWeWork: "Ticket management -> Issue analysis -> Resolution and testing -> System optimization -> Reporting and review."
      }
    ]
  },
  {
    category: "Digital Innovation",
    items: [
      {
        title: "AI / ML Use Case Development",
        description: "Custom AI models and GenAI integration for enterprise automation.",
        icon: BrainCircuit,
        whatIsIt: "AI and ML solutions enable organizations to unlock insights from data, automate complex processes, and improve decision-making through predictive insights and intelligent agents like LLMs.",
        whyNeeded: "Growing need for data-driven decision making and automation. Large data volumes require advanced analytics and predictive capabilities to stay competitive.",
        whyChooseXgen: "Expertise in AI, LLM (Large Language Models), and enterprise automation. We focus on pragmatic, scalable AI solutions that integrate deeply with existing business systems.",
        ourRole: "AI use case identification, model development and training, data engineering, RAG implementation, and integration with enterprise systems.",
        howWeWork: "Use case discovery -> Data preparation -> Model development -> Deployment and integration -> Performance monitoring."
      },
      {
        title: "Analytics Services (Power BI, Tableau, SAC)",
        description: "Transform business data into actionable insights and interactive dashboards.",
        icon: LineChart,
        whatIsIt: "Analytics platforms transform business data into actionable insights and interactive dashboards. They enable data-driven decisions, improve business visibility, and support real-time performance monitoring.",
        whyNeeded: "Organizations generate large volumes of data and decision makers require real-time insights via enterprise-wide reporting frameworks to navigate market shifts.",
        whyChooseXgen: "Expertise across Power BI, Tableau, and SAP Analytics Cloud (SAC) with strong experience in cross-platform data modeling and visualization.",
        ourRole: "Data integration and modeling, dashboard development, reporting automation, and business intelligence consulting.",
        howWeWork: "Requirement gathering -> Data modeling -> Dashboard design -> Testing and validation -> Deployment and training."
      },
      {
        title: "Mobile & Web Application Development",
        description: "Modern digital platforms enabling mobility, automation, and user engagement.",
        icon: Code2,
        whatIsIt: "Modern businesses require digital platforms that enable mobility, automation, and seamless user experiences. This includes full-stack web and mobile apps that support transformation initiatives.",
        whyNeeded: "Increasing demand for mobile-first business applications to improve workforce productivity and customer engagement while integrating with enterprise backends.",
        whyChooseXgen: "Expertise in ReactJS, .NET, and modern enterprise architecture. We bridge the gap between consumer-grade UI/UX and complex enterprise requirements.",
        ourRole: "Application architecture design, UI/UX development, backend API development, and cloud-native deployment with enterprise integration.",
        howWeWork: "Requirement analysis -> UX design and prototyping -> Application development -> Integration and testing -> Deployment and support."
      },
      {
        title: "SAP Digital Clean Core Strategy",
        description: "Decoupling customizations from the ERP core to ensure scalability.",
        icon: Target,
        whatIsIt: "A strategic approach to SAP implementations where customizations are moved to the cloud (BTP), keeping the ERP core 'clean' for easier upgrades and lower TCO.",
        whyNeeded: "Legacy 'Z-code' makes upgrades nearly impossible and extremely costly. A clean core is essential for moving to S/4HANA Public Cloud.",
        whyChooseXgen: "Pioneers in side-by-side extension patterns and legacy code modernization.",
        ourRole: "Core audit, decoupling strategy, and rebuilding critical logic as cloud-native extensions.",
        howWeWork: "Assessment -> Planning -> Execution -> Verification."
      },
      {
        title: "Non-SAP Application Development (ReactJS, .NET, PHP)",
        description: "Lean, high-performance software using modern open-source stacks.",
        icon: Layers,
        whatIsIt: "Custom software engineering using high-velocity stacks like React, .NET, and PHP for consumer-facing or internal specialized tools.",
        whyNeeded: "Not every business problem needs an SAP-sized solution; lean stacks offer faster time-to-market for specific needs.",
        whyChooseXgen: "Full-stack engineers who understand enterprise-grade security and scalability requirements.",
        ourRole: "Product engineering, API design, and cloud infrastructure management.",
        howWeWork: "Scoping -> MVP -> Sprint-based delivery -> Scale."
      }
    ]
  },
  {
    category: "Strategic Support & Staffing",
    items: [
      {
        title: "Expert Staffing Services",
        description: "Providing top-tier SAP and tech talent for critical projects.",
        icon: Users,
        whatIsIt: "Flexible resource allocation providing vetted SAP and digital technology experts for project-based or long-term needs.",
        whyNeeded: "Niche skills like SAP BTP, CAPM, or AI engineering are scarce and difficult to hire for internally on short notice.",
        whyChooseXgen: "We maintain an internal pool of consultants trained on global standards, not just a resume database.",
        ourRole: "Talent matching, technical screening, and seamless project onboarding.",
        howWeWork: "Skill analysis -> Shortlisting -> Technical Interview -> Deployment."
      },
      {
        title: "SAP Corporate Training",
        description: "Empowering internal teams with Technical & Functional SAP skills.",
        icon: GraduationCap,
        whatIsIt: "Customized training programs on SAP modules (Technical/Functional) designed to upskill corporate teams on latest technologies like BTP and S/4HANA.",
        whyNeeded: "Technology shifts like S/4HANA require teams to move from legacy mindsets to modern cloud-native practices.",
        whyChooseXgen: "Our trainers are active consultants who bring current project experience, not just theory.",
        ourRole: "Curriculum design, workshop delivery, and post-training assessments.",
        howWeWork: "Needs analysis -> Custom content -> Delivery -> Feedback."
      },
      {
        title: "SAP Project Partnership",
        description: "Collaborative execution of large-scale transformations.",
        icon: CheckCircle2,
        whatIsIt: "A deep partnership model for executing large-scale transformations where XgenIq co-owns technical outcomes and project success.",
        whyNeeded: "High-risk migrations and greenfield implementations need a partner, not just a vendor.",
        whyChooseXgen: "Transparent communication and shared accountability for business value realization.",
        ourRole: "Project PMO, technical oversight, and implementation leadership.",
        howWeWork: "Alignment -> Roadmap -> Execution -> Governance."
      },
      {
        title: "SAP Functional Consulting",
        description: "Aligning business processes with SAP modules (SD, MM, FI, etc.).",
        icon: Search,
        whatIsIt: "Expert guidance across functional modules to ensure your SAP configuration supports real-world business workflows correctly.",
        whyNeeded: "Technology is ineffective if the underlying business processes are not mapped correctly to the ERP capabilities.",
        whyChooseXgen: "Consultants with deep industry domain knowledge (Manufacturing, Retail, etc.).",
        ourRole: "Process mapping, configuration, and UAT leadership.",
        howWeWork: "As-Is Study -> To-Be Design -> Configuration -> Go-Live."
      },
      {
        title: "Non-SAP AMS Support",
        description: "Managed services for custom web, mobile, and legacy apps.",
        icon: Zap,
        whatIsIt: "Ongoing maintenance and optimization for non-SAP platforms, ensuring security and performance.",
        whyNeeded: "Custom apps need regular patches and performance tuning to remain secure and efficient.",
        whyChooseXgen: "Unified support across your entire landscape (SAP and Non-SAP).",
        ourRole: "Monitoring, bug fixing, and small enhancements.",
        howWeWork: "Transition -> Stabilize -> Support."
      }
    ]
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary">Core Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
            Accelerating <span className="text-primary">Digital Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At XgenIQ, we help organizations accelerate digital transformation by delivering SAP, Cloud, AI, and Enterprise Application solutions that improve efficiency, scalability, and innovation.
          </p>
        </div>

        <div className="space-y-24">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border/50" />
                <h3 className="text-2xl font-headline font-bold text-foreground px-4">{cat.category}</h3>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.items.map((service, sIdx) => (
                  <Card key={sIdx} className="glass-card hover:bg-card/60 transition-all duration-500 group border-primary/5 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {service.description}
                      </p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-primary font-bold flex items-center gap-2 w-fit hover:gap-3 transition-all"
                            onClick={() => setSelectedService(service as ServiceDetail)}
                          >
                            Learn More <ArrowRight className="w-4 h-4" />
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
                                <div className="space-y-8 pb-8">
                                  <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Info className="w-4 h-4" /> What is the Service
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed text-sm">
                                        {selectedService.whatIsIt}
                                      </p>
                                    </div>
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Why This Service is Needed
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed text-sm">
                                        {selectedService.whyNeeded}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4" /> Why Choose XgenIQ
                                    </h4>
                                    <p className="text-foreground/90 leading-relaxed italic text-sm">
                                      {selectedService.whyChooseXgen}
                                    </p>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Users className="w-4 h-4" /> Our Role
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed text-sm">
                                        {selectedService.ourRole}
                                      </p>
                                    </div>
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <Workflow className="w-4 h-4" /> How We Work
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed text-sm">
                                        {selectedService.howWeWork}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                              
                              <div className="pt-6 border-t border-white/5 flex justify-end">
                                <Button className="rounded-full shadow-lg shadow-primary/20" asChild>
                                  <a href="#inquiry">Inquire About This Service</a>
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
          ))}
        </div>
      </div>
    </section>
  );
}
