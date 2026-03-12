import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Menu, X, Home, Briefcase, Zap, Building2, User, Mail } from 'lucide-react';
import { NavBar } from '@/src/components/ui/tubelight-navbar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Solutions', url: '#solutions', icon: Zap },
    { name: 'Industries', url: '#industries', icon: Building2 },
    { name: 'About', url: '#about', icon: User },
    { name: 'Contact', url: '#contact', icon: Mail }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            GLMR <span className="text-accent-neon">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <NavBar items={navItems} />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-white hover:text-accent-neon transition-colors">
              Get Started
            </button>
            <button className="btn-gradient px-6 py-2.5 text-sm">
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-bg-secondary border-b border-white/10 px-6 py-6"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.url}
                className="flex items-center gap-4 text-lg font-medium text-text-secondary hover:text-white py-3 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const targetId = item.url.replace('#', '');
                  const elem = document.getElementById(targetId);
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', item.url);
                  }
                }}
              >
                <item.icon size={20} className="text-accent-neon/70" />
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-white/10">
              <button className="text-center py-3 text-white font-medium hover:text-accent-neon transition-colors">Get Started</button>
              <button className="btn-gradient py-4 w-full text-lg font-semibold">Book Strategy Call</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
