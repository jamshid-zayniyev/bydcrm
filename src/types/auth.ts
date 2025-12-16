export interface User {
  id: number;
  role: "sa" | "s" | "m" | "cc" | "t";
  full_name: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  id: number;
  role: "s" | "e";
  full_name: string;
}
