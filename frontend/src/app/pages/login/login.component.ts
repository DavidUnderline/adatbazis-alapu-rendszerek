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

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){}
  
  valid_login: { email: string; password: string } | null = null;

  handle_login(login: { email: string; password: string }){
    console.log("emittelt");

    console.table(login);
    const loginData = { email: login.email, password: login.password };
    this.http.post<any>('http://localhost:3000/login', loginData).subscribe(
      response => {
          if (response.success) {
            console.log("success");
              // localStorage.setItem('username', response.username);
              // this.router.navigate(['/app']);
          } else {
              console.log(response.message);
          }
      },
      error => {
          console.error(error);
      }
    );
  }
}

