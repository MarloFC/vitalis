import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      state.goals.push(action.payload);
    },
    updateGoal: (state, action: PayloadAction<Goal>) => {
      const index = state.goals.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
    },
    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; progress: number }>) => {
      const goal = state.goals.find(g => g.id === action.payload.goalId);
      if (goal) {
        goal.currentProgress = action.payload.progress;
      }
    },
    toggleGoalActive: (state, action: PayloadAction<string>) => {
      const goal = state.goals.find(g => g.id === action.payload);
      if (goal) {
        goal.isActive = !goal.isActive;
      }
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(g => g.id !== action.payload);
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
  addGoal,
  updateGoal,
  updateGoalProgress,
  toggleGoalActive,
  removeGoal,
  setLoading,
  setError,
} = goalsSlice.actions;

export default goalsSlice.reducer;
