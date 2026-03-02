import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string) {
    document.cookie = `access_token=${token}; Path=/; Secure; SameSite=Strict`;
  }

  getToken():string | null {
    const name = 'access_token';
    const decodedCookie=decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(name) === 0){
        return c.substring(name.length, c.length);
      }
    }
    
    return null;
  }

  logout() {
    document.cookie = `access_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }

}
