import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Send, Mail, MapPin, Github, Linkedin, Book } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useAchievements } from '../context/useAchievements';

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [note, setNote] = useState({ author: '', note: '', mood: 'stardust' });
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const { unlock } = useAchievements();

  const loadEntries = () =>
  axios
    .get(`${API}/guestbook`)
    .then((r) => {
      setEntries(Array.isArray(r.data) ? r.data : []);
    })
    .catch(() => {
      setEntries([]);
    });
  useEffect(() => { loadEntries(); }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('✧ Your message sailed into the sky ✧', { description: 'Barani will find it soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Something got lost in the fog.', { description: 'Please try again.' });
    } finally { setLoading(false); }
  };

  const leaveNote = async (e) => {
    e.preventDefault();
    setGLoading(true);
    try {
      await axios.post(`${API}/guestbook`, note);
      toast.success('❀ A little note has been pinned', { description: 'thank you for stopping by' });
      setNote({ author: '', note: '', mood: 'stardust' });
      unlock('guestbook');
      loadEntries();
    } catch (error) {
      console.error(error);
      toast.error('The book refused your note.', { description: 'Try again in a moment.' });
    } finally { setGLoading(false); }
  };

  return (
    <section id="contact" data-testid="section-contact" className="relative px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <div className="font-hand text-2xl text-[#FFD1DC] mb-2">say hello, or leave a whisper</div>
          <h2 className="font-display text-5xl md:text-6xl text-[#FDFAFC] text-glow">The communication portal.</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Contact form */}
          <motion.form
            onSubmit={sendMessage}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-7 glass rounded-3xl p-8 md:p-10 space-y-4"
            data-testid="contact-form"
          >
            <h3 className="font-display text-2xl text-[#FDFAFC]">Send a message</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input required data-testid="contact-name" placeholder="your name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="glass-strong border-white/10 text-[#FDFAFC] placeholder:text-white/40" />
              <Input required type="email" data-testid="contact-email" placeholder="your email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="glass-strong border-white/10 text-[#FDFAFC] placeholder:text-white/40" />
            </div>
            <Textarea required rows={5} data-testid="contact-message" placeholder="whisper anything… ideas, opportunities, hellos"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="glass-strong border-white/10 text-[#FDFAFC] placeholder:text-white/40" />
            <Button type="submit" disabled={loading} data-testid="contact-submit"
              className="bg-[#FFD1DC] text-[#0B0A14] hover:bg-[#E6E6FA] rounded-full px-6">
              {loading ? 'sending…' : (<><Send size={14} className="mr-2" /> Send into the sky</>)}
            </Button>
          </motion.form>

          {/* Info + Guestbook */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-5 space-y-6"
          >
            <div className="glass rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-3 text-[#E6E6FA]/85">
                <Mail size={16} className="text-[#FFD1DC]" /> <span className="text-sm">barani.b2137@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#E6E6FA]/85">
                <MapPin size={16} className="text-[#A8E6CF]" /> <span className="text-sm">Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github" className="cursor-hover text-[#E6E6FA]/70 hover:text-[#FFD1DC] transition"><Github size={18} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin" className="cursor-hover text-[#E6E6FA]/70 hover:text-[#FFD1DC] transition"><Linkedin size={18} /></a>
                <a href="https://customer-assets-gfyr7b9c.emergentagent.net/job_36362e68-a496-4d3f-b087-9e17817888ab/artifacts/072z4gsu_Barani.pdf" target="_blank" rel="noreferrer" data-testid="link-resume" className="cursor-hover text-[#E6E6FA]/70 hover:text-[#FFD1DC] transition"><Book size={18} /></a>
              </div>
            </div>

            {/* Guestbook */}
            <form onSubmit={leaveNote} data-testid="guestbook-form" className="glass rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl text-[#FDFAFC]">The Guestbook</h4>
                <span className="font-hand text-lg text-[#FFD1DC]">
                       {Array.isArray(entries) ? entries.length : 0} notes
                </span>
              </div>
              <Input required data-testid="guestbook-author" placeholder="who's whispering?"
                value={note.author} onChange={(e) => setNote({ ...note, author: e.target.value })}
                className="glass-strong border-white/10 text-[#FDFAFC] placeholder:text-white/40" />
              <Textarea required rows={3} data-testid="guestbook-note" maxLength={280} placeholder="leave a tiny message ✧"
                value={note.note} onChange={(e) => setNote({ ...note, note: e.target.value })}
                className="glass-strong border-white/10 text-[#FDFAFC] placeholder:text-white/40" />
              <Button type="submit" disabled={gLoading} data-testid="guestbook-submit"
                className="bg-[#A8E6CF] text-[#0B0A14] hover:bg-[#E6E6FA] rounded-full px-5 text-sm">
                {gLoading ? 'pinning…' : 'Pin my note'}
              </Button>
            </form>

            {Array.isArray(entries) && entries.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2" data-testid="guestbook-entries">
                {entries.slice(0, 8).map((e) => (
                  <div key={e.id} className="glass rounded-2xl p-3">
                    <div className="text-xs text-[#FFD1DC] font-hand text-lg">{e.author}</div>
                    <div className="text-sm text-[#E6E6FA]/85">{e.note}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
