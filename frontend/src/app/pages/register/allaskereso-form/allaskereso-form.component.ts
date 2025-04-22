import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Allaskereso } from '../../../shared/Model/Allaskereso';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-allaskereso-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './allaskereso-form.component.html',
  styleUrl: './allaskereso-form.component.css',
})
export class AllaskeresoFormComponent {
  register_form = new FormGroup<AllaskeresoForm>({
    kereszt_nev: new FormControl<string>('', { nonNullable: true }),
    vezetek_nev: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    vegzettseg: new FormControl<string>('', { nonNullable: true }),
    jelszo1: new FormControl<string>('', { nonNullable: true }),
    jelszo2: new FormControl<string>('', { nonNullable: true }),
  });

  @Output() valid_register = new EventEmitter<Allaskereso>();

  Submit() {
    if (
      this.register_form.valid &&
      this.register_form.value.jelszo1 === this.register_form.value.jelszo2
    ) {
      const form = this.register_form.getRawValue();

      this.valid_register.emit(<Allaskereso>{
        email: form.email,
        jelszo: sha256(form.jelszo1),
        nev: `${form.kereszt_nev} ${form.vezetek_nev}`,
        utolso_bejelentkezes: new Date(),
        vegzettseg: form.vegzettseg,
        statusz: 'online',
      });
    }
  }
}

type AllaskeresoForm = {
  kereszt_nev: FormControl<string>;
  vezetek_nev: FormControl<string>;
  email: FormControl<string>;
  vegzettseg: FormControl<string>;
  jelszo1: FormControl<string>;
  jelszo2: FormControl<string>;
};
