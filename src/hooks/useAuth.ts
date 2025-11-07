import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { LoginCredentials, User } from '../types/auth';
import { setTokens, clearTokens, setStoredUser, clearStoredUser, getStoredUser, getAccessToken } from '../utils/token';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        try {
          // Verify token is still valid
          const userProfile = await authApi.getProfile();
          setUser(userProfile);
          setStoredUser(userProfile);
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authApi.login(credentials);
      
      setTokens(response.tokens.access, response.tokens.refresh);
      setUser(response.user);
      setStoredUser(response.user);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      clearStoredUser();
      setUser(null);
    }
  }, []);

  const hasPermission = useCallback((requiredRole: string, allowedPages?: string[]): boolean => {
    if (!user) return false;
    
    if (user.role === 'superadmin') return true;
    if (user.role === requiredRole) {
      return true;
    }
    
    return false;
  }, [user]);

  return {
    user,
    isLoading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
  };
};