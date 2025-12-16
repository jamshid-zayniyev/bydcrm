import { LoginCredentials, AuthResponse, User } from "../types/auth";
import { API_BASE_URL } from "./axios";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Login failed: ${response.status}`);
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/users/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error("Logout API call failed:", error);
      }
    }
  },

  refreshTokens: async (refreshToken: string): Promise<{ access: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return response.json();
  },

  getProfile: async (): Promise<User> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token");
    }

    const response = await fetch(`${API_BASE_URL}/users/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get profile");
    }

    return response.json();
  },
};
