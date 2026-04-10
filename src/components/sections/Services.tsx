
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
  ArrowRight
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
        title: "SAP BTP Expertise",
        description: "Comprehensive consulting and implementation for SAP's Business Technology Platform.",
        icon: Database,
        whatIsIt: "SAP Business Technology Platform (BTP) is the foundation of the intelligent enterprise, bringing together data and analytics, artificial intelligence, application development, and automation in one unified environment.",
        whyNeeded: "Enterprises need a unified platform to innovate rapidly without disrupting the core ERP, enabling side-by-side extensions and complex integrations.",
        whyChooseXgen: "Our architects have deep roots in the SAP ecosystem, specializing in BTP's multi-cloud environment (AWS/Azure/GCP).",
        ourRole: "We design the architecture, manage the migration, and build cloud-native applications that leverage BTP's full potential.",
        howWeWork: "Discovery phase -> Architecture Blueprint -> Agile Development -> DevOps Integration."
      },
      {
        title: "SAP Fiori Application Development",
        description: "Modern, intuitive user experiences for SAP applications across any device.",
        icon: Smartphone,
        whatIsIt: "SAP Fiori is the design system that provides a consistent, role-based user experience for SAP software across various devices.",
        whyNeeded: "Legacy SAP interfaces are complex. Fiori simplifies tasks, improves user adoption, and increases productivity by providing a mobile-first UI.",
        whyChooseXgen: "We focus on 'Human-Centered Design', ensuring that enterprise tools feel as intuitive as consumer apps.",
        ourRole: "Development of custom Fiori apps, extension of standard apps, and Fiori Elements implementation.",
        howWeWork: "Persona Research -> Wireframing -> UI5 Development -> OData Service Integration."
      },
      {
        title: "SAP Application Factory",
        description: "High-volume, standardized delivery of SAP extensions and applications.",
        icon: Factory,
        whatIsIt: "A specialized delivery model designed for rapid, scalable production of SAP-related components, templates, and applications.",
        whyNeeded: "Businesses often have a massive backlog of small to medium requirements that need standardization and rapid turnaround.",
        whyChooseXgen: "Our 'Factory Model' uses reusable assets and automated testing to reduce time-to-market by 30%.",
        ourRole: "Managing the end-to-end lifecycle of high-volume development tasks with consistent quality.",
        howWeWork: "Requirement Intake -> Standardized Scoping -> Rapid Sprint Execution -> QA Gates."
      },
      {
        title: "SAP Functional Consulting",
        description: "Expert advice on SAP modules to align technology with business processes.",
        icon: Search,
        whatIsIt: "Professional guidance across SAP modules (SD, MM, FI, CO, PP, etc.) to ensure your ERP supports your business objectives perfectly.",
        whyNeeded: "Without strong functional alignment, even the best technology fails to deliver business value.",
        whyChooseXgen: "Our consultants have average 10+ years of domain experience in diverse industries.",
        ourRole: "Process mapping, gap analysis, configuration, and user training.",
        howWeWork: "As-Is Study -> To-Be Process Design -> Configuration -> UAT & Go-Live."
      },
      {
        title: "SAP Digital Clean Core Strategy",
        description: "Maintaining a standard ERP core while innovating with side-by-side extensions.",
        icon: ShieldCheck,
        whatIsIt: "A strategic approach to SAP implementations where customizations are kept outside the core ERP to ensure easier upgrades and lower TCO.",
        whyNeeded: "Heavily customized 'Z-code' in the core makes SAP upgrades expensive and slow.",
        whyChooseXgen: "We are pioneers in 'Side-by-Side' extension patterns using SAP BTP.",
        ourRole: "Assessment of legacy custom code and migration of logic to BTP using CAPM or RAP.",
        howWeWork: "Core Audit -> Decoupling Plan -> Cloud-Native Extension -> Retirement of Legacy Code."
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
        whatIsIt: "Building and deploying machine learning models and Generative AI agents to solve specific business problems like prediction or automation.",
        whyNeeded: "AI is no longer optional; it's a competitive necessity for automating routine tasks and finding patterns in data.",
        whyChooseXgen: "We specialize in 'Pragmatic AI'—focusing on ROI-driven use cases rather than just hype.",
        ourRole: "Data science, model training, RAG (Retrieval-Augmented Generation) implementation, and AI agent orchestration.",
        howWeWork: "Use Case Discovery -> Data Preparation -> Model Prototyping -> Enterprise Deployment."
      },
      {
        title: "Analytics Services (SAC, Power BI, Tableau)",
        description: "Data visualization and predictive insights using industry-leading tools.",
        icon: LineChart,
        whatIsIt: "Comprehensive data storytelling services using SAP Analytics Cloud, Power BI, and Tableau to turn data into decisions.",
        whyNeeded: "Enterprises are data-rich but insight-poor. Analytics provides the 'single source of truth'.",
        whyChooseXgen: "Expertise in cross-platform data blending (SAP + Non-SAP data).",
        ourRole: "Dashboard design, data modeling, ETL pipeline construction, and predictive forecasting.",
        howWeWork: "KPI Definition -> Data Architecture -> Interactive Dashboarding -> Automated Reporting."
      },
      {
        title: "SAP Integration (SAP CPI)",
        description: "Seamlessly connecting SAP S/4HANA with any cloud or on-premise system.",
        icon: Workflow,
        whatIsIt: "SAP Cloud Integration (CPI) is the middleware that allows different software systems to communicate in real-time.",
        whyNeeded: "A siloed enterprise is an inefficient one. Seamless data flow between CRM, ERP, and 3rd party apps is critical.",
        whyChooseXgen: "Deep experience in complex B2B and A2A integration scenarios using pre-packaged content.",
        ourRole: "Integration architecture, flow development, API management, and monitoring.",
        howWeWork: "Mapping Requirements -> Interface Design -> Security Configuration -> Continuous Monitoring."
      },
      {
        title: "Mobile & Web Application Development",
        description: "High-performance apps with offline support for field and office use.",
        icon: Smartphone,
        whatIsIt: "End-to-end development of custom mobile and web applications tailored for specific enterprise workflows.",
        whyNeeded: "Standard software often doesn't fit the unique way your field agents or warehouse staff work.",
        whyChooseXgen: "Focus on resilient architectures that work even in low-connectivity environments.",
        ourRole: "Frontend development, Backend API design, and cross-platform deployment.",
        howWeWork: "User Research -> Rapid Prototyping -> Continuous Delivery -> Post-launch Support."
      },
      {
        title: "Non-SAP Application Development (ReactJS, .NET, PHP)",
        description: "Scalable custom software using modern open-source stacks.",
        icon: Code2,
        whatIsIt: "Custom software engineering using the best of modern technology stacks outside the SAP ecosystem.",
        whyNeeded: "For certain consumer-facing or internal tools, a lean, open-source stack is the most cost-effective solution.",
        whyChooseXgen: "Our full-stack engineers are experts in building cloud-native, microservices-based apps.",
        ourRole: "Full-cycle software development from ideation to cloud hosting.",
        howWeWork: "Technology Selection -> MVP Development -> Scale-up -> Maintenance."
      }
    ]
  },
  {
    category: "Strategic Support & Staffing",
    items: [
      {
        title: "Expert Staffing Services",
        description: "Providing top-tier SAP and tech talent for your critical projects.",
        icon: Users,
        whatIsIt: "Flexible resource allocation model providing highly skilled SAP and digital technology experts for project-based needs.",
        whyNeeded: "Finding niche talent (like BTP or CAPM experts) is difficult and time-consuming in the open market.",
        whyChooseXgen: "We don't just 'find' people; we provide experts from our internal pool or vetted network who are trained on our standards.",
        ourRole: "Sourcing, screening, and onboarding technical and functional consultants.",
        howWeWork: "Skill Analysis -> Candidate Shortlisting -> Technical Interview -> Smooth Onboarding."
      },
      {
        title: "SAP AMS Support",
        description: "Application Management Services to keep your SAP systems running 24/7.",
        icon: ShieldCheck,
        whatIsIt: "On-going support, maintenance, and enhancement of your SAP environment to ensure business continuity.",
        whyNeeded: "Internal IT teams are often overwhelmed. AMS allows them to focus on innovation while we handle stability.",
        whyChooseXgen: "SLA-driven approach with a focus on 'proactive prevention' rather than just 'reactive fixing'.",
        ourRole: "Incident management, bug fixes, performance tuning, and minor enhancements.",
        howWeWork: "Transition -> Stabilize -> Continuous Improvement -> Monthly Reviews."
      },
      {
        title: "Non-SAP AMS Support",
        description: "Managed services for custom web, mobile, and legacy applications.",
        icon: Layers,
        whatIsIt: "Support and maintenance for non-SAP platforms, ensuring high availability and regular security patches.",
        whyNeeded: "Custom apps need constant updates to libraries and security protocols to stay healthy.",
        whyChooseXgen: "A single partner to manage both your SAP and Non-SAP support needs for better synergy.",
        ourRole: "Application monitoring, security updates, and performance optimization.",
        howWeWork: "Audit -> Knowledge Transfer -> Monitoring Setup -> Periodic Updates."
      },
      {
        title: "SAP Corporate Training (Technical & Functional)",
        description: "Empowering your internal team with the latest SAP skills.",
        icon: GraduationCap,
        whatIsIt: "Customized training programs for corporate teams on specific SAP modules or new technologies like BTP.",
        whyNeeded: "Technology is useless if your team doesn't know how to use it to its full capacity.",
        whyChooseXgen: "Our trainers are active consultants who bring real-world project experience to the classroom.",
        ourRole: "Curriculum design, hands-on workshops, and post-training assessments.",
        howWeWork: "TNA (Training Needs Analysis) -> Content Customization -> Workshop Delivery -> Certification Support."
      },
      {
        title: "SAP Project Partnership",
        description: "Collaborative execution of large-scale SAP transformations.",
        icon: CheckCircle2,
        whatIsIt: "A deep partnership model where we co-own the project success and technical outcomes with our clients.",
        whyNeeded: "Large transformations need more than just 'vendors'; they need partners who understand the long-term vision.",
        whyChooseXgen: "Transparent communication, shared risk, and a relentless focus on final business value.",
        ourRole: "Project management, technical oversight, and full-cycle implementation.",
        howWeWork: "Strategic Alignment -> Joint PMO Setup -> Milestone Delivery -> Continuous Value Realization."
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
                      <p className="text-muted-foreground leading-relaxed">
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
                        <DialogContent className="sm:max-w-[800px] bg-background border-white/10 text-foreground">
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
                                      <p className="text-muted-foreground leading-relaxed">
                                        {selectedService.whatIsIt}
                                      </p>
                                    </div>
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Why This Service is Needed
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed">
                                        {selectedService.whyNeeded}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4" /> Why Choose XgenIQ
                                    </h4>
                                    <p className="text-foreground/90 leading-relaxed italic">
                                      {selectedService.whyChooseXgen}
                                    </p>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Users className="w-4 h-4" /> Our Role
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed">
                                        {selectedService.ourRole}
                                      </p>
                                    </div>
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                        <Workflow className="w-4 h-4" /> How We Work
                                      </h4>
                                      <p className="text-muted-foreground leading-relaxed">
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
