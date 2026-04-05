
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Leadership } from '@/components/sections/Leadership';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Products } from '@/components/sections/Products';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { USP } from '@/components/sections/USP';
import { Testimonials } from '@/components/sections/Testimonials';
import { Matchmaker } from '@/components/sections/Matchmaker';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TechStack />
      <Services />
      <Products />
      <CaseStudies />
      <About />
      <Leadership />
      <USP />
      <Testimonials />
      <Matchmaker />
      <Footer />
    </main>
  );
}
