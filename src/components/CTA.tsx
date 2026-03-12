import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Massive gradient section */}
      <div className="absolute inset-0 bg-gradient-to-br from-grad-start via-grad-mid to-bg-primary opacity-90" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-accent-neon/30 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight"
        >
          Ready To Scale <br/> Your Business?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light"
        >
          Let's build your digital growth engine.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="bg-white text-bg-primary hover:bg-white/90 px-10 py-5 text-xl font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 flex items-center justify-center gap-3 mx-auto group">
            Book Free Strategy Call
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
