import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Leadership } from '@/components/sections/Leadership';
import { Services } from '@/components/sections/Services';
import { USP } from '@/components/sections/USP';
import { Matchmaker } from '@/components/sections/Matchmaker';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <Services />
      <USP />
      <Matchmaker />
      <Footer />
    </main>
  );
}