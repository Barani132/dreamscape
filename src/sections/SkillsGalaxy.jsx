import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Python',    x: 20, y: 20, color: '#FFD1DC', projects: ['Data & scripts', 'Automation'] },
  { name: 'Java',      x: 50, y: 15, color: '#E6E6FA', projects: ['Child & Women Safety App'] },
  { name: 'JavaScript',x: 78, y: 22, color: '#A8E6CF', projects: ['LastStop', 'this portfolio'] },
  { name: 'SQL',       x: 82, y: 55, color: '#A9BCCC', projects: ['LastStop backend'] },
  { name: 'HTML',      x: 65, y: 78, color: '#FFD1DC', projects: ['LastStop', 'Portfolio'] },
  { name: 'CSS',       x: 40, y: 82, color: '#E6E6FA', projects: ['LastStop', 'Portfolio'] },
  { name: 'Firebase',  x: 18, y: 60, color: '#A8E6CF', projects: ['Child & Women Safety'] },
  { name: 'Android',   x: 32, y: 42, color: '#FFD1DC', projects: ['Child & Women Safety'] },
  { name: 'REST APIs', x: 60, y: 50, color: '#A9BCCC', projects: ['LastStop'] },
  { name: 'Git',       x: 12, y: 40, color: '#E6E6FA', projects: ['everywhere'] },
  { name: 'Linux',     x: 88, y: 78, color: '#A8E6CF', projects: ['daily driver'] },
  { name: 'XML',       x: 50, y: 62, color: '#FFD1DC', projects: ['Android layouts'] },
];


export default function SkillsGalaxy() {
  const [hover, setHover] = useState(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [hoveringClickable, setHoveringClickable] = useState(false);
useEffect(() => {
  const handleMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 40,
      y: (e.clientY / window.innerHeight - 0.5) * 40,
    });

    setCursor({
      x: e.clientX,
      y: e.clientY,
    });

    setRing({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleHover = (e) => {
    const clickable = e.target.closest(
      'button, a, input, textarea, [role="button"]'
    );

    setHoveringClickable(!!clickable);
  };

  window.addEventListener('mousemove', handleMove);

  window.addEventListener('mouseover', handleHover);

  return () => {
    window.removeEventListener('mousemove', handleMove);

    
    window.removeEventListener('mouseover', handleHover);
  };
}, []);

  // Connections between related skills
  const links = useMemo(() => [
    [1, 7], [7, 6], [7, 11], [1, 11], // Android cluster
    [2, 4], [2, 5], [4, 5], [2, 8], [8, 3], [3, 6], // Web cluster
    [0, 9], [9, 10], // dev/env
    [0, 8], [2, 9],
  ], []);

  return (
    <section id="skills" data-testid="section-skills" className="relative px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="font-hand text-2xl text-[#A9BCCC] mb-2">the galaxy of tools</div>
          <h2 className="font-display text-5xl md:text-6xl text-[#FDFAFC] text-glow">Skills as stars.</h2>
          <p className="mt-4 text-[#E6E6FA]/70 md:text-lg">Hover a star — related projects will glow.</p>
        </div>

        <div className="relative w-full aspect-[16/10] rounded-[2rem] glass overflow-hidden">
          <svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>
  {links.map(([a, b], i) => {
  const x1 = SKILLS[a].x;
  const y1 = SKILLS[a].y;

  const x2 = SKILLS[b].x;
  const y2 = SKILLS[b].y;

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <motion.path
      key={i}
      d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
      fill="transparent"
      stroke="rgba(230,230,250,0.25)"
      strokeWidth="1"

      strokeDasharray="3 4"
      strokeDashoffset={0}
      strokeLinecap="round"
      animate={{
  d: [
    `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`,
    `M ${x1} ${y1} Q ${mx + 1.5} ${my - 1.5} ${x2} ${y2}`,
    `M ${x1} ${y1} Q ${mx - 1.5} ${my + 1.5} ${x2} ${y2}`,
    `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`,
  ],

  strokeDashoffset: [-30, 0],
      }}
               transition={{
  d: {
    duration: 5 + i,
    repeat: Infinity,
    ease: "easeInOut",
  },

  strokeDashoffset: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  },
}}
    />
  );
})}
</svg>



          {SKILLS.map((s, i) => (
            <div
  key={s.name}
  className="absolute"
  style={{
    left: `${s.x}%`,
    top: `${s.y}%`,
    transform: `translate(
      calc(-50% + ${mouse.x * 0.15}px),
      calc(-50% + ${mouse.y * 0.15}px)
    )`,
    transition: 'transform 0.2s ease-out',
  }}
>
              <motion.button
                data-testid={`skill-${s.name.toLowerCase()}`}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                whileHover={{ scale: 1.25 }}
                className="relative cursor-hover"
              >
                <div className="w-4 h-4 rounded-full twinkle"
                  style={{
                    background: s.color,
                    boxShadow: `0 0 18px ${s.color}, 0 0 40px ${s.color}55`,
                    animationDelay: `${i * 0.3}s`,
                  }} />
                <div className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap text-xs text-[#FDFAFC]/70 font-hand text-base">
                  {s.name}
                </div>
              </motion.button>

              {hover === i && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-12 z-30 glass-strong rounded-xl px-4 py-3 min-w-[180px]"
                  style={{ boxShadow: `0 0 30px ${s.color}55` }}
                >
                  <div className="font-display text-lg text-[#FDFAFC]">{s.name}</div>
                  <div className="text-xs text-[#E6E6FA]/75 mt-1">used in:</div>
                  <ul className="mt-1 space-y-0.5">
                    {s.projects.map((p, j) => (
                      <li key={j} className="text-xs text-[#FFD1DC]">• {p}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          ))}

          {/* faint background stars inside canvas */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white/60 twinkle"
              style={{
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }} />
          ))}
        </div>
      </div>

     <motion.div
  className="fixed pointer-events-none"
  style={{
    left: 0,
    top: 0,
    zIndex: 99999,
  }}
  animate={{
    x: cursor.x - 4,
    y: cursor.y - 4,
  }}
  transition={{
    duration: 0,
  }}
>
  <div
    style={{
      width: '8px',
      height: '8px',
      background: '#f8dbf5',
      borderRadius: '50%',
      boxShadow: '0 0 20px #ffffff',
    }}
  />
</motion.div>

   { /*outer ring*/}

<motion.div
  className="fixed pointer-events-none"
  style={{
    left: 0,
    top: 0,
    zIndex: 99998,
  }}
  animate={{
    x: ring.x - (hoveringClickable ? 26 : 16),
    y: ring.y - (hoveringClickable ? 26 : 16),
  }}
  transition={{
    type: "spring",
    damping: 30,
    stiffness: 120,
    mass: 2.5,
  }}
>
  <div
    style={{
      width: hoveringClickable ? '52px' : '32px',
      height: hoveringClickable ? '52px' : '32px',
      border: '1px solid #ffffff',
      borderRadius: '50%',
      boxShadow:
        '0 0 15px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.35)',
    }}
  />
</motion.div>
      
    </section> 
    );
}



