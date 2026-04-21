import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Используй эти хуки вместо обычных useDispatch и useSelector
// Они уже типизированы для твоего приложения

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T) => useSelector(selector);