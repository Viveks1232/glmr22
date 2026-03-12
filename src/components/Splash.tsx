import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary overflow-hidden"
        >
          {/* Glowing energy wave */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 4], opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-64 h-64 rounded-full bg-accent-neon blur-[100px]"
          />
          
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, y: 0, opacity: 0, scale: 0 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 500, 
                y: (Math.random() - 0.5) * 500,
                opacity: [0, 1, 0],
                scale: [0, Math.random() * 2 + 1, 0]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute w-1 h-1 rounded-full bg-highlight-glow blur-[1px]"
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 text-center"
          >
            <motion.h1 
              animate={{ textShadow: ["0 0 0px #9C4DFF", "0 0 40px #9C4DFF", "0 0 20px #9C4DFF"] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white"
            >
              GLMR <span className="text-transparent bg-clip-text bg-gradient-to-r from-grad-start to-grad-mid">Technologies</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
