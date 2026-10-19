"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, Loader2, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/brand/Logo';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated Auth Logic
    setTimeout(() => {
      if (email === 'navneet@xgeniq.com' && password === 'Navneet@2020') {
        localStorage.setItem('xgeniq_auth_session', 'authenticated');
        toast({
          title: "Access Granted",
          description: "Welcome back to the Command Hub.",
        });
        router.push('/admin');
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials. Please check your email and password.",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[96px] pointer-events-none" />

      <div className="mb-8 animate-fade-in">
        <Link href="/" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Live Site
        </Link>
        <Logo className="scale-125" />
      </div>

      <Card className="w-full max-w-md glass-card border-white/5 bg-card/40 animate-fade-in animate-delay-100">
        <CardHeader className="text-center space-y-2 pb-8 border-b border-white/5">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Command Hub Login</CardTitle>
          <CardDescription>Enter your credentials to access the administration portal.</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@xgeniq.com"
                  className="pl-10 bg-secondary/30 border-white/10 focus:ring-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button 
                  type="button"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 bg-secondary/30 border-white/10 focus:ring-primary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 font-bold text-lg rounded-xl shadow-xl shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Verifying Identity...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-muted-foreground italic">
              Authorized Personnel Only. Digital activities are logged.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-muted-foreground opacity-50">
        © {new Date().getFullYear()} XgenIq Technologies Pvt. Ltd.
      </p>
    </div>
  );
}
