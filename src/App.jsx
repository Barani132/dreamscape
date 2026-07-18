import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';
import Toaster from './components/ui/sonner';
import { AchievementProvider } from './context/AchievementContext';
import { useAchievements } from './context/useAchievements';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import MusicToggle from './components/MusicToggle';
import LoadingScreen from './components/LoadingScreen';
import NavDrifter from './components/NavDrifter';
import CommandPalette from './components/CommandPalette';
import HiddenTerminal from './components/HiddenTerminal';
import BadgesPanel from './components/BadgesPanel';
import MiniGame from './components/MiniGame';
import SecretRoom from './components/SecretRoom';
import GlitchOverlay from './components/GlitchOverlay';
import Creature from './components/Creature';
import Dreamscape from './sections/Dreamscape';
import About from './sections/About';
import Projects from './sections/Projects';
import SkillsGalaxy from './sections/SkillsGalaxy';
import Contact from './sections/Contact';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function InnerApp() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [paletteTrigger, setPaletteTrigger] = useState(0);
  const [constellationVisible, setConstellationVisible] = useState(false);
  const { unlock, unlocked, devMode } = useAchievements();

  const konamiRef = useRef([]);
  const typedRef = useRef('');
  const visitedRef = useRef(new Set());

  // Arrival badge + time-based badges
  useEffect(() => {
    unlock('arrival');
    const t1 = setTimeout(() => unlock('patient'), 180000); // 3 min
    const t2 = setTimeout(() => setConstellationVisible(true), 300000); // 5 min secret constellation
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [unlock]);

  // Section visited tracker → explorer badge
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          visitedRef.current.add(e.target.id);
          if (['home','about','projects','skills','contact'].every((s) => visitedRef.current.has(s))) {
            unlock('explorer');
          }
        }
      });
    }, { threshold: 0.5 });
    ['home','about','projects','skills','contact'].forEach((id) => {
      const el = document.getElementById(id); if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [unlock]);

  // Keyboard: konami + secret words + terminal shortcut
  useEffect(() => {
    const onKey = (e) => {
      // Konami
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > KONAMI.length) konamiRef.current.shift();
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        unlock('konami');
        window.dispatchEvent(new CustomEvent('dreamscape:glitch'));
      }

      // Skip capture when typing in inputs
      const tag = (e.target && e.target.tagName) || '';
      if (['INPUT', 'TEXTAREA'].includes(tag)) return;

      // Secret word typing buffer
      if (e.key.length === 1) {
        typedRef.current = (typedRef.current + e.key).slice(-20).toLowerCase();
        if (typedRef.current.endsWith('sudo')) setTerminalOpen(true);
        if (typedRef.current.endsWith('magic')) setGameOpen(true);
        if (typedRef.current.endsWith('room')) setRoomOpen(true);
        if (typedRef.current.endsWith('help')) setTerminalOpen(true);
      }

      // Ctrl+/ toggles terminal too
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setTerminalOpen(true); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [unlock]);

  const onExplore = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navigate = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="App grain relative">
      <LoadingScreen />
      <CustomCursor />
      <ParticlesBackground />
      <GlitchOverlay />

      <NavDrifter onOpenBadges={() => setBadgesOpen(true)} onOpenPalette={() => setPaletteTrigger(p => p + 1)} />

      {/* Hidden creatures peeking */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <div className="relative w-full h-full">
          <div className="pointer-events-auto"><Creature x="3%" y="35%" delay={2} kind="moth" /></div>
          <div className="pointer-events-auto"><Creature x="94%" y="72%" delay={4} kind="fox" /></div>
          <div className="pointer-events-auto"><Creature x="88%" y="18%" delay={6} kind="flower" /></div>
        </div>
      </div>

      <Dreamscape onExplore={onExplore} />
      <About />
      <Projects />
      <SkillsGalaxy />
      <Contact />

      {/* Footer */}
      <footer className="relative px-6 md:px-16 pb-14 pt-8 text-center">
        <div className="font-hand text-lg text-[#A9BCCC]">
          hand-woven with lavender, blush and a lot of chai ✧
        </div>
        <div className="text-xs text-[#E6E6FA]/40 mt-2 terminal-font">
          Barani B — © 2026 — {unlocked.length} secrets found {devMode && '· DEV MODE'}
        </div>
      </footer>

      {/* Secret constellation after 5 min */}
      {constellationVisible && (
        <div className="fixed top-24 right-8 z-40 glass rounded-2xl p-3 text-xs text-[#FFD1DC] font-hand text-base glow-blush" data-testid="secret-constellation">
          ✧ a hidden constellation has appeared… ✧
        </div>
      )}

      <MusicToggle />

      <CommandPalette
        key={paletteTrigger} // re-instantiating doesn't harm because internal state opens via keydown
        onNavigate={navigate}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenGame={() => setGameOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
      />
      <HiddenTerminal open={terminalOpen} onOpenChange={setTerminalOpen} />
      <BadgesPanel open={badgesOpen} onOpenChange={setBadgesOpen} />
      <MiniGame open={gameOpen} onOpenChange={setGameOpen} />
      <SecretRoom open={roomOpen} onOpenChange={setRoomOpen} />

      <Toaster position="bottom-left" theme="dark" toastOptions={{
        style: { background: 'rgba(35, 25, 60, 0.75)', color: '#FDFAFC', border: '1px solid rgba(230,230,250,0.15)', backdropFilter: 'blur(20px)' }
      }} />
    </div>
  );
}

export default function App() {
  return (
    <AchievementProvider>
      <InnerApp />
    </AchievementProvider>
  );
}
