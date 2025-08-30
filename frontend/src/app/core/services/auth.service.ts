import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
  bio?: string;
  profileImage?: string;
  avatar?: string;
  role?: string;
  preferences?: {
    language?: string;
    currency?: string;
    bio?: string;
    location?: string;
    website?: string;
    newsletter?: boolean;
    darkMode?: boolean;
    notifications?: {
      email?: boolean;
      push?: boolean;
      marketing?: boolean;
    };
  };
  isVerified?: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    console.log('Initializing auth - Token:', token);
    console.log('Initializing auth - User:', user);
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        this.currentUserSubject.next(parsedUser);
        this.isAuthenticatedSubject.next(true);
        console.log('Auth initialized successfully with user:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    } else {
      console.log('No auth data found in localStorage');
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.apiService.post<any>('/auth/login', credentials).pipe(
      tap(response => {
        this.setAuthData(response);
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.apiService.post<any>('/auth/register', userData).pipe(
      tap(response => {
        this.setAuthData(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/signin']);
  }

  private setAuthData(response: any): void {
    console.log('Auth Response:', response);
    
    // Handle different possible response structures
    let token: string | null = null;
    let userData: any = null;
    
    // Check for token in various locations
    if (response.data?.token) {
      token = response.data.token;
      userData = response.data.data || response.data.user || response.data;
    } else if (response.token) {
      token = response.token;
      userData = response.data || response.user || response;
    }
    
    console.log('Extracted token:', token);
    console.log('Extracted userData:', userData);
    
    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token saved to localStorage');
    } else {
      console.error('No token found in response');
    }
    
    if (userData && userData._id) {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);
      this.isAuthenticatedSubject.next(true);
      console.log('User data saved and state updated');
    } else {
      console.error('No valid user data found in response');
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.apiService.put<User>('/auth/profile', userData).pipe(
      map(response => response.data),
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/refresh', {}).pipe(
      map(response => response.data),
      tap(authData => {
        localStorage.setItem('authToken', authData.token);
      })
    );
  }
}
