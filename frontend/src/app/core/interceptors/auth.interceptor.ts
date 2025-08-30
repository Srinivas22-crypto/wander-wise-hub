import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Add auth token to request if available
  const token = localStorage.getItem('authToken');
  if (token && !req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Don't handle auth errors if backend is down (502, 503, 504)
      if (error.status === 502 || error.status === 503 || error.status === 504) {
        console.warn('Backend service unavailable:', error.status);
        return throwError(() => error);
      }

      if (error.status === 401) {
        // Token expired or invalid
        if (req.url.includes('/auth/refresh')) {
          // Refresh token also failed, logout user
          authService.logout();
          return throwError(() => error);
        }

        // Try to refresh token
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retry original request with new token
            const newToken = localStorage.getItem('authToken');
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newReq);
          }),
          catchError(() => {
            // Refresh failed, logout user
            authService.logout();
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
