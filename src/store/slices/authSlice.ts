import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';
import { tokenManager } from '../../utils/tokenManager';

const initialState: AuthState = {
  user: tokenManager.getUser(),
  token: tokenManager.getToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Начало загрузки
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Успешный вход
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      // Сохранить в localStorage
      tokenManager.setToken(action.payload.token);
      tokenManager.setUser(action.payload.user);
    },

    // Ошибка входа
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Регистрация
    registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      tokenManager.setToken(action.payload.token);
      tokenManager.setUser(action.payload.user);
    },

    // Выход
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      tokenManager.clear();
    },

    // Очистить ошибку
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, registerSuccess, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;