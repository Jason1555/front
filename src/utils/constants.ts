// API endpoints (когда будет реальный backend)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Роли пользователей
export const USER_ROLES = {
  ORGANIZER: 'organizer',
  CLUB: 'club',
} as const;

// Статусы фестивалей
export const FESTIVAL_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

// Статусы заявок
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Типы документов в заявке
export const DOCUMENT_TYPES = {
  DOCUMENT: 'document',
  PHOTO: 'photo',
  TEXT: 'text',
} as const;

// Ключи localStorage
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  REFRESH_TOKEN: 'refresh_token',
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Требуется авторизация',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND: 'Не найдено',
  SERVER_ERROR: 'Ошибка сервера',
  NETWORK_ERROR: 'Ошибка сети',
  INVALID_CREDENTIALS: 'Неверные учетные данные',
} as const;

// Сообщения об успехе
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Успешно вошли в систему',
  REGISTER_SUCCESS: 'Аккаунт успешно создан',
  FESTIVAL_CREATED: 'Фестиваль успешно создан',
  APPLICATION_SUBMITTED: 'Заявка успешно отправлена',
  APPLICATION_APPROVED: 'Заявка одобрена',
  APPLICATION_REJECTED: 'Заявка отклонена',
} as const;