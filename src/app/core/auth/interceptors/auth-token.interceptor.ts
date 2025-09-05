import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, filter, switchMap, take, throwError, BehaviorSubject } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.token();
  const tokenType = authService.type();

  let authReq = req;

  if (token && tokenType) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `${tokenType} ${token}`),
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService);
      }

      return throwError(() => error);
    })
  );
};

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((success) => {
        isRefreshing = false;

        if (!success) {
          authService.logout();
          return throwError(() => new Error('Refresh token failed'));
        }

        const newToken = authService.token();
        const newType = authService.type();

        refreshTokenSubject.next(newToken);

        const newRequest = request.clone({
          headers: request.headers.set('Authorization', `${newType} ${newToken}`),
        });

        return next(newRequest);
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    // Si ya hay una renovación en progreso, espera el nuevo token
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        const tokenType = authService.type();

        const newRequest = request.clone({
          headers: request.headers.set('Authorization', `${tokenType} ${token}`),
        });

        return next(newRequest);
      })
    );
  }
}
