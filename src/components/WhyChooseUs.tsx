import { motion, useScroll, useTransform } from 'motion/react';
import { Clock, ShieldCheck, Users, Headphones } from 'lucide-react';
import { useRef } from 'react';

const reasons = [
  {
    icon: <Clock className="w-10 h-10 text-white" />,
    title: "10+ Years Digital Experience",
    desc: "Proven track record of scaling businesses across multiple industries."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-white" />,
    title: "Transparent Data Driven Process",
    desc: "No guesswork. Every decision is backed by analytics and performance data."
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: "Dedicated Growth Team",
    desc: "A specialized team of marketers, developers, and strategists for your brand."
  },
  {
    icon: <Headphones className="w-10 h-10 text-white" />,
    title: "24/7 Support and Optimization",
    desc: "Continuous monitoring and improvement of your digital growth engine."
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-bg-secondary">
      {/* Massive glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-grad-start/10 via-bg-secondary to-bg-secondary pointer-events-none" />
      <motion.div style={{ y: bgY1 }} className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-accent-neon/10 rounded-full blur-[150px] pointer-events-none" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-highlight-glow/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Why Choose GLMR
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="h-full"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                className="glass-panel p-8 rounded-2xl text-center h-full border-t border-accent-neon/30 hover:shadow-[0_0_30px_rgba(156,77,247,0.3)] transition-shadow"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-grad-start to-grad-mid flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(123,47,247,0.4)]">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{reason.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

