import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Allaskereso } from '../../../shared/Model/Allaskereso';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-register-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  register_form = new FormGroup({
    kereszt_nev: new FormControl<string>(''),
    vezetek_nev: new FormControl<string>(''),
    email: new FormControl<string>(''),
    vegzettseg: new FormControl<string>(''),
    jelszo1: new FormControl<string>(''),
    jelszo2: new FormControl<string>(''),
  });

  @Output() valid_register = new EventEmitter<Allaskereso>();

  Submit() {
    if (
      this.register_form.valid &&
      this.register_form.value.jelszo1 === this.register_form.value.jelszo2
    ) {
      const hashedPassword = sha256(this.register_form.value.jelszo1 ?? '');

      this.valid_register.emit({
        email: this.register_form.value.email || '',
        jelszo: hashedPassword,
        nev: `${this.register_form.value.kereszt_nev || ''} ${
          this.register_form.value.vezetek_nev || ''
        }`.trim(),
        utolso_bejelentkezes: new Date(),
        vegzettseg: this.register_form.value.vegzettseg?.trim() ?? '',
        statusz: 'online',
      });
    }
  }
  
}
