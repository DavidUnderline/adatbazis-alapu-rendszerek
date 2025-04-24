import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
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
    adoazonosito: new FormControl<string | null>(''),
    nev: new FormControl<string | null>(''),
    email: new FormControl<string | null>(''),
    jelszo1: new FormControl<string | null>(''),
    jelszo2: new FormControl<string | null>(''),
  });
  @Output() valid_form = new EventEmitter<{
    adoazonosito: string | null;
    nev: string | null;
    email: string | null;
    jelszo: string | null;
  }>();

  Submit() {
    if (this.register_form.valid) {
      const form = this.register_form.getRawValue();
      console.table(form);
      if(form.jelszo1 === form.jelszo2){
      this.valid_form.emit({
        adoazonosito: form.adoazonosito,
        nev: form.nev,
        email: form.email,
        jelszo: sha256(sha256(form.jelszo1 as string + ((form.email)? form.email : localStorage.getItem("username"))))
      });
      }
    } else {
      alert('hibás formátum.');
    }
  }
}

type CegForm = {
  adoazonosito: FormControl<string | null>;
  nev: FormControl<string | null>;
  email: FormControl<string | null>;
  jelszo1: FormControl<string | null>;
  jelszo2: FormControl<string | null>;
};
