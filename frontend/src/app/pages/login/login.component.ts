import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
// import {
//   FormGroup,
//   FormControl,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { IsCompanyService } from '../../services/is-company.service';
import { inject } from '@angular/core';
import { IsCompanyService } from '../../services/is-company.service';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){}
  
  valid_login: { email: string; password: string;} | null = null;

  loginservice = inject(LoginService);
  companyservice = inject(IsCompanyService);

  handle_login(login: { email: string; password: string; }) {
    const log = {
      email: login.email,
      password: login.password,
      tipo: this.companyservice.getIsCompany()
    }
    // login: { tipo: this.companyservice.getIsCompany() };
    // console.table(login);
    console.log("emittelt");
    // console.log(this.companyservice.getIsCompany());

    // const loginData = { email: login.email, password: login.password };
    this.http.post<any>('http://localhost:3000/auth/api/login', log).subscribe(
      response => {
          if (response.success) {
            this.loginservice.setLoginStatus(true);
            this.companyService.setIsCompany(false);
            localStorage.setItem('username', response.EMAIL);
            this.router.navigate(['/app']);

          } else {
            console.log('fail');
          }
        },
        (error) => {
          console.error(error);
        }
      );

  }
}
