import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExerciseContent, WeeklyChallenge } from '../../types';

interface ContentState {
  exercises: ExerciseContent[];
  weeklyChallenges: WeeklyChallenge[];
  currentChallenge: WeeklyChallenge | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  exercises: [],
  weeklyChallenges: [],
  currentChallenge: null,
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<ExerciseContent[]>) => {
      state.exercises = action.payload;
    },
    addExercise: (state, action: PayloadAction<ExerciseContent>) => {
      state.exercises.push(action.payload);
    },
    setWeeklyChallenges: (state, action: PayloadAction<WeeklyChallenge[]>) => {
      state.weeklyChallenges = action.payload;
    },
    setCurrentChallenge: (state, action: PayloadAction<WeeklyChallenge | null>) => {
      state.currentChallenge = action.payload;
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
  setExercises,
  addExercise,
  setWeeklyChallenges,
  setCurrentChallenge,
  setLoading,
  setError,
} = contentSlice.actions;

export default contentSlice.reducer;
