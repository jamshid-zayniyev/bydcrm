import { LoginCredentials, AuthResponse, User } from '../types/auth';

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@byd.karshi',
    name: 'Super Admin',
    role: 'superadmin',
    department: 'Management'
  },
  {
    id: '2', 
    username: 'reception',
    email: 'reception@byd.karshi',
    name: 'Reception User',
    role: 'reception',
    department: 'Reception'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000); // Simulate network delay

    // Check credentials
    if (credentials.username === 'superadmin' && credentials.password === 'admin123') {
      const user = mockUsers.find(u => u.username === 'superadmin');
      return {
        user: user!,
        tokens: {
          access: 'mock_access_token_superadmin',
          refresh: 'mock_refresh_token_superadmin'
        }
      };
    }

    if (credentials.username === 'reception' && credentials.password === 'reception123') {
      const user = mockUsers.find(u => u.username === 'reception');
      return {
        user: user!,
        tokens: {
          access: 'mock_access_token_reception', 
          refresh: 'mock_refresh_token_reception'
        }
      };
    }

    throw new Error('Invalid username or password');
  },

  logout: async (): Promise<void> => {
    await delay(300);
    // In real app, you'd call logout API
  },

  refreshTokens: async (refreshToken: string): Promise<{ tokens: { access: string; refresh: string } }> => {
    await delay(500);
    
    // Simulate token refresh
    if (refreshToken.includes('superadmin')) {
      return {
        tokens: {
          access: 'new_mock_access_token_superadmin',
          refresh: 'new_mock_refresh_token_superadmin'
        }
      };
    } else {
      return {
        tokens: {
          access: 'new_mock_access_token_reception',
          refresh: 'new_mock_refresh_token_reception'
        }
      };
    }
  },

  getProfile: async (): Promise<User> => {
    await delay(300);
    
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken?.includes('superadmin')) {
      return mockUsers[0];
    } else {
      return mockUsers[1];
    }
  },
};