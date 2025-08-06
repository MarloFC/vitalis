import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement } from '../../types';

interface AchievementsState {
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  loading: boolean;
  error: string | null;
}

const initialState: AchievementsState = {
  achievements: [],
  unlockedAchievements: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
    },
    unlockAchievement: (state, action: PayloadAction<Achievement>) => {
      const achievement = { ...action.payload, unlockedAt: new Date().toISOString() };
      state.unlockedAchievements.push(achievement);
      
      // Update the main achievements array
      const index = state.achievements.findIndex(a => a.id === achievement.id);
      if (index !== -1) {
        state.achievements[index] = achievement;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAchievements,
  unlockAchievement,
  setLoading,
  setError,
} = achievementsSlice.actions;

export default achievementsSlice.reducer;
