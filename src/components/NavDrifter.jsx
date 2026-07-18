// React import not required with new JSX transform
import { motion } from 'framer-motion';
import { Award, Download, Command, Sparkles } from 'lucide-react';

export default function NavDrifter({ onOpenBadges, onOpenPalette }) {
  const items = [
    { id: 'home', label: 'Dreamscape' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full px-4 py-2 flex items-center gap-1 md:gap-2"
      data-testid="main-nav"
    >
      <div className="hidden md:flex items-center gap-1 pl-2 pr-3 border-r border-white/10 mr-1">
        <Sparkles size={14} className="text-[#FFD1DC]" />
        <span className="font-display text-sm text-[#FDFAFC]">Barani</span>
      </div>
      {items.map((it) => (
        <button key={it.id} onClick={() => go(it.id)} data-testid={`nav-${it.id}`}
          className="cursor-hover text-xs md:text-sm text-[#E6E6FA]/75 hover:text-[#FDFAFC] px-3 py-1.5 rounded-full hover:bg-white/5 transition">
          {it.label}
        </button>
      ))}
      <div className="hidden md:flex items-center gap-1 pl-2 ml-1 border-l border-white/10">
        <button onClick={onOpenPalette} data-testid="nav-palette" className="cursor-hover p-1.5 rounded-full hover:bg-white/5" title="Command Palette (Ctrl+K)">
          <Command size={14} className="text-[#E6E6FA]/75" />
        </button>
        <button onClick={onOpenBadges} data-testid="nav-badges" className="cursor-hover p-1.5 rounded-full hover:bg-white/5" title="Achievements">
          <Award size={14} className="text-[#E6E6FA]/75" />
        </button>
        <a href="https://customer-assets-gfyr7b9c.emergentagent.net/job_36362e68-a496-4d3f-b087-9e17817888ab/artifacts/072z4gsu_Barani.pdf"
          target="_blank" rel="noreferrer" data-testid="nav-resume"
          className="cursor-hover p-1.5 rounded-full hover:bg-white/5" title="Download Resume">
          <Download size={14} className="text-[#FFD1DC]" />
        </a>
      </div>
    </motion.nav>
  );
}
