import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react';
import { LineChart, Layout, Settings, Target, PenTool, BarChart3 } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: <Target className="w-8 h-8 text-accent-neon" />,
    title: "Digital Marketing Strategy",
    features: ["Lead generation campaigns", "SEO", "PPC advertising", "Brand growth"]
  },
  {
    icon: <Layout className="w-8 h-8 text-highlight-glow" />,
    title: "Website Design & Development",
    features: ["Conversion focused websites", "Landing pages", "High speed performance"]
  },
  {
    icon: <Settings className="w-8 h-8 text-grad-mid" />,
    title: "Automation Systems",
    features: ["Workflow automation", "CRM integration", "Business process systems"]
  },
  {
    icon: <LineChart className="w-8 h-8 text-accent-neon" />,
    title: "Lead Generation Systems",
    features: ["Funnels", "Conversion optimization", "Tracking systems"]
  },
  {
    icon: <PenTool className="w-8 h-8 text-highlight-glow" />,
    title: "Brand Identity & UI/UX",
    features: ["Brand design", "User experience", "Modern interfaces"]
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-grad-mid" />,
    title: "Analytics & Performance",
    features: ["Marketing dashboards", "ROI tracking", "Data insights"]
  }
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const bg1 = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(156, 77, 255, 0.8),
      transparent 80%
    )
  `;

  const bg2 = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(156, 77, 255, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col h-full rounded-2xl p-[1px] overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(156,77,255,0.15)] transition-shadow duration-500"
    >
      {/* Base border (static) */}
      <div className="absolute inset-0 rounded-2xl bg-white/10" />
      
      {/* Glowing border following mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bg1 }}
      />

      {/* Inner card content */}
      <div className="relative z-10 flex-1 bg-[#050507]/90 backdrop-blur-xl rounded-[15px] p-8 flex flex-col h-full overflow-hidden">
        
        {/* Animated Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A5FFF]/10 via-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 mix-blend-screen" />

        {/* Soft background glow inside the card (mouse follow) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{ background: bg2 }}
        />
        
        <div className="relative z-20 flex-1">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            className="mb-6 p-4 bg-white/5 rounded-xl inline-block border border-white/10 group-hover:border-accent-neon/50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            {service.icon}
          </motion.div>
          <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-accent-neon transition-colors">
            {service.title}
          </h3>
          <ul className="space-y-3">
            {service.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-text-secondary">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-neon/50" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bg2Y = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} id="services" className="py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: bgY, rotate: bgRotate }}
        className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-grad-start/10 rounded-[40%] blur-[100px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        style={{ y: bg2Y }}
        className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent-neon/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our Growth Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            We combine marketing strategy, powerful technology, and automation to build scalable digital systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

