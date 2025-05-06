import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-admin-form',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css',
})
export class AdminFormComponent {
  admin_form = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true}),
    email: new FormControl<string>('', {nonNullable: true}),
    password1: new FormControl<string>('', {nonNullable: true}),
    password2: new FormControl<string>('', {nonNullable: true}),
  });

  @Output() valid_admin_form = new EventEmitter<{
    name: string,
    email: string,
    password: string
  }>();

  @Output() error = new EventEmitter<{
    success: boolean;
    message: string;
  }>();

  current_email = localStorage.getItem("username");

  submit() {
    if (this.admin_form.invalid && this.admin_form.untouched) {
      return;
    }
    let temp_form = this.admin_form.getRawValue();

    if(temp_form.email === '' && this.current_email){
      temp_form.email = this.current_email;
    }

    if (
      temp_form.email === '' &&
      temp_form.name == '' &&
      temp_form.password1 == ''
    ) {
      return;
    }
    if (
      temp_form.email &&
      ((temp_form.password1 ?? '').length < 3 ||
        (temp_form.password2 ?? '').length < 3)
    ) {
      this.error.emit({
        success: false,
        message: 'Email megválasztáshoz jelszó is szükségeltetik.',
      });
      return;
    }

    if (temp_form.password1 !== temp_form.password2) {
      this.error.emit({
        success: false,
        message: 'Jelszavak Különböznek,',
      });
      return;
    }

    this.valid_admin_form.emit({
      email: temp_form.email ?? '',
      name: temp_form.name ?? '',
      password: sha256(sha256(temp_form.password1 + temp_form.email))
    });
  }
}
