import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import festivalsReducer from './slices/festivalsSlice';
import clubsReducer from './slices/clubsSlice';
import applicationsReducer from './slices/applicationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    festivals: festivalsReducer,
    clubs: clubsReducer,
    applications: applicationsReducer,
  },
});

// Типы для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;