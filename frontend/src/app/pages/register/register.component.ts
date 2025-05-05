import { Component, inject } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import users from '../../shared/dummy_data/users.json';
import { Ceg } from '../../shared/Model/Ceg';
import { AllaskeresoFormComponent } from './allaskereso-form/allaskereso-form.component';
import { CegFormComponent } from './ceg-form/ceg-form.component';
import { IsCompanyService } from '../../services/is-company.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { last } from 'rxjs';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from '../../shared/success-msg/success-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  imports: [
    AllaskeresoFormComponent,
    CegFormComponent,
    HttpClientModule,
    ErrorMsgComponent,
    SuccessMsgComponent,
    DisplayDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  login_service = inject(LoginService);
  router = inject(Router);
  valid_register!: Allaskereso | Ceg;

  showError = false;
  error_msg = '';

  showSuccess = false;
  success_msg = '';

  constructor(private http: HttpClient) {}

  register_user(user: Allaskereso | Ceg) {
    if ('vegzettseg' in user) {
      // console.log('[LOG]: User is of type Allaskereso');
      // console.log(user);
      const registerData = {
        email: user.email,
        name: user.nev,
        password: user.jelszo,
        last_signed_in: new Date(),
        education: user.vegzettseg,
        status: user.statusz,
      };
      console.table(registerData);

      this.http
        .post<any>(
          'http://localhost:3000/allaskereso/api/register',
          registerData
        )
        .subscribe(
          (response) => {
            if (response.success) {
              this.successHandler('Sikeres Regisztráció!');
            } else {
              this.errorHandler('Hiba a regisztráció folyamán.');
            }
          },
          (error) => {
            this.errorHandler(error.error.error);
          }
        );
    } else if ('adoazonosito' in user) {
      const registerData = {
        id: user.adoazonosito,
        name: user.neve,
        email: user.email,
        password: user.jelszo,
      };

      this.http
        .post<any>('http://localhost:3000/ceg/api/register', registerData)
        .subscribe(
          (response) => {
            if (response.success) {
              this.successHandler('Sikeres Regisztráció!');
            } else {
              this.errorHandler('Hiba a regisztráció folyamán.');
            }
          },
          (error) => {
            this.errorHandler(error.error.error);
          }
        );
    } else {
      this.errorHandler('Hiba a regisztráció folyamán.');
    }

    // console.table(user)

    let temp = users;

    // this.router.navigateByUrl("/login");
  }

  successHandler(success: string): void {
    console.log(success);
    this.showSuccess = true;
    this.success_msg = success;
    this.showError = false;
  }

  errorHandler(error: string): void {
    this.showError = true;
    this.error_msg = error;
    this.showSuccess = false;
  }
}
