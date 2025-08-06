import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import activitiesReducer from './slices/activitiesSlice';
import goalsReducer from './slices/goalsSlice';
import achievementsReducer from './slices/achievementsSlice';
import contentReducer from './slices/contentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    activities: activitiesReducer,
    goals: goalsReducer,
    achievements: achievementsReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
