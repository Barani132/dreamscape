import { useEffect, useState } from 'react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';
import { Home, User, Sparkles, Star, Mail, Github, Linkedin, Terminal, Gamepad2, Award, Download } from 'lucide-react';
import { useAchievements } from '../context/useAchievements';

export default function CommandPalette({ onNavigate, onOpenTerminal, onOpenGame, onOpenBadges }) {
  const [open, setOpen] = useState(false);
  const { unlock, setDevMode, devMode } = useAchievements();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => { if (!o) unlock('paletteOpener'); return !o; });
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [unlock]);

  const run = (fn) => { setOpen(false); setTimeout(fn, 100); };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="What are you searching for in the dreamscape?" data-testid="command-input" />
      <CommandList>
        <CommandEmpty>Nothing found in this constellation…</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => onNavigate('home'))}><Home className="mr-2 h-4 w-4" /> Dreamscape (Home)</CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('about'))}><User className="mr-2 h-4 w-4" /> About Me</CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('projects'))}><Sparkles className="mr-2 h-4 w-4" /> Projects</CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('skills'))}><Star className="mr-2 h-4 w-4" /> Skills Galaxy</CommandItem>
          <CommandItem onSelect={() => run(() => onNavigate('contact'))}><Mail className="mr-2 h-4 w-4" /> Contact</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Secrets">
          <CommandItem onSelect={() => run(onOpenTerminal)}><Terminal className="mr-2 h-4 w-4" /> Hidden Terminal</CommandItem>
          <CommandItem onSelect={() => run(onOpenGame)}><Gamepad2 className="mr-2 h-4 w-4" /> Constellation Puzzle</CommandItem>
          <CommandItem onSelect={() => run(onOpenBadges)}><Award className="mr-2 h-4 w-4" /> Achievements</CommandItem>
          <CommandItem onSelect={() => run(() => { setDevMode(!devMode); unlock('devMode'); })}>
            <Terminal className="mr-2 h-4 w-4" /> Toggle Dev Mode {devMode ? '(ON)' : ''}
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => run(() => window.open('https://github.com', '_blank'))}><Github className="mr-2 h-4 w-4" /> GitHub</CommandItem>
          <CommandItem onSelect={() => run(() => window.open('https://linkedin.com', '_blank'))}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</CommandItem>
          <CommandItem onSelect={() => run(() => window.open('https://customer-assets-gfyr7b9c.emergentagent.net/job_36362e68-a496-4d3f-b087-9e17817888ab/artifacts/072z4gsu_Barani.pdf', '_blank'))}>
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
