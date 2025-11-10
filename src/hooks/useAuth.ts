import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { LoginCredentials, User } from '../types/auth';
import { 
  setTokens, 
  clearTokens, 
  setStoredUser, 
  clearStoredUser, 
  getStoredUser, 
  getAccessToken,
  getRefreshToken,
  isTokenValid 
} from '../utils/token';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAccessToken();
        const refreshToken = getRefreshToken();
        const storedUser = getStoredUser();

        console.log('Auth init:', { token, hasUser: !!storedUser });

        if (token && storedUser) {
          if (isTokenValid(token)) {
            // Token valid, user ni set qilamiz
            setUser(storedUser);
            console.log('User restored from storage');
          } else if (refreshToken && isTokenValid(refreshToken)) {
            // Access token expired, lekin refresh token valid
            try {
              console.log('Refreshing token...');
              const response = await authApi.refreshTokens(refreshToken);
              setTokens(response.access, refreshToken);
              
              // Yangi token bilan profile olamiz
              const userProfile = await authApi.getProfile();
              setUser(userProfile);
              setStoredUser(userProfile);
              console.log('Token refreshed successfully');
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              logout();
            }
          } else {
            // Ikkala token ham expired yoki invalid
            console.log('Tokens expired, logging out');
            logout();
          }
        } else {
          // Token yoki user yo'q
          console.log('No valid tokens found');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Logging in...', credentials);
      
      const response = await authApi.login(credentials);
      console.log('Login response:', response);
      
      // Tokenlarni saqlaymiz
      setTokens(response.access, response.refresh);
      
      // User ma'lumotlarini tayyorlaymiz
      const userData: User = {
        id: response.id,
        role: response.role,
        full_name: response.full_name,
        username: credentials.username
      };
      
      // User ni state va localStorage'ga saqlaymiz
      setUser(userData);
      setStoredUser(userData);
      
      console.log('Login successful, user:', userData);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Error details
      if (error.message) {
        console.error('Error message:', error.message);
      }
      if (error.response) {
        console.error('Response error:', error.response);
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      console.log('Logging out...');
      await authApi.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Har doim local storage va state ni tozalaymiz
      clearTokens();
      clearStoredUser();
      setUser(null);
      console.log('Logout completed');
    }
  }, []);

  const hasPermission = useCallback((requiredRole: string): boolean => {
    if (!user) return false;
    
    // SuperAdmin (s) hamma narsaga ruxsati bor
    if (user.role === 's') return true;
    
    // Employee (e) faqat o'zi uchun ruxsatlangan narsalarga
    if (user.role === requiredRole) return true;
    
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