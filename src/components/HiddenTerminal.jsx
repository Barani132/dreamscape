import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useAchievements } from '../context/useAchievements';

const COMMANDS = {
  help: () => [
    'Available whispers:',
    '  help       — show this scroll',
    '  whoami     — reveal identity',
    '  skills     — list star-skills',
    '  projects   — enumerate worlds',
    '  contact    — obtain summoning info',
    '  badges     — list achievements',
    '  glitch     — trigger a strange event',
    '  clear      — sweep the fog',
    '  exit       — close portal',
  ],
  whoami: () => ['Barani B — BCA @ Government First Grade College, Bengaluru', 'CGPA 8.9 • Class of 2026', 'Dreamer • Builder • Story-weaver'],
  skills: () => ['Python • Java • JavaScript • SQL', 'Android Studio • Firebase • REST APIs', 'HTML • CSS • XML • Git • Linux'],
  projects: () => ['✦ Child & Women Safety Application (Android)', '✦ LastStop — Notes Sharing Platform', '✦ … more soon'],
  contact: () => ['barani.b2137@gmail.com', 'Bengaluru, Karnataka, India'],
};

export default function HiddenTerminal({ open, onOpenChange }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: '~ dreamscape terminal v2.6.1 ~ type "help"' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const { unlock, unlocked } = useAchievements();

  useEffect(() => { if (open) unlock('terminal'); }, [open, unlock]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [history]);

  const submit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const newLines = [{ type: 'in', text: '❯ ' + cmd }];
    if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    if (cmd === 'exit') { onOpenChange(false); setInput(''); return; }
    if (cmd === 'badges') {
      newLines.push({ type: 'out', text: `${unlocked.length} unlocked → ` + (unlocked.join(', ') || 'none yet') });
    } else if (cmd === 'glitch') {
      newLines.push({ type: 'out', text: 'ERR: reality.exe not found… ✧ transformed into stardust ✧' });
      unlock('glitch');
      window.dispatchEvent(new CustomEvent('dreamscape:glitch'));
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd]().forEach((t) => newLines.push({ type: 'out', text: t }));
    } else {
      newLines.push({ type: 'err', text: `unknown whisper: "${cmd}" — try "help"` });
    }
    setHistory((h) => [...h, ...newLines]);
    setInput('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/10 max-w-2xl p-0 overflow-hidden" data-testid="hidden-terminal">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-[#FFD1DC]" />
          <div className="w-3 h-3 rounded-full bg-[#E6E6FA]" />
          <div className="w-3 h-3 rounded-full bg-[#A8E6CF]" />
          <span className="ml-2 text-xs text-white/60 terminal-font">dreamscape ~ terminal</span>
        </div>
        <div ref={listRef} className="h-80 overflow-y-auto p-4 terminal-font text-sm space-y-1">
          {history.map((h, i) => (
            <div key={i} className={
              h.type === 'in' ? 'text-[#FFD1DC]' :
              h.type === 'err' ? 'text-[#FFB4B4]' :
              h.type === 'sys' ? 'text-[#A8E6CF]' : 'text-[#E6E6FA]/85'
            }>{h.text}</div>
          ))}
        </div>
        <div className="border-t border-white/10 px-4 py-3 flex items-center gap-2 terminal-font">
          <span className="text-[#FFD1DC]">❯</span>
          <input
            data-testid="terminal-input"
            autoFocus value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="bg-transparent flex-1 outline-none text-[#E6E6FA] placeholder:text-white/30 text-sm"
            placeholder="whisper a command…"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
