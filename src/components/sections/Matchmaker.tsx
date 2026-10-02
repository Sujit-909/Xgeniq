"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Send, CheckCircle, ChevronRight, ChevronLeft, Building2, User, Globe, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const industries = [
  "Manufacturing", "Energy & Utilities", "Oil & Gas", "Pharmaceuticals", 
  "Retail & Consumer", "Logistics & Supply Chain", "Banking & Financial Services", 
  "Technology", "Government", "Other"
];

const serviceOptions = [
  { id: "sap", label: "SAP Services" },
  { id: "sap_s4", label: "SAP S/4HANA Transformation" },
  { id: "sap_btp", label: "SAP BTP / Fiori / RAP / CAP" },
  { id: "sap_int", label: "SAP Integration" },
  { id: "sap_func", label: "SAP Functional Consulting" },
  { id: "software", label: "Software Development" },
  { id: "web_mobile", label: "Web / Mobile Application" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "data", label: "Data & Analytics" },
  { id: "ai", label: "AI / Generative AI" },
  { id: "modern", label: "Application Modernization" },
  { id: "managed", label: "Managed Services / AMS" },
  { id: "staffing", label: "Staffing / Dedicated Team" },
  { id: "product", label: "Product / Solution" },
  { id: "consulting", label: "Consulting / Technology Advisory" },
];

const formSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service."),
  requirement: z.string().min(20, "Please provide more details (min 20 chars)."),
  companyName: z.string().min(2, "Company name is required."),
  industry: z.string().min(1, "Please select an industry."),
  stage: z.string(),
  timeline: z.string(),
  technologies: z.array(z.string()),
  sapEnv: z.string().optional(),
  fullName: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  country: z.string().min(1, "Country is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function Matchmaker() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      requirement: "",
      companyName: "",
      industry: "",
      stage: "Exploring / Researching",
      timeline: "Not Decided",
      technologies: [],
      sapEnv: "Not Applicable",
      fullName: "",
      email: "",
      phone: "",
      jobTitle: "",
      country: "",
    },
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(s => s + 1);
  };

  const getFieldsForStep = (step: number) => {
    switch(step) {
      case 1: return ['services'];
      case 2: return ['requirement'];
      case 3: return ['companyName', 'industry'];
      case 4: return ['stage', 'timeline'];
      case 5: return ['technologies', 'sapEnv'];
      case 6: return ['fullName', 'email', 'country'];
      default: return [];
    }
  };

  async function onSubmit(values: FormValues) {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Inquiry Sent",
        description: "Our experts will review your requirement and contact you soon.",
      });
    }, 1500);
  }

  if (isSubmitted) {
    return (
      <section id="inquiry" className="py-24 bg-background">
        <div className="container px-6 mx-auto text-center max-w-2xl space-y-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-headline font-bold">Thank You!</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your inquiry has been received. One of our technology experts will reach out to you within 24 hours to discuss your needs.
          </p>
          <Button onClick={() => { setIsSubmitted(false); setStep(1); form.reset(); }} variant="outline" className="rounded-full px-8">
            Send Another Inquiry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-accent/30 text-accent">Strategic Hub</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Let's Talk About Your <span className="text-primary">Technology Needs</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tell us what you're looking to achieve. Whether you need SAP services, custom software, cloud solutions, or AI, our experts will help you identify the right approach.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-primary">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">1</div>
                  <span className="font-bold uppercase tracking-wider">Define Capability</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold">2</div>
                  <span className="font-bold uppercase tracking-wider">Business Context</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold">3</div>
                  <span className="font-bold uppercase tracking-wider">Expert Matching</span>
                </div>
              </div>
            </div>

            <Card className="glass-card shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
              <CardHeader className="border-b border-white/5 bg-white/5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-headline font-bold">Step {step} of 6</CardTitle>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {step === 1 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">1. What can we help you with?</h4>
                          <p className="text-sm text-muted-foreground">Select all that apply to your project.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {serviceOptions.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/5 p-4 bg-white/5 hover:border-primary/50 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.label])
                                          : field.onChange(field.value?.filter((value) => value !== item.label))
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium cursor-pointer">
                                      {item.label}
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">2. Tell us about your requirement</h4>
                          <p className="text-sm text-muted-foreground">Describe your business challenge or the solution you're looking for.</p>
                        </div>
                        <FormField
                          control={form.control}
                          name="requirement"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  placeholder="Example: We are planning to modernize our SAP landscape and would like to explore BTP, Fiori and AI-based solutions." 
                                  className="min-h-[200px] bg-white/5 border-white/10"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">3. Your Organization</h4>
                        </div>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Company Name*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter company name" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue placeholder="Select Industry" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-background border-white/10">
                                    {industries.map(ind => (
                                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">4. Project Information</h4>
                        </div>
                        <FormField
                          control={form.control}
                          name="stage"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>What stage are you currently in?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                  {["Exploring / Researching", "Requirement Definition", "Planning", "Implementation", "Modernization", "Existing System Support"].map(opt => (
                                    <FormItem key={opt} className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-white/5 bg-white/5">
                                      <FormControl>
                                        <RadioGroupItem value={opt} />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer text-sm">{opt}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Timeline</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Timeline" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-background border-white/10">
                                  {["Immediate", "1–3 Months", "3–6 Months", "6–12 Months", "More than 12 Months", "Not Decided"].map(t => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">5. Existing Technology Landscape</h4>
                        </div>
                        <div className="space-y-4">
                          <Label>What technologies are you currently using?</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {["SAP", "Microsoft", "AWS", "Azure", "Google Cloud", "Oracle", "Salesforce", "Custom Apps"].map(tech => (
                              <FormField
                                key={tech}
                                control={form.control}
                                name="technologies"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox 
                                        checked={field.value?.includes(tech)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, tech])
                                            : field.onChange(field.value?.filter((v) => v !== tech))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-xs font-medium">{tech}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {(form.watch('technologies').includes('SAP') || form.watch('services').some(s => s.toLowerCase().includes('sap'))) && (
                          <FormField
                            control={form.control}
                            name="sapEnv"
                            render={({ field }) => (
                              <FormItem className="animate-in fade-in duration-500">
                                <FormLabel>SAP Environment</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue placeholder="Select SAP Environment" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-background border-white/10">
                                    {["SAP ECC", "SAP S/4HANA", "S/4HANA Public Cloud", "S/4HANA Private Cloud", "SAP BTP", "Other", "Not Applicable"].map(env => (
                                      <SelectItem key={env} value={env}>{env}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    )}

                    {step === 6 && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold">6. Contact Information</h4>
                          <p className="text-sm text-muted-foreground">Ready to start the conversation.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> Full Name*</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Business Email*</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@company.com" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1..." className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country*</FormLabel>
                                <FormControl>
                                  <Input placeholder="United States" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between gap-4 pt-6 border-t border-white/5">
                      {step > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => setStep(s => s - 1)}
                          className="rounded-full"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      )}
                      {step < 6 ? (
                        <Button 
                          type="button" 
                          onClick={nextStep}
                          className="ml-auto rounded-full px-8 group"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          className="ml-auto rounded-full px-8 shadow-xl shadow-primary/20 group" 
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <Send className="w-4 h-4 mr-2" />
                          )}
                          Let's Start the Conversation
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
