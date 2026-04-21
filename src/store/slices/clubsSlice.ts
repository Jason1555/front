import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ClubsState, Club } from '../../types';

const initialState: ClubsState = {
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,
};

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    // Начало загрузки
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Получение списка клубов
    fetchSuccess: (state, action: PayloadAction<Club[]>) => {
      state.isLoading = false;
      state.clubs = action.payload;
      state.error = null;
    },

    // Получение одного клуба
    fetchClubSuccess: (state, action: PayloadAction<Club>) => {
      state.isLoading = false;
      state.currentClub = action.payload;
      state.error = null;
    },

    // Ошибка загрузки
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Обновление клуба
    updateSuccess: (state, action: PayloadAction<Club>) => {
      const index = state.clubs.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.clubs[index] = action.payload;
      }
      state.currentClub = action.payload;
    },

    // Очистить текущий клуб
    clearCurrent: (state) => {
      state.currentClub = null;
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
  fetchClubSuccess,
  fetchFailure,
  updateSuccess,
  clearCurrent,
  clearError,
} = clubsSlice.actions;
export default clubsSlice.reducer;