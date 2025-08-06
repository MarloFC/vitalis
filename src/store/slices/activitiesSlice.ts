import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity, ActivityType, DailyProgress } from '../../types';

interface ActivitiesState {
  activities: Activity[];
  dailyProgress: DailyProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  dailyProgress: [],
  loading: false,
  error: null,
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload);
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.activities.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    completeActivity: (state, action: PayloadAction<string>) => {
      const activity = state.activities.find(a => a.id === action.payload);
      if (activity) {
        activity.completed = true;
        activity.timestamp = new Date().toISOString();
      }
    },
    setDailyProgress: (state, action: PayloadAction<DailyProgress>) => {
      const existingIndex = state.dailyProgress.findIndex(p => p.date === action.payload.date);
      if (existingIndex !== -1) {
        state.dailyProgress[existingIndex] = action.payload;
      } else {
        state.dailyProgress.push(action.payload);
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
  addActivity,
  updateActivity,
  completeActivity,
  setDailyProgress,
  setLoading,
  setError,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
