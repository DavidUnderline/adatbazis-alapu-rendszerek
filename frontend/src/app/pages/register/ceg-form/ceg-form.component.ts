import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ceg } from '../../../shared/Model/Ceg';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-ceg-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './ceg-form.component.html',
  styleUrl: './ceg-form.component.css',
})
export class CegFormComponent {
  register_form = new FormGroup<CegForm>({
    adoazonosito: new FormControl<string>('', { nonNullable: true }),
    nev: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    jelszo1: new FormControl<string>('', { nonNullable: true }),
    jelszo2: new FormControl<string>('', { nonNullable: true }),
  });

  @Output() valid_register = new EventEmitter<Ceg>();

  Submit() {
    if (
      this.register_form.valid &&
      this.register_form.value.jelszo1 === this.register_form.value.jelszo2
    ) {
      const form = this.register_form.getRawValue();
      this.valid_register.emit({
        adoazonosito: form.adoazonosito,
        neve: form.nev,
        email: form.email,
        jelszo: sha256(sha256(form.jelszo1+form.email)),
        ertekeles: 0,
        terulet: 0, //begéetett érték
      });
    }
  }
}

type CegForm = {
  adoazonosito: FormControl<string>;
  nev: FormControl<string>;
  email: FormControl<string>;
  jelszo1: FormControl<string>;
  jelszo2: FormControl<string>;
};
