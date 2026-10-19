"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send, CheckCircle, ChevronRight, ChevronLeft, Building2, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
  "Retail & Consumer", "Logistics & Supply Chain", "Technology", "Other"
];

const serviceOptions = [
  { id: "sap", label: "SAP Services" },
  { id: "software", label: "Software Development" },
  { id: "web_mobile", label: "Web / Mobile Application" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI / Generative AI" },
];

const formSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service."),
  requirement: z.string().min(20, "Please provide more details."),
  companyName: z.string().min(2, "Company name is required."),
  industry: z.string().min(1, "Please select an industry."),
  stage: z.string(),
  timeline: z.string(),
  fullName: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
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
      stage: "Planning",
      timeline: "Not Decided",
      fullName: "",
      email: "",
      country: "",
    },
  });

  const nextStep = async () => {
    const fields = step === 1 ? ['services'] : step === 2 ? ['requirement'] : step === 3 ? ['companyName', 'industry'] : step === 4 ? ['stage', 'timeline'] : ['fullName', 'email', 'country'];
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(s => s + 1);
  };

  async function onSubmit(values: FormValues) {
    setLoading(true);
    
    // Simulate Save to Demo DB
    const inquiryData = {
      id: Date.now(),
      ...values,
      date: new Date().toLocaleDateString(),
      status: 'New',
      service: values.services.join(', ')
    };

    const existingInquiries = JSON.parse(localStorage.getItem('xgeniq_inquiries') || '[]');
    localStorage.setItem('xgeniq_inquiries', JSON.stringify([inquiryData, ...existingInquiries]));

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Inquiry Saved",
        description: "Sent to demo database for review.",
      });
    }, 1200);
  }

  if (isSubmitted) {
    return (
      <section id="inquiry" className="py-24 bg-background text-center">
        <div className="container px-6 mx-auto max-w-2xl space-y-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-headline font-bold">Inquiry Logged</h2>
          <p className="text-muted-foreground">Successfully saved to the admin dashboard.</p>
          <Button onClick={() => { setIsSubmitted(false); setStep(1); form.reset(); }} variant="outline" className="rounded-full">
            Log Another Inquiry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <Badge variant="outline" className="text-primary border-primary/30">Admin Demo Mode</Badge>
            <h2 className="text-4xl font-headline font-bold">Contact <span className="text-primary">XgenIq</span></h2>
            <p className="text-muted-foreground">Submit this form to see the data appear in the Admin Dashboard instantly.</p>
          </div>

          <Card className="glass-card">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-lg">Step {step} of 5</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                      <h4 className="font-bold">1. Services</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {serviceOptions.map((item) => (
                          <FormField key={item.id} control={form.control} name="services" render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg bg-white/5">
                              <FormControl>
                                <Checkbox checked={field.value?.includes(item.label)} onCheckedChange={(checked) => {
                                  return checked ? field.onChange([...field.value, item.label]) : field.onChange(field.value?.filter((v) => v !== item.label))
                                }} />
                              </FormControl>
                              <FormLabel className="cursor-pointer">{item.label}</FormLabel>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                      <h4 className="font-bold">2. Requirement</h4>
                      <FormField control={form.control} name="requirement" render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder="Describe your project..." className="min-h-[150px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                      <h4 className="font-bold">3. Organization</h4>
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem>
                          <FormLabel><Building2 className="w-3 h-3 inline mr-1" /> Company Name</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="industry" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select Industry" /></SelectTrigger></FormControl>
                            <SelectContent>{industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                      <h4 className="font-bold">4. Timeline</h4>
                      <FormField control={form.control} name="timeline" render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select Timeline" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {["Immediate", "1–3 Months", "6+ Months"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                      <h4 className="font-bold">5. Contact Info</h4>
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel><User className="w-3 h-3 inline mr-1" /> Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel><Globe className="w-3 h-3 inline mr-1" /> Business Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  )}

                  <div className="flex justify-between gap-4 pt-6 border-t border-white/5">
                    {step > 1 && <Button type="button" variant="ghost" onClick={() => setStep(s => s - 1)} className="rounded-full"><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>}
                    {step < 5 ? (
                      <Button type="button" onClick={nextStep} className="ml-auto rounded-full px-8">Next <ChevronRight className="w-4 h-4 ml-2" /></Button>
                    ) : (
                      <Button type="submit" className="ml-auto rounded-full px-8" disabled={loading}>{loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />} Submit Inquiry</Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
