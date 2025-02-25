export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}