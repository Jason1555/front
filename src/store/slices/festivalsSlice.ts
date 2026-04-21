import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FestivalsState, Festival } from '../../types';

const initialState: FestivalsState = {
  festivals: [],
  currentFestival: null,
  isLoading: false,
  error: null,
};

const festivalsSlice = createSlice({
  name: 'festivals',
  initialState,
  reducers: {
    // Начало загрузки
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Получение списка фестивалей
    fetchSuccess: (state, action: PayloadAction<Festival[]>) => {
      state.isLoading = false;
      state.festivals = action.payload;
      state.error = null;
    },

    // Получение одного фестиваля
    fetchFestivalSuccess: (state, action: PayloadAction<Festival>) => {
      state.isLoading = false;
      state.currentFestival = action.payload;
      state.error = null;
    },

    // Ошибка загрузки
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Создание фестиваля
    createSuccess: (state, action: PayloadAction<Festival>) => {
      state.isLoading = false;
      state.festivals.push(action.payload);
      state.error = null;
    },

    // Обновление фестиваля
    updateSuccess: (state, action: PayloadAction<Festival>) => {
      const index = state.festivals.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.festivals[index] = action.payload;
      }
      state.currentFestival = action.payload;
    },

    // Очистить текущий фестиваль
    clearCurrent: (state) => {
      state.currentFestival = null;
    },

    // Очистить ошибку
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFestivalSuccess,
  fetchFailure,
  createSuccess,
  updateSuccess,
  clearCurrent,
  clearError,
} = festivalsSlice.actions;
export default festivalsSlice.reducer;