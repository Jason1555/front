import { STORAGE_KEYS } from './constants';

/**
 * Управление JWT токенами в localStorage
 */
export const tokenManager = {
  /**
   * Сохранить токен
   */
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  /**
   * Получить токен
   */
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  /**
   * Удалить токен
   */
  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  /**
   * Проверить наличие токена
   */
  hasToken: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  /**
   * Сохранить пользователя
   */
  setUser: (user: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Получить пользователя
   */
  getUser: (): any => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Удалить пользователя
   */
  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  /**
   * Очистить всё (выход)
   */
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  /**
   * Получить заголовок Authorization для запросов
   */
  getAuthHeader: (): Record<string, string> => {
    const token = tokenManager.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};