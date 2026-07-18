export const BADGES = {
  arrival: { id: 'arrival', name: 'Dreamwalker', icon: '✦', desc: 'Entered the Dreamscape' },
  explorer: { id: 'explorer', name: 'Constellation Reader', icon: '✧', desc: 'Visited all sections' },
  starGazer: { id: 'starGazer', name: 'Star Gazer', icon: '★', desc: 'Clicked a hidden star' },
  konami: { id: 'konami', name: 'Ancient Sequence', icon: '⌘', desc: 'Whispered the ancient code' },
  terminal: { id: 'terminal', name: 'Whisperer', icon: '❋', desc: 'Discovered the terminal' },
  paletteOpener: { id: 'paletteOpener', name: 'Portal Keeper', icon: '◈', desc: 'Opened the command palette' },
  puzzleSolver: { id: 'puzzleSolver', name: 'Constellation Weaver', icon: '❈', desc: 'Solved the star puzzle' },
  guestbook: { id: 'guestbook', name: 'Note Leaver', icon: '❀', desc: 'Left a note in the guestbook' },
  patient: { id: 'patient', name: 'Patient Wanderer', icon: '☾', desc: 'Stayed for 3 minutes' },
  glitch: { id: 'glitch', name: 'Reality Bender', icon: '⚡', desc: 'Survived the glitch' },
  devMode: { id: 'devMode', name: 'Behind the Veil', icon: '⚙', desc: 'Unlocked developer mode' },
  creature: { id: 'creature', name: 'Creature Whisperer', icon: '❁', desc: 'Found a hidden creature' },
};

export const ALL_BADGES = Object.values(BADGES);

export function getVisitorId() {
  let id = localStorage.getItem('dreamscape_visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
    localStorage.setItem('dreamscape_visitor_id', id);
  }
  return id;
}
