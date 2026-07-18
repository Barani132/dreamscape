import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TRACK_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Uniq%20-%20Art%20Of%20Silence%20V2.ogg';

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.22;
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { try { await a.play(); setPlaying(true); } catch { setPlaying(false); } }
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK_URL} loop preload="none" playsInline />
      <button
        data-testid="music-toggle"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 glass w-12 h-12 rounded-full flex items-center justify-center hover:glow-lavender transition-all group"
        aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
      >
        {playing
          ? <Volume2 size={18} className="text-[#E6E6FA] group-hover:text-[#FFD1DC] transition" />
          : <VolumeX size={18} className="text-[#A9BCCC] group-hover:text-[#FFD1DC] transition" />
        }
      </button>
    </>
  );
}
