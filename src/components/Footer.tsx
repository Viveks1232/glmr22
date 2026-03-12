import { motion } from 'motion/react';
import { Mail, Phone, Globe, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-bg-primary pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-grad-start/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <span className="text-3xl font-bold tracking-tight text-white block">
              GLMR <span className="text-accent-neon">.</span>
            </span>
            <p className="text-text-secondary leading-relaxed">
              Elevating Your Brand. Driving Your Future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-neon/20 transition-all border border-white/10">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-neon/20 transition-all border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-neon/20 transition-all border border-white/10">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'News', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-secondary hover:text-accent-neon transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              {['Digital Marketing', 'Web Development', 'Automation', 'Brand Identity'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-secondary hover:text-accent-neon transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:kshitij.glmr@gmail.com" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 group-hover:text-accent-neon transition-colors" />
                  kshitij.glmr@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919549602463" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 group-hover:text-accent-neon transition-colors" />
                  +91 9549602463
                </a>
              </li>
              <li>
                <a href="https://glmrtechnologies.com" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group">
                  <Globe className="w-5 h-5 group-hover:text-accent-neon transition-colors" />
                  glmrtechnologies.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} GLMR Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
