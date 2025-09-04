import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { TokenResponse } from '../interfaces/token-response';
import { jwtDecode } from 'jwt-decode';
import { UserCreateRequest } from '../interfaces/user-request';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken = signal<string | null>(localStorage.getItem('token'));
  private _refreshToken = signal<string | null>(sessionStorage.getItem('refreshToken'));
  private _typeToken = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._typeToken()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  token = computed(this._accessToken);
  subUser = computed(() => this.decodedToken()?.sub ?? null);
  isUser = computed(() => {
    if (this.decodedToken()?.roles.includes('ROLE_USER')) {
      return true;
    }
    return false;
  });
  isAdmin = computed(() => {
    if (this.decodedToken()?.roles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  });
  isTokenExpired = computed(() => {
    const exp = this.decodedToken()?.exp;
    if (!exp) return true;
    return exp < Math.floor(Date.now() / 1000);
  });
  isAuthenticated = computed(() => {
    return !!this._accessToken() && !this.isTokenExpired();
  });

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { username, password }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  register(
    fullName: string,
    dni: string,
    username: string,
    password: string,
    roleIds: number[]
  ): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        fullName,
        dni,
        username,
        password,
        roleIds,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = sessionStorage.getItem('refresh_token');

    if (!refreshToken) {
      return of(false);
    }

    return this.http.post<AuthResponse>(`${baseUrl}/auth/refresh`, { refreshToken }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  logout() {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._typeToken.set(null);

    localStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
  }

  private handleAuthSuccess({ accessToken, refreshToken, type }: AuthResponse) {
    this._accessToken.set(accessToken);
    this._refreshToken.set(refreshToken);
    this._typeToken.set(type);

    localStorage.setItem('token', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    console.error('Error ===> ', error);
    return of(false);
  }

  private decodedToken = computed<TokenResponse | null>(() => {
    const token = this._accessToken();
    if (!token) return null;
    try {
      return jwtDecode<TokenResponse>(token);
    } catch {
      return null;
    }
  });
}
