import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useRef, useEffect } from 'react';

const FRAME_COUNT = 240;

function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    
    // Preload all frames to ensure no lagging
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/imagesf/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) drawImageCover(ctx, img, canvasRef.current);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    let animationFrameId: number;
    let lastTime = 0;
    let baseFrame = 0;
    const fps = 24; // Smooth base animation
    const interval = 1000 / fps;

    const render = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      
      if (deltaTime > interval) {
        baseFrame = (baseFrame + 1) % FRAME_COUNT;
        lastTime = time - (deltaTime % interval);
        
        // Tie to scroll to make it move in the same direction gracefully
        const scrollOffset = Math.floor(window.scrollY * 0.1); 
        const actualFrame = (baseFrame + scrollOffset) % FRAME_COUNT;
        
        const img = imagesRef.current[actualFrame];
        const canvas = canvasRef.current;
        if (img && canvas && img.complete) {
          const ctx = canvas.getContext('2d');
          if (ctx) drawImageCover(ctx, img, canvas);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight * 1.2; // Match the 120% height
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Use darker blending settings if needed
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Slight overlay matching deep space theme
    ctx.fillStyle = 'rgba(11, 15, 42, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-[120%] object-cover opacity-60 mix-blend-screen"
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Scroll Parallax Effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background moves faster to create depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  // Text moves slightly slower than the background
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  // Trust Badges move UP as you scroll down (distinct parallax)
  const badgesY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-bg-primary">
      
      {/* Animated Atmospheric Sequence Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 w-full h-[120%]"
      >
        <ImageSequence />
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-neon/30 rounded-full blur-[120px] animate-pulse mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-highlight-glow/20 rounded-full blur-[150px] animate-pulse delay-1000 mix-blend-screen pointer-events-none" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/80 to-bg-primary pointer-events-none" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full flex flex-col items-center justify-center min-h-[70vh]">
        
        <motion.div style={{ y: textY }} className="flex flex-col items-center w-full">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-highlight-glow" />
            <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide uppercase">Elevating Your Brand. Driving Your Future.</span>
          </motion.div>

          {/* Typography Refinement - Smaller, constrained aspect ratio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-4xl aspect-auto md:aspect-[21/9] flex flex-col items-center justify-center mb-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]">
              <span className="text-white">Build Your Digital</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon via-white to-highlight-glow drop-shadow-[0_0_30px_rgba(122,95,255,0.3)]">
                Growth Engine
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto mt-6 leading-relaxed font-light">
              We combine creative digital marketing with robust technology systems to help ambitious businesses build visibility, improve conversions, and scale sustainably.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
          >
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-neon to-highlight-glow rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <button className="relative px-8 py-4 text-base md:text-lg font-semibold text-white bg-bg-primary rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto flex items-center justify-center gap-2">
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
            <button className="px-8 py-4 text-base md:text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-[1.02] w-full sm:w-auto backdrop-blur-sm">
              View Our Services
            </button>
          </motion.div>
        </motion.div>

        {/* Trust Badges with Parallax */}
        <motion.div
          style={{ y: badgesY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto pt-8 border-t border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-6 shadow-xl"
        >
          <p className="text-xs text-text-secondary mb-6 uppercase tracking-widest font-semibold">Delivering Measurable Results</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[
              'Data-Driven Marketing',
              'Conversion-Focused Websites',
              'Custom CRM Development',
              'ROI-Driven Growth'
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-accent-neon" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
