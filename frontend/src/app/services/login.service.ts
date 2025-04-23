import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private key = "is_logged";

  constructor() {
    if (localStorage.getItem(this.key) === null) {
      localStorage.setItem(this.key, JSON.stringify(false));
    }
  }

  logOut(){
    localStorage.setItem(this.key, JSON.stringify(false));
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
}
