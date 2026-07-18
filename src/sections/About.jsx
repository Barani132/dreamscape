// React import not required with new JSX transform
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Sparkles, MapPin, Languages, Coffee } from 'lucide-react';

const CARDS = [
  {
    icon: GraduationCap,
    title: 'Education',
    body: "BCA at Government First Grade College, KR Puram, Bengaluru. Graduating 2026 with a CGPA of 8.9 — turning textbooks into little worlds.",
    tint: '#E6E6FA', span: 'md:col-span-5 md:row-span-2',
  },
  {
    icon: MapPin, title: 'Rooted in', body: 'Bengaluru, Karnataka — a garden city that quietly hums with code.',
    tint: '#FFD1DC', span: 'md:col-span-3',
  },
  {
    icon: Languages, title: 'Speaks', body: 'English • Kannada • Telugu • Tamil • Hindi',
    tint: '#A8E6CF', span: 'md:col-span-4',
  },
  {
    icon: Heart, title: 'What I love',
    body: "Building things that feel warm. Problems that look like puzzles. Interfaces that make people smile.",
    tint: '#FFD1DC', span: 'md:col-span-4',
  },
  {
    icon: Sparkles, title: 'Currently',
    body: 'Exploring Android, Firebase and full-stack web. Learning slowly, on purpose.',
    tint: '#A9BCCC', span: 'md:col-span-4',
  },
  {
    icon: Coffee, title: 'Off screen',
    body: 'Chai, sketchbooks, and long walks that untangle bugs better than any debugger.',
    tint: '#A8E6CF', span: 'md:col-span-4',
  },
];

export default function About() {
  return (
    <section id="about" data-testid="section-about" className="relative px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <div className="font-hand text-2xl text-[#FFD1DC] mb-2">a little about me</div>
          <h2 className="font-display text-5xl md:text-6xl text-[#FDFAFC] text-glow">Fragments of a maker.</h2>
          <p className="mt-4 text-[#E6E6FA]/70 md:text-lg">Hover the panels — some of them whisper back.</p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-5 md:auto-rows-[190px]">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                data-testid={`about-card-${i}`}
                className={`glass rounded-3xl p-7 relative overflow-hidden group cursor-hover ${c.span || 'md:col-span-4'}`}
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 transition"
                  style={{ background: `radial-gradient(circle, ${c.tint}, transparent 70%)`, filter: 'blur(30px)' }} />
                <Icon size={22} style={{ color: c.tint, filter: `drop-shadow(0 0 10px ${c.tint})` }} />
                <div className="mt-4 font-display text-2xl text-[#FDFAFC]">{c.title}</div>
                <p className="mt-2 text-sm md:text-base text-[#E6E6FA]/75 leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
