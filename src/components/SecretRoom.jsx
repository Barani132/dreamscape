// React import not required with new JSX transform
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export default function SecretRoom({ open, onOpenChange }) {
  const sketches = [
    { t: 'unfinished — glow flower', c: '#FFD1DC' },
    { t: 'idea: paper plane API', c: '#A8E6CF' },
    { t: 'sketch — cloud creatures', c: '#E6E6FA' },
    { t: 'draft — pastel game jam', c: '#A9BCCC' },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/10 max-w-2xl" data-testid="secret-room">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-[#FDFAFC]">The Secret Room</DialogTitle>
          <p className="text-sm text-white/60 font-hand text-lg">unfinished ideas, kept safe</p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {sketches.map((s, i) => (
            <div key={i} className="glass rounded-2xl h-32 p-4 flex items-end"
              style={{ boxShadow: `0 0 30px ${s.c}22` }}>
              <div>
                <div className="font-hand text-lg" style={{ color: s.c }}>{s.t}</div>
                <div className="text-xs text-white/40">sketch #{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
