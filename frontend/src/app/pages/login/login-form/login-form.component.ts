import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {

  login_form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  @Output() valid_login = new EventEmitter<{
    email: string;
    password: string;
  }>();

  @Output() login_error = new EventEmitter<string>();

  submit() {
    if (this.login_form.valid) {
      this.valid_login.emit({
        email: this.login_form.value.email || '',
        password: this.login_form.value.password || '',
      });
      return;
    }
    this.login_error.emit("Az email vagy a jelszó nem megfelelő formátumban lett megadva.");
  }
}
