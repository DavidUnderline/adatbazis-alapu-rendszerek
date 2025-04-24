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
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive'; 


@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, HttpClientModule, ErrorMsgComponent, DisplayDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){
    this.showError = false;
  }
  
  valid_login: { email: string; password: string;} | null = null;

  loginservice = inject(LoginService);
  companyservice = inject(IsCompanyService);

  showError: boolean = true;
  error_msg: string = '';

  handle_login(login: { email: string; password: string; }) {
    const log = {
      email: login.email,
      password: sha256(sha256(login.password+login.email)),
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
              this.companyservice.setIsCompany(false);
              localStorage.setItem('username', response.email); //! kisbetű, allCapssel nem működik gyerekik
              this.router.navigate(['/app']);
  
            } else {
              this.errorHandler('Ismeretlen Hiba.')
            }
          },
          (error) => {
              this.errorHandler(error.error.error);
          }
        );

  }

  errorHandler(error: string): void{
    this.showError = true;
    this.error_msg = error;
  }
}
