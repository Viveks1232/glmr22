import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CMO, TechFlow",
    content: "GLMR completely transformed our lead generation process. Their automated systems increased our qualified leads by 300% in just 3 months.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Founder, Elevate Real Estate",
    content: "The website they built for us isn't just beautiful, it's a conversion machine. We've seen a massive drop in bounce rates and higher engagement.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Director, AutoPro Services",
    content: "Their data-driven approach to our PPC campaigns cut our customer acquisition cost in half. Highly recommend their growth team.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "CEO, StartUp Hub",
    content: "Working with GLMR was the best decision we made. Their strategic insights and execution are unparalleled in the industry.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Marketing Head, Global Retail",
    content: "The ROI we've seen since partnering with GLMR is incredible. They truly understand how to build scalable growth engines.",
    rating: 5
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [-250, 250]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [250, -250]);

  return (
    <section ref={containerRef} className="py-32 relative bg-bg-secondary overflow-hidden">
      {/* Parallax Backgrounds */}
      <motion.div style={{ y: bgY1 }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-highlight-glow/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-grad-mid/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Client Success Stories
          </motion.h2>
        </div>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative w-full flex overflow-hidden">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the array for seamless looping */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300 w-[400px] flex-shrink-0"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-grad-start to-highlight-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-neon text-accent-neon" />
                ))}
              </div>
              
              <p className="text-text-secondary text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white border border-white/20">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-accent-neon">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

