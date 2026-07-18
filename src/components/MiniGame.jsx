import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useAchievements } from '../context/useAchievements';

// Simple constellation puzzle: connect stars in the right order to form a heart-like pattern.
const STARS = [
  { id: 0, x: 50, y: 25 }, { id: 1, x: 30, y: 40 }, { id: 2, x: 70, y: 40 },
  { id: 3, x: 20, y: 60 }, { id: 4, x: 80, y: 60 }, { id: 5, x: 50, y: 85 },
];
const CORRECT = [0, 1, 3, 5, 4, 2, 0]; // sequence

export default function MiniGame({ open, onOpenChange }) {
  const [path, setPath] = useState([]);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const { unlock } = useAchievements();

  const reset = () => { setPath([]); setDone(false); setErr(false); };

  const click = (id) => {
    if (done) return;
    const next = [...path, id];
    const expected = CORRECT[next.length - 1];
    if (id !== expected) {
      setErr(true);
      setTimeout(() => { setErr(false); setPath([]); }, 700);
      return;
    }
    setPath(next);
    if (next.length === CORRECT.length) {
      setDone(true);
      unlock('puzzleSolver');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) reset(); }}>
      <DialogContent className="glass-strong border-white/10 max-w-lg" data-testid="mini-game">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-[#FDFAFC]">Weave the Constellation</DialogTitle>
          <p className="text-sm text-white/60">Connect the stars in a single unbroken flow…</p>
        </DialogHeader>
        <div className={`relative w-full aspect-square rounded-2xl border border-white/10 ${err ? 'animate-pulse' : ''}`}
          style={{ background: 'radial-gradient(ellipse at center, rgba(230,230,250,0.06), transparent)' }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {path.slice(0, -1).map((p, i) => {
              const a = STARS[p]; const b = STARS[path[i + 1]];
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={done ? '#FFD1DC' : '#E6E6FA'} strokeWidth="0.5" opacity="0.85"
                style={{ filter: done ? 'drop-shadow(0 0 4px #FFD1DC)' : 'drop-shadow(0 0 2px #E6E6FA)' }} />;
            })}
          </svg>
          {STARS.map((s) => {
            const active = path.includes(s.id);
            return (
              <button key={s.id} data-testid={`game-star-${s.id}`}
                onClick={() => click(s.id)}
                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all cursor-hover"
                style={{
                  left: `${s.x}%`, top: `${s.y}%`,
                  background: active ? '#FFD1DC' : '#FDFAFC',
                  boxShadow: active ? '0 0 22px #FFD1DC' : '0 0 10px #FDFAFC',
                  transform: `translate(-50%, -50%) scale(${active ? 1.3 : 1})`,
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-hand text-[#FFD1DC]">{done ? '✧ Beautifully woven ✧' : err ? 'Reset… try again' : 'Trace the heart of the sky'}</p>
          <Button data-testid="game-reset" variant="ghost" onClick={reset} className="text-[#E6E6FA] hover:bg-white/5">Reset</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
