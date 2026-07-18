import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BADGES, getVisitorId } from '../lib/badges';

import { AchievementCtx } from './achievementCtx';

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export function AchievementProvider({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dreamscape_badges') || '[]'); }
    catch { return []; }
  });
  const [devMode, setDevMode] = useState(false);
  const visitorId = getVisitorId();

  useEffect(() => {
    localStorage.setItem('dreamscape_badges', JSON.stringify(unlocked));
  }, [unlocked]);

  const unlock = useCallback((badgeId) => {
    if (unlocked.includes(badgeId)) return;
    const badge = BADGES[badgeId];
    if (!badge) return;
    setUnlocked((prev) => [...prev, badgeId]);
    toast.success(`${badge.icon}  ${badge.name}`, {
      description: badge.desc,
      duration: 4000,
      className: 'glass-strong',
    });
    axios.post(`${API}/badges`, { visitor_id: visitorId, badge_id: badgeId }).catch(() => {});
  }, [unlocked, visitorId]);

  return (
    <AchievementCtx.Provider value={{ unlocked, unlock, devMode, setDevMode, visitorId }}>
      {children}
    </AchievementCtx.Provider>
  );
}

// `useAchievements` moved to ./useAchievements to avoid mixing non-component exports in this file
