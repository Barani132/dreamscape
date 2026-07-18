import { motion } from 'framer-motion';
import { useAchievements } from '../context/useAchievements';

const INITIAL_STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
  hidden: i === 7 || i === 23 || i === 51,
}));

const INITIAL_CLOUDS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 80,
  scale: 0.6 + Math.random() * 0.8,
  delay: i * 2,
}));

export default function ParticlesBackground() {
  const { unlock } = useAchievements();
  const stars = INITIAL_STARS;
  const clouds = INITIAL_CLOUDS;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="particles-background">
      {/* Aurora blobs */}
      <div className="aurora absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(230,230,250,0.28), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="aurora absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,209,220,0.22), transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }} />
      <div className="aurora absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,230,207,0.15), transparent 70%)', filter: 'blur(60px)', animationDelay: '6s' }} />

      {/* Clouds */}
      {clouds.map((c) => (
        <motion.div key={`c${c.id}`}
          className="absolute drift-slow"
          style={{ left: `${c.x}%`, top: `${c.y}%`, scale: c.scale, animationDelay: `${c.delay}s` }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 3, delay: c.delay }}
        >
          <div className="w-40 h-16 rounded-full bg-white/10 blur-2xl" />
        </motion.div>
      ))}

      {/* Stars */}
      {stars.map((s) => (
        <div key={s.id}
          className={s.hidden ? 'absolute pointer-events-auto cursor-hover' : 'absolute'}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          onClick={s.hidden ? () => unlock('starGazer') : undefined}
          data-testid={s.hidden ? `hidden-star-${s.id}` : undefined}
          title={s.hidden ? '' : ''}
        >
          <div className="twinkle"
            style={{
              width: (s.hidden ? s.size + 1 : s.size) + 'px',
              height: (s.hidden ? s.size + 1 : s.size) + 'px',
              background: s.hidden ? '#FFD1DC' : '#FDFAFC',
              borderRadius: '50%',
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              boxShadow: s.hidden ? '0 0 8px #FFD1DC' : '0 0 4px #FDFAFC',
            }} />
        </div>
      ))}
    </div>
  );
}
