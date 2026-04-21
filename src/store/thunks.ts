import { type AppDispatch } from './store';
import {
  fetchStart as festivalsFetchStart,
  fetchSuccess as festivalsFetchSuccess,
  fetchFailure as festivalsFetchFailure,
} from './slices/festivalsSlice';
import {
  fetchStart as clubsFetchStart,
  fetchSuccess as clubsFetchSuccess,
  fetchFailure as clubsFetchFailure,
} from './slices/clubsSlice';
import { mockApi } from './api/mockApi';

/**
 * Загрузить все фестивали
 */
export const loadFestivals = () => async (dispatch: AppDispatch) => {
  dispatch(festivalsFetchStart());
  try {
    const data = await mockApi.getFestivals();
    dispatch(festivalsFetchSuccess(data));
  } catch (err) {
    dispatch(festivalsFetchFailure(err instanceof Error ? err.message : 'Ошибка загрузки'));
  }
};

/**
 * Загрузить все клубы
 */
export const loadClubs = () => async (dispatch: AppDispatch) => {
  dispatch(clubsFetchStart());
  try {
    const data = await mockApi.getClubs();
    dispatch(clubsFetchSuccess(data));
  } catch (err) {
    dispatch(clubsFetchFailure(err instanceof Error ? err.message : 'Ошибка загрузки'));
  }
};