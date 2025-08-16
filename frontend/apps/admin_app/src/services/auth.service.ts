import apiClient from '../lib/api-client';
import type { LoginRequest, LoginResponse, User } from '../types/api.types';

class AuthService {
  // Login method
  public async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Store token and user data
      if (response.data.access_token) {
        apiClient.setToken(response.data.access_token);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      // Clear any existing auth data on login failure
      this.logout();
      throw error;
    }
  }

  // Logout method
  public logout(): void {
    apiClient.clearToken();
    this.clearUser();
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Get current user
  public getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Set user data
  private setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  // Clear user data
  private clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_user');
  }

  // Get user token
  public getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // Refresh user profile (for when user data might have changed)
  public async refreshProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    this.setUser(response.data);
    return response.data;
  }

  // Verify token validity
  public async verifyToken(): Promise<boolean> {
    try {
      await apiClient.get('/auth/verify');
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
