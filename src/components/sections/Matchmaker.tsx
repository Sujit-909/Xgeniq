
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Send, CheckCircle } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { matchServices, AIServiceMatchmakerOutput } from '@/ai/flows/ai-service-matchmaker';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  businessChallenges: z.string().min(20, {
    message: "Please describe your challenges in at least 20 characters.",
  }),
  projectRequirements: z.string().min(20, {
    message: "Please describe your requirements in at least 20 characters.",
  }),
});

export function Matchmaker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIServiceMatchmakerOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessChallenges: "",
      projectRequirements: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await matchServices(values);
      setResult(response);
    } catch (error) {
      console.error("Failed to fetch AI suggestions", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="inquiry" className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-accent/30 text-accent">AI Inquiry Hub</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Plan Your <span className="text-primary">Next Big Move</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fill out your project details and let our AI engine analyze your needs. We'll suggest the most relevant services and provide a preliminary solution outline in seconds.
                </p>
              </div>

              {result && (
                <div className="animate-in slide-in-from-left duration-700">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-5 h-5" />
                        AI Analysis Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recommended Services</p>
                        <div className="flex flex-wrap gap-2">
                          {result.suggestedServices.map((service, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/20">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Solution Outline</p>
                        <p className="text-sm leading-relaxed text-foreground/90 bg-background/50 p-4 rounded-lg border border-border">
                          {result.preliminarySolutionOutline}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-2 text-sm text-accent font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Our experts will review this analysis and contact you soon.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <Card className="glass-card shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-2xl font-headline font-bold">Inquiry Form</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessChallenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Challenges</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the main pain points your business is facing..." 
                              className="min-h-[120px] bg-background/30"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Tell us what's holding your business back.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Requirements</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What are your goals for this project?" 
                              className="min-h-[120px] bg-background/30"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Specify your technical or business requirements.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-full font-bold group" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Analysis...
                        </>
                      ) : (
                        <>
                          Request AI Solution Match
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </Button>
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
