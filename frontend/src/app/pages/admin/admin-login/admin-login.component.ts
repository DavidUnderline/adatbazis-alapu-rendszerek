import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../login/login-form/login-form.component';
import { SuccessMsgComponent } from '../../../shared/success-msg/success-msg.component';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { IsCompanyService } from '../../../services/is-company.service';
import { sha256 } from 'js-sha256';
import { DisplayDirective } from '../../../shared/directives/display.directive';

@Component({
  selector: 'app-admin-login',
  imports: [LoginFormComponent, SuccessMsgComponent, ErrorMsgComponent, DisplayDirective],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  constructor(private http: HttpClient, private router: Router) {
    this.showError = false;
    this.showSuccess = false;
  }

  valid_login: { email: string; password: string } | null = null;

  loginservice = inject(LoginService);

  showError: boolean = true;
  error_msg: string = '';

  showSuccess: boolean = true;
  success_msg: string = '';

  handle_login(login: { email: string; password: string }) {
    const log = {
      email: login.email,
      password: sha256(sha256(login.password + login.email)),
    };
    // login: { tipo: this.companyservice.getIsCompany() };
    // console.table(login);
    console.log('emittelt');
    // console.log(this.companyservice.getIsCompany());

    // const loginData = { email: login.email, password: login.password };
    this.http.post<any>('http://localhost:3000/auth/api/login', log).subscribe(
      (response) => {
        if (response.success) {
          this.loginservice.setLoginStatus(true);
          localStorage.setItem('username', response.email); //! kisbetű, allCapssel nem működik gyerekik
          this.router.navigate(['/app']);
        } else {
          this.errorHandler('Ismeretlen Hiba.');
        }
      },
      (error) => {
        this.errorHandler(error.error.error);
      }
    );
  }

  errorHandler(error: string): void {
    console.table(error);
    this.showError = true;
    this.error_msg = error;
  }

  successHandler(success: string) {
    this.showSuccess = true;
    this.success_msg = success;
  }
}
