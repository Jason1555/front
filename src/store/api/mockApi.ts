import type { Festival, Club, Application, User } from '../../types';

// Моковые пользователи
export const mockUsers: Record<string, User> = {
  'org-1': {
    id: 'org-1',
    email: 'organizer@example.com',
    role: 'organizer',
    name: 'Иван Организатор',
  },
  'club-1': {
    id: 'club-1',
    email: 'club1@example.com',
    role: 'club',
    name: 'Клуб исторической реконструкции "Викинги"',
  },
  'club-2': {
    id: 'club-2',
    email: 'club2@example.com',
    role: 'club',
    name: 'Клуб "Средневековье"',
  },
};

// Моковые фестивали
export const mockFestivals: Festival[] = [
  {
    id: 'fest-1',
    name: 'Викинг Фест 2024',
    epoch: 'IX век',
    date: '2024-06-15',
    location: 'Санкт-Петербург',
    requirementsFileUrl: '/requirements/viking-fest-2024.pdf',
    organizerId: 'org-1',
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 'fest-2',
    name: 'Средневековый турнир',
    epoch: 'XII-XIII века',
    date: '2024-07-20',
    location: 'Москва',
    requirementsFileUrl: '/requirements/medieval-tournament-2024.pdf',
    organizerId: 'org-1',
    createdAt: '2024-02-01',
    status: 'active',
  },
  {
    id: 'fest-3',
    name: 'Древний Рим',
    epoch: 'I-II века н.э.',
    date: '2024-08-10',
    location: 'Крым',
    requirementsFileUrl: '/requirements/ancient-rome-2024.pdf',
    organizerId: 'org-1',
    createdAt: '2024-02-20',
    status: 'draft',
  },
];

// Моковые клубы
export const mockClubs: Club[] = [
  {
    id: 'club-1',
    name: 'Клуб исторической реконструкции "Викинги"',
    logo: 'https://via.placeholder.com/150?text=Vikings',
    description: 'Клуб специализируется на реконструкции викингской культуры и быта',
    phone: '+7 (999) 123-45-67',
    email: 'club1@example.com',
    website: 'https://vikings-club.ru',
    socialLinks: {
      vk: 'https://vk.com/vikings-club',
      instagram: 'https://instagram.com/vikings-club',
    },
    photos: [
      'https://via.placeholder.com/300?text=Viking+1',
      'https://via.placeholder.com/300?text=Viking+2',
    ],
    pastFestivals: ['fest-1'],
    userId: 'club-1',
  },
  {
    id: 'club-2',
    name: 'Клуб "Средневековье"',
    logo: 'https://via.placeholder.com/150?text=Medieval',
    description: 'Реконструкция средневековой жизни и военного дела',
    phone: '+7 (999) 234-56-78',
    email: 'club2@example.com',
    website: 'https://medieval-club.ru',
    socialLinks: {
      vk: 'https://vk.com/medieval-club',
    },
    photos: [
      'https://via.placeholder.com/300?text=Medieval+1',
      'https://via.placeholder.com/300?text=Medieval+2',
    ],
    pastFestivals: [],
    userId: 'club-2',
  },
];

// Моковые заявки
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    festivalId: 'fest-1',
    clubId: 'club-1',
    status: 'approved',
    documents: [
      {
        id: 'doc-1',
        name: 'Описание костюмов',
        type: 'text',
        url: 'Наши костюмы изготовлены по историческим источникам...',
        uploadedAt: '2024-03-01',
      },
      {
        id: 'doc-2',
        name: 'Фото костюмов',
        type: 'photo',
        url: 'https://via.placeholder.com/400?text=Costume+Photo',
        uploadedAt: '2024-03-01',
      },
    ],
    description: 'Клуб "Викинги" готов участвовать в фестивале с полной экипировкой',
    submittedAt: '2024-03-01',
    reviewedAt: '2024-03-05',
    reviewerNotes: 'Отличная подготовка, одобрено',
  },
  {
    id: 'app-2',
    festivalId: 'fest-1',
    clubId: 'club-2',
    status: 'pending',
    documents: [
      {
        id: 'doc-3',
        name: 'Описание участия',
        type: 'text',
        url: 'Мы хотим участвовать с демонстрацией средневекового боя...',
        uploadedAt: '2024-03-10',
      },
    ],
    description: 'Запрос на участие в Викинг Фесте',
    submittedAt: '2024-03-10',
  },
  {
    id: 'app-3',
    festivalId: 'fest-2',
    clubId: 'club-2',
    status: 'rejected',
    documents: [],
    description: 'Заявка на средневековый турнир',
    submittedAt: '2024-03-15',
    reviewedAt: '2024-03-17',
    reviewerNotes: 'Не соответствуют требованиям по экипировке',
  },
];

// Функции для имитации API запросов
export const mockApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Auth
  login: async (email: string, _password: string) => {
    await mockApiDelay();
    const user = Object.values(mockUsers).find((u) => u.email === email);
    if (user) {
      return {
        user,
        token: `mock-jwt-token-${user.id}`,
      };
    }
    throw new Error('Неверные учетные данные');
  },

  register: async (email: string, name: string, role: 'organizer' | 'club') => {
    await mockApiDelay();
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
    };
    return {
      user: newUser,
      token: `mock-jwt-token-${newUser.id}`,
    };
  },

  // Festivals
  getFestivals: async () => {
    await mockApiDelay();
    return mockFestivals;
  },

  getFestivalById: async (id: string) => {
    await mockApiDelay();
    return mockFestivals.find((f) => f.id === id);
  },

  createFestival: async (festival: Omit<Festival, 'id' | 'createdAt'>) => {
    await mockApiDelay();
    const newFestival: Festival = {
      ...festival,
      id: `fest-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockFestivals.push(newFestival);
    return newFestival;
  },

  // Clubs
  getClubs: async () => {
    await mockApiDelay();
    return mockClubs;
  },

  getClubById: async (id: string) => {
    await mockApiDelay();
    return mockClubs.find((c) => c.id === id);
  },

  updateClub: async (id: string, updates: Partial<Club>) => {
    await mockApiDelay();
    const newClubs = [...mockClubs]; // Копия массива
    const index = newClubs.findIndex((c) => c.id === id);
    
    if (index !== -1) {
      newClubs[index] = { ...newClubs[index], ...updates };
      // Обновляем оригинал
      mockClubs.splice(0, mockClubs.length, ...newClubs);
      return newClubs[index];
    }
    throw new Error('Клуб не найден');
  },

  // Applications
  getApplications: async (filters?: { festivalId?: string; clubId?: string; status?: string }) => {
    await mockApiDelay();
    let result = [...mockApplications];
    if (filters?.festivalId) {
      result = result.filter((a) => a.festivalId === filters.festivalId);
    }
    if (filters?.clubId) {
      result = result.filter((a) => a.clubId === filters.clubId);
    }
    if (filters?.status) {
      result = result.filter((a) => a.status === filters.status);
    }
    return result;
  },

  getApplicationById: async (id: string) => {
    await mockApiDelay();
    return mockApplications.find((a) => a.id === id);
  },

  createApplication: async (application: Omit<Application, 'id' | 'submittedAt'>) => {
    await mockApiDelay();
    const newApp: Application = {
      ...application,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    mockApplications.push(newApp);
    return newApp;
  },

  updateApplicationStatus: async (
    id: string,
    status: 'approved' | 'rejected',
    reviewerNotes?: string
  ) => {
    await mockApiDelay();
    const app = mockApplications.find((a) => a.id === id);
    if (app) {
      app.status = status;
      app.reviewedAt = new Date().toISOString();
      if (reviewerNotes) app.reviewerNotes = reviewerNotes;
      return app;
    }
    throw new Error('Заявка не найдена');
  },
};