import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private key = 'is_logged';
  private router = inject(Router);

  constructor() {
    if (localStorage.getItem(this.key) === null) {
      localStorage.setItem(this.key, JSON.stringify(false));
    }
  }

  setLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem(this.key, JSON.stringify(isLoggedIn));
  }

  getLoginStatus(): boolean {
    const status = localStorage.getItem(this.key);
    return status == 'true';
  }

  isLoggedIn(): boolean {
    return this.getLoginStatus();
  }

  logOut() {
    localStorage.setItem(this.key, JSON.stringify(false));
    this.router.navigate(["/home"]);
  }
}
