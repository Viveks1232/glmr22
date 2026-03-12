import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-grad-start/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2" 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(123,47,247,0.2)]">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                alt="Kshitij Katara - Founder & CEO"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white mb-1">Kshitij Katara</h3>
                <p className="text-accent-neon font-medium tracking-wide">Founder & CEO</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div style={{ y: decorY1 }} className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-accent-neon/50 rounded-tl-3xl" />
            <motion.div style={{ y: decorY2 }} className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-highlight-glow/50 rounded-br-3xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            <Quote className="w-16 h-16 text-accent-neon/30 -mb-4" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building scalable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-start to-highlight-glow">growth engines.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                GLMR Technologies was founded to simplify digital growth for businesses.
              </p>
              <p>
                Many companies struggle not because of lack of potential, but because they lack the right digital strategy and systems. We bridge that gap by implementing data-driven marketing and intelligent automation.
              </p>
              <p>
                Our mission is to build scalable growth engines and become long-term partners in your success.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-2xl font-medium text-white italic">
                "Your success is our responsibility."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
