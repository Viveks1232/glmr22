import { motion, useScroll, useTransform } from 'motion/react';
import { Car, Building2, Coffee, HeartPulse, Rocket, UserCircle, GraduationCap, Briefcase } from 'lucide-react';
import { useRef } from 'react';

const industries = [
  { icon: <Car className="w-8 h-8" />, name: "Automobile Garages" },
  { icon: <Building2 className="w-8 h-8" />, name: "Real Estate" },
  { icon: <Coffee className="w-8 h-8" />, name: "Cafes & Restaurants" },
  { icon: <HeartPulse className="w-8 h-8" />, name: "Hospitals & Clinics" },
  { icon: <Rocket className="w-8 h-8" />, name: "Startups" },
  { icon: <UserCircle className="w-8 h-8" />, name: "Personal Brands" },
  { icon: <GraduationCap className="w-8 h-8" />, name: "Education Institutes" },
  { icon: <Briefcase className="w-8 h-8" />, name: "SMEs" }
];

export default function Industries() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} id="industries" className="py-32 relative bg-bg-secondary overflow-hidden">
      {/* Parallax Backgrounds */}
      <motion.div style={{ y: bgY1 }} className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-grad-start/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-accent-neon/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Industries We Serve
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Tailored digital growth strategies for diverse business sectors.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-accent-neon/50"
            >
              <div className="text-text-secondary group-hover:text-accent-neon transition-colors duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                {industry.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-grad-start group-hover:to-highlight-glow transition-all">
                {industry.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
