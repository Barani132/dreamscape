// React import not required with new JSX transform
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ALL_BADGES } from '../lib/badges';
import { useAchievements } from '../context/useAchievements';

export default function BadgesPanel({ open, onOpenChange }) {
  const { unlocked } = useAchievements();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="glass-strong border-white/10 text-[#E6E6FA] w-[380px] sm:w-[420px]" data-testid="badges-panel">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl text-[#FDFAFC]">Your Collection</SheetTitle>
          <p className="text-sm text-white/60 font-hand text-lg">{unlocked.length} / {ALL_BADGES.length} discovered</p>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {ALL_BADGES.map((b) => {
            const on = unlocked.includes(b.id);
            return (
              <div key={b.id} data-testid={`badge-${b.id}`}
                className={`glass rounded-2xl p-4 transition-all ${on ? 'glow-blush border-[#FFD1DC]/40' : 'opacity-40'}`}>
                <div className="text-3xl mb-1" style={{ filter: on ? 'drop-shadow(0 0 12px #FFD1DC)' : 'grayscale(1)' }}>{b.icon}</div>
                <div className="text-sm font-display">{on ? b.name : '???'}</div>
                <div className="text-xs text-white/60 mt-1">{on ? b.desc : 'Undiscovered…'}</div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
