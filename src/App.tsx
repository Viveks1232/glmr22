import { useState } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import CaseStudies from './components/CaseStudies';
import Industries from './components/Industries';
import Founder from './components/Founder';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-transparent text-text-primary selection:bg-accent-neon/30 selection:text-white font-sans relative">
      <Background3D />
      {showSplash ? (
        <Splash onComplete={() => setShowSplash(false)} />
      ) : (
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Services />
            <WhyChooseUs />
            <CaseStudies />
            <Industries />
            <Founder />
            <Testimonials />
            <CTA />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}



