// Пользователь и аутентификация
export interface User {
  id: string;
  email: string;
  role: 'organizer' | 'club';
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Фестиваль
export interface Festival {
  id: string;
  name: string;
  epoch: string;
  date: string;
  location: string;
  requirementsFileUrl: string;
  organizerId: string;
  createdAt: string;
  status: 'draft' | 'active' | 'completed';
}

// Клуб
export interface Club {
  id: string;
  name: string;
  logo: string;
  description?: string;
  phone: string;
  email: string;
  website?: string;
  socialLinks?: Record<string, string>;
  photos: string[];
  pastFestivals: string[];
  userId: string;
}

// Заявка на участие
export interface Application {
  id: string;
  festivalId: string;
  clubId: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: ApplicationDocument[];
  description: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: 'document' | 'photo' | 'text';
  url: string;
  uploadedAt: string;
}

// Redux состояния
export interface FestivalsState {
  festivals: Festival[];
  currentFestival: Festival | null;
  isLoading: boolean;
  error: string | null;
}

export interface ClubsState {
  clubs: Club[];
  currentClub: Club | null;
  isLoading: boolean;
  error: string | null;
}

export interface ApplicationsState {
  applications: Application[];
  currentApplication: Application | null;
  isLoading: boolean;
  error: string | null;
}