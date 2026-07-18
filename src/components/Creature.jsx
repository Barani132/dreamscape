import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAchievements } from '../context/useAchievements';

// Small animated creature that peeks around a corner
export default function Creature({ x = '2%', y = '30%', delay = 0, kind = 'moth' }) {
  const { unlock } = useAchievements();
  const [wave, setWave] = useState(false);

  const symbol = kind === 'moth' ? '❁' : kind === 'fox' ? '❋' : '✿';

  return (
    <motion.button
      data-testid={`creature-${kind}`}
      onClick={() => { setWave(true); unlock('creature'); setTimeout(() => setWave(false), 1200); }}
      className="absolute cursor-hover z-20 select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 0.55, x: 0 }}
      transition={{ delay, duration: 2, ease: 'easeOut' }}
    >
      <motion.span
        className="text-3xl block"
        style={{ color: '#FFD1DC', filter: 'drop-shadow(0 0 8px rgba(255,209,220,0.6))' }}
        animate={wave ? { y: [-4, -20, -4], rotate: [0, -15, 15, 0] } : { y: [0, -6, 0] }}
        transition={{ duration: wave ? 1 : 4, repeat: wave ? 0 : Infinity, ease: 'easeInOut' }}
      >{symbol}</motion.span>
    </motion.button>
  );
}
