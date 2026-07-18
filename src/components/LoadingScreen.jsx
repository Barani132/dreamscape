import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'gathering stardust…',
  'polishing constellations…',
  'brewing pastel dreams…',
  'unlocking hidden rooms…',
  'welcome, wanderer',
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => Math.min(i + 1, MESSAGES.length - 1)), 500);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="loading-screen"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #1a1330 0%, #06050C 100%)' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
        >
          <div className="text-center">
            <motion.div
              className="font-display text-6xl md:text-7xl text-[#FDFAFC] text-glow mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
            >Dreamscape</motion.div>
            <AnimatePresence mode="wait">
              <motion.p key={idx}
                className="font-hand text-2xl text-[#FFD1DC]"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}
              >{MESSAGES[idx]}</motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
