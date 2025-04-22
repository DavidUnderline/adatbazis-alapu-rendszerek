import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  valid_login: { email: string; password: string } | null = null;

  handle_login(login: { email: string; password: string }){
    console.table(login);
    
  }
}
