import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApplicationsState, Application } from '../../types';

const initialState: ApplicationsState = {
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    // Начало загрузки
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Получение списка заявок
    fetchSuccess: (state, action: PayloadAction<Application[]>) => {
      state.isLoading = false;
      state.applications = action.payload;
      state.error = null;
    },

    // Получение одной заявки
    fetchApplicationSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.currentApplication = action.payload;
      state.error = null;
    },

    // Ошибка загрузки
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Создание заявки
    createSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.applications.push(action.payload);
      state.error = null;
    },

    // Обновление статуса заявки
    updateStatusSuccess: (state, action: PayloadAction<Application>) => {
      const index = state.applications.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
      state.currentApplication = action.payload;
    },

    // Очистить текущую заявку
    clearCurrent: (state) => {
      state.currentApplication = null;
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
  fetchApplicationSuccess,
  fetchFailure,
  createSuccess,
  updateStatusSuccess,
  clearCurrent,
  clearError,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;