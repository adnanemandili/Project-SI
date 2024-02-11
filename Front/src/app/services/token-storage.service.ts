import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private router: Router
  ) { }

  logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/authenticate']);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
