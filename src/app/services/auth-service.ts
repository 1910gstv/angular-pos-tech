import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string) {
    document.cookie = `access_token=${token}; Path=/; Secure; SameSite=Strict`;
  }

  setUserInfo(info: any) {
    Object.entries(info).forEach(([key, value]) => {
      if (key.includes('token')) {
        return;
      }
      document.cookie = `${key}=${value}; Path=/; Secure; SameSite=Strict`;
    });
  }

  getToken(): string | null {
    const name = 'access_token';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return null;
  }

  getUserInfo(): Record<string, string> {
    const cookies: Record<string, string> = {};

    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = decodeURIComponent(value);
    });

    return cookies;
  }

  getUserFromToken(): any {
  const token = this.getToken();

  if (!token) return null;

  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));

  return decoded;
}

  logout() {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
