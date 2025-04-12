// User related types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// Component Props types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Auth related types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
} 