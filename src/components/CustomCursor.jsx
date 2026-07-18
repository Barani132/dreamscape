import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = x + 'px'; dotRef.current.style.top = y + 'px'; }
    };
    let raf;
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      const t = e.target;
      if (t.closest && t.closest('button, a, input, textarea, [role="button"], .cursor-hover')) setHover(true);
      else setHover(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: `translate(-50%, -50%) scale(${hover ? 0.5 : 1})` }} />
      <div ref={ringRef} className="cursor-ring" style={{
        width: hover ? '70px' : '42px', height: hover ? '70px' : '42px',
        background: hover ? 'rgba(255, 209, 220, 0.08)' : 'transparent',
        borderColor: hover ? 'rgba(255, 209, 220, 0.7)' : 'rgba(230, 230, 250, 0.5)',
      }} />
    </>
  );
}
