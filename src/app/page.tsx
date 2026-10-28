
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Industries } from '@/components/sections/Industries';
import { TechStack } from '@/components/sections/TechStack';
import { Products } from '@/components/sections/Products';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Blog } from '@/components/sections/Blog';
import { Innovation } from '@/components/sections/Innovation';
import { USP } from '@/components/sections/USP';
import { Testimonials } from '@/components/sections/Testimonials';
import { Careers } from '@/components/sections/Careers';
import { Matchmaker } from '@/components/sections/Matchmaker';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TechStack />
      <Services />
      <Industries />
      <Products />
      <Innovation />
      <CaseStudies />
      <Blog />
      <About />
      <Careers />
      <USP />
      <Testimonials />
      <Matchmaker />
      <Footer />
    </main>
  );
}
