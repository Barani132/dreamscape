// React import not required with new JSX transform
import { motion } from 'framer-motion';
import { Shield, BookOpen, Feather, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    icon: Shield,
    title: 'Child & Women Safety App',
    tag: 'Android • Java • Firebase',
    body: 'A pocket guardian. SOS with live location, silent siren, voice-triggered alerts, fake calls, and encrypted emergency contacts.',
    highlights: ['SOS + Live GPS + SMS', 'Firebase Firestore', 'Voice SOS & fake calls'],
    tilt: -2, tint: '#FFD1DC',
  },
  {
    icon: BookOpen,
    title: 'LastStop — Notes Sharing',
    tag: 'HTML • CSS • JS • SQL • REST',
    body: 'A cozy library for students. Upload notes, drop question papers, discover the exact page you needed the night before an exam.',
    highlights: ['Responsive UI', 'REST APIs', 'Cloud file management'],
    tilt: 1.5, tint: '#A8E6CF',
  },
  {
    icon: Feather,
    title: 'Something new is forming…',
    tag: 'coming soon',
    body: 'A small idea waking up. Come back later — you might catch it opening its eyes.',
    highlights: ['✧', '✧', '✧'],
    tilt: -1, tint: '#E6E6FA', ghost: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" data-testid="section-projects" className="relative px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="mb-20 max-w-2xl"
        >
          <div className="font-hand text-2xl text-[#A8E6CF] mb-2">little worlds i've built</div>
          <h2 className="font-display text-5xl md:text-6xl text-[#FDFAFC] text-glow">Floating islands.</h2>
          <p className="mt-4 text-[#E6E6FA]/70 md:text-lg">Each project is its own tiny country. Hover to peek closer.</p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((p, i) => {
            const Icon = p.icon;
            const left = i % 2 === 0;
            return (
              <motion.article key={p.title}
                initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9 }}
                whileHover={{ y: -8 }}
                data-testid={`project-card-${i}`}
                className={`glass rounded-[2rem] p-8 md:p-10 grid md:grid-cols-12 gap-8 items-center relative overflow-hidden max-w-4xl ${left ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'} ${p.ghost ? 'opacity-70 border-dashed' : ''}`}
                style={{ transform: `rotate(${p.tilt}deg)` }}
              >
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-25 drift-slow"
                  style={{ background: `radial-gradient(circle, ${p.tint}, transparent 70%)`, filter: 'blur(50px)' }} />

                <div className="md:col-span-4 flex flex-col items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center"
                    style={{ boxShadow: `0 0 30px ${p.tint}55` }}>
                    <Icon size={28} style={{ color: p.tint, filter: `drop-shadow(0 0 8px ${p.tint})` }} />
                  </div>
                  <div className="font-hand text-lg text-[#FFD1DC]">island #{i + 1}</div>
                </div>

                <div className="md:col-span-8">
                  <div className="text-xs tracking-widest uppercase text-[#A9BCCC] mb-2">{p.tag}</div>
                  <h3 className="font-display text-3xl md:text-4xl text-[#FDFAFC]">{p.title}</h3>
                  <p className="mt-3 text-[#E6E6FA]/75 leading-relaxed">{p.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="text-xs px-3 py-1 rounded-full glass text-[#E6E6FA]/80">{h}</li>
                    ))}
                  </ul>
                  {!p.ghost && (
                    <div className="mt-5 inline-flex items-center gap-1 text-sm text-[#FFD1DC] font-hand text-lg">
                      explore more <ArrowUpRight size={14} />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
