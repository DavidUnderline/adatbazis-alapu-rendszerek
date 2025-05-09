import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from './jobs.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _log = 'is_logged';
  private _role = 'role';
  private router = inject(Router);
  jobservice = inject(JobsService);

  constructor() {
    if (localStorage.getItem(this._log) === null) {
      localStorage.setItem(this._log, JSON.stringify(false));
    }
    if (localStorage.getItem(this._role) === null) {
      localStorage.setItem(this._role, JSON.stringify('allaskereso'));
    }
  }

  setLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem(this._log, JSON.stringify(isLoggedIn));
  }

  private getLoginStatus(): boolean {
    const status = localStorage.getItem(this._log);
    return status == 'true';
  }

  isLoggedIn(): boolean {
    return this.getLoginStatus();
  }

  logOut() {
    localStorage.setItem(this._log, JSON.stringify(false));
    this.setRole("allaskereso");
    this.jobservice.clearjobs();
    this.router.navigate(['/home']);
  }

  getRole(): "allaskereso" | "ceg" | "admin" {
    const role = localStorage.getItem(this._role)?.replaceAll("\"", "") as "allaskereso" | "ceg" | "admin";

    return role;
  }

  setRole(role: 'allaskereso' | 'ceg' | 'admin') {
    localStorage.setItem(this._role, role);
  }

  changeNormalRoles() {
    const role = this.getRole();
    if (role === 'allaskereso') {
      this.setRole('ceg');
    } else if (role === 'ceg') {
      this.setRole('allaskereso');
    }
  }
}
