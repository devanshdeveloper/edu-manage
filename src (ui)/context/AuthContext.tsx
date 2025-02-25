import React, { createContext, useContext, useState } from 'react';
import type { User, AuthState, LoginCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Implement actual login logic
      // For now, using mock data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        role: 'ADMIN',
      };
      const mockToken = 'mock-token';
      
      setState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials',
      }));
    }
  };

  const logout = () => {
    setState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}