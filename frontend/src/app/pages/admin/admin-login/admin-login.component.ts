import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../../shared/login-form/login-form.component';
import { SuccessMsgComponent } from '../../../shared/success-msg/success-msg.component';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { IsCompanyService } from '../../../services/is-company.service';
import { sha256 } from 'js-sha256';
import { DisplayDirective } from '../../../shared/directives/display.directive';

@Component({
  selector: 'app-admin-login',
  imports: [
    LoginFormComponent,
    HttpClientModule,
    ErrorMsgComponent,
    DisplayDirective,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  constructor(private http: HttpClient, private router: Router) {
    this.showError = false;
  }

  valid_login: { email: string; password: string } | null = null;
  loginservice = inject(LoginService);

  showError: boolean = true;
  error_msg: string = '';

  handle_login(login: { email: string; password: string }) {
    const logData = {
      email: login.email,
      password: sha256(sha256(login.password + login.email)),
      tipo: 'admin',
    };

    console.table(logData);
    console.log('emittelt');

    this.http
      .post<any>('http://localhost:3000/auth/api/login', logData)
      .subscribe(
        (response) => {
          console.table(response)
          if (response.success) {
            this.loginservice.setLoginStatus(true);
            localStorage.setItem('username', logData.email); 
            this.router.navigate(['/admin_home']); 
          } else {
            this.errorHandler(response.message);
          }
        },
        (error) => {
          this.errorHandler(error.error.error);
        }
      );
  }

  errorHandler(error: string): void {
    
    if (error.length > 0) {
      this.showError = true;
      this.error_msg = error;
    }
  }
}
