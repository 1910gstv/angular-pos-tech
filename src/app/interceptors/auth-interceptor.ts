import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicRoutes = ['/auth/api/Auth/login', '/auth/api/Auth/register'];

  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && !publicRoutes.some(url => req.url.includes(url))) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
