// React import not required with new JSX transform
import { motion } from 'framer-motion';
import { Sparkles, Command, ArrowDown } from 'lucide-react';

export default function Dreamscape({ onExplore }) {
  return (
    <section id="home" data-testid="section-home" className="relative min-h-screen flex items-center px-6 md:px-16 pt-24 pb-32">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-widest uppercase text-[#E6E6FA]"
          >
            <Sparkles size={12} className="text-[#FFD1DC]" /> a hidden digital universe
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl text-[#FDFAFC] text-glow leading-[1.05]"
          >
            Hello, wanderer.<br/>
            <span className="italic text-[#FFD1DC]">I'm Barani.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }}
            className="text-lg md:text-xl text-[#E6E6FA]/80 max-w-xl leading-relaxed"
          >
            You've drifted into a small corner of the internet where code, curiosity and
            gentle magic live together. Take your time. Explore softly. Every star holds
            something to find.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-explore-btn"
              onClick={onExplore}
              className="cursor-hover glass rounded-full px-6 py-3 text-sm text-[#FDFAFC] hover:glow-blush transition-all inline-flex items-center gap-2"
            >
              Begin the journey <ArrowDown size={14} />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#A9BCCC]/80 font-hand text-lg">
              <kbd className="glass rounded-md px-2 py-1 text-[10px] terminal-font"><Command className="inline" size={10}/> K</kbd>
              opens the portal
            </div>
          </motion.div>
        </div>

        {/* Floating orb / avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.4 }}
          className="md:col-span-4 relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full drift-slow"
              style={{ background: 'conic-gradient(from 0deg, #FFD1DC, #E6E6FA, #A8E6CF, #A9BCCC, #FFD1DC)', filter: 'blur(28px)', opacity: 0.65 }} />
            <div className="absolute inset-4 rounded-full glass-strong flex items-center justify-center overflow-hidden">
              <div className="text-center px-4">
                <div className="font-display text-7xl text-[#FDFAFC] text-glow">B</div>
                <div className="font-hand text-xl text-[#FFD1DC] mt-1">est. 2026</div>
              </div>
            </div>
            {/* orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute rounded-full"
                  style={{
                    width: 8, height: 8,
                    background: ['#FFD1DC', '#A8E6CF', '#E6E6FA'][i],
                    boxShadow: `0 0 14px ${['#FFD1DC', '#A8E6CF', '#E6E6FA'][i]}`,
                    top: [0, '50%', '100%'][i],
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-hand text-sm text-[#A9BCCC]"
      >psst… try Ctrl+K, or type "help" anywhere</motion.div>
    </section>
  );
}
