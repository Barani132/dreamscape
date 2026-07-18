import { useContext } from 'react';
import { AchievementCtx } from './achievementCtx';

export const useAchievements = () => useContext(AchievementCtx);
