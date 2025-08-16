'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import authService from '../services/auth.service';
import type { User, AuthState } from '../types/api.types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      
      setAuthState({
        isAuthenticated: !!token && !!user,
        user,
        token,
      });
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.access_token,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const user = await authService.refreshProfile();
      setAuthState(prev => ({
        ...prev,
        user,
      }));
    } catch (error) {
      // If refresh fails, logout the user
      logout();
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshProfile,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
