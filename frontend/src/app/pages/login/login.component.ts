import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormComponent } from '../../shared/login-form/login-form.component';
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
import { SuccessMsgComponent } from "../../shared/success-msg/success-msg.component"; 
import { json, response } from 'express';
import { JobsService } from '../../services/jobs.service';


@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, HttpClientModule, ErrorMsgComponent, DisplayDirective, SuccessMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){
    this.showError = false;
    this.showSuccess = false;
  }
  
  valid_login: { email: string; password: string;} | null = null;

  loginservice = inject(LoginService);
  jobservice = inject(JobsService);

  showError: boolean = true;
  error_msg: string = '';

  showSuccess:boolean = true;
  success_msg: string = '';

handle_login(login: { email: string; password: string; }) {
  const data = {
    email: login.email,
    password: sha256(sha256(login.password+login.email)),
    tipo: this.loginservice.getRole()
  }
  
  console.table(data);
  this.http.post<any>('http://localhost:3000/auth/api/login', data).subscribe(
    response => {
      console.table(response);
      if (response.success) {
          this.loginservice.setLoginStatus(true);
          localStorage.setItem('username', response.email); //! kisbetű, allCapssel nem működik gyerekik
          this.jobservice.setjobs(response.jobs); //TODO kiszervezni telljesen jobservicebe.
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
    console.table(error);
    this.showError = true;
    this.error_msg = error;
  }

  successHandler(success: string){
    this.showSuccess = true;
    this.success_msg = success;
  }
}
