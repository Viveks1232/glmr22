import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll, AnimatePresence } from 'motion/react';
import { ArrowUpRight, BarChart, Users, Zap, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

const projects = [
  {
    title: "TechFlow SaaS",
    category: "Growth & Automation",
    metric: "+320%",
    metricLabel: "Increase in MRR",
    icon: <BarChart className="w-6 h-6 text-accent-neon" />,
    color: "from-accent-neon to-highlight-glow",
    description: "Automated lead nurturing and onboarding sequences resulted in a massive reduction in churn and explosive MRR growth."
  },
  {
    title: "Elevate Real Estate",
    category: "Web Design & SEO",
    metric: "2.5x",
    metricLabel: "Lead Conversion Rate",
    icon: <Users className="w-6 h-6 text-highlight-glow" />,
    color: "from-highlight-glow to-grad-mid",
    description: "A complete visual overhaul and conversion-rate optimization strategy transformed their digital storefront into a lead-gen machine."
  },
  {
    title: "AutoPro Services",
    category: "PPC & Lead Gen",
    metric: "-45%",
    metricLabel: "Cost Per Acquisition",
    icon: <Zap className="w-6 h-6 text-grad-mid" />,
    color: "from-grad-mid to-accent-neon",
    description: "Restructured ad campaigns and hyper-targeted landing pages drastically reduced wasted ad spend while increasing lead quality."
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const mouseXPct = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const mouseYPct = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  
  // A soft white glare for the glass effect
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${mouseXPct}% ${mouseYPct}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;
  
  // A subtle colored spotlight that follows the mouse
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${mouseXPct}% ${mouseYPct}%, rgba(122,95,255,0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 2000 }}
      className="relative min-h-[420px] h-full w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="glass-panel p-8 rounded-2xl h-full border border-white/10 hover:border-accent-neon/50 relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_0_40px_rgba(156,77,255,0.3)] flex flex-col"
      >
        {/* Colored Spotlight Effect */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlightBackground }}
        />

        {/* Dynamic Glare Effect (Glass reflection) */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-soft-light"
          style={{ background: glareBackground }}
        />

        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0`} />
        
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors shadow-inner">
              {project.icon}
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-accent-neon transition-colors" />
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-sm text-accent-neon font-medium mb-2 tracking-wider uppercase">{project.category}</p>
            <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-bold text-white mb-4">{project.title}</h3>
            
            {/* Expandable Description */}
            <motion.div 
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-text-secondary pb-4 leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-xs font-semibold text-accent-neon hover:text-white transition-colors mb-6 flex items-center gap-1 uppercase tracking-wider group/btn"
            >
              <div className="relative h-4 w-[72px] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={isExpanded ? 'less' : 'more'}
                    initial={{ y: isExpanded ? 20 : -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: isExpanded ? -20 : 20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 top-0 whitespace-nowrap"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            
            <div style={{ transform: "translateZ(50px)" }} className="pt-6 border-t border-white/10 flex items-end gap-4">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                {project.metric}
              </div>
              <div className="text-sm text-text-secondary pb-1 max-w-[100px] leading-tight">
                {project.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-150, 350]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [400, -200]);

  return (
    <section ref={containerRef} id="work" className="py-32 relative z-10 overflow-hidden">
      {/* Parallax Backgrounds */}
      <motion.div style={{ y: bgY1 }} className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-accent-neon/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-highlight-glow/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Real Results. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-start to-highlight-glow">Real Growth.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-xl text-text-secondary"
            >
              See how we've transformed businesses with our data-driven growth systems.
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 text-white font-medium hover:text-accent-neon transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
