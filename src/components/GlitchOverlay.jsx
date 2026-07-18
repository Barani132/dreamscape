import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlitchOverlay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOn(true);
      setTimeout(() => setOn(false), 1800);
    };
    window.addEventListener('dreamscape:glitch', handler);
    return () => window.removeEventListener('dreamscape:glitch', handler);
  }, []);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] pointer-events-none"
          data-testid="glitch-overlay"
        >
          <motion.div className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(0deg, rgba(255,209,220,0.3), transparent 20%, transparent 40%, rgba(230,230,250,0.3) 60%, transparent 100%)',
                'linear-gradient(180deg, rgba(168,230,207,0.3), transparent 30%, transparent 60%, rgba(255,209,220,0.3) 100%)',
                'radial-gradient(circle, rgba(255,209,220,0.15), transparent 60%)',
              ],
            }}
            transition={{ duration: 0.4, repeat: 3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div className="font-display text-6xl md:text-8xl text-[#FDFAFC] text-glow"
              animate={{ x: [-4, 6, -6, 3, 0], opacity: [0.5, 1, 0.6, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
            >✧ reality softens ✧</motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
